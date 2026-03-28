import { network } from "hardhat";

const privateKey = process.env.PRIVATE_KEY ?? "";
const deployingToMonad = process.argv.includes("monadTestnet");

if (deployingToMonad && !privateKey) {
  throw new Error(
    "PRIVATE_KEY is missing in .env. Add a funded Monad testnet deployer key before running deploy:monad.",
  );
}

const { ethers } = await network.connect();
const [deployer] = await ethers.getSigners();

// ── RelicRushArtifactMarket ──────────────────────────────────────────

const market = await ethers.deployContract("RelicRushArtifactMarket", [
  deployer.address,
]);
await market.waitForDeployment();
const marketAddress = await market.getAddress();

console.log("RelicRushArtifactMarket deployed successfully.");
console.log(`  Contract address: ${marketAddress}`);
console.log(
  `  Set NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS=${marketAddress} in your .env file.`,
);

// ── RelicRushRunLedger ───────────────────────────────────────────────

const ledger = await ethers.deployContract("RelicRushRunLedger");
await ledger.waitForDeployment();
const ledgerAddress = await ledger.getAddress();

console.log("\nRelicRushRunLedger deployed successfully.");
console.log(`  Contract address: ${ledgerAddress}`);
console.log(
  `  Set NEXT_PUBLIC_RELIC_RUSH_LEDGER_ADDRESS=${ledgerAddress} in your .env file.`,
);

// ── RelicRushRelicForge ──────────────────────────────────────────────

const forge = await ethers.deployContract("RelicRushRelicForge", [
  deployer.address,
]);
await forge.waitForDeployment();
const forgeAddress = await forge.getAddress();

console.log("\nRelicRushRelicForge deployed successfully.");
console.log(`  Contract address: ${forgeAddress}`);
console.log(
  `  Set NEXT_PUBLIC_RELIC_RUSH_FORGE_ADDRESS=${forgeAddress} in your .env file.`,
);

// ── Summary ──────────────────────────────────────────────────────────

console.log("\n─── Deployment Summary ───");
console.log(`Network args: ${process.argv.slice(2).join(" ") || "default"}`);
console.log(`Deployer: ${deployer.address}`);
console.log(`  Market:  ${marketAddress}`);
console.log(`  Ledger:  ${ledgerAddress}`);
console.log(`  Forge:   ${forgeAddress}`);
