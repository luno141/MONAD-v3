export function Footer() {
  return (
    <footer className="w-full py-12 px-4 mt-20 border-t border-slate-800/60 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-sans text-slate-400">
          Built for <strong className="text-fuchsia-400">Monad Blitz New Delhi 2026</strong>
        </p>
        <div className="flex items-center gap-6 font-mono text-sm uppercase tracking-widest">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://monad.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-sky-400 transition-colors"
          >
            Monad
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
