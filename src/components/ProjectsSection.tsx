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
} from 'lucide-react';
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

interface VisualMinigame {
  id: string;
  title: string;
  genre: string;
  bg: string;
  logo: string;
  mechanic: string;
  shader: string;
  scoreLabel: string;
}

const VISUAL_MINIGAMES: VisualMinigame[] = [
  {
    id: 'powder_panic',
    title: 'Powder Panic',
    genre: 'Pirate Galleon Shootout',
    bg: powderBg,
    logo: powderLogo,
    mechanic: 'Dispara a los bucaneros emergentes y cofres dorados para encadenar combos sin tocar los barriles de pólvora.',
    shader: 'cartoon_explosion & prop_shadow.gdshader',
    scoreLabel: 'COMBO x4 // +350 PTS',
  },
  {
    id: 'aztec_wrath',
    title: 'Aztec Wrath',
    genre: '16-Bit 4-Lane Temple Defense',
    bg: aztecBg,
    logo: aztecLogo,
    mechanic: 'Defiende el altar con el tirachinas ceremonial, sobrecarga el Orbe Solar y arriesga en el borde x4.',
    shader: 'State Machine & Lane Spawner',
    scoreLabel: 'ALTAR x4 // +820 PTS',
  },
  {
    id: 'tower_drop',
    title: 'Tower Drop',
    genre: 'Physics Skyscraper Builder',
    bg: towerBg,
    logo: towerLogo,
    mechanic: 'Alinea la grúa y apila bloques modulares con físicas en tiempo real manteniendo el equilibrio del rascacielos.',
    shader: 'RigidBody2D & pixel_rotate.gdshader',
    scoreLabel: 'ALTURA: 42M // PERFECT',
  },
  {
    id: 'neon_parry',
    title: 'Neon Parry',
    genre: 'Directional Timing Trial',
    bg: neonBg,
    logo: neonLogo,
    mechanic: 'Desvía proyectiles en 3 direcciones con timing milimétrico dentro del anillo de parry.',
    shader: 'sword_slash & crt.gdshader',
    scoreLabel: 'PARRY STREAK: 18',
  },
];

const DAILY_LOOP_STEPS = [
  {
    phase: '01',
    title: 'Fase de Tablero',
    icon: Dices,
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    description:
      'Cada jugador entra cuando puede a lo largo del día, tira el dado y cae en casillas de monedas, eventos, trampas o compra de estrella.',
  },
  {
    phase: '02',
    title: 'Fase de Minijuego',
    icon: Gamepad2,
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    description:
      'Tras mover en el tablero, el jugador disputa el minijuego de la ronda en solitario para registrar su puntuación.',
  },
  {
    phase: '03',
    title: 'Cierre de Ronda (24h)',
    icon: Trophy,
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    description:
      'Cuando todos juegan (o tras 24h máximas con turno automático de CPU), se reparten monedas según el ranking y arranca la siguiente ronda.',
  },
];

export function ProjectsSection() {
  // Accordion state: 'bit-party' open by default
  const [openProject, setOpenProject] = useState<string | null>('bit-party');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  const currentMinigame = VISUAL_MINIGAMES[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % VISUAL_MINIGAMES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + VISUAL_MINIGAMES.length) % VISUAL_MINIGAMES.length);
  };

  return (
    <section id="proyectos" className="py-20 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>INGENIERÍA DE SOFTWARE & INDIE GAME DEV // PROYECTOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Proyectos Destacados
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-body">
            Haz clic en cada proyecto para desplegar su arquitectura técnica, capturas y detalles de implementación.
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
                {/* Number & Pixel Art Character Icon */}
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
                      INDIE GAME DEV
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 " />
                      En Desarrollo (iOS & Android)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-[10px]">
                      <Lock className="w-2.5 h-2.5" />
                      Repo Privado
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    Bit-Party
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body line-clamp-1">
                    Juego móvil vertical de tablero y 13 minijuegos en pixel art estilo Mario Party (1 turno asíncrono al día).
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
                    {/* Smartphone Vertical Frame (720x1280 proportion) */}
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

                        {/* CRT Scanline Subtle Overlay */}
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
                            RONDA DIARIA
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
                            <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 mb-0.5">
                            </div>
                            <p className="text-[11px] text-zinc-300 font-body leading-snug">
                              {currentMinigame.mechanic}
                            </p>
                          </div>
                        </div>

                        {/* Prev / Next Controls on Screen Edges */}
                        <button
                          type="button"
                          onClick={prevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label="Minijuego anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center cursor-pointer transition-colors"
                          aria-label="Siguiente minijuego"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail Selector Bar below phone */}
                    <div className="flex items-center gap-2 mt-4">
                      {VISUAL_MINIGAMES.map((game, idx) => (
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
                      Arte y logos in-game reales (Selecciona para cambiar escena)
                    </span>
                  </div>

                  {/* Right Column (7 cols): Concept, Daily Loop & Godot Architecture */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Concept Header */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>CONCEPTO & ARQUITECTURA DE JUEGO // LANZAMIENTO iOS & ANDROID</span>
                      </div>
                      <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed">
                        Juego móvil vertical de tablero y minijuegos en pixel art estilo <strong className="text-zinc-100">Mario Party</strong>, diseñado para jugarse de forma <strong className="text-zinc-100">asíncrona entre amigos con 1 turno al día</strong>. El objetivo es conseguir la mayor cantidad de estrellas comprándolas en el tablero con las monedas ganadas.
                      </p>
                    </div>

                    {/* 3 Multiplayer Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-orange-400 font-mono text-xs mb-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>SALAS PRIVADAS</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          Partidas de hasta <strong>5 jugadores</strong> mediante código de invitación.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs mb-1">
                          <Bot className="w-3.5 h-3.5" />
                          <span>SOPORTE BOTS</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          Relleno de huecos libres con <strong>CPUs</strong> y turno automático a las 24h.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs mb-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>13 MINIJUEGOS</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-body">
                          Catálogo arcade propio con físicas 2D, shaders CRT y control táctil.
                        </p>
                      </div>
                    </div>

                    {/* Daily Round Loop (3 Phases) */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        <span>Bucle de Ronda Diaria:</span>
                      </h4>

                      <div className="space-y-2.5">
                        {DAILY_LOOP_STEPS.map((step) => {
                          const Icon = step.icon;
                          return (
                            <div
                              key={step.phase}
                              className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/90 flex items-start gap-3.5"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${step.accent}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-zinc-500">
                                    FASE {step.phase}
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
                      DESARROLLO WEB
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      En Producción
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    Portfolio Personal
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body line-clamp-1">
                    SPA de alto rendimiento con visor documental PDF a medida, diseño industrial y protección anti-spam.
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
                    Desarrollo integral de esta aplicación web concebida bajo una estética de <strong className="text-zinc-100">blueprint técnico</strong>. Construida sin plantillas prefabricadas priorizando velocidad de carga, tipado estricto y experiencia de usuario.
                  </p>

                  <a
                    href="https://github.com/mlunlop/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs font-mono transition-colors shrink-0 self-start"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Ver Repositorio en GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
                      <Layers className="w-4 h-4" />
                      <span>ARQUITECTURA UI</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      React 19 + TypeScript estricto + Tailwind CSS v4 con tokens tipográficos propios y retícula técnica CAD.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-400 font-mono text-xs">
                      <FileText className="w-4 h-4" />
                      <span>VISOR DOCUMENTAL PDF</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      Modal reutilizable con ocultación de barras nativas del navegador y descarga directa para CV y títulos oficiales.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>PROTECCIÓN ANTI-SPAM</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      Integración serverless con Web3Forms mediante variables de entorno, trampa <em>honeypot</em> y filtro heurístico temporal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
