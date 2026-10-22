import { Lock, Globe } from 'lucide-react';

interface WebsiteSkeletonProps {
  projectTitle?: string;
  projectUrl?: string;
  thumbnailUrl?: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  language?: 'es' | 'en';
}

export function WebsiteSkeleton({
  projectTitle = 'Web Project',
  projectUrl = '',
  thumbnailUrl,
  device = 'desktop',
  language = 'es',
}: WebsiteSkeletonProps) {
  // Extract a clean display hostname / path for the mock URL bar
  const displayUrl = projectUrl
    ? projectUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `projects/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden select-none">
      {/* Background Ambience: Subtle blurred brand tint from the project thumbnail */}
      {thumbnailUrl && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-10 blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/90 to-zinc-950" />
        </div>
      )}

      {/* Simulated Browser Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/[0.08] bg-zinc-900/90 shrink-0">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5 w-16">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Center Mock URL Bar */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-950/80 border border-white/[0.08] text-[11px] font-mono text-zinc-400 max-w-[260px] sm:max-w-xs w-full justify-center truncate shadow-inner">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{displayUrl}</span>
        </div>

        {/* Right side spacer / device status */}
        <div className="w-16 flex justify-end">
          <Globe className="w-3.5 h-3.5 text-zinc-600" />
        </div>
      </div>

      {/* Skeleton Wireframe Body */}
      <div className="relative z-10 flex-1 p-4 sm:p-6 md:p-8 overflow-hidden flex flex-col justify-between space-y-6">
        {/* 1. Wireframe Header / Navbar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="h-4 w-24 rounded-md bg-zinc-800 animate-pulse" />
          </div>

          {/* Nav Items (hidden on mobile) */}
          {device !== 'mobile' && (
            <div className="hidden sm:flex items-center gap-4">
              <div className="h-3 w-16 rounded bg-zinc-800/80 animate-pulse" />
              <div className="h-3 w-20 rounded bg-zinc-800/80 animate-pulse" />
              <div className="h-3 w-14 rounded bg-zinc-800/80 animate-pulse" />
            </div>
          )}

          {/* Action Button Skeleton */}
          <div className="h-7 w-20 sm:w-24 rounded-lg bg-orange-500/20 border border-orange-500/30 animate-pulse" />
        </div>

        {/* 2. Wireframe Hero Section */}
        <div className="space-y-4 my-auto py-4 max-w-2xl">
          {/* Pill Badge */}
          <div className="h-4 w-28 rounded-full bg-orange-500/20 border border-orange-500/30 animate-pulse" />

          {/* Main Title Skeletons */}
          <div className="space-y-2">
            <div className="h-7 sm:h-9 md:h-11 w-4/5 rounded-xl bg-zinc-800 animate-pulse" />
            <div className="h-7 sm:h-9 md:h-11 w-3/5 rounded-xl bg-zinc-800/90 animate-pulse" />
          </div>

          {/* Description Lines */}
          <div className="space-y-1.5 pt-2 max-w-lg">
            <div className="h-3 w-full rounded bg-zinc-800/70 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-zinc-800/70 animate-pulse" />
            <div className="h-3 w-3/5 rounded bg-zinc-800/60 animate-pulse" />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <div className="h-9 sm:h-10 w-28 sm:w-32 rounded-xl bg-orange-500/30 border border-orange-500/40 animate-pulse" />
            <div className="h-9 sm:h-10 w-24 sm:w-28 rounded-xl bg-zinc-800 border border-zinc-700/80 animate-pulse" />
          </div>
        </div>

        {/* 3. Wireframe Cards Row (Desktop/Tablet) */}
        {device !== 'mobile' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            {[1, 2, 3].map((col) => (
              <div
                key={col}
                className="rounded-xl border border-white/[0.06] bg-zinc-900/60 p-3 space-y-2.5"
              >
                <div className="aspect-[16/9] w-full rounded-lg bg-zinc-800 animate-pulse" />
                <div className="h-3.5 w-3/4 rounded bg-zinc-800 animate-pulse" />
                <div className="h-2.5 w-1/2 rounded bg-zinc-800/70 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Floating Status Pill */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/95 border border-white/10 text-xs font-mono text-zinc-300 shadow-xl shadow-black/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span>
              {language === 'es'
                ? 'Cargando entorno web interactivo...'
                : 'Loading interactive web environment...'}
            </span>
          </div>
        </div>
      </div>

      {/* Shimmer Light Sweep across the entire skeleton */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full" />
      </div>
    </div>
  );
}
