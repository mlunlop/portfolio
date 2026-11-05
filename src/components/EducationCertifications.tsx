import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Languages, FileText, ChevronRight } from 'lucide-react';
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
              <ScrollStackItem key={edu.id} itemClassName="p-6 sm:p-9 md:p-10">
                <article>
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
                      {isCurrent && (
                        <>
                          <span className="text-label-tertiary"> · </span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-orange-400">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            {language === 'es' ? 'En curso' : 'In progress'}
                          </span>
                        </>
                      )}
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
                      className="mt-5 inline-flex items-center gap-0.5 text-[15px] font-medium text-label hover:text-orange-400 transition-colors"
                    >
                      {language === 'es' ? 'Más información' : 'Learn more'}
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
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

          {/* Grid de Certificaciones de Nivel 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, idx) => {
              const logo = CERTIFICATION_LOGOS[cert.id];

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: easeOutExpo }}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:bg-zinc-900/60 hover:border-zinc-700 transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-[10px] font-mono text-orange-400 border border-orange-500/20">
                        {cert.badge}
                      </span>
                      {cert.date && (
                        <span className="text-[11px] font-mono text-zinc-500">
                          {cert.date}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3.5 mb-3">
                      {logo && (
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 border border-zinc-700/50 shadow-sm overflow-hidden">
                          <img
                            src={logo.src}
                            alt={`${cert.issuer} Logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-normal text-zinc-100 font-display mb-0.5">
                          {cert.name}
                        </h4>
                        <div className="text-xs font-mono text-zinc-400">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 font-body leading-relaxed mb-4">
                      {cert.highlight}
                    </p>
                  </div>

                  {/* Footer actions: View PDF modal / View credential */}
                  <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {cert.pdfUrl && (
                        <button
                          onClick={() =>
                            setActivePdf({
                              isOpen: true,
                              title: `${cert.name} — ${cert.issuer}`,
                              pdfUrl: cert.pdfUrl!,
                              downloadName: t.b2Modal.downloadName,
                              subtitle: t.b2Modal.subtitle,
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 text-xs font-mono font-medium transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Ver documento' : 'View document'}</span>
                        </button>
                      )}

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          <span>{language === 'es' ? 'Credencial web' : 'Web credential'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {!cert.pdfUrl && !cert.url && (
                      <span className="text-[11px] font-mono text-zinc-500">
                        {language === 'es' ? 'Validación de Fabricante (Brescia, IT)' : 'Manufacturer Validation (Brescia, IT)'}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mini Idiomas Bar with Click to View PDF */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <Languages className="w-4 h-4 text-orange-400" />
              <span>{language === 'es' ? 'COMPETENCIA LINGÜÍSTICA:' : 'LANGUAGE PROFICIENCY:'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-zinc-300">
              <span>
                {language === 'es' ? 'Español:' : 'Spanish:'}{' '}
                <strong className="text-zinc-100">{language === 'es' ? 'Nativo (C2)' : 'Native (C2)'}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                {language === 'es' ? 'Inglés:' : 'English:'}{' '}
                <button
                  onClick={openB2Pdf}
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 underline font-semibold cursor-pointer"
                  title={language === 'es' ? 'Ver certificado oficial B2 en PDF' : 'View official B2 certificate in PDF'}
                >
                  <span>B2 First (Cambridge, Score 162)</span>
                  <FileText className="w-3 h-3" />
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
