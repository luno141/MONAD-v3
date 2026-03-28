const STEPS = [
  {
    icon: "⚔️",
    title: "Pick Your Class",
    description: "Warrior, Rogue, or Mage — each with unique stats and starter gear.",
  },
  {
    icon: "🏰",
    title: "Dive Into the Dungeon",
    description: "Clear rooms, dodge traps, and fight your way deeper floor by floor.",
  },
  {
    icon: "💎",
    title: "Loot Relics & Gear",
    description: "Extract rare artifacts and consumables — the deeper you go, the better the drops.",
  },
  {
    icon: "⛓️",
    title: "Mint & Trade",
    description: "Premium relics become ERC‑721s you can list, buy, or trade on‑chain.",
  },
] as const;

export function HowItPlays() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold uppercase text-center mb-12 tracking-wide [text-shadow:0_0_15px_rgba(255,255,255,0.1)]">
        How It Plays
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800/60 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-mono text-sm text-slate-400 font-bold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-4xl mb-4 p-4 bg-slate-800/50 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
            <p className="text-slate-400 font-sans text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
