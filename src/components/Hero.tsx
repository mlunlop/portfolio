import { useState } from 'react';
import { Copy, Check, ArrowDown, Database, Cpu, ShieldCheck, Layers } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';
import profilePhoto from '../assets/profile.webp';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].hero;

  const handleCopy = async () => {
    const success = await copyToClipboard(data.personal.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Blueprint radial gradient lighting */}
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/75 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500 mb-8 border-b border-zinc-800/80 pb-3">
        </div>

        {/* Main 2-Column Hero: Typography & Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12">
          
          {/* Left Column: Massive Editorial Typography & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span>{t.status}</span>
            </div>

            {/* Massive Heading with Special Gothic Expanded One */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-[0.9] select-none">
                {data.personal.name}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-display uppercase text-zinc-400 tracking-tight">
                {t.role}
              </p>
            </div>

            {/* Bio with Inter body font */}
            <p className="text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-xl font-normal">
              {t.bioPart1}{' '}
              <strong className="text-zinc-100 font-semibold">
                {t.bioHighlight}
              </strong>
              {t.bioPart2}
            </p>

            {/* Tactile Stickers/Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-medium transform -rotate-1 hover:rotate-0 transition-transform">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                {t.stickers.etl}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-medium transform rotate-1 hover:rotate-0 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.stickers.linux}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs font-medium transform rotate-1 hover:rotate-0 transition-transform">
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                {t.stickers.apple}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs font-medium transform -rotate-1 hover:rotate-0 transition-transform">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                {t.stickers.react}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Copy Email CTA */}
              <button
                onClick={handleCopy}
                className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-xl shadow-orange-500/20 active:scale-95 cursor-pointer font-body"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
                    <span>{t.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-950 stroke-[2.5] group-hover:rotate-6 transition-transform" />
                    <span>{t.copyEmail}</span>
                  </>
                )}
              </button>

              {/* LinkedIn */}
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors font-body"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>{t.social.linkedin}</span>
              </a>

              {/* GitHub */}
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors font-body"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>{t.social.github}</span>
              </a>

              {/* Kaggle */}
              <a
                href={data.personal.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors font-body"
              >
                <KaggleIcon className="w-4 h-4 text-cyan-400" />
                <span>{t.social.kaggle}</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Craft Editorial Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer architectural frame with hairline border */}
              <div className="relative p-3 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl shadow-black/80 backdrop-blur-sm group">
                
                {/* Corner Crosshair CAD markers */}
                <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600 select-none">+</span>
                <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600 select-none">+</span>
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600 select-none">+</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600 select-none">+</span>

                {/* Inner Canvas for Photo: Light plate for seamless blending with photo's background */}
                <div className="relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/80 aspect-[3/4] flex items-end justify-center">
                  
                  {/* Subtle technical background grid inside the photo plate */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(#18181b 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Mario's Portrait */}
                  <img
                    src={profilePhoto}
                    alt={data.personal.name}
                    className="relative z-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />

                  {/* Bottom gradient shadow for seamless integration */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none z-10" />

                  {/* Bottom caption plate */}
                  <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 text-xs">
                    <span className="font-display text-[11px] uppercase tracking-wider text-zinc-200">
                      {data.personal.name}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {language === 'es' ? 'Granada, ES' : 'Granada, Spain'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll anchor */}
        <div className="flex justify-center pt-4">
          <a
            href="#experiencia"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
          >
            <span>{language === 'es' ? 'Explorar Trayectoria' : 'Explore Career'}</span>
            <ArrowDown className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
