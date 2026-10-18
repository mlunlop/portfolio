import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';
import { defaultViewport, easeOutExpo } from '../utils/motion';

const CURRENT_YEAR = new Date().getFullYear();

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].contact;

  const handleCopy = async () => {
    const success = await copyToClipboard(data.personal.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer id="contacto" className="border-t border-zinc-800 bg-zinc-950 pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-Column Contact Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-10 lg:p-12 mb-16 relative overflow-hidden"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-tech-dots opacity-25 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Direct details & Context (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold">
                <span>{t.badge}</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-[0.95]">
                  {t.title}
                </h2>
                <p className="text-base text-zinc-400 font-body leading-relaxed max-w-lg">
                  {t.subtitle}
                </p>
              </div>

              {/* Direct Social Links */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  {t.socialHeading}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <motion.a
                    href={data.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                  </motion.a>

                  <motion.a
                    href={data.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-zinc-300" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                  </motion.a>

                  <motion.a
                    href={data.personal.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    <KaggleIcon className="w-4 h-4 text-cyan-400" />
                    <span>Kaggle</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                  </motion.a>
                </div>
              </div>

              {/* Telemetry pill */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-3 border-t border-zinc-800/80">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{t.location}</span>
              </div>
            </div>

            {/* Right Column: Direct Email Action Center (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <span className="font-mono text-xs text-orange-400 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-orange-400" />
                    {t.channelBadge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{t.responseBadge}</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-zinc-300 font-body leading-relaxed">
                    {t.directEmailText}
                  </p>

                  {/* Primary mail button */}
                  <motion.a
                    href={`mailto:${data.personal.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-sm transition-colors duration-200 shadow-xl shadow-orange-500/20 cursor-pointer font-body group"
                  >
                    <Mail className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
                    <span>{t.sendEmailBtn}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>
                </div>
              </div>

              {/* Secondary action: copy email */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="font-mono text-zinc-400 select-all truncate">
                  {data.personal.email}
                </span>

                <motion.button
                  onClick={handleCopy}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 font-mono transition-colors cursor-pointer py-1"
                  title={t.copyAddress}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t.copiedAddress}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyAddress}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© {CURRENT_YEAR} {data.personal.name}</span>
            <span>•</span>
            <span>{t.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <KaggleIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kaggle</span>
            </a>
            <a
              href={data.personal.linkedin}
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
