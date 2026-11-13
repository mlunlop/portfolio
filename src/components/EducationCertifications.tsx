import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Languages, FileText, ChevronRight } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { defaultViewport, fadeUp, easeOutExpo } from '../utils/motion';
import { PdfViewerModal } from './PdfViewerModal';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import cambridgeLogo from '../assets/cambridge-logo.webp';
import appleLogo from '../assets/apple-logo.webp';
import googleLogo from '../assets/google-logo.webp';
import openwebinarsLogo from '../assets/openwebinars-logo.webp';

const CERTIFICATION_LOGOS: Record<string, { src: string }> = {
  cambridge: { src: cambridgeLogo },
  apple: { src: appleLogo },
  'google-mobile': { src: googleLogo },
  'nginx-linux': { src: openwebinarsLogo },
};

export function EducationCertifications() {
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].education;

  const [activePdf, setActivePdf] = useState<{
    isOpen: boolean;
    title: string;
    pdfUrl: string;
    downloadName?: string;
    subtitle?: string;
  } | null>(null);

  const openB2Pdf = () => {
    setActivePdf({
      isOpen: true,
      title: t.b2Modal.title,
      pdfUrl: '/docs/B2%20Certificado%20Mario%20Luna.pdf',
      downloadName: t.b2Modal.downloadName,
      subtitle: t.b2Modal.subtitle,
    });
  };

  return (
    <section id="certificaciones" className="py-24 md:py-36 border-t border-zinc-800/80 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Focused on Academic Formation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="font-mono text-xs text-orange-400 mb-2">
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

        {/* 1. FORMACIÓN ACADÉMICA (FULL WIDTH SCROLLSTACK) */}
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
          className="w-full mb-20"
        >
          {data.education.map((edu, idx) => {
            const isCurrent = edu.isCurrent ?? idx === 0;

            return (
              <ScrollStackItem key={edu.id} itemClassName="p-6 sm:p-9 md:p-10 overflow-hidden">
                <article>
                  {/* Corner tag for degrees in progress */}
                  {isCurrent && (
                    <span className="absolute top-0 right-0 inline-flex items-center h-8 pl-4 pr-5 rounded-bl-2xl bg-orange-500/[0.12] text-orange-300 font-mono text-[11px] font-medium tracking-wide shadow-[inset_1px_-1px_0_rgba(251,146,60,0.22)] backdrop-blur-sm">
                      {language === 'es' ? 'En curso' : 'In progress'}
                    </span>
                  )}

                  {/* Header: degree — period */}
                  <header>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-8 gap-y-1">
                      <h3 className="font-sans text-[19px] sm:text-[22px] font-semibold leading-snug tracking-[-0.022em] text-label max-w-2xl">
                        {edu.degree}
                      </h3>
                      <span className="text-[13px] sm:text-sm text-label-tertiary tabular-nums whitespace-nowrap shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[15px] text-label-secondary">
                      {edu.institution}
                      <span className="text-label-tertiary"> · </span>
                      {edu.badge}
                    </p>
                  </header>

                  {/* Details */}
                  <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] sm:text-base leading-relaxed text-label-secondary">
                    {edu.details}
                  </p>

                  {edu.url && (
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-5 inline-flex items-center gap-0.5 text-sm font-medium text-label-secondary hover:text-label transition-colors"
                    >
                      {language === 'es' ? 'Más información' : 'Learn more'}
                      <ChevronRight className="w-4 h-4 text-orange-400 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
                    </a>
                  )}
                </article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>

        {/* 2. CERTIFICACIONES & CREDENCIALES */}
        <div className="pt-12 border-t border-zinc-800/80">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight">
                {t.certTitle}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-body max-w-xs">
              {t.certSubtitle}
            </p>
          </motion.div>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, idx) => {
              const logo = CERTIFICATION_LOGOS[cert.id];

              return (
                <motion.article
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: easeOutExpo }}
                  className="surface-card p-6 sm:p-7 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    {logo && (
                      <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_0_0.5px_rgba(255,255,255,0.12)]">
                        <img
                          src={logo.src}
                          alt={`${cert.issuer} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {cert.date && (
                      <span className="text-[13px] text-label-tertiary tabular-nums whitespace-nowrap">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-5 font-sans text-[17px] font-semibold leading-snug tracking-[-0.016em] text-label">
                    {cert.name}
                  </h4>
                  <p className="mt-0.5 text-sm text-label-secondary">{cert.issuer}</p>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-label-secondary">
                    {cert.highlight}
                  </p>

                  <footer className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                    <div className="flex items-center gap-4">
                      {cert.pdfUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setActivePdf({
                              isOpen: true,
                              title: `${cert.name} — ${cert.issuer}`,
                              pdfUrl: cert.pdfUrl!,
                              downloadName: t.b2Modal.downloadName,
                              subtitle: t.b2Modal.subtitle,
                            })
                          }
                          className="glass glass-pill cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                          {language === 'es' ? 'Ver documento' : 'View document'}
                        </button>
                      )}

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-[13px] font-medium text-label-secondary hover:text-label transition-colors"
                        >
                          {language === 'es' ? 'Credencial' : 'Credential'}
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}

                      {!cert.pdfUrl && !cert.url && (
                        <span className="text-[13px] text-label-tertiary">
                          {language === 'es' ? 'Validación de fabricante · Brescia, IT' : 'Manufacturer validation · Brescia, IT'}
                        </span>
                      )}
                    </div>

                    <span className="text-[13px] text-label-tertiary">{cert.badge}</span>
                  </footer>
                </motion.article>
              );
            })}
          </div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
            className="surface-card mt-4 px-6 py-5 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 text-[15px] font-medium text-label">
              <Languages className="w-4 h-4 text-label-tertiary" aria-hidden="true" />
              {language === 'es' ? 'Idiomas' : 'Languages'}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-label-secondary">
              <span>
                {language === 'es' ? 'Español' : 'Spanish'}{' '}
                <span className="text-label">{language === 'es' ? 'Nativo (C2)' : 'Native (C2)'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                {language === 'es' ? 'Inglés' : 'English'}{' '}
                <button
                  type="button"
                  onClick={openB2Pdf}
                  className="inline-flex items-center gap-1 text-label hover:text-orange-400 transition-colors cursor-pointer"
                  title={language === 'es' ? 'Ver certificado oficial B2 en PDF' : 'View official B2 certificate in PDF'}
                >
                  B2 First · Cambridge 162
                  <FileText className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                </button>
              </span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Reusable Document / PDF Viewer Modal */}
      {activePdf && (
        <PdfViewerModal
          isOpen={activePdf.isOpen}
          onClose={() => setActivePdf(null)}
          title={activePdf.title}
          pdfUrl={activePdf.pdfUrl}
          downloadName={activePdf.downloadName}
          subtitle={activePdf.subtitle}
        />
      )}
    </section>
  );
}
