import { motion } from 'framer-motion';
import { Calendar, MapPin, Globe } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { defaultViewport, fadeUp } from '../utils/motion';
import babelLogo from '../assets/babel_icon.webp';
import artebitLogo from '../assets/artebit_icon.webp';
import multiserviceLogo from '../assets/sc_multiservice_icon.webp';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const COMPANY_LOGOS: Record<string, { src: string }> = {
  babel: { src: babelLogo },
  artebit: { src: artebitLogo },
  multiservice: { src: multiserviceLogo },
};

export function ExperienceSection() {
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].experience;

  return (
    <section id="experiencia" className="py-24 md:py-36 border-t border-zinc-800/80 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              {t.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Apple-style ScrollStack Timeline */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={48}
          itemStackDistance={24}
          stackPosition="110px"
          itemScale={0.03}
          baseScale={0.92}
          dimAmount={0.14}
          tiltAmount={1.2}
          holdDistance={90}
          smoothScroll={false}
          className="w-full"
        >
          {data.experiences.map((exp, idx) => {
            const logo = COMPANY_LOGOS[exp.id];

            return (
              <ScrollStackItem
                key={exp.id}
                itemClassName="rounded-3xl border border-zinc-800/90 bg-zinc-900/95 backdrop-blur-xl hover:border-zinc-700/80 transition-colors duration-300 p-6 sm:p-8 shadow-2xl shadow-black/70"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  {/* Left block: Logo + Header info */}
                  <div className="flex items-start gap-4">
                    {/* Company Logo Plate */}
                    {logo && (
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-zinc-700/50 shadow-sm overflow-hidden transition-all duration-300 group-hover:border-zinc-500 group-hover:shadow-lg">
                        <img
                          src={logo.src}
                          alt={`${exp.company} Logo`}
                          className="w-full h-full object-contain transition-all duration-300 ease-out group-hover:scale-105"
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
                            {language === 'es' ? 'Erasmus+ Brescia, Italia' : 'Erasmus+ Brescia, Italy'}
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

                  {/* Badge & Index */}
                  <div className="flex items-center gap-2 self-start">
                    <span className="px-3 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-xs border border-zinc-700/60">
                      {exp.badge}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 select-none">
                      0{idx + 1}
                    </span>
                  </div>
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
                  <span className="text-xs font-mono text-zinc-500 mr-2">
                    {language === 'es' ? 'Tecnologías:' : 'Technologies:'}
                  </span>
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
