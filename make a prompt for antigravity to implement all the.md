<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# make a prompt for antigravity to implement all these things using the skills i have installed

Here’s a prompt you can paste into Antigravity (or any code agent) to make it implement the Monad pieces in your `MONAD-v3` repo.[^1][^2][^3]

***

**Prompt for Antigravity (Monad Relic Rush Implementation)**

You are an expert full‑stack/Web3 engineer working inside my repo `MONAD-v3`. Tech stack:

- Frontend: Next.js 13+ (App Router), React, TypeScript, Phaser for the game scene
- Backend: Next.js API routes, Prisma + PostgreSQL (optional in this hackathon)
- Web3: Solidity, Hardhat, ethers.js, already configured for a Monad EVM network
- Existing smart contract: `contracts/RelicRushArtifactMarket.sol` (ERC‑721 + marketplace)

**Goal**

Turn this repo into a Monad‑native vertical slice of “Relic Rush”, a 2D dungeon ARPG where:

1. Premium relics are **real ERC‑721s on Monad**, minted/listed/bought from the game.
2. Successful runs are optionally **logged on‑chain** in a lightweight run ledger (leaderboard‑friendly).
3. The UI clearly showcases Monad’s **speed and low fees** (tx hashes, confirmation times).

You must:

- Reuse and extend existing code and structure (no full rewrites).
- Keep gameplay off‑chain in Phaser, but integrate Web3 where it’s impactful.
- Minimize scope so this can be shipped in a hackathon setting.

***

## Part 1 – Wire the existing `RelicRushArtifactMarket` contract into the game

We already have `contracts/RelicRushArtifactMarket.sol` and corresponding ethers types/factories generated. Implement **real mint/list/buy flows** from the React app.[^2]

### 1.1 Environment \& config

- Add appropriate env vars (in `.env.local` and/or config files) for:
    - `NEXT_PUBLIC_MONAD_RPC_URL`
    - `NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS`
    - `NEXT_PUBLIC_MONAD_EXPLORER_URL` (for tx links)
- Ensure the Hardhat config has a Monad testnet network configured and that the deploy script writes the deployed market address somewhere the frontend can read (or we set it manually for now).


### 1.2 Contract factory usage

- In `src/lib/relicRushArtifactMarket.ts`, we already have a `createRelicRushArtifactMarket` helper. Use that everywhere we need to interact with the contract (mint, list, buy) via a signer.
- Make sure typing is correct using the generated `RelicRushArtifactMarket__factory` types.


### 1.3 Mint premium relics from game events

Implement a flow where *specific in‑game drops* become premium relics on Monad:

- Identify where a run ends / loot is finalized in `src/components/relic-rush-app.tsx` (or wherever the run summary and loot inventory live).
- Add a “Mint on Monad” button for eligible items (e.g., high‑rarity artifacts).
    - On click:
        - Connect wallet if not already.
        - Construct `artifactId` and `tokenURI` (can reuse existing metadata logic or simple JSON/IPFS stubs).
        - Call `market.mintPremiumArtifact(playerAddress, artifactId, tokenURI)` on the `RelicRushArtifactMarket` contract using the connected signer.
        - Await tx, then:
            - Show a toast with tx hash and a link to the Monad explorer.
            - Update local/DB state so this inventory entry is now associated with an on‑chain tokenId.


### 1.4 List and buy on Monad from the UI

- For premium relics that are already minted:
    - Add a “List on Monad” button in inventory:
        - Prompt for price.
        - Call the contract’s listing function (e.g., `createListing(tokenId, price)` – check actual function signature in the contract).
        - Show tx status and explorer link.
- In the marketplace screen:
    - Render current listings by combining:
        - On‑chain data (listings) via ethers calls.
        - Optional cached data in Prisma/DB for metadata.
    - Add a “Buy” button:
        - Calls `buyListing(listingId)` or equivalent, with value = price.
        - After success, reflect ownership change in UI and DB.

Make sure all Web3 calls are robust:

- Handle reverts (out of date listing, not owner, etc.) with user‑friendly messages.
- Wrap async calls in loading states.

***

## Part 2 – Add an on‑chain Run Ledger (`RelicRushRunLedger.sol`)

Create a **small, focused contract** to record successful runs on Monad. This should be light enough to call whenever a player completes a run.

### 2.1 Contract design

Create `contracts/RelicRushRunLedger.sol`:

- Store minimal per‑run info:

```solidity
struct RunSummary {
    uint32 floorReached;
    uint32 score;
    uint32 timestamp;
}

mapping(address => RunSummary[]) public runs;
mapping(address => uint32) public bestScore;

event RunRecorded(address indexed player, uint32 floorReached, uint32 score);
```

- Public function:

```solidity
function recordRun(uint32 floorReached, uint32 score) external {
    // optional: require(score > 0);
    runs[msg.sender].push(
        RunSummary(floorReached, score, uint32(block.timestamp))
    );
    if (score > bestScore[msg.sender]) {
        bestScore[msg.sender] = score;
    }
    emit RunRecorded(msg.sender, floorReached, score);
}
```

- Optionally add a simple season system later, but keep v1 minimal.

Integrate it into Hardhat:

- Add deployment step in `scripts/deploy.ts`.
- Add ABI sync to `scripts/sync-abi.mjs` and regenerate TypeScript types.


### 2.2 Frontend integration

In the React app:

- Instantiate the `RelicRushRunLedger` contract similarly to the market helper.
- In the run‑end codepath (victory/extract), after local game state is finalized:
    - Call `recordRun(floorReached, score)` using the *player’s signer*.
    - Show:
        - Status “Recording run on Monad…”
        - On success, show tx hash + explorer link.
- Add a simple “Run history / Ladder” panel:
    - For the connected player:
        - Fetch `bestScore` and display it.
    - Optionally, show recent runs by reading `runs[player]` or by using a small indexer/server cache if direct reads are too heavy.

***

## Part 3 – Optional: On‑chain Relic Forge / Reroll

If there’s time, add a small **relic forge** so players can on‑chain “roll” a premium relic:

- Either extend `RelicRushArtifactMarket` or create a separate `RelicRushRelicForge.sol`.
- Example function:

```solidity
uint256 public forgeFee = 0.001 ether;

function forgeRandomRelic(string calldata artifactId, string calldata tokenURI)
    external
    payable
    returns (uint256 tokenId)
{
    require(msg.value >= forgeFee, "FORGE_FEE");
    // Use simple non‑secure randomness for hackathon (document this clearly)
    tokenId = _nextTokenId();
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);
    emit PremiumArtifactMinted(msg.sender, tokenId, artifactId, tokenURI);
}
```

Frontend:

- Add a “Relic Forge” UI in the hub/town:
    - Shows forge fee.
    - On click, calls `forgeRandomRelic` with some basic metadata.
    - After tx, shows the new relic in inventory.

Document clearly in comments/README that randomness is demo‑grade only.

***

## Part 4 – Make Monad’s performance visible in the UX

Wherever we do Web3 actions (mint, list, buy, record run, forge):

- Measure and display:
    - Time from `await contract.fn()` send to `await tx.wait()`.
    - Tx hash with link to `NEXT_PUBLIC_MONAD_EXPLORER_URL/tx/<hash>`.
- Add a small “Network / Monad” card in the UI with:
    - Current network name / chainId.
    - Last 3 on‑chain actions and their confirmation times.

This is important: the judges should *see* that actions are happening on Monad quickly and cheaply, not just hear about it.

***

## Constraints \& style

- Do not break the existing Phaser gameplay loop; integrate around it.
- Keep contracts small, readable, and safe (use OpenZeppelin patterns that are already present).
- Prefer incremental changes and small, focused PR‑style commits.
- Add minimal but clear error handling and basic toasts/snackbars for all Web3 actions.
- Add/update README to briefly document:
    - How to deploy contracts to Monad testnet.
    - How to configure env vars.
    - What on‑chain features are in the Blitz demo (artifact market, run ledger, forge).

Start by scanning the repo to fully understand the current flow, then implement the above in this order:

1) Wire real mint/list/buy via `RelicRushArtifactMarket`.
2) Add `RelicRushRunLedger` and hook it into run completion.
3) (If time) add Relic Forge and any UX polish that highlights Monad.

<div align="center">⁂</div>

[^1]: https://luma.com/blitz-delhi-mar-2026?tk=u53W27

[^2]: https://lu.ma/3x4j529k

[^3]: https://monad.xyz

