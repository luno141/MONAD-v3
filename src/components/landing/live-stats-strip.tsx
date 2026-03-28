'use client';

import { demoStats } from '../../config/demoStats';

export function LiveStatsStrip() {
  const stats = [
    { label: "MONAD RUNS", value: demoStats.runs, icon: "⚔️" },
    { label: "RELICS FOUND", value: "002542", icon: "💎" },
    { label: "ACTIVE PLAYERS", value: "000042", icon: "🕹️" },
  ];

  return (
    <section className="w-full bg-[#050510] border-y border-[#00FFFF33] py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform">{stat.icon}</span>
            <div className="flex flex-col">
              <span className="pixel-text text-[#FFB800] text-sm md:text-base tracking-tighter">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FFFF] opacity-60">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative pulse glow */}
      <div className="absolute inset-0 bg-[#00FFFF05] animate-pulse pointer-events-none"></div>
    </section>
  );
}
