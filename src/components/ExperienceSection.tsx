import { motion } from 'framer-motion';
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
          {data.experiences.map((exp) => {
            const logo = COMPANY_LOGOS[exp.id];

            return (
              <ScrollStackItem key={exp.id} itemClassName="p-6 sm:p-9 md:p-10">
                <article className="relative">
                  {/* Header: logo · role · company — period */}
                  <header className="flex items-start gap-4 sm:gap-5">
                    {logo && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_0_0.5px_rgba(255,255,255,0.12)]">
                        <img
                          src={logo.src}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-1">
                        <h3 className="font-sans text-[19px] sm:text-[22px] font-semibold leading-snug tracking-[-0.022em] text-label">
                          {exp.role}
                        </h3>
                        <span className="text-[13px] sm:text-sm text-label-tertiary tabular-nums whitespace-nowrap shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-1 text-[15px] text-label-secondary">
                        <span className="font-medium text-orange-400">{exp.company}</span>
                        <span className="text-label-tertiary"> · </span>
                        {exp.location}
                      </p>
                    </div>
                  </header>

                  {/* Summary */}
                  <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-[17px] leading-relaxed tracking-[-0.01em] text-label">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-5 max-w-3xl space-y-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-label-secondary">
                        <span aria-hidden="true" className="mt-[0.68em] h-1 w-1 shrink-0 rounded-full bg-label-tertiary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer: technologies + area */}
                  <footer className="mt-7 sm:mt-8 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-8 gap-y-1.5">
                    <p className="text-[13px] leading-relaxed text-label-tertiary">
                      <span className="sr-only">{language === 'es' ? 'Tecnologías: ' : 'Technologies: '}</span>
                      {exp.technologies.join('  ·  ')}
                    </p>
                    <span className="text-[13px] text-label-secondary whitespace-nowrap shrink-0">
                      {exp.badge}
                    </span>
                  </footer>
                </article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
