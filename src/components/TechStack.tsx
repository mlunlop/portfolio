import { Database, Layout, TerminalSquare, Gamepad2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function TechStack() {
  const getIcon = (category: string) => {
    if (category.includes('Data')) return Database;
    if (category.includes('Frontend')) return Layout;
    if (category.includes('Game') || category.includes('Godot')) return Gamepad2;
    return TerminalSquare;
  };

  return (
    <section id="stack" className="py-20 border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>MIS CAPACIDADES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Stack Técnico
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            Sin barras de porcentaje arbitrarias. Herramientas, motores y entornos que utilizo en desarrollo profesional y proyectos propios.
          </p>
        </div>

        {/* Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PORTFOLIO_DATA.skills.map((category, idx) => {
            const Icon = getIcon(category.category);
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
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
                        className="flex items-center gap-2 text-xs font-mono text-zinc-300 py-1.5 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
