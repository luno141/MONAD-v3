# Relic Rush

Relic Rush is a compact dungeon RPG MVP built for Monad testnet. The playable loop is off-chain for responsiveness: choose a class, clear a small dungeon room in Phaser, collect loot, manage your inventory, equip upgrades, preview premium artifacts, list them in a marketplace UI, and test your build in a PvP-ready mock duel flow.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Phaser 3
- PostgreSQL + Prisma
- Solidity + Hardhat
- ethers.js

## What Is Playable Today

- Character selection with Warrior, Rogue, and Mage
- One dungeon room with movement, enemy combat, loot drops, and victory/defeat states
- Inventory with equip, unequip, and consumable use
- Premium artifact marketplace flow with listing and purchase APIs
- PvP arena stub with mock duel simulation and persisted match history
- Wallet connection and Monad network status for future on-chain settlement

## Persistence Behavior

When `DATABASE_URL` is configured, the API routes use PostgreSQL through Prisma.

When `DATABASE_URL` is missing, the app falls back to an in-memory mock store so the MVP stays playable locally. This keeps the vertical slice usable while still shipping the real Prisma schema and server routes.

## Setup

```bash
cp .env.example .env
npm install
```

Fill in the manual values inside `.env`:

- `DATABASE_URL` for PostgreSQL
- `PRIVATE_KEY` for Monad deployments
- `NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS` after deployment
- `NEXT_PUBLIC_MONAD_EXPLORER_URL` if you want explorer links

## Prisma Setup

Generate the client:

```bash
npm run prisma:generate
```

Push the schema into PostgreSQL:

```bash
npm run prisma:push
```

## Local Run

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Contract Workflow

Compile and sync the market ABI into the frontend:

```bash
npm run compile
```

Run contract tests:

```bash
npm test
```

Local Hardhat deployment:

```bash
npm run node
npm run deploy:local
```

Monad testnet deployment:

```bash
npm run deploy:monad
```

After deploy, add the printed address to:

```env
NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS=0x...
```

## Notes

- Hardhat warns on Node `25.8.1`. Use Node `22.10.0+` LTS for safer reproduction.
- `MONAD_RPC_URL` and chain ID defaults are set from Monad docs at the time of implementation.
- `NEXT_PUBLIC_MONAD_EXPLORER_URL` is intentionally manual.
