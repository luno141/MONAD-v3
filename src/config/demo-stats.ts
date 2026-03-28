/** Stubbed stats for the landing page – swap with real API calls later. */
export const DEMO_STATS = {
  runsRecorded: 1_247,
  relicsMinted: 83,
  bestFloor: 7,
} as const;

export const LEADERBOARD_STUB = [
  { rank: 1, player: "0xCr1pt…d3aD", bestFloor: 7, score: 48_320 },
  { rank: 2, player: "0xR0gu3…b33F", bestFloor: 6, score: 41_100 },
  { rank: 3, player: "0xMag3…a1c0", bestFloor: 6, score: 39_750 },
  { rank: 4, player: "0xW4rr…90b1", bestFloor: 5, score: 34_200 },
  { rank: 5, player: "0xDusk…f4c3", bestFloor: 5, score: 31_880 },
  { rank: 6, player: "0xH3x…7e2a", bestFloor: 4, score: 28_500 },
  { rank: 7, player: "0xBl4z…1d0e", bestFloor: 4, score: 26_150 },
  { rank: 8, player: "0xN0v4…c3ll", bestFloor: 3, score: 22_400 },
  { rank: 9, player: "0xGh0s…88ab", bestFloor: 3, score: 19_720 },
  { rank: 10, player: "0xS1lv…d00m", bestFloor: 2, score: 15_350 },
] as const;

export const RELIC_GALLERY = [
  {
    name: "Starforged Idol",
    icon: "🜂",
    rarity: "Legendary" as const,
    color: "#fde047",
    stats: "+3 ATK, +2 DEF, +4 LCK",
  },
  {
    name: "Voidheart Shard",
    icon: "💎",
    rarity: "Epic" as const,
    color: "#c084fc",
    stats: "+5 ATK, +3% CRIT",
  },
  {
    name: "Moonbrew Flask",
    icon: "🧪",
    rarity: "Rare" as const,
    color: "#34d399",
    stats: "Heal 28 HP",
  },
  {
    name: "Ember Charm",
    icon: "🔥",
    rarity: "Rare" as const,
    color: "#f97316",
    stats: "+1 SPD, +2 LCK, +2% CRIT",
  },
  {
    name: "Duskmail Coat",
    icon: "🛡",
    rarity: "Uncommon" as const,
    color: "#a78bfa",
    stats: "+4 DEF, +10 HP",
  },
  {
    name: "Whisper Daggers",
    icon: "🗡",
    rarity: "Common" as const,
    color: "#f472b6",
    stats: "+3 ATK, +2 SPD, +4% CRIT",
  },
] as const;
