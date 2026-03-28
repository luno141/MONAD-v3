'use client';

import Link from 'next/link';

const DUMMY_LEADERS = [
  { rank: "01", name: "BIT_KNIGHT", score: "99400", floor: "12" },
  { rank: "02", name: "MONAD_MAXI", score: "82150", floor: "09" },
  { rank: "03", name: "CYBER_X", score: "75000", floor: "08" },
];

export function LeaderboardPreview() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 relative z-10">
      <div className="border-4 border-[#FF00FF] bg-black p-1 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
        <div className="border border-[#FF00FF] p-6 sm:p-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="pixel-text text-xl md:text-2xl text-[#FF00FF] drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] text-center md:text-left">
              [ TOP DUNGEONEERS ]
            </h2>
            <Link href="/leaderboard" className="pixel-text text-[10px] text-[#00FFFF] hover:underline hover:text-white transition-colors">
              VIEW FULL BOARD &gt;
            </Link>
          </div>

          <div className="space-y-4 font-mono uppercase tracking-[0.1em]">
            {/* Header */}
            <div className="grid grid-cols-4 pb-4 border-b border-[#FF00FF33] text-[10px] sm:text-xs text-[#00FFFF] opacity-60">
              <span>RANK</span>
              <span>NAME</span>
              <span className="text-right">FLOOR</span>
              <span className="text-right">SCORE</span>
            </div>

            {/* Rows */}
            {DUMMY_LEADERS.map((leader) => (
              <div 
                key={leader.rank} 
                className="grid grid-cols-4 py-4 border-b border-[#FF00FF11] text-xs sm:text-sm hover:bg-[#FF00FF05] transition-colors"
              >
                <span className="text-[#FFB800] pixel-text text-[10px]">{leader.rank}</span>
                <span className="text-white truncate pr-2">{leader.name}</span>
                <span className="text-right text-[#00FFFF]">{leader.floor}</span>
                <span className="text-right text-[#FFB800]">{leader.score}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-[#FF00FF11] border border-dashed border-[#FF00FF44] text-center">
            <p className="font-mono text-[10px] sm:text-xs text-[#FF00FF]">
              NEW RUNS RECORDED EVERY 60 SECONDS ON MONAD
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
