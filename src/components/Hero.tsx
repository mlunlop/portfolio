import { useState } from 'react';
import { Copy, Check, ArrowDown, Database, Cpu, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon } from './Icons';
import profilePhoto from '../assets/profile.webp';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(PORTFOLIO_DATA.personal.email);
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
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="tracking-wider">SYS_ID: MARIO_LUNA // GRANADA [ES] (37.1773° N, 3.5986° W)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-zinc-400">LPIC-1 #5.0 VERIFIED</span>
            <span className="hidden sm:inline text-zinc-500">APPLE ATLAS TECH</span>
            <span className="text-orange-400 font-semibold">// 2026</span>
          </div>
        </div>

        {/* Main 2-Column Hero: Typography & Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12">
          
          {/* Left Column: Massive Editorial Typography & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>DATA LIFECYCLE & MACHINE LEARNING</span>
            </div>

            {/* Massive Heading with Special Gothic Expanded One */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-[0.9] select-none">
                Mario Luna
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-display uppercase text-zinc-400 tracking-tight">
                Software & ML Engineer
              </p>
            </div>

            {/* Bio with Inter body font */}
            <p className="text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-xl font-normal">
              Especialista en el ciclo de vida del dato: diseño de arquitecturas{' '}
              <strong className="text-zinc-100 font-semibold">ETL, limpieza rigurosa, validación estadística y particionamiento</strong>{' '}
              para alimentar modelos de Machine Learning. Con base sólida en desarrollo frontend de producción ({' '}
              <span className="text-orange-400 font-medium">Babel</span>) y certificación oficial de sistemas ({' '}
              <span className="text-orange-400 font-medium">LPIC-1 Linux</span>).
            </p>

            {/* Tactile Stickers/Badges (Inspiración Ref. 4) */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-medium transform -rotate-1 hover:rotate-0 transition-transform">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                ETL & PARQUET
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-medium transform rotate-1 hover:rotate-0 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                LPIC-1 LINUX
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs font-medium transform -rotate-1 hover:rotate-0 transition-transform">
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                APPLE ATLAS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs font-medium transform rotate-2 hover:rotate-0 transition-transform">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                REACT & TS
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
                    <span>¡Email copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-950 stroke-[2.5] group-hover:rotate-6 transition-transform" />
                    <span>Copiar email</span>
                  </>
                )}
              </button>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors font-body"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium transition-colors font-body"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>GitHub</span>
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

                  {/* Watermark label inspired by Swiss poster Ref. 2 & 3 */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>INGENIERO IT</span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-orange-400">
                    ML.DEV
                  </div>

                  {/* Mario's Portrait */}
                  <img
                    src={profilePhoto}
                    alt="Mario Luna López"
                    className="relative z-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Bottom gradient shadow for seamless integration */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none z-10" />

                  {/* Bottom caption plate */}
                  <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 text-xs">
                    <span className="font-display text-[11px] uppercase tracking-wider text-zinc-200">
                      Mario Luna López
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      Granada, ES
                    </span>
                  </div>
                </div>

                {/* Overlapping Floating Stamp (Inspiración Ref. 4) */}
                <div className="absolute -bottom-4 -left-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500 text-zinc-950 font-mono text-xs font-bold shadow-xl shadow-orange-500/30 transform -rotate-3 hover:rotate-0 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>DATA & ML PIPELINES</span>
                </div>

                <div className="absolute -top-3 -right-3 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-950 text-zinc-200 border border-zinc-700 font-mono text-[11px] shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>AVAILABLE 2026</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll anchor */}
        <div className="flex justify-center pt-4">
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
          >
            <span>Explorar Pipeline de Datos</span>
            <ArrowDown className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
