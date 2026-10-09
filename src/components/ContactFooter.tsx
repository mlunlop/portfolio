import { useState } from 'react';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(PORTFOLIO_DATA.personal.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer id="contacto" className="border-t border-zinc-800 bg-zinc-950 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Banner */}
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 sm:p-12 mb-16 relative overflow-hidden">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-tech-dots opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>INICIAR CONTACTO DIRECTO</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-tight mb-4">
              ¿Hablamos?
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-body leading-relaxed mb-8">
              Sin formularios propensos a spam. Haz clic en el botón para copiar mi correo personal al portapapeles o escríbeme directamente a través de LinkedIn.
            </p>

            {/* Big Interactive Email Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleCopy}
                className="group flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-orange-500/10 active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-zinc-700" />
                  <span className="font-mono">{PORTFOLIO_DATA.personal.email}</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-zinc-900 text-zinc-100 font-mono text-xs flex items-center gap-1.5">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </div>
              </button>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>Conectar en LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Mario Luna López</span>
            <span>•</span>
            <span>Granada, España</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <KaggleIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kaggle</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
