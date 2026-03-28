import { defineConfig } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const cacheDir = path.join(process.cwd(), "node_modules/.cache/hardhat-nodejs");
if (!process.env.HARDHAT_CACHE_DIR) {
  fs.mkdirSync(cacheDir, { recursive: true });
  process.env.HARDHAT_CACHE_DIR = cacheDir;
}

const MONAD_RPC_URL = process.env.MONAD_RPC_URL ?? "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const MONAD_TESTNET_CHAIN_ID = Number.parseInt(
  process.env.MONAD_TESTNET_CHAIN_ID ?? "10143",
  10,
);

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "prague",
    },
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
    },
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    ...(MONAD_RPC_URL
      ? {
          monadTestnet: {
            type: "http",
            url: MONAD_RPC_URL,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
            chainId: MONAD_TESTNET_CHAIN_ID,
          },
        }
      : {}),
  },
});
