import { motion } from 'framer-motion';
import { Database, Layout, TerminalSquare } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { defaultViewport, fadeUp, easeOutExpo } from '../utils/motion';

export function TechStack() {
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].techStack;

  const getIcon = (category: string) => {
    if (category.includes('Data')) return Database;
    if (category.includes('Frontend')) return Layout;
    return TerminalSquare;
  };

  return (
    <section id="stack" className="py-20 border-t border-zinc-800/80 bg-zinc-950/60">
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
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
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

        {/* Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.skills.map((category, idx) => {
            const Icon = getIcon(category.category);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: easeOutExpo }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-orange-400 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-normal text-zinc-100 font-display uppercase mb-4">
                    {category.category}
                  </h3>

                  <ul className="space-y-2">
                    {category.items.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-center gap-2 text-xs font-mono text-zinc-300 py-1.5 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
