import { buildItemInstance, createMockListing, createStarterProfile } from "@/src/game/helpers";
import type {
  MarketplaceListing,
  PlayerProfile,
  PurchaseRecord,
} from "@/src/game/types";

type MockStore = {
  players: Record<string, PlayerProfile>;
  listings: MarketplaceListing[];
  purchases: PurchaseRecord[];
};

declare global {
  // eslint-disable-next-line no-var
  var __relicRushMockStore__: MockStore | undefined;
}

function createInitialStore(): MockStore {
  const idol = buildItemInstance("starforged-idol", "market", "epic");
  const charm = buildItemInstance("ember-charm", "market", "rare");

  return {
    players: {},
    listings: [
      createMockListing(idol, "Vault Trader"),
      createMockListing(charm, "Relic Broker"),
    ],
    purchases: [],
  };
}

export function getMockStore() {
  if (!global.__relicRushMockStore__) {
    global.__relicRushMockStore__ = createInitialStore();
  }

  return global.__relicRushMockStore__;
}

export function ensureMockPlayer(
  playerId: string,
  archetype: "Warrior" | "Rogue" | "Mage",
  displayName: string,
  walletAddress: string | null = null,
) {
  const store = getMockStore();

  if (!store.players[playerId]) {
    store.players[playerId] = createStarterProfile(
      playerId,
      archetype,
      displayName,
      walletAddress,
    );
  }

  return store.players[playerId];
}
