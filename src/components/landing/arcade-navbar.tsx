'use client';

import Link from 'next/link';

export function ArcadeNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#050510] border-b border-[#00FFFF33] shadow-[0_0_15px_rgba(0,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <span className="text-xl -mt-1">⚔️</span>
            <span className="pixel-text text-[10px] sm:text-[12px] text-[#00FFFF] drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
              KHAN FLICT
            </span>
          </div>

          {/* CENTER: Nav Links (Desktop Only) */}
          <div className="hidden md:flex space-x-8">
            {['DUNGEON', 'RELICS', 'LEADERBOARD', 'FORGE'].map((item) => (
              <Link 
                key={item} 
                href={item === 'DUNGEON' ? '/play' : `/${item.toLowerCase()}`}
                className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#eef3ff] hover:text-[#00FFFF] hover:underline hover:underline-offset-4 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* RIGHT: Insert Coin Wallet Button */}
          <div className="flex items-center">
            <button 
              className="font-mono pixel-text text-[10px] sm:text-[12px] border-2 border-[#00FFFF] text-[#00FFFF] px-4 py-2 bg-transparent shadow-[0_0_10px_rgba(0,255,255,0.5),inset_0_0_10px_rgba(0,255,255,0.2)] hover:bg-[#00FFFF22] hover:-translate-y-px transition-all uppercase"
              onClick={() => alert("Connecting Wallet...")}
            >
              [ INSERT COIN ]
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
