import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ExternalLink,
  Eye,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { GithubIcon } from './Icons';
import { easeOutExpo, layoutSpring, defaultViewport, fadeUp } from '../utils/motion';

// Real visual assets from Bit-Party (Godot 4.7)
import bitPartyIcon from '../assets/projects/icon.png';
import powderBg from '../assets/projects/powder_panic_bg.webp';
import powderLogo from '../assets/projects/powder_panic_logo.webp';
import aztecBg from '../assets/projects/aztec_wrath_bg.webp';
import aztecLogo from '../assets/projects/aztec_wrath_logo.webp';
import towerBg from '../assets/projects/tower_drop_bg.webp';
import towerLogo from '../assets/projects/tower_drop_logo.webp';
import neonBg from '../assets/projects/neon_parry_bg.webp';
import neonLogo from '../assets/projects/neon_parry_logo.webp';

// DAW Web Designs Thumbnails & Component
import thumb2pac from '../assets/projects/daw/2pac-thumb.webp';
import thumbBmx from '../assets/projects/daw/bmx-thumb.webp';
import thumbGiardino from '../assets/projects/daw/giardino-thumb.webp';
import thumbJapan from '../assets/projects/daw/japan-thumb.webp';
import dawThumb from '../assets/projects/daw/daw-thumb.webp';
import portfolioThumb from '../assets/projects/portfolio-thumb.webp';
import howFarHomeLogo from '../assets/projects/howfarhome_logo.png';
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
    url: 'https://mlunlop-iezv.github.io/WEB-2PAC/',
    tags: {
      es: ['UI/UX Vintage', 'HTML5 Semántico', 'CSS Media Queries', 'Video Streaming'],
      en: ['Vintage UI/UX', 'Semantic HTML5', 'CSS Media Queries', 'Video Streaming'],
    },
  },
  'web-giardino': {
    thumbnail: thumbGiardino,
    url: 'https://mlunlop-iezv.github.io/WEB-GIARDINO-SEGRETO/',
    tags: {
      es: ['Diseño Editorial', 'CSS Grid & Flexbox', 'Formularios UX', 'Estética Gastronómica'],
      en: ['Editorial Layout', 'CSS Grid & Flexbox', 'UX Forms', 'Dining Aesthetics'],
    },
  },
  'web-bmx': {
    thumbnail: thumbBmx,
    url: 'https://mlunlop-iezv.github.io/WEB-BMX-VORTEX/',
    tags: {
      es: ['Microinteracciones UI', 'Scroll Progress', 'CSS Keyframes', 'Diseño Deportivo'],
      en: ['UI Micro-interactions', 'Scroll Progress', 'CSS Keyframes', 'Action Sports'],
    },
  },
  'web-japan': {
    thumbnail: thumbJapan,
    url: 'https://mlunlop-iezv.github.io/WEB-JAPAN/',
    tags: {
      es: ['Arquitectura de Información', 'Sistemas de Diseño UI', 'Multi-página', 'Diseño Responsive'],
      en: ['Information Architecture', 'UI Design Systems', 'Multi-page Layout', 'Responsive Design'],
    },
  },
};

type ProjectId = 'bit-party' | 'howfarhome' | 'daw-designs' | 'portfolio';

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
      eyebrow: language === 'es' ? 'Juego móvil · Godot 4.7' : 'Mobile game · Godot 4.7',
      title: t.bitParty.title,
      subtitle: t.bitParty.subtitle,
      tagline: language === 'es' ? '13 Minijuegos • Turno 24h • Shaders CRT' : '13 Minigames • 24h Turn • CRT Shaders',
      tags: ['Godot 4.7', 'GDScript', 'iOS & Android'],
      badge: language === 'es' ? 'En desarrollo' : 'In development',
      previewType: 'game' as const,
    },
    {
      id: 'howfarhome' as ProjectId,
      eyebrow: language === 'es' ? 'Web app · Datos geoespaciales' : 'Web app · Geospatial data',
      title: t.howFarHome.title,
      subtitle: t.howFarHome.subtitle,
      tagline: language === 'es' ? 'OSM • OCR de Mapillary • GitHub Actions' : 'OSM • Mapillary OCR • GitHub Actions',
      tags: ['React + Vite', 'Python', 'RapidOCR'],
      badge: null,
      previewType: 'howfarhome' as const,
    },
    {
      id: 'daw-designs' as ProjectId,
      eyebrow: language === 'es' ? 'Diseño web · UI/UX' : 'Web design · UI/UX',
      title: t.dawDesigns.title,
      subtitle: t.dawDesigns.subtitle,
      tagline: language === 'es' ? '4 Entregas • Maquetación Editorial • Grid & Flex' : '4 Deliveries • Editorial Layout • Grid & Flex',
      tags: ['HTML5 & CSS3', 'UI/UX Design', 'Responsive'],
      badge: null,
      previewType: 'web' as const,
    },
    {
      id: 'portfolio' as ProjectId,
      eyebrow: language === 'es' ? 'Arquitectura frontend' : 'Frontend architecture',
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
            PROJECT CARDS (APPLE PRODUCT TILES)
        ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {cards.map((card) => {
            const isExpanded = expandedProject === card.id;

            return (
              <motion.article
                key={card.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
                onClick={() => toggleProject(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleProject(card.id);
                  }
                }}
                className={`group surface-card relative flex flex-col overflow-hidden cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-orange-400 ${
                  isExpanded ? 'outline-1 outline-white/30' : ''
                }`}
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  {card.previewType === 'game' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={powderBg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="glass-dark relative z-10 w-16 h-16 rounded-[20px] p-2.5 flex items-center justify-center">
                        <img
                          src={bitPartyIcon}
                          alt="Bit-Party"
                          className="w-full h-full object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                    </div>
                  )}

                  {card.previewType === 'howfarhome' && (
                    <div className="relative w-full h-full flex items-center justify-center bg-[#1a1718]">
                      <img
                        src={howFarHomeLogo}
                        alt="HowFarHome?"
                        className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  )}

                  {card.previewType === 'web' && (
                    <img
                      src={dawThumb}
                      alt={language === 'es' ? 'Colección de diseño web DAW' : 'DAW web design collection'}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}

                  {card.previewType === 'portfolio' && (
                    <img
                      src={portfolioThumb}
                      alt={language === 'es' ? 'Interfaz del portfolio' : 'Portfolio interface'}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}

                  {/* Status badge — glass over imagery */}
                  {card.badge && (
                    <span className="glass-dark absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-medium text-label pointer-events-none">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <p className="text-[12px] font-medium text-label-tertiary">{card.eyebrow}</p>
                  <h3 className="mt-1.5 font-sans text-[19px] font-semibold leading-snug tracking-[-0.02em] text-label">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-label-secondary line-clamp-2">
                    {card.subtitle}
                  </p>
                  <p className="mt-4 text-[12px] text-label-tertiary">{card.tags.join(' · ')}</p>

                  <div className="mt-auto pt-5">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                        isExpanded ? 'text-orange-400' : 'text-label group-hover:text-orange-400'
                      }`}
                    >
                      {isExpanded
                        ? language === 'es' ? 'Ocultar detalles' : 'Hide details'
                        : language === 'es' ? 'Ver proyecto' : 'View project'}
                      <ChevronDown
                        aria-hidden="true"
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
                        }`}
                      />
                    </span>
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
                <div className="surface-card relative rounded-[32px] p-6 sm:p-8 md:p-10">

                  {/* Stage top bar */}
                  <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-hairline">
                    <h4 className="font-sans text-[17px] sm:text-lg font-semibold leading-snug tracking-[-0.016em] text-label">
                      {expandedProject === 'bit-party' && (language === 'es' ? 'Bit-Party — Videojuego móvil y arquitectura' : 'Bit-Party — Mobile game & architecture')}
                      {expandedProject === 'howfarhome' && t.howFarHome.stageTitle}
                      {expandedProject === 'daw-designs' && (language === 'es' ? 'Colección de diseño web — Interfaces interactivas' : 'Web design collection — Interactive interfaces')}
                      {expandedProject === 'portfolio' && (language === 'es' ? 'Portfolio personal — Arquitectura frontend' : 'Personal portfolio — Frontend architecture')}
                    </h4>

                    <button
                      type="button"
                      onClick={() => setExpandedProject(null)}
                      className="glass glass-pill cursor-pointer shrink-0"
                      title={language === 'es' ? 'Plegar vista' : 'Close view'}
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                      {language === 'es' ? 'Cerrar' : 'Close'}
                    </button>
                  </div>

                  {/* -------------------------------------------------------------
                      STAGE 01: BIT-PARTY
                  ------------------------------------------------------------- */}
                  {expandedProject === 'bit-party' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                      {/* Left: device + segmented control */}
                      <div className="lg:col-span-5 flex flex-col items-center">
                        {/* iOS segmented control (Liquid Glass track) */}
                        <div className="glass w-full max-w-[320px] mb-5 p-1 rounded-full grid grid-cols-4 gap-1">
                          {minigames.map((game, idx) => {
                            const isActive = activeMinigameIndex === idx;
                            return (
                              <button
                                key={game.id}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setActiveMinigameIndex(idx)}
                                className={`relative h-8 px-1 rounded-full text-[12px] font-medium text-center transition-colors cursor-pointer ${
                                  isActive ? 'text-zinc-950' : 'text-label-secondary hover:text-label'
                                }`}
                              >
                                {isActive && (
                                  <motion.div
                                    layoutId="segmentedMinigame"
                                    transition={layoutSpring}
                                    className="absolute inset-0 rounded-full bg-[#f5f5f7] shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                                  />
                                )}
                                <span className="relative z-10 block truncate">
                                  {game.title.split(' ')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Smartphone viewport */}
                        <div className="relative w-full max-w-[270px] aspect-[9/16] rounded-[36px] p-2 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                          {/* Dynamic island */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-16 h-[18px] rounded-full bg-black" />

                          {/* Inner screen */}
                          <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-zinc-950 flex flex-col justify-between">
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

                            {/* Top HUD */}
                            <div className="relative z-10 pt-11 px-3 flex items-center justify-between">
                              <span className="glass-dark inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-medium text-label">
                                {currentMinigame.title}
                              </span>
                              <span className="glass-dark inline-flex items-center h-6 px-2 rounded-full text-[11px] text-label-secondary tabular-nums">
                                {activeMinigameIndex + 1}/4
                              </span>
                            </div>

                            {/* Center logo */}
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

                            {/* Bottom mechanic — glass sheet over the game */}
                            <div className="relative z-10 p-2.5">
                              <div className="glass-dark p-3 rounded-[20px]">
                                <p className="text-[12px] leading-snug text-label">
                                  {currentMinigame.mechanic}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <span className="mt-4 text-[12px] text-label-tertiary text-center">
                          {language === 'es' ? 'Elige un minijuego arriba para cambiar la pantalla' : 'Pick a minigame above to switch the screen'}
                        </span>
                      </div>

                      {/* Right: specs */}
                      <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-3">
                          <p className="text-[13px] font-semibold text-orange-400">
                            {language === 'es' ? 'Ingeniería y arquitectura' : 'Engineering & architecture'}
                          </p>
                          <h4 className="font-sans text-[28px] sm:text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-label">
                            {language === 'es' ? 'Party game asíncrono en Godot 4.7' : 'Asynchronous party game in Godot 4.7'}
                          </h4>
                          <p className="text-base sm:text-[17px] leading-relaxed text-label-secondary">
                            {t.bitParty.overview}
                          </p>
                        </div>

                        {/* Big stats */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: '24h', label: language === 'es' ? 'Turno diario' : 'Daily turn', note: language === 'es' ? 'Partidas entre amigos sin coincidir en horario' : 'Play with friends without matching schedules' },
                            { value: '13', label: language === 'es' ? 'Minijuegos' : 'Minigames', note: language === 'es' ? 'Físicas 2D, shaders CRT y control táctil' : '2D physics, CRT shaders & touch controls' },
                            { value: '4.7', label: 'Godot Engine', note: language === 'es' ? 'GDScript con Viewports aislados' : 'GDScript with isolated viewports' },
                          ].map((stat) => (
                            <div key={stat.label} className="rounded-2xl bg-white/[0.04] p-3.5 sm:p-5">
                              <p className="font-sans text-[28px] sm:text-[40px] font-semibold leading-none tracking-[-0.04em] text-label">
                                {stat.value}
                              </p>
                              <p className="mt-2.5 text-[13px] font-medium leading-snug text-label">{stat.label}</p>
                              <p className="mt-1 hidden sm:block text-[12px] leading-snug text-label-tertiary">{stat.note}</p>
                            </div>
                          ))}
                        </div>

                        {/* Daily loop */}
                        <div className="space-y-3">
                          <p className="text-[13px] font-medium text-label-secondary">
                            {language === 'es' ? 'Bucle de ronda diaria (24 horas)' : 'Daily round loop (24 hours)'}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {t.bitParty.dailyLoopSteps.map((step) => (
                              <div key={step.phase} className="rounded-2xl bg-white/[0.03] p-4">
                                <p className="text-[12px] font-medium text-label-tertiary tabular-nums">{step.phase}</p>
                                <h5 className="mt-1.5 font-sans text-[15px] font-semibold tracking-[-0.01em] text-label">
                                  {step.title}
                                </h5>
                                <p className="mt-1 text-[13px] leading-relaxed text-label-secondary">
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
                      STAGE: HOWFARHOME?
                  ------------------------------------------------------------- */}
                  {expandedProject === 'howfarhome' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                          <p className="text-[13px] font-semibold text-orange-400">
                            {language === 'es' ? 'Datos y geocodificación' : 'Data & geocoding'}
                          </p>
                          <h4 className="font-sans text-[28px] sm:text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-label">
                            {t.howFarHome.headline}
                          </h4>
                          <p className="text-base sm:text-[17px] leading-relaxed text-label-secondary">
                            {t.howFarHome.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap md:flex-col gap-2 shrink-0 self-start">
                          <a
                            href="https://howfarhome.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            {t.howFarHome.liveBtn}
                          </a>
                          <a
                            href="https://github.com/mlunlop/HowFarHome"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass glass-pill h-10 px-[18px] text-sm"
                          >
                            <GithubIcon className="w-4 h-4" />
                            {t.howFarHome.viewRepo}
                          </a>
                        </div>
                      </div>

                      {/* Big stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {t.howFarHome.stats.map((stat) => (
                          <div key={stat.label} className="rounded-2xl bg-white/[0.04] p-5">
                            <p className="font-sans text-[34px] sm:text-[40px] font-semibold leading-none tracking-[-0.04em] text-label tabular-nums">
                              {stat.value}
                            </p>
                            <p className="mt-2.5 text-[13px] font-medium text-label">{stat.label}</p>
                            <p className="mt-1 text-[12px] leading-snug text-label-tertiary">{stat.note}</p>
                          </div>
                        ))}
                      </div>

                      {/* Pipeline */}
                      <div className="space-y-3">
                        <p className="text-[13px] font-medium text-label-secondary">
                          {t.howFarHome.pipelineLabel.replace(/:$/, '')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {t.howFarHome.pipeline.map((item) => (
                            <div key={item.step} className="rounded-2xl bg-white/[0.03] p-4">
                              <p className="text-[12px] font-medium text-label-tertiary tabular-nums">{item.step}</p>
                              <h5 className="mt-1.5 font-sans text-[15px] font-semibold tracking-[-0.01em] text-label">
                                {item.title}
                              </h5>
                              <p className="mt-1 text-[13px] leading-relaxed text-label-secondary">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      STAGE 02: DAW WEB DESIGNS
                  ------------------------------------------------------------- */}
                  {expandedProject === 'daw-designs' && (
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <p className="text-base sm:text-[17px] leading-relaxed text-label-secondary max-w-2xl">
                          {t.dawDesigns.intro}{' '}
                          <strong className="font-semibold text-label">{t.dawDesigns.introHighlight}</strong>{' '}
                          {t.dawDesigns.introEnd}
                        </p>
                        <span className="text-[13px] text-label-tertiary shrink-0">
                          {t.dawDesigns.counter}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {dawProjects.map((proj) => (
                          <article
                            key={proj.id}
                            className="group/item rounded-[24px] bg-white/[0.04] overflow-hidden flex flex-col"
                          >
                            {/* 16:9 thumbnail */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                              <div className="absolute inset-0 bg-zinc-800/60 animate-pulse pointer-events-none" />
                              <img
                                src={proj.thumbnail}
                                alt={proj.title}
                                className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-[1.03]"
                                loading="lazy"
                              />
                            </div>

                            {/* Body */}
                            <div className="p-5 sm:p-6 flex-1 flex flex-col">
                              <p className="text-[12px] font-medium text-label-tertiary">
                                {proj.category} · {proj.date}
                              </p>
                              <h4 className="mt-1.5 font-sans text-[17px] font-semibold tracking-[-0.016em] text-label">
                                {proj.title}
                              </h4>
                              <p className="mt-1.5 text-sm leading-relaxed text-label-secondary line-clamp-2">
                                {proj.description}
                              </p>
                              <p className="mt-3 text-[12px] text-label-tertiary">{proj.tags.join(' · ')}</p>

                              <div className="mt-auto pt-5 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedWebProject(proj)}
                                  className="btn-primary h-9 px-4 text-[13px] cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                                  {t.dawDesigns.liveBtn}
                                </button>

                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="glass glass-pill h-9 w-9 px-0"
                                  title={language === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}
                                  aria-label={language === 'es' ? `Abrir ${proj.title} en pestaña nueva` : `Open ${proj.title} in new tab`}
                                >
                                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                </a>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      STAGE 03: PORTFOLIO WEB ENGINE
                  ------------------------------------------------------------- */}
                  {expandedProject === 'portfolio' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <p className="text-base sm:text-[17px] leading-relaxed text-label-secondary max-w-2xl">
                          {t.portfolioProject.description}
                        </p>

                        <a
                          href="https://github.com/mlunlop/portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary shrink-0 self-start"
                        >
                          <GithubIcon className="w-4 h-4" />
                          {t.portfolioProject.viewRepo}
                        </a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { title: t.portfolioProject.card1Title, desc: t.portfolioProject.card1Desc },
                          { title: t.portfolioProject.card2Title, desc: t.portfolioProject.card2Desc },
                          { title: t.portfolioProject.card3Title, desc: t.portfolioProject.card3Desc },
                        ].map((spec) => (
                          <div key={spec.title} className="rounded-2xl bg-white/[0.04] p-5">
                            <h5 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-label">
                              {spec.title}
                            </h5>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-label-secondary">
                              {spec.desc}
                            </p>
                          </div>
                        ))}
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
