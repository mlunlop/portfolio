import { useState } from 'react';
import { Copy, Check, Mail, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';
import { ContactForm } from './ContactForm';

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-Column Contact Block */}
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-10 lg:p-12 mb-16 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-tech-dots opacity-25 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Direct details & Quick copy (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>INICIAR CONTACTO DIRECTO</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-[0.95]">
                  ¿Hablamos?
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 font-body leading-relaxed">
                  ¿Tienes una propuesta laboral, proyecto de Machine Learning, pipeline de datos o desarrollo frontend? Envíame un mensaje o escríbeme directamente a mi correo personal.
                </p>
              </div>

              {/* Quick Copy Email Card */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-orange-400" />
                    <span>CORREO DIRECTO</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Resp. &lt; 24h</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <span className="font-mono text-xs sm:text-sm text-zinc-200 select-all truncate">
                    {PORTFOLIO_DATA.personal.email}
                  </span>

                  <button
                    onClick={handleCopy}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold font-body transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                    title="Copiar email al portapapeles"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-700" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Social Links */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  Redes profesionales
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <KaggleIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kaggle</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>
                </div>
              </div>

              {/* Telemetry pill */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Granada, España</span>
              </div>
            </div>

            {/* Right Column: Interactive Anti-Spam Contact Form (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800">
                <span className="font-mono text-xs text-orange-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  FORMULARIO DE CONTACTO DIRECTO
                </span>
              </div>

              <ContactForm />
            </div>

          </div>
        </div>

        {/* Bottom Metadata Bar */}
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
