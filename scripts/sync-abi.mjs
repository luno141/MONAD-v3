import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const targetDirectory = path.join(process.cwd(), "src", "lib");
await mkdir(targetDirectory, { recursive: true });

const contracts = [
  {
    artifactPath: path.join(
      process.cwd(),
      "artifacts",
      "contracts",
      "RelicRushArtifactMarket.sol",
      "RelicRushArtifactMarket.json",
    ),
    targetName: "relicRushArtifactMarketAbi.ts",
    exportName: "RELIC_RUSH_ARTIFACT_MARKET_ABI",
  },
  {
    artifactPath: path.join(
      process.cwd(),
      "artifacts",
      "contracts",
      "RelicRushRunLedger.sol",
      "RelicRushRunLedger.json",
    ),
    targetName: "relicRushRunLedgerAbi.ts",
    exportName: "RELIC_RUSH_RUN_LEDGER_ABI",
  },
  {
    artifactPath: path.join(
      process.cwd(),
      "artifacts",
      "contracts",
      "RelicRushRelicForge.sol",
      "RelicRushRelicForge.json",
    ),
    targetName: "relicRushRelicForgeAbi.ts",
    exportName: "RELIC_RUSH_RELIC_FORGE_ABI",
  },
];

for (const contract of contracts) {
  const artifactRaw = await readFile(contract.artifactPath, "utf8");
  const artifact = JSON.parse(artifactRaw);

  const fileContents = `export const ${contract.exportName} = ${JSON.stringify(
    artifact.abi,
    null,
    2,
  )} as const;\n`;

  const targetPath = path.join(targetDirectory, contract.targetName);
  await writeFile(targetPath, fileContents, "utf8");
  console.log(`ABI synced to ${targetPath}`);
}
