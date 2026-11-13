import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';
import { defaultViewport, fadeUp } from '../utils/motion';

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

  const socials = [
    { label: 'LinkedIn', href: data.personal.linkedin, Icon: LinkedinIcon },
    { label: 'GitHub', href: data.personal.github, Icon: GithubIcon },
    { label: 'Kaggle', href: data.personal.kaggle, Icon: KaggleIcon },
  ];

  return (
    <footer id="contacto" className="border-t border-zinc-800/80 bg-zinc-950 pt-28 pb-10 md:pt-40 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Call to action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-xs text-orange-400 mb-3">{t.badge}</p>
          <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-zinc-100 font-display uppercase leading-[0.95]">
            {t.title}
          </h2>
          <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-label-secondary">
            {t.subtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:${data.personal.email}`}
              className="btn-primary h-12 px-6 text-[15px] bg-orange-500 hover:bg-orange-400 text-zinc-950"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.sendEmailBtn}
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="glass glass-pill h-12 px-5 text-[15px] cursor-pointer"
              title={t.copyAddress}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  {t.copiedAddress}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-label-secondary" aria-hidden="true" />
                  {data.personal.email}
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-[13px] text-label-tertiary">
            {t.responseBadge}
            <span> · </span>
            {t.location}
          </p>

          {/* Professional networks */}
          <nav aria-label={t.socialHeading} className="mt-10 flex items-center justify-center gap-7">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-label-secondary hover:text-label transition-colors"
              >
                <Icon className="w-4 h-4 text-label-tertiary group-hover:text-label transition-colors" />
                {label}
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-orange-400 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Fine print */}
        <div className="mt-24 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-label-tertiary">
          <span>© {CURRENT_YEAR} {data.personal.name}. {t.rights}.</span>
          <span>{t.location}</span>
        </div>

      </div>
    </footer>
  );
}
