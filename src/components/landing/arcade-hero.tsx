import Link from 'next/link';
import { ArcadeCabinet } from './arcade-cabinet';

export function ArcadeHero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center pt-8 pb-16 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#00FFFF] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Arcade Cabinet */}
          <div className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <ArcadeCabinet />
          </div>

          {/* Right Column: Hero Text */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
            
            <div className="font-mono text-[#FF00FF] text-sm md:text-base tracking-widest mb-6 font-bold shadow-magenta-text uppercase drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
              // MONAD TESTNET //
            </div>

            <h1 className="pixel-text text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.3] mb-6 drop-shadow-[2px_4px_0px_rgba(0,0,0,1)]">
              <span className="block text-white">DESCEND.</span>
              <span className="block text-[#00FFFF]">LOOT.</span>
              <span className="block bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
                OWN YOUR RELICS
              </span>
              <span className="block bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-transparent bg-clip-text mt-2">
                ON MONAD.<span className="text-white blink inline-block ml-4">█</span>
              </span>
            </h1>

            <p className="font-mono text-[#a0b0d0] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
              Fast 2D dungeon runs. Premium artifacts as ERC-721s. 
              Live relic market. On the fastest EVM chain.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              {/* Primary Button */}
              <Link 
                href="/play"
                className="pixel-text text-center text-xs sm:text-sm bg-[#00FFFF] text-black px-8 py-4 hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                [ ENTER DUNGEON ]
              </Link>
              
              {/* Secondary Button */}
              <Link
                href="/artifacts"
                className="pixel-text text-center text-xs sm:text-sm border-2 border-[#00FFFF] text-[#00FFFF] px-8 py-4 hover:bg-[#00FFFF11] hover:shadow-[0_0_15px_rgba(0,255,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                [ VIEW RELICS ]
              </Link>
            </div>

            <div className="mt-10 font-mono text-xs text-slate-500 opacity-80 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-[#FFB800]">⚡</span> Powered by Monad Testnet · Chain ID 10143
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
