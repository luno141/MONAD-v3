import { demoStats } from "@/src/config/demoStats";

export function ArcadeCabinet() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto group">
      {/* Outer monitor casing */}
      <div className="bg-[#111] p-4 pb-8 rounded-t-3xl border-2 border-[#222] shadow-[inset_0_5px_20px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.9)]">
        
        {/* Screen Bezel */}
        <div className="bg-black p-2 border-2 border-slate-800 rounded-sm relative shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
          {/* CRT Screen Area */}
          <div className="relative w-full aspect-[16/10] bg-[#000508] border border-[#00FFFF] neon-cyan overflow-hidden rounded-none">
            
            {/* Gameplay Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center text-[#00FFFF] border border-[#00FFFF44] m-2">
              <span className="pixel-text text-xl blink tracking-widest">[ GAME FOOTAGE ]</span>
            </div>

            {/* Scanlines CSS overlay */}
            <div className="scanlines"></div>

            {/* Additional CRT flicker/vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
          </div>
        </div>

        {/* Stats Bar at bottom of screen */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-10 text-xs sm:text-sm">
          <div className="font-mono text-[#FFB800] pixel-text z-10 drop-shadow-[0_0_5px_rgba(255,184,0,0.5)]">
            SCORE:{demoStats.score}
          </div>
          <div className="font-mono text-[#FFB800] pixel-text z-10 drop-shadow-[0_0_5px_rgba(255,184,0,0.5)]">
            FLR:{demoStats.floor}
          </div>
          <div className="font-mono text-[#FFB800] pixel-text z-10 drop-shadow-[0_0_5px_rgba(255,184,0,0.5)] hidden sm:block">
            RUNS:{demoStats.runs}
          </div>
        </div>

      </div>

      {/* Stand/Cabinet base decor */}
      <div className="h-6 mx-8 bg-[#1a1a2e] border-x border-[#333] border-b border-[#222]"></div>
      <div className="h-2 mx-12 bg-[#00FFFF] shadow-[0_5px_15px_rgba(0,255,255,0.4)] opacity-50"></div>
    </div>
  );
}
