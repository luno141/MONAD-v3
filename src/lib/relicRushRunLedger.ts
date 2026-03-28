import { Contract, type ContractRunner } from "ethers";
import { RELIC_RUSH_RUN_LEDGER_ABI } from "@/src/lib/relicRushRunLedgerAbi";

export const relicRushLedgerAddress =
  process.env.NEXT_PUBLIC_RELIC_RUSH_LEDGER_ADDRESS ?? "";

export function hasRelicRushLedgerAddress() {
  return /^0x[a-fA-F0-9]{40}$/.test(relicRushLedgerAddress);
}

export function createRelicRushRunLedger(
  runner: ContractRunner,
  address = relicRushLedgerAddress,
) {
  return new Contract(address, RELIC_RUSH_RUN_LEDGER_ABI, runner);
}
