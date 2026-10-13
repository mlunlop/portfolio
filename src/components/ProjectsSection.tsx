import { useState } from 'react';
import {
  Gamepad2,
  Lock,
  Smartphone,
  Dices,
  Trophy,
  ExternalLink,
  Layers,
  ShieldCheck,
  FileText,
  Users,
  Bot,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Calendar,
  Palette,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { GithubIcon } from './Icons';

// Real visual assets from Bit-Party (Godot 4.7)
import bitPartyIcon from '../assets/projects/icon.png';
import powderBg from '../assets/projects/powder_panic_bg.png';
import powderLogo from '../assets/projects/powder_panic_logo.png';
import aztecBg from '../assets/projects/aztec_wrath_bg.png';
import aztecLogo from '../assets/projects/aztec_wrath_logo.png';
import towerBg from '../assets/projects/tower_drop_bg.png';
import towerLogo from '../assets/projects/tower_drop_logo.png';
import neonBg from '../assets/projects/neon_parry_bg.png';
import neonLogo from '../assets/projects/neon_parry_logo.png';

// DAW Web Designs Thumbnails & Component
import thumb2pac from '../assets/projects/daw/2pac-thumb.jpg';
import thumbBmx from '../assets/projects/daw/bmx-thumb.jpg';
import thumbGiardino from '../assets/projects/daw/giardino-thumb.jpg';
import thumbJapan from '../assets/projects/daw/japan-thumb.jpg';
import { WebPreviewModal, type WebProject } from './WebPreviewModal';

const MINIGAME_ASSETS: Record<string, { bg: string; logo: string; shader: string }> = {
  powder_panic: { bg: powderBg, logo: powderLogo, shader: 'cartoon_explosion & prop_shadow.gdshader' },
  aztec_wrath: { bg: aztecBg, logo: aztecLogo, shader: 'State Machine & Lane Spawner' },
  tower_drop: { bg: towerBg, logo: towerLogo, shader: 'RigidBody2D & pixel_rotate.gdshader' },
  neon_parry: { bg: neonBg, logo: neonLogo, shader: 'sword_slash & crt.gdshader' },
};

const DAW_STATIC_CONFIG: Record<
  string,
  {
    thumbnail: string;
    accentColor: string;
    url: string;
    tags: { es: string[]; en: string[] };
  }
> = {
  'web-2pac': {
    thumbnail: thumb2pac,
    accentColor: 'from-violet-500/20 to-purple-600/10 border-violet-500/30 text-violet-400',
    url: '/projects/daw/WEB-2PAC/index.html',
    tags: {
      es: ['UI/UX Vintage', 'HTML5 Semántico', 'CSS Media Queries', 'Video Streaming'],
      en: ['Vintage UI/UX', 'Semantic HTML5', 'CSS Media Queries', 'Video Streaming'],
    },
  },
  'web-giardino': {
    thumbnail: thumbGiardino,
    accentColor: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400',
    url: '/projects/daw/WEB-GIARDINO-SEGRETO/index.html',
    tags: {
      es: ['Diseño Editorial', 'CSS Grid & Flexbox', 'Formularios UX', 'Estética Gastronómica'],
      en: ['Editorial Layout', 'CSS Grid & Flexbox', 'UX Forms', 'Dining Aesthetics'],
    },
  },
  'web-bmx': {
    thumbnail: thumbBmx,
    accentColor: 'from-amber-500/20 to-yellow-600/10 border-amber-500/30 text-amber-400',
    url: '/projects/daw/WEB-BMX-VORTEX/index.html',
    tags: {
      es: ['Microinteracciones UI', 'Scroll Progress', 'CSS Keyframes', 'Diseño Deportivo'],
      en: ['UI Micro-interactions', 'Scroll Progress', 'CSS Keyframes', 'Action Sports'],
    },
  },
  'web-japan': {
    thumbnail: thumbJapan,
    accentColor: 'from-rose-500/20 to-red-600/10 border-rose-500/30 text-rose-400',
    url: '/projects/daw/WEB-JAPAN/index.html',
    tags: {
      es: ['Arquitectura de Información', 'Sistemas de Diseño UI', 'Multi-página', 'Diseño Responsive'],
      en: ['Information Architecture', 'UI Design Systems', 'Multi-page Layout', 'Responsive Design'],
    },
  },
};

const DAILY_LOOP_ICONS = [
  { icon: Dices, accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { icon: Gamepad2, accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { icon: Trophy, accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
];

export function ProjectsSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].projects;

  // Accordion state: all closed by default
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [selectedWebProject, setSelectedWebProject] = useState<WebProject | null>(null);

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  const minigames = t.bitParty.minigames.map((m) => ({
    ...m,
    ...MINIGAME_ASSETS[m.id],
  }));

  const currentMinigame = minigames[activeSlide] || minigames[0];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % minigames.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + minigames.length) % minigames.length);
  };

  const dawProjects: WebProject[] = t.dawDesigns.projects.map((proj) => {
    const config = DAW_STATIC_CONFIG[proj.id];
    return {
      id: proj.id,
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      category: proj.category,
      date: proj.date,
      tags: config.tags[language],
      url: config.url,
      thumbnail: config.thumbnail,
      accentColor: config.accentColor,
    };
  });

  return (
    <section id="proyectos" className="py-20 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
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
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {/* =====================================================================
              ACCORDION ITEM 01: BIT-PARTY (GODOT 4 INDIE GAME)
          ===================================================================== */}
          <div
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openProject === 'bit-party'
                ? 'border-zinc-700 bg-zinc-900/50 shadow-2xl shadow-black/60'
                : 'border-zinc-800/90 bg-zinc-900/25 hover:border-zinc-700/80 hover:bg-zinc-900/40'
            }`}
          >
            {/* Accordion Trigger Header */}
            <button
              type="button"
              onClick={() => toggleProject('bit-party')}
              aria-expanded={openProject === 'bit-party'}
              className="w-full px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Pixel Art Character Icon */}
                <div className="relative w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center p-1.5 group-hover:border-purple-500/40 transition-colors">
                  <img
                    src={bitPartyIcon}
                    alt="Bit-Party Icon"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-purple-400 font-semibold uppercase tracking-wider">
                      {t.bitParty.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 " />
                      {t.bitParty.status}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-[10px]">
                      <Lock className="w-2.5 h-2.5" />
                      {t.bitParty.repo}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    {t.bitParty.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body line-clamp-1">
                    {t.bitParty.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Tech Pills & Chevron */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-zinc-800/80 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    Godot 4.7
                  </span>
                  <span className="hidden md:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    GDScript
                  </span>
                  <span className="hidden lg:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    Godot Shaders 
                  </span>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    openProject === 'bit-party'
                      ? 'bg-orange-500 border-orange-400 text-zinc-950 rotate-180'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </button>

            {/* Accordion Expanded Body */}
            {openProject === 'bit-party' && (
              <div className="px-5 pb-7 pt-2 sm:px-7 sm:pb-8 border-t border-zinc-800/80 bg-zinc-950/40 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-center">
                  {/* Left Column (5 cols): Interactive Mobile Viewport Capture Showcase */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    {/* Smartphone Vertical Frame */}
                    <div className="relative w-full max-w-[270px] aspect-[9/16] rounded-[28px] p-2.5 bg-zinc-900 border-2 border-zinc-700/90 shadow-2xl shadow-black">
                      {/* Top Speaker Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-16 h-1.5 rounded-full bg-zinc-950/90 border border-zinc-800" />

                      {/* Inner Screen Viewport */}
                      <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-zinc-950 flex flex-col justify-between">
                        {/* Pixel Art Minigame Background */}
                        <img
                          src={currentMinigame.bg}
                          alt={currentMinigame.title}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                          style={{ imageRendering: 'pixelated' }}
                        />

                        {/* CRT Scanline Overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-25 z-10"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 1px, transparent 1px, transparent 3px)',
                          }}
                        />

                        {/* Gradient Vignette for HUD legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/75 via-transparent to-zinc-950/95 z-10 pointer-events-none" />

                        {/* Top In-Game HUD Bar */}
                        <div className="relative z-20 pt-6 px-3.5 flex items-center justify-between text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-700/80 text-amber-300">
                            {language === 'es' ? 'RONDA DIARIA' : 'DAILY ROUND'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-700/80 text-zinc-300">
                            720×1280
                          </span>
                        </div>

                        {/* Center Pixel-Art Minigame Logo */}
                        <div className="relative z-20 px-5 flex flex-col items-center justify-center my-auto">
                          <img
                            src={currentMinigame.logo}
                            alt={`${currentMinigame.title} Logo`}
                            className="w-44 h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-105"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>

                        {/* Bottom In-Game Overlay Info */}
                        <div className="relative z-20 p-3.5 space-y-2">
                          <div className="p-2.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90">
                            <p className="text-[11px] text-zinc-300 font-body leading-snug">
                              {currentMinigame.mechanic}
                            </p>
                          </div>
                        </div>

                        {/* Prev / Next Controls */}
                        <button
                          type="button"
                          onClick={prevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label={language === 'es' ? 'Minijuego anterior' : 'Previous minigame'}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label={language === 'es' ? 'Siguiente minijuego' : 'Next minigame'}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail Selector Bar below phone */}
                    <div className="flex items-center gap-2 mt-4">
                      {minigames.map((game, idx) => (
                        <button
                          key={game.id}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                            activeSlide === idx
                              ? 'bg-zinc-800 border-orange-500 scale-105 shadow-md'
                              : 'bg-zinc-950 border-zinc-800 opacity-55 hover:opacity-90'
                          }`}
                          title={game.title}
                        >
                          <img
                            src={game.logo}
                            alt={game.title}
                            className="w-12 h-7 object-contain"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 mt-2">
                      {language === 'es'
                        ? 'Arte y logos in-game reales (Selecciona para cambiar escena)'
                        : 'In-game assets & logos (Select to switch scene)'}
                    </span>
                  </div>

                  {/* Right Column (7 cols): Concept, Daily Loop & Godot Architecture */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Concept Header */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>
                          {language === 'es'
                            ? 'CONCEPTO & ARQUITECTURA DE JUEGO // LANZAMIENTO iOS & ANDROID'
                            : 'GAME CONCEPT & ARCHITECTURE // iOS & ANDROID LAUNCH'}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed">
                        {t.bitParty.overview}
                      </p>
                    </div>

                    {/* 3 Multiplayer Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-orange-400 font-mono text-xs mb-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'SALAS PRIVADAS' : 'PRIVATE ROOMS'}</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          {language === 'es' ? (
                            <>Partidas de hasta <strong>5 jugadores</strong> mediante código de invitación.</>
                          ) : (
                            <>Matches for up to <strong>5 players</strong> via private room code.</>
                          )}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs mb-1">
                          <Bot className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'SOPORTE BOTS' : 'BOT SUPPORT'}</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          {language === 'es' ? (
                            <>Relleno de huecos libres con <strong>CPUs</strong> y turno automático a las 24h.</>
                          ) : (
                            <>Free slots filled with <strong>CPUs</strong> and auto-turns at 24h.</>
                          )}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs mb-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? '13 MINIJUEGOS' : '13 MINIGAMES'}</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          {language === 'es' ? (
                            <>Catálogo arcade propio con físicas 2D, shaders CRT y control táctil.</>
                          ) : (
                            <>Proprietary arcade catalog with 2D physics, CRT shaders, and touch feel.</>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Daily Round Loop (3 Phases) */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        <span>{language === 'es' ? 'Bucle de Ronda Diaria:' : 'Daily Round Loop:'}</span>
                      </h4>

                      <div className="space-y-2.5">
                        {t.bitParty.dailyLoopSteps.map((step, idx) => {
                          const iconConfig = DAILY_LOOP_ICONS[idx] || DAILY_LOOP_ICONS[0];
                          const Icon = iconConfig.icon;
                          return (
                            <div
                              key={step.phase}
                              className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 flex items-start gap-3.5"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${iconConfig.accent}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-zinc-500">
                                    {language === 'es' ? `FASE ${step.phase}` : `PHASE ${step.phase}`}
                                  </span>
                                  <h5 className="text-xs sm:text-sm font-normal text-zinc-100 font-display uppercase">
                                    {step.title}
                                  </h5>
                                </div>
                                <p className="text-xs text-zinc-400 font-body leading-relaxed mt-0.5">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              ACCORDION ITEM 02: PORTFOLIO PERSONAL (REACT 19 + TS + TAILWIND V4)
          ===================================================================== */}
          <div
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openProject === 'portfolio'
                ? 'border-zinc-700 bg-zinc-900/50 shadow-2xl shadow-black/60'
                : 'border-zinc-800/90 bg-zinc-900/25 hover:border-zinc-700/80 hover:bg-zinc-900/40'
            }`}
          >
            {/* Accordion Trigger Header */}
            <button
              type="button"
              onClick={() => toggleProject('portfolio')}
              aria-expanded={openProject === 'portfolio'}
              className="w-full px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0 flex items-center justify-center p-2 group-hover:border-orange-500/40 transition-colors">
                  <img src="/favicon.svg" alt="Portfolio Icon" className="w-8 h-8 object-contain" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
                      {t.portfolioProject.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {t.portfolioProject.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    {t.portfolioProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body line-clamp-1">
                    {t.portfolioProject.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Tech Pills & Chevron */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-zinc-800/80 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    React 19
                  </span>
                  <span className="hidden md:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    TypeScript
                  </span>
                  <span className="hidden lg:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    Tailwind v4
                  </span>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    openProject === 'portfolio'
                      ? 'bg-orange-500 border-orange-400 text-zinc-950 rotate-180'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </button>

            {/* Accordion Expanded Body */}
            {openProject === 'portfolio' && (
              <div className="px-5 pb-7 pt-4 sm:px-7 sm:pb-8 border-t border-zinc-800/80 bg-zinc-950/40 space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed max-w-2xl">
                    {t.portfolioProject.description}
                  </p>

                  <a
                    href="https://github.com/mlunlop/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs font-mono transition-colors shrink-0 self-start"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.portfolioProject.viewRepo}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
                      <Layers className="w-4 h-4" />
                      <span>{t.portfolioProject.card1Title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      {t.portfolioProject.card1Desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-400 font-mono text-xs">
                      <FileText className="w-4 h-4" />
                      <span>{t.portfolioProject.card2Title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      {t.portfolioProject.card2Desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t.portfolioProject.card3Title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      {t.portfolioProject.card3Desc}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              ACCORDION ITEM 03: DISEÑO UI/UX EN PÁGINAS ESTÁTICAS (DAW)
          ===================================================================== */}
          <div
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openProject === 'daw-designs'
                ? 'border-zinc-700 bg-zinc-900/50 shadow-2xl shadow-black/60'
                : 'border-zinc-800/90 bg-zinc-900/25 hover:border-zinc-700/80 hover:bg-zinc-900/40'
            }`}
          >
            {/* Accordion Trigger Header */}
            <button
              type="button"
              onClick={() => toggleProject('daw-designs')}
              aria-expanded={openProject === 'daw-designs'}
              className="w-full px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0 flex items-center justify-center p-2 group-hover:border-rose-500/40 transition-colors">
                  <Palette className="w-7 h-7 text-rose-400" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-rose-400 font-semibold uppercase tracking-wider">
                      {t.dawDesigns.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      {t.dawDesigns.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight group-hover:text-rose-400 transition-colors truncate">
                    {t.dawDesigns.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body line-clamp-1">
                    {t.dawDesigns.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Tech Pills & Chevron */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-zinc-800/80 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    Diseño UI/UX
                  </span>
                  <span className="hidden md:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    HTML5 & CSS3
                  </span>
                  <span className="hidden lg:inline-block px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                    Responsive
                  </span>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                    openProject === 'daw-designs'
                      ? 'bg-rose-500 border-rose-400 text-zinc-950 rotate-180'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </button>

            {/* Accordion Expanded Body */}
            {openProject === 'daw-designs' && (
              <div className="px-5 pb-7 pt-4 sm:px-7 sm:pb-8 border-t border-zinc-800/80 bg-zinc-950/40 space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800/60">
                  <p className="text-xs sm:text-sm text-zinc-400 font-body">
                    {t.dawDesigns.intro} <strong className="text-zinc-200 font-medium">{t.dawDesigns.introHighlight}</strong> {t.dawDesigns.introEnd}
                  </p>
                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                    {t.dawDesigns.counter}
                  </span>
                </div>

                {/* 2x2 Responsive Grid of Web Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {dawProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="group/card flex flex-col rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-black/50"
                    >
                      {/* Thumbnail Header with Quick Actions */}
                      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity" />

                        {/* Top Badges: Category & Date */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="px-2 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-300">
                            {proj.category}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-950/90 backdrop-blur-md border border-orange-500/30 text-[10px] font-mono text-orange-400 font-semibold shadow-sm">
                            <Calendar className="w-3 h-3 text-orange-400" />
                            {proj.date}
                          </span>
                        </div>

                        {/* Bottom Title Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                          <h4 className="text-base font-normal text-zinc-100 font-display tracking-tight truncate drop-shadow-md">
                            {proj.title}
                          </h4>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] font-mono text-orange-400">
                              {proj.subtitle}
                            </p>
                          </div>
                          <p className="text-xs text-zinc-400 font-body leading-relaxed line-clamp-2">
                            {proj.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/70">
                          <button
                            type="button"
                            onClick={() => setSelectedWebProject(proj)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-medium text-xs font-mono transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{t.dawDesigns.liveBtn}</span>
                          </button>

                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors"
                            title={language === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Web Preview Modal */}
      <WebPreviewModal
        isOpen={!!selectedWebProject}
        onClose={() => setSelectedWebProject(null)}
        project={selectedWebProject}
      />
    </section>
  );
}
