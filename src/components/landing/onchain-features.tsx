const FEATURES = [
  {
    icon: "🏪",
    title: "On‑Chain Relic Market",
    description:
      "Premium relics are ERC‑721 tokens on Monad. Mint from loot drops, list at your price, buy from other players — all settled on‑chain for pennies.",
  },
  {
    icon: "📜",
    title: "Run Ledger",
    description:
      "Record your best dungeon runs on‑chain for a provable, trustless leaderboard. Your score lives on Monad forever.",
  },
  {
    icon: "⚡",
    title: "Fast Enough for the Loop",
    description:
      "Monad's sub‑second finality and near‑zero fees make on‑chain actions feel like part of the gameplay, not a tollbooth.",
  },
] as const;

export function OnchainFeatures() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold uppercase text-center mb-12 tracking-wide text-fuchsia-400 [text-shadow:0_0_15px_rgba(232,121,249,0.3)]">
        Monad Native
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border border-fuchsia-500/20 shadow-[0_0_30px_rgba(232,121,249,0.05)] hover:shadow-[0_0_30px_rgba(232,121,249,0.15)] transition-all hover:-translate-y-1"
          >
            <div className="text-5xl mb-6">{f.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">
              {f.title}
            </h3>
            <p className="text-slate-400 font-sans leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
