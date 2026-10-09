import { Calendar, MapPin, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import babelLogo from '../assets/babel_icon.webp';
import artebitLogo from '../assets/artebit_icon.webp';
import multiserviceLogo from '../assets/sc_multiservice_icon.webp';

const COMPANY_LOGOS: Record<string, { src: string; alt: string }> = {
  babel: { src: babelLogo, alt: 'Logo de Babel' },
  artebit: { src: artebitLogo, alt: 'Logo de Centro ArteBit' },
  multiservice: { src: multiserviceLogo, alt: 'Logo de SC Multiservice' },
};

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 border-t border-zinc-800/80 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>TRAYECTORIA PROFESIONAL // PRODUCCIÓN REAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Experiencia Laboral
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            De la resolución de incidencias críticas en aplicaciones móviles al despliegue de chatbots y diagnóstico electrónico de hardware.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experiences.map((exp) => {
            const logo = COMPANY_LOGOS[exp.id];

            return (
              <div
                key={exp.id}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700/80 transition-all duration-300 p-6 sm:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  {/* Left block: Logo + Header info */}
                  <div className="flex items-start gap-4">
                    {/* Company Logo Plate (Disabled grayscale -> Vibrant on hover) */}
                    {logo && (
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/90 p-2 flex items-center justify-center shrink-0 border border-zinc-700/50 shadow-sm overflow-hidden transition-all duration-300 group-hover:bg-white group-hover:border-zinc-500 group-hover:shadow-lg">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="w-full h-full object-contain filter grayscale opacity-45 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <h3 className="text-lg sm:text-xl font-normal text-zinc-100 font-display tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-orange-400 font-mono text-xs font-semibold">
                          {exp.company}
                        </span>
                        {exp.id === 'multiservice' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/60 border border-sky-800/60 text-sky-400 font-mono text-[11px]">
                            <Globe className="w-3 h-3" />
                            Erasmus+ Brescia, Italia
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="self-start px-3 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-xs border border-zinc-700/60">
                    {exp.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 mb-6 font-normal">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-6 text-sm text-zinc-400">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-orange-400 mt-1 select-none">▪</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-800/70">
                  <span className="text-xs font-mono text-zinc-500 mr-2">Tecnologías:</span>
                  {exp.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
