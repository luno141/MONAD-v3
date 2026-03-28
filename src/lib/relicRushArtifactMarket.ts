import { Contract, type ContractRunner } from "ethers";
import { RELIC_RUSH_ARTIFACT_MARKET_ABI } from "@/src/lib/relicRushArtifactMarketAbi";

export const relicRushMarketAddress =
  process.env.NEXT_PUBLIC_RELIC_RUSH_MARKET_ADDRESS ?? "";

export function hasRelicRushMarketAddress() {
  return /^0x[a-fA-F0-9]{40}$/.test(relicRushMarketAddress);
}

export function createRelicRushArtifactMarket(
  runner: ContractRunner,
  address = relicRushMarketAddress,
) {
  return new Contract(address, RELIC_RUSH_ARTIFACT_MARKET_ABI, runner);
}
