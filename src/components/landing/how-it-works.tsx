'use client';

const STEPS = [
  {
    icon: "⚔️",
    title: "PICK CLASS",
    body: "Warrior, Rogue, or Mage. Each build changes your dungeon odds.",
  },
  {
    icon: "🏚️",
    title: "ENTER DUNGEON",
    body: "One room. Three enemy types. Survive, fight, loot.",
  },
  {
    icon: "💎",
    title: "LOOT RELICS",
    body: "Premium artifacts drop from vault wisps. Rare and epic tiers.",
  },
  {
    icon: "⛓️",
    title: "MINT ON MONAD",
    body: "Each premium relic becomes an ERC-721. 0.001 MON. Instant.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10">
      <h2 className="pixel-text text-2xl md:text-3xl text-center mb-16 uppercase text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
        &gt; HOW IT WORKS _
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 relative text-[#eef3ff]">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
            {/* Step Card */}
            <div className="bg-[#0a0a1a] border border-[#00FFFF] p-8 w-full max-w-sm lg:w-64 flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,255,255,0.15),inset_0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] transition-shadow duration-300">
              <div className="text-4xl mb-4 p-4 rounded-none border border-dashed border-[#00FFFF44] bg-[#00FFFF11]">
                {step.icon}
              </div>
              <h3 className="font-mono text-xl font-bold mb-3 tracking-widest text-white">
                {step.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-[#a0b0d0]">
                {step.body}
              </p>
            </div>

            {/* Arrow separator (only between items on desktop) */}
            {i < STEPS.length - 1 && (
              <div className="hidden lg:flex items-center justify-center mx-4 pixel-text text-[#FF00FF] opacity-70 text-sm blink">
                {">>>"}
              </div>
            )}
            {/* Arrow separator (only between items on mobile) */}
            {i < STEPS.length - 1 && (
              <div className="flex lg:hidden items-center justify-center my-4 pixel-text text-[#FF00FF] opacity-70 text-sm blink rotate-90">
                {">>>"}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
