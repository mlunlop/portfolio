import { FileText } from 'lucide-react';

interface PdfSkeletonProps {
  title?: string;
  language?: 'es' | 'en';
}

export function PdfSkeleton({ title = 'Documento PDF', language = 'es' }: PdfSkeletonProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-start bg-zinc-950 p-4 sm:p-8 overflow-hidden select-none">
      {/* Simulated A4 Document Paper with Subtle Depth */}
      <div className="relative w-full max-w-2xl bg-zinc-900/90 rounded-2xl border border-white/[0.08] p-6 sm:p-10 shadow-2xl flex flex-col justify-between space-y-6 my-auto max-h-[85vh] overflow-hidden">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-zinc-300 truncate block max-w-[240px]">
                {title}
              </span>
              <div className="h-2.5 w-24 sm:w-32 rounded bg-zinc-800/60 animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-20 rounded-full bg-zinc-800/80 border border-zinc-700/60 animate-pulse" />
        </div>

        {/* Paragraph 1 */}
        <div className="space-y-2.5 pt-2">
          <div className="h-3.5 w-full rounded bg-zinc-800/80 animate-pulse" />
          <div className="h-3.5 w-11/12 rounded bg-zinc-800/80 animate-pulse" />
          <div className="h-3.5 w-4/5 rounded bg-zinc-800/80 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-zinc-800/70 animate-pulse" />
        </div>

        {/* Section Divider Wireframe */}
        <div className="my-2 h-px w-full bg-white/[0.05]" />

        {/* Paragraph 2 / Bullet Points */}
        <div className="space-y-3">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500/40 shrink-0" />
              <div className="h-3 w-5/6 rounded bg-zinc-800/70 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Stamp / Signature Block */}
        <div className="flex items-end justify-between pt-6 border-t border-white/[0.06]">
          <div className="space-y-1.5">
            <div className="h-2.5 w-28 rounded bg-zinc-800/60" />
            <div className="h-2.5 w-20 rounded bg-zinc-800/50" />
          </div>
          <div className="w-24 h-12 rounded-lg border border-dashed border-zinc-700/80 bg-zinc-800/30 flex items-center justify-center">
            <div className="h-3 w-16 rounded bg-zinc-700/50 animate-pulse" />
          </div>
        </div>

        {/* Shimmer Sweep over the paper */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full" />
        </div>
      </div>

      {/* Floating Status Indicator at bottom */}
      <div className="relative z-10 pt-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/95 border border-white/10 text-xs font-mono text-zinc-300 shadow-xl shadow-black/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <span>
            {language === 'es' ? 'Preparando documento PDF...' : 'Preparing PDF document...'}
          </span>
        </div>
      </div>
    </div>
  );
}
