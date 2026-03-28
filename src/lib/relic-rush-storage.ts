import type { PlayerSnapshot } from "@/src/game/types";

const PLAYER_ID_STORAGE_KEY = "relic-rush-player-id";
const SNAPSHOT_STORAGE_KEY = "relic-rush-player-snapshot";

export function readStoredPlayerId() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(PLAYER_ID_STORAGE_KEY);
}

export function saveStoredPlayerId(playerId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PLAYER_ID_STORAGE_KEY, playerId);
}

export function readStoredSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PlayerSnapshot;

    if (!parsed?.profile?.playerId) {
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(SNAPSHOT_STORAGE_KEY);
    return null;
  }
}

export function saveStoredSnapshot(snapshot: PlayerSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshot));
}

export function clearStoredSnapshot() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SNAPSHOT_STORAGE_KEY);
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PLAYER_ID_STORAGE_KEY);
  window.localStorage.removeItem(SNAPSHOT_STORAGE_KEY);
}
