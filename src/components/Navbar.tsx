import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { copyToClipboard } from '../utils/feedback';

export function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(PORTFOLIO_DATA.personal.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 shadow-2xl shadow-black/50 text-sm max-w-4xl w-full">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors group"
        >
          <span className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-mono font-bold text-xs text-orange-400 group-hover:border-orange-500/50 transition-colors">
            ML
          </span>
          <span className="font-medium tracking-tight hidden sm:inline text-xs text-zinc-300">
            mario.luna
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
          <a href="#pipeline" className="hover:text-zinc-100 transition-colors">
            Data Lifecycle
          </a>
          <a href="#experiencia" className="hover:text-zinc-100 transition-colors">
            Experiencia
          </a>
          <a href="#certificaciones" className="hover:text-zinc-100 transition-colors">
            Certificaciones
          </a>
          <a href="#stack" className="hover:text-zinc-100 transition-colors">
            Stack
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for roles</span>
          </div>

          {/* Copy Email CTA */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95 transition-all font-medium text-xs shadow-sm cursor-pointer"
            title="Copiar email al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-600" />
                <span>Copiar Email</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
