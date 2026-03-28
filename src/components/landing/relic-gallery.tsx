'use client';

const RELICS = [
  { name: "VOID BLADE", rarity: "EPIC", img: "⚔️", price: "0.2 MON" },
  { name: "MONAD SHIELD", rarity: "RARE", img: "🛡️", price: "0.1 MON" },
  { name: "ARCANE RING", rarity: "LEGENDARY", img: "💍", price: "1.5 MON" },
  { name: "CRIMSON CAPE", rarity: "COMMON", img: "🧣", price: "0.02 MON" },
];

export function RelicGallery() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10">
      <div className="text-center mb-16">
        <h2 className="pixel-text text-2xl text-[#00FFFF] mb-4">EXTRACTED ARTIFACTS</h2>
        <div className="h-1 w-24 bg-[#FF00FF] mx-auto shadow-[0_0_10px_rgba(255,0,255,1)]"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {RELICS.map((relic) => (
          <div 
            key={relic.name}
            className="group relative bg-[#0a0a1a] border-2 border-[#00FFFF] p-6 hover:scale-105 transition-transform duration-300"
          >
            {/* Scanline overlay for cards */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
            
            <div className="h-32 flex items-center justify-center text-5xl mb-6 bg-black border border-[#00FFFF33] shadow-inner group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
              {relic.img}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="pixel-text text-[10px] text-white leading-tight">{relic.name}</span>
                <span className={`font-mono text-[8px] px-1 py-0.5 border ${
                  relic.rarity === 'LEGENDARY' ? 'border-[#FFB800] text-[#FFB800]' : 
                  relic.rarity === 'EPIC' ? 'border-[#FF00FF] text-[#FF00FF]' : 'border-[#00FFFF] text-[#00FFFF]'
                }`}>
                  {relic.rarity}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-mono text-xs text-[#FFB800]">{relic.price}</span>
                <button className="pixel-text text-[8px] bg-transparent text-white border border-white px-2 py-1 hover:bg-white hover:text-black transition-colors">
                  BUY
                </button>
              </div>
            </div>

            {/* Corner decors */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00FFFF]"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00FFFF]"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
