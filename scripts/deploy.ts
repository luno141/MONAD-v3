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

const market = await ethers.deployContract("RelicRushArtifactMarket", [
  deployer.address,
]);

await market.waitForDeployment();

const contractAddress = await market.getAddress();

console.log("RelicRushArtifactMarket deployed successfully.");
console.log(`Network args: ${process.argv.slice(2).join(" ") || "default"}`);
console.log(`Deployer: ${deployer.address}`);
console.log(`Contract address: ${contractAddress}`);
console.log(
  `Set NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS=${contractAddress} in your .env file.`,
);
