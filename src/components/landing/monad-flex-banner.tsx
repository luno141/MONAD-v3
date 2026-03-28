export function MonadFlexBanner() {
  return (
    <div className="w-full bg-[#FF00FF] text-black overflow-hidden relative z-10 border-y-4 border-[#00FFFF] shadow-[0_0_20px_rgba(255,0,255,0.5)] my-12 rotate-[-1deg] transform-gpu origin-center">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] py-3">
        {/* We repeat the content multiple times to ensure seamless infinite scroll */}
        {[...Array(6)].map((_, i) => (
          <span key={i} className="pixel-text text-sm sm:text-base mx-8 uppercase tracking-widest flex items-center">
            <span className="text-black/80 mr-8">⚙️</span>
            POWERED BY MONAD TESTNET
            <span className="text-black/80 ml-8 text-xl">⚡</span>
            SUB-SECOND FINALITY
            <span className="text-black/80 ml-8 mr-8">⚙️</span>
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
