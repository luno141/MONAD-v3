import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const homeOverride = path.join(process.cwd(), ".hardhat-home");
fs.mkdirSync(homeOverride, { recursive: true });

const xdgCache = path.join(homeOverride, ".cache");
const cacheDir = path.join(xdgCache, "hardhat-nodejs");
fs.mkdirSync(cacheDir, { recursive: true });

const hardhatArgs = process.argv.slice(2);
const env = {
  ...process.env,
  HARDHAT_CACHE_DIR: cacheDir,
  HOME: homeOverride,
  USERPROFILE: homeOverride,
  XDG_CACHE_HOME: xdgCache,
};

const child = spawn("hardhat", hardhatArgs, {
  env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
