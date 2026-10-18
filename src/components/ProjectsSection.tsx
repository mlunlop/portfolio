import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  X,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { GithubIcon } from './Icons';
import { easeOutExpo, layoutSpring, defaultViewport, fadeUp } from '../utils/motion';

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
import dawThumb from '../assets/projects/daw/daw-thumb.webp';
import portfolioThumb from '../assets/projects/portfolio-thumb.png';
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
    url: string;
    tags: { es: string[]; en: string[] };
  }
> = {
  'web-2pac': {
    thumbnail: thumb2pac,
    url: '/projects/daw/WEB-2PAC/index.html',
    tags: {
      es: ['UI/UX Vintage', 'HTML5 Semántico', 'CSS Media Queries', 'Video Streaming'],
      en: ['Vintage UI/UX', 'Semantic HTML5', 'CSS Media Queries', 'Video Streaming'],
    },
  },
  'web-giardino': {
    thumbnail: thumbGiardino,
    url: '/projects/daw/WEB-GIARDINO-SEGRETO/index.html',
    tags: {
      es: ['Diseño Editorial', 'CSS Grid & Flexbox', 'Formularios UX', 'Estética Gastronómica'],
      en: ['Editorial Layout', 'CSS Grid & Flexbox', 'UX Forms', 'Dining Aesthetics'],
    },
  },
  'web-bmx': {
    thumbnail: thumbBmx,
    url: '/projects/daw/WEB-BMX-VORTEX/index.html',
    tags: {
      es: ['Microinteracciones UI', 'Scroll Progress', 'CSS Keyframes', 'Diseño Deportivo'],
      en: ['UI Micro-interactions', 'Scroll Progress', 'CSS Keyframes', 'Action Sports'],
    },
  },
  'web-japan': {
    thumbnail: thumbJapan,
    url: '/projects/daw/WEB-JAPAN/index.html',
    tags: {
      es: ['Arquitectura de Información', 'Sistemas de Diseño UI', 'Multi-página', 'Diseño Responsive'],
      en: ['Information Architecture', 'UI Design Systems', 'Multi-page Layout', 'Responsive Design'],
    },
  },
};

type ProjectId = 'bit-party' | 'daw-designs' | 'portfolio';

export function ProjectsSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].projects;

  const [expandedProject, setExpandedProject] = useState<ProjectId | null>(null);
  const [activeMinigameIndex, setActiveMinigameIndex] = useState<number>(0);
  const [selectedWebProject, setSelectedWebProject] = useState<WebProject | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);

  const toggleProject = (id: ProjectId) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
      // Smooth scroll toward the stage after state update
      setTimeout(() => {
        stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  };

  const minigames = t.bitParty.minigames.map((m) => ({
    ...m,
    ...MINIGAME_ASSETS[m.id],
  }));

  const currentMinigame = minigames[activeMinigameIndex] || minigames[0];

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
      accentColor: '',
    };
  });

  // Project cards data for the 3 equal-size cards overview
  const cards = [
    {
      id: 'bit-party' as ProjectId,
      eyebrow: language === 'es' ? 'JUEGO MÓVIL • GODOT 4.7' : 'MOBILE GAME • GODOT 4.7',
      title: t.bitParty.title,
      subtitle: t.bitParty.subtitle,
      tagline: language === 'es' ? '13 Minijuegos • Turno 24h • Shaders CRT' : '13 Minigames • 24h Turn • CRT Shaders',
      tags: ['Godot 4.7', 'GDScript', 'iOS & Android'],
      badge: language === 'es' ? 'En desarrollo' : 'In development',
      previewType: 'game' as const,
    },
    {
      id: 'daw-designs' as ProjectId,
      eyebrow: language === 'es' ? 'DISEÑO WEB • UI/UX' : 'WEB DESIGN • UI/UX',
      title: t.dawDesigns.title,
      subtitle: t.dawDesigns.subtitle,
      tagline: language === 'es' ? '4 Entregas • Maquetación Editorial • Grid & Flex' : '4 Deliveries • Editorial Layout • Grid & Flex',
      tags: ['HTML5 & CSS3', 'UI/UX Design', 'Responsive'],
      badge: null,
      previewType: 'web' as const,
    },
    {
      id: 'portfolio' as ProjectId,
      eyebrow: language === 'es' ? 'ARQUITECTURA FRONTEND' : 'FRONTEND ARCHITECTURE',
      title: t.portfolioProject.title,
      subtitle: t.portfolioProject.subtitle,
      tagline: language === 'es' ? 'React 19 • TypeScript • Tailwind v4 • 60 FPS' : 'React 19 • TypeScript • Tailwind v4 • 60 FPS',
      tags: ['React 19', 'TypeScript', 'Tailwind v4'],
      badge: null,
      previewType: 'portfolio' as const,
    },
  ];

  return (
    <section id="proyectos" className="py-24 md:py-36 border-t border-white/[0.06] bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Apple-style Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-orange-400 mb-2">
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white font-display uppercase">
              {t.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* =====================================================================
            3 EQUAL-SIZE PROJECT CARDS (APPLE MONOCHROME / SPACE BLACK GRID)
        ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card) => {
            const isExpanded = expandedProject === card.id;

            return (
              <motion.article
                key={card.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
                onClick={() => toggleProject(card.id)}
                className={`group relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                  isExpanded
                    ? 'bg-zinc-900/90 border-white/30 shadow-2xl shadow-orange-500/10 ring-1 ring-white/20'
                    : 'bg-zinc-900/40 border-white/[0.08] hover:border-white/20 hover:bg-zinc-900/60 shadow-lg shadow-black/40'
                }`}
              >
                {/* Card Visual Hero Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border-b border-white/[0.06]">
                  {/* Game Preview */}
                  {card.previewType === 'game' && (
                    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-zinc-950">
                      <img
                        src={powderBg}
                        alt="Bit-Party Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500 ease-out"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 p-2.5 shadow-2xl flex items-center justify-center group-hover:border-white/25 transition-colors">
                        <img
                          src={bitPartyIcon}
                          alt="Bit-Party Icon"
                          className="w-full h-full object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Web Lab Preview */}
                  {card.previewType === 'web' && (
                    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                      <img
                        src={dawThumb}
                        alt="Colección de Diseño Web DAW"
                        className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  )}

                  {/* Portfolio Hero Capture Preview */}
                  {card.previewType === 'portfolio' && (
                    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                      <img
                        src={portfolioThumb}
                        alt="Portfolio Interface"
                        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  )}

                  {/* Top Badge: Category & Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    {card.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 font-mono text-[10px] text-orange-400 font-medium backdrop-blur-md">
                        {card.badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    {isExpanded && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-[10px] text-zinc-200 font-medium backdrop-blur-md">
                        {language === 'es' ? 'Desplegado' : 'Expanded'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Editorial Info */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      {card.eyebrow}
                    </span>
                    <h3 className="text-xl font-normal text-white font-display tracking-tight group-hover:text-orange-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-body leading-relaxed line-clamp-2">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom: Tags & Expand Action */}
                  <div className="space-y-4 pt-2">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-400 font-mono text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Apple Pill Trigger Button */}
                    <div
                      className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-mono transition-all duration-200 ${
                        isExpanded
                          ? 'bg-white text-zinc-950 font-semibold shadow-lg'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08]'
                      }`}
                    >
                      <span>
                        {isExpanded
                          ? language === 'es'
                            ? 'Plegar detalles'
                            : 'Collapse'
                          : language === 'es'
                            ? 'Desplegar proyecto'
                            : 'Expand details'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================================
            EXPANDED STAGE (ANIMATED PRODUCT SHOWCASE STAGE)
        ===================================================================== */}
        <div ref={stageRef}>
          <AnimatePresence mode="wait">
            {expandedProject && (
              <motion.div
                key={expandedProject}
                initial={{ opacity: 0, y: 24, height: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: 'auto',
                  transition: {
                    height: { duration: 0.45, ease: easeOutExpo },
                    opacity: { duration: 0.3, delay: 0.08 },
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  height: 0,
                  transition: {
                    height: { duration: 0.35, ease: easeOutExpo },
                    opacity: { duration: 0.2 },
                  },
                }}
                className="mt-10 overflow-hidden"
              >
                <div className="relative rounded-[32px] border border-white/[0.12] bg-zinc-900/70 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/80">
                  
                  {/* Stage Top Control Bar */}
                  <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
                    <div>
                      <h4 className="text-base sm:text-lg font-normal text-white font-display tracking-tight uppercase">
                        {expandedProject === 'bit-party' && (language === 'es' ? 'Bit-Party — Videojuego Móvil & Arquitectura' : 'Bit-Party — Mobile Game & Architecture')}
                        {expandedProject === 'daw-designs' && (language === 'es' ? 'Colección de Diseño Web — Interfaces Interactivas' : 'Web Design Collection — Interactive Interfaces')}
                        {expandedProject === 'portfolio' && (language === 'es' ? 'Portfolio Personal — Arquitectura Frontend' : 'Personal Portfolio — Frontend Architecture')}
                      </h4>
                    </div>

                    {/* Apple-style Close Pill */}
                    <button
                      type="button"
                      onClick={() => setExpandedProject(null)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-zinc-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                      title={language === 'es' ? 'Plegar vista' : 'Close view'}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
                    </button>
                  </div>

                  {/* -------------------------------------------------------------
                      STAGE 01: BIT-PARTY
                  ------------------------------------------------------------- */}
                  {expandedProject === 'bit-party' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      
                      {/* Left: Device & iOS Segmented Control (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col items-center">
                        {/* iOS Segmented Control Switcher */}
                        <div className="w-full max-w-[320px] mb-5 p-1 rounded-2xl bg-zinc-950/80 border border-white/[0.08] grid grid-cols-4 gap-1">
                          {minigames.map((game, idx) => {
                            const isActive = activeMinigameIndex === idx;
                            return (
                              <button
                                key={game.id}
                                type="button"
                                onClick={() => setActiveMinigameIndex(idx)}
                                className={`relative py-1.5 text-[10px] font-mono rounded-xl transition-colors cursor-pointer text-center truncate px-1 ${
                                  isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                              >
                                {isActive && (
                                  <motion.div
                                    layoutId="segmentedMinigame"
                                    transition={layoutSpring}
                                    className="absolute inset-0 bg-white rounded-xl shadow-md"
                                  />
                                )}
                                <span className="relative z-10 truncate block">
                                  {game.title.split(' ')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Minimalist Smartphone Viewport */}
                        <div className="relative w-full max-w-[270px] aspect-[9/16] rounded-[32px] p-2 bg-zinc-950 border-2 border-white/[0.15] shadow-2xl shadow-black">
                          {/* Top Speaker Notch */}
                          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 w-16 h-1.5 rounded-full bg-zinc-900 border border-white/[0.08]" />

                          {/* Inner Screen */}
                          <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-950 flex flex-col justify-between">
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={currentMinigame.id}
                                src={currentMinigame.bg}
                                alt={currentMinigame.title}
                                initial={{ opacity: 0.3, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0.3 }}
                                transition={{ duration: 0.35, ease: easeOutExpo }}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                              />
                            </AnimatePresence>

                            {/* Apple Soft Dark Vignette for Screen Depth */}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-transparent to-zinc-950/90 pointer-events-none" />

                            {/* Top HUD */}
                            <div className="relative z-10 pt-6 px-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                              <span className="px-2 py-0.5 rounded-md bg-zinc-950/70 border border-white/10 text-white">
                                {currentMinigame.title}
                              </span>
                              <span className="text-zinc-400 font-mono">
                                {activeMinigameIndex + 1}/4
                              </span>
                            </div>

                            {/* Center Logo */}
                            <div className="relative z-10 px-4 my-auto flex flex-col items-center">
                              <motion.img
                                key={`logo-${currentMinigame.id}`}
                                src={currentMinigame.logo}
                                alt={currentMinigame.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-40 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                                style={{ imageRendering: 'pixelated' }}
                              />
                            </div>

                            {/* Bottom Mechanic Pill */}
                            <div className="relative z-10 p-3">
                              <div className="p-3 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/[0.1]">
                                <p className="text-[11px] text-zinc-300 font-body leading-snug">
                                  {currentMinigame.mechanic}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-zinc-400 mt-3 text-center">
                          {language === 'es' ? 'Selecciona una pestaña para cambiar minijuego' : 'Select a tab to switch minigame'}
                        </span>
                      </div>

                      {/* Right: Apple Keynote Specs & Engineering Highlights (7 cols) */}
                      <div className="lg:col-span-7 space-y-7">
                        <div className="space-y-3">
                          <span className="font-mono text-xs uppercase tracking-widest text-orange-400">
                            {language === 'es' ? 'INGENIERÍA & ARQUITECTURA' : 'ENGINEERING & ARCHITECTURE'}
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-normal text-white font-display tracking-tight uppercase">
                            {language === 'es' ? 'Party Game Asíncrono en Godot 4.7' : 'Asynchronous Party Game in Godot 4.7'}
                          </h4>
                          <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed">
                            {t.bitParty.overview}
                          </p>
                        </div>

                        {/* Apple Big Stats Row */}
                        <div className="grid grid-cols-3 gap-3 pt-1">
                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                            <span className="text-2xl sm:text-3xl font-light text-white font-display tracking-tight">24h</span>
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language === 'es' ? 'Turno Diario' : 'Daily Turn'}</p>
                            <p className="text-[11px] text-zinc-400 font-body leading-snug">{language === 'es' ? 'Partidas entre amigos sin coincidir en horario' : 'Play with friends without matching schedules'}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                            <span className="text-2xl sm:text-3xl font-light text-white font-display tracking-tight">13</span>
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language === 'es' ? 'Minijuegos' : 'Minigames'}</p>
                            <p className="text-[11px] text-zinc-400 font-body leading-snug">{language === 'es' ? 'Físicas 2D, shaders CRT y control táctil' : '2D physics, CRT shaders & touch controls'}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                            <span className="text-2xl sm:text-3xl font-light text-white font-display tracking-tight">4.7</span>
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language === 'es' ? 'Godot Engine' : 'Godot Engine'}</p>
                            <p className="text-[11px] text-zinc-400 font-body leading-snug">{language === 'es' ? 'GDScript con Viewports aislados' : 'GDScript with isolated viewports'}</p>
                          </div>
                        </div>

                        {/* Daily Loop 3 Phases */}
                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                            {language === 'es' ? 'Bucle de Ronda Diaria (24 Horas):' : 'Daily Round Loop (24 Hours):'}
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {t.bitParty.dailyLoopSteps.map((step) => (
                              <div
                                key={step.phase}
                                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                              >
                                <span className="font-mono text-[10px] text-zinc-400">
                                  {language === 'es' ? `FASE ${step.phase}` : `PHASE ${step.phase}`}
                                </span>
                                <h5 className="text-xs font-normal text-white font-display uppercase tracking-tight">
                                  {step.title}
                                </h5>
                                <p className="text-[11px] text-zinc-400 font-body leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      STAGE 02: DAW WEB DESIGNS
                  ------------------------------------------------------------- */}
                  {expandedProject === 'daw-designs' && (
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
                        <p className="text-sm text-zinc-300 font-body max-w-2xl">
                          {t.dawDesigns.intro}{' '}
                          <strong className="text-white font-medium">{t.dawDesigns.introHighlight}</strong>{' '}
                          {t.dawDesigns.introEnd}
                        </p>
                        <span className="text-xs font-mono text-zinc-400 shrink-0">
                          {t.dawDesigns.counter}
                        </span>
                      </div>

                      {/* 4 Clean Cinematic Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dawProjects.map((proj) => (
                          <div
                            key={proj.id}
                            className="group/item rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                          >
                            {/* 16:9 Thumbnail Header */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                              <img
                                src={proj.thumbnail}
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                              
                              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                                  {proj.category}
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400">
                                  {proj.date}
                                </span>
                              </div>

                              <div className="absolute bottom-3 left-3 right-3">
                                <h4 className="text-base font-normal text-white font-display tracking-tight drop-shadow-md">
                                  {proj.title}
                                </h4>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                              <div className="space-y-2">
                                <p className="text-xs text-orange-400 font-mono">
                                  {proj.subtitle}
                                </p>
                                <p className="text-xs text-zinc-400 font-body leading-relaxed line-clamp-2">
                                  {proj.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {proj.tags.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] text-zinc-400"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                                <button
                                  type="button"
                                  onClick={() => setSelectedWebProject(proj)}
                                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs font-mono transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                                >
                                  <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>{t.dawDesigns.liveBtn}</span>
                                </button>

                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
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

                  {/* -------------------------------------------------------------
                      STAGE 03: PORTFOLIO WEB ENGINE
                  ------------------------------------------------------------- */}
                  {expandedProject === 'portfolio' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
                        <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed max-w-2xl">
                          {t.portfolioProject.description}
                        </p>

                        <a
                          href="https://github.com/mlunlop/portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-200 text-xs font-mono transition-colors shrink-0 self-start shadow-sm"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>{t.portfolioProject.viewRepo}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* 3 Apple Bento Spec Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-orange-400 block">
                            {t.portfolioProject.card1Title}
                          </span>
                          <p className="text-xs text-zinc-300 font-body leading-relaxed">
                            {t.portfolioProject.card1Desc}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-white block">
                            {t.portfolioProject.card2Title}
                          </span>
                          <p className="text-xs text-zinc-300 font-body leading-relaxed">
                            {t.portfolioProject.card2Desc}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block">
                            {t.portfolioProject.card3Title}
                          </span>
                          <p className="text-xs text-zinc-300 font-body leading-relaxed">
                            {t.portfolioProject.card3Desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
