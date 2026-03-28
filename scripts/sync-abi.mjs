import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const artifactPath = path.join(
  process.cwd(),
  "artifacts",
  "contracts",
  "RelicRushArtifactMarket.sol",
  "RelicRushArtifactMarket.json",
);

const targetDirectory = path.join(process.cwd(), "src", "lib");
const targetPath = path.join(targetDirectory, "relicRushArtifactMarketAbi.ts");

const artifactRaw = await readFile(artifactPath, "utf8");
const artifact = JSON.parse(artifactRaw);

const fileContents = `export const RELIC_RUSH_ARTIFACT_MARKET_ABI = ${JSON.stringify(
  artifact.abi,
  null,
  2,
)} as const;\n`;

await mkdir(targetDirectory, { recursive: true });
await writeFile(targetPath, fileContents, "utf8");

console.log(`ABI synced to ${targetPath}`);
