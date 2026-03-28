'use client';

export function ArcadeFooter() {
  return (
    <footer className="w-full bg-[#050510] border-t-2 border-[#00FFFF33] py-12 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚔️</span>
              <span className="pixel-text text-sm text-[#00FFFF]">KHAN FLICT</span>
            </div>
            <p className="font-mono text-xs text-slate-500 max-w-xs text-center md:text-left leading-relaxed">
              ON-CHAIN DUNGEON ARPG BUILT ON MONAD. 
              MINT. LOOT. RAID. REPEAT.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            <div className="flex flex-col gap-4">
              <span className="pixel-text text-[10px] text-[#FF00FF]">GAME</span>
              <a href="/play" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">DUNGEON</a>
              <a href="/artifacts" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">ARTIFACTS</a>
              <a href="/leaderboard" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">HALL OF FAME</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="pixel-text text-[10px] text-[#FF00FF]">SOCIAL</span>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">X / TWITTER</a>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">DISCORD</a>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">WARPCAST</a>
            </div>
            <div className="hidden sm:flex flex-col gap-4">
              <span className="pixel-text text-[10px] text-[#FF00FF]">TECH</span>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">TESTNET</a>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">DOCS</a>
              <a href="#" className="font-mono text-xs hover:text-[#00FFFF] transition-colors">STATUS</a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#00FFFF11] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-slate-600">
            © 2026 KHAN FLICT LABS. ALL PIXELS RESERVED.
          </span>
          <div className="flex items-center gap-4 text-slate-600 font-mono text-[10px]">
             <span>v1.0.4-BETA</span>
             <span className="h-1 w-1 bg-[#FF00FF] rounded-full blink"></span>
          </div>
        </div>
      </div>
      
      {/* Footer background decor */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00FFFF] opacity-[0.02] blur-[80px] -mb-32 -mr-32 pointer-events-none"></div>
    </footer>
  );
}
