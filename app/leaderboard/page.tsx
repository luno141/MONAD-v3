'use client';

import { ArcadeNavbar } from "@/src/components/landing/arcade-navbar";
import { ArcadeFooter } from "@/src/components/landing/arcade-footer";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#050510] flex flex-col items-center">
      <ArcadeNavbar />
      <div className="flex-grow flex flex-col items-center justify-center p-24 text-center">
        <h1 className="pixel-text text-3xl text-[#FF00FF] mb-8 animate-pulse shadow-[0_0_15px_rgba(255,0,255,0.4)]">
          // HALL OF FAME //
        </h1>
        <p className="font-mono text-[#00FFFF] border border-dashed border-[#00FFFF44] p-8 max-w-lg">
          [ ACCESSING MONAD MAIN-LEDGER... ]<br/><br/>
          THE STRONGEST WARRIORS ARE BEING RETRIEVED FROM THE BLOCKS. 
          STAY TUNED.
        </p>
      </div>
      <ArcadeFooter />
    </main>
  );
}
