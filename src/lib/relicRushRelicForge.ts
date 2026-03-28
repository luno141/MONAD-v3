import { Contract, type ContractRunner } from "ethers";
import { RELIC_RUSH_RELIC_FORGE_ABI } from "@/src/lib/relicRushRelicForgeAbi";

export const relicRushForgeAddress =
  process.env.NEXT_PUBLIC_RELIC_RUSH_FORGE_ADDRESS ?? "";

export function hasRelicRushForgeAddress() {
  return /^0x[a-fA-F0-9]{40}$/.test(relicRushForgeAddress);
}

export function createRelicRushRelicForge(
  runner: ContractRunner,
  address = relicRushForgeAddress,
) {
  return new Contract(address, RELIC_RUSH_RELIC_FORGE_ABI, runner);
}
