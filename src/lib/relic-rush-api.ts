import type {
  BootstrapProfileInput,
  CreateListingInput,
  MockPvpInput,
  PlayerSnapshot,
  PurchaseListingInput,
  SyncProfileInput,
} from "@/src/game/types";

async function parseJson<T>(response: Response) {
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(payload?.error ?? "Request failed.");
  }

  return (await response.json()) as T;
}

export async function fetchProfile(playerId: string) {
  const response = await fetch(`/api/profile?playerId=${encodeURIComponent(playerId)}`, {
    cache: "no-store",
  });

  return parseJson<PlayerSnapshot>(response);
}

export async function bootstrapProfile(payload: BootstrapProfileInput) {
  const response = await fetch("/api/profile/bootstrap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<PlayerSnapshot>(response);
}

export async function syncProfile(payload: SyncProfileInput) {
  const response = await fetch("/api/profile/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<PlayerSnapshot>(response);
}

export async function fetchListings() {
  const response = await fetch("/api/marketplace/listings", {
    cache: "no-store",
  });

  return parseJson<PlayerSnapshot["listings"]>(response);
}

export async function createListing(payload: CreateListingInput) {
  const response = await fetch("/api/marketplace/listings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<PlayerSnapshot["listings"]>(response);
}

export async function purchaseListing(payload: PurchaseListingInput) {
  const response = await fetch("/api/marketplace/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<PlayerSnapshot>(response);
}

export async function runMockPvp(payload: MockPvpInput) {
  const response = await fetch("/api/pvp/mock", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<PlayerSnapshot>(response);
}
