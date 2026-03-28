import { DEMO_STATS } from "@/src/config/demo-stats";

export function StatsStrip() {
  const items = [
    { label: "Runs Recorded", value: DEMO_STATS.runsRecorded.toLocaleString(), icon: "🏃" },
    { label: "Relics Minted", value: DEMO_STATS.relicsMinted.toLocaleString(), icon: "💠" },
    { label: "Best Floor", value: String(DEMO_STATS.bestFloor), icon: "🏔" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 p-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 px-8 py-4 w-full md:w-auto justify-center"
          >
            <span className="text-3xl opacity-80">{item.icon}</span>
            <div className="flex flex-col">
              <span className="font-mono text-2xl font-bold text-sky-400">
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-sans">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
