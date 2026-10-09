import { useState } from 'react';
import { GraduationCap, Award, ExternalLink, Languages, Sparkles, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PdfViewerModal } from './PdfViewerModal';

export function EducationCertifications() {
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
      title: 'B2 First (Score 162) — Cambridge Assessment English',
      pdfUrl: '/docs/B2%20Certificado%20Mario%20Luna.pdf',
      downloadName: 'B2_Certificado_Mario_Luna.pdf',
      subtitle: 'Certificación Oficial de Competencia Lingüística',
    });
  };

  return (
    <section id="certificaciones" className="py-20 border-t border-zinc-800/80 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Focused on Academic Formation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <GraduationCap className="w-4 h-4 text-orange-400" />
              <span>TRAYECTORIA EDUCATIVA & INGENIERÍA // PILAR PRINCIPAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Formación Académica
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            Progresión continua y rigurosa: desde sistemas y desarrollo web bilingüe hasta la especialización en Machine Learning y el grado en informática.
          </p>
        </div>

        {/* 1. FORMACIÓN ACADÉMICA (FULL WIDTH) */}
        <div className="space-y-6 mb-20">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div
              key={edu.id}
              className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all duration-300 p-6 sm:p-8 overflow-hidden group"
            >
              {/* Subtle top indicator for the highest/current degree */}
              {idx === 0 && (
                <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-orange-500/10 border-b border-l border-orange-500/30 text-orange-400 font-mono text-[11px] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>En curso</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-orange-400 font-mono text-xs font-semibold border border-zinc-700/80">
                      {edu.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      // {edu.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display tracking-tight pt-1">
                    {edu.degree}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400">
                    {edu.institution}
                  </div>
                </div>

                <div className="self-start px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-mono text-xs hidden lg:block shrink-0">
                  {edu.period}
                </div>
              </div>

              {/* Details */}
              <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed max-w-4xl pt-2 border-t border-zinc-800/60">
                {edu.details}
              </p>
            </div>
          ))}
        </div>

        {/* 2. CERTIFICACIONES & CREDENCIALES (AGREGADO COMPLEMENTARIO) */}
        <div className="pt-12 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-orange-400" />
              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight">
                  Acreditaciones & Credenciales Destacadas
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  [AGREGADO TÉCNICO // ACREDITACIONES CLAVE]
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-body max-w-xs">
              Certificaciones oficiales de fabricante, idiomas y credenciales prácticas verificadas.
            </p>
          </div>

          {/* Grid de Certificaciones de Nivel 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-[10px] font-mono text-orange-400 border border-orange-500/20">
                      {cert.badge}
                    </span>
                    {cert.date && (
                      <span className="text-[11px] font-mono text-zinc-500">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-normal text-zinc-100 font-display mb-0.5">
                    {cert.name}
                  </h4>
                  <div className="text-xs font-mono text-zinc-400 mb-3">
                    {cert.issuer}
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
                            downloadName: 'B2_Certificado_Mario_Luna.pdf',
                            subtitle: 'Documento Oficial // Acreditación Cambridge English',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 text-xs font-mono font-medium transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ver documento</span>
                      </button>
                    )}

                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        <span>Credencial web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {!cert.pdfUrl && !cert.url && (
                    <span className="text-[11px] font-mono text-zinc-500">
                      Validación de Fabricante (Brescia, IT)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mini Idiomas Bar with Click to View PDF */}
          <div className="mt-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-400">
              <Languages className="w-4 h-4 text-orange-400" />
              <span>COMPETENCIA LINGÜÍSTICA:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-zinc-300">
              <span>Español: <strong className="text-zinc-100">Nativo (C2)</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                Inglés:{' '}
                <button
                  onClick={openB2Pdf}
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 underline font-semibold cursor-pointer"
                  title="Ver certificado oficial B2 en PDF"
                >
                  <span>B2 First (Cambridge, Score 162)</span>
                  <FileText className="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>
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
