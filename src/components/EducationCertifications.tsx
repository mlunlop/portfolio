import { Award, GraduationCap, Languages } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function EducationCertifications() {
  return (
    <section id="certificaciones" className="py-20 border-t border-zinc-800/80 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>ACREDITACIÓN TÉCNICA // EDUCACIÓN & ESTÁNDARES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Certificaciones & Educación
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            Combinación de certificaciones de sistemas oficiales de la industria y formación reglada de grado superior y postgrado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: Certificaciones Oficiales */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
              <Award className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-normal text-zinc-100 font-display uppercase">
                Certificaciones Oficiales
              </h3>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-base font-normal text-zinc-100 font-display">
                        {cert.name}
                      </h4>
                      <div className="text-xs font-mono text-orange-400 mt-0.5">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 border border-zinc-700/60 whitespace-nowrap">
                      {cert.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-body leading-relaxed mt-3">
                    {cert.highlight}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages Card */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-4 h-4 text-zinc-400" />
                <h4 className="text-sm font-normal text-zinc-200 font-display uppercase">
                  Idiomas de Trabajo
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-body">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-400">Español</div>
                  <div className="font-semibold text-zinc-200 font-mono text-[11px] mt-0.5">Nativo (C2)</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-400">Inglés</div>
                  <div className="font-semibold text-zinc-200 font-mono text-[11px] mt-0.5">B2 Cambridge First</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Formación Académica */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-normal text-zinc-100 font-display uppercase">
                Formación Académica
              </h3>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-base font-normal text-zinc-100 font-display">
                        {edu.degree}
                      </h4>
                      <div className="text-xs font-mono text-zinc-400 mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-[11px] font-mono text-orange-400 border border-orange-500/20 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-body leading-relaxed mt-3">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
