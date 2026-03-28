import Link from "next/link";
import { RELIC_GALLERY } from "@/src/config/demo-stats";

interface RelicGalleryPreviewProps {
  expanded?: boolean;
}

export function RelicGalleryPreview({ expanded = false }: RelicGalleryPreviewProps) {
  const relics = expanded ? RELIC_GALLERY : RELIC_GALLERY.slice(0, 4);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      {!expanded && (
        <h2 className="text-3xl md:text-5xl font-bold uppercase text-center mb-12 tracking-wide [text-shadow:0_0_15px_rgba(255,255,255,0.1)]">
          Relic Gallery
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relics.map((relic) => (
          <div
            key={relic.name}
            className="group relative flex flex-col bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ "--accent": relic.color } as React.CSSProperties}
          >
            {/* Top glow */}
            <div
              className="absolute top-0 inset-x-0 h-1/2 opacity-20 bg-gradient-to-b from-[var(--accent)] to-transparent pointer-events-none group-hover:opacity-40 transition-opacity"
            />
            
            <div className="p-8 flex items-center justify-center border-b border-slate-800/50">
              <span className="text-7xl filter drop-shadow-[0_0_15px_var(--accent)] transition-transform group-hover:scale-110">
                {relic.icon}
              </span>
            </div>
            
            <div className="p-6 flex flex-col items-center text-center flex-grow">
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">{relic.name}</h3>
              <span
                className="text-xs uppercase font-mono tracking-widest font-bold mb-4"
                style={{ color: relic.color }}
              >
                {relic.rarity}
              </span>
              <p className="text-slate-400 font-sans text-sm">{relic.stats}</p>
            </div>

            <div className="p-4 bg-slate-950/50 flex gap-2">
              <Link
                href="/artifacts"
                className="flex-1 text-center py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-white"
              >
                Market
              </Link>
              <a
                href="#"
                className="flex-1 text-center py-2 bg-transparent hover:bg-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-slate-400 border border-slate-700"
              >
                Explorer
              </a>
            </div>
          </div>
        ))}
      </div>

      {!expanded && (
        <div className="flex justify-center mt-12">
          <Link
            href="/artifacts"
            className="px-8 py-3 rounded-full border border-sky-500/50 text-sky-400 font-bold uppercase tracking-widest hover:bg-sky-500/10 transition-colors"
          >
            Open Full Marketplace
          </Link>
        </div>
      )}
    </section>
  );
}
