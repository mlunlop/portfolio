import { motion } from 'framer-motion';
import {
  Database,
  Layout,
  TerminalSquare,
  Sparkles,
  Layers,
  MonitorSmartphone,
  Brain,
} from 'lucide-react';
import {
  siPython,
  siLaravel,
  siPandas,
  siReact,
  siTypescript,
  siTailwindcss,
  siAngular,
  siDocker,
  siDebian,
  siNginx,
  siGit,
  siApple,
  siGnubash,
  siHtml5,
  siJavascript,
} from '../data/simpleIcons';
import { JavaIcon } from './Icons';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { defaultViewport, fadeUp, easeOutExpo } from '../utils/motion';
import LogoLoop, { type LogoItem } from './LogoLoop';
import AnimatedList, { type AnimatedListItem } from './AnimatedList';
import { SimpleIconSvg } from './SimpleIconSvg';

export function TechStack() {
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].techStack;

  const getIcon = (category: string) => {
    if (category.toLowerCase().includes('data') || category.toLowerCase().includes('ml')) return Database;
    if (category.toLowerCase().includes('front') || category.toLowerCase().includes('ui') || category.toLowerCase().includes('web')) return Layout;
    return TerminalSquare;
  };

  // Helper to provide clean items without descriptions or version pills
  const getCategoryItems = (categoryTitle: string, lang: 'es' | 'en'): AnimatedListItem[] => {
    const isData = categoryTitle.toLowerCase().includes('data') || categoryTitle.toLowerCase().includes('ml');
    const isFront = categoryTitle.toLowerCase().includes('front') || categoryTitle.toLowerCase().includes('ui') || categoryTitle.toLowerCase().includes('web');

    if (isData) {
      return [
        {
          id: 'python',
          title: 'Python',
          color: '#3776ab',
          icon: <SimpleIconSvg icon={siPython} size={17} color="currentColor" />
        },
        {
          id: 'ml',
          title: 'Machine Learning',
          meta: lang === 'es' ? 'En progreso' : 'In progress',
          color: '#a855f7',
          icon: <Brain className="w-4 h-4" />
        },
        {
          id: 'pandas',
          title: 'Pandas & NumPy',
          color: '#38bdf8',
          icon: <SimpleIconSvg icon={siPandas} size={17} color="currentColor" />
        },
        {
          id: 'cleaning',
          title: 'Data Cleaning & Validation',
          color: '#fbbf24',
          icon: <Sparkles className="w-4 h-4" />
        },
        {
          id: 'partitioning',
          title: 'Dataset Partitioning',
          color: '#34d399',
          icon: <Layers className="w-4 h-4" />
        }
      ];
    }

    if (isFront) {
      return [
        {
          id: 'react-ts',
          title: 'React 19 & TypeScript',
          color: '#61dafb',
          icon: <SimpleIconSvg icon={siReact} size={17} color="currentColor" />
        },
        {
          id: 'javascript',
          title: 'JavaScript',
          color: '#f7df1e',
          icon: <SimpleIconSvg icon={siJavascript} size={17} color="currentColor" />
        },
        {
          id: 'html-css',
          title: 'HTML5 / CSS3',
          color: '#e34f26',
          icon: <SimpleIconSvg icon={siHtml5} size={17} color="currentColor" />
        },
        {
          id: 'java',
          title: 'Java',
          color: '#ea580c',
          icon: <JavaIcon className="w-4 h-4" />
        },
        {
          id: 'tailwind',
          title: 'Tailwind CSS v4',
          color: '#06b6d4',
          icon: <SimpleIconSvg icon={siTailwindcss} size={17} color="currentColor" />
        },
        {
          id: 'angular-ionic',
          title: 'Angular & Ionic / Capacitor',
          color: '#dd0031',
          icon: <SimpleIconSvg icon={siAngular} size={17} color="currentColor" />
        },
        {
          id: 'laravel',
          title: 'Laravel',
          color: '#ff2d20',
          icon: <SimpleIconSvg icon={siLaravel} size={17} color="currentColor" />
        },
        {
          id: 'responsive',
          title: 'Responsive Design',
          color: '#10b981',
          icon: <MonitorSmartphone className="w-4 h-4" />
        }
      ];
    }

    // Sistemas & DevOps
    return [
      {
        id: 'linux',
        title: 'Linux SysAdmin (Debian)',
        color: '#d70a53',
        icon: <SimpleIconSvg icon={siDebian} size={17} color="currentColor" />
      },
      {
        id: 'nginx',
        title: 'Nginx Web Server',
        color: '#009639',
        icon: <SimpleIconSvg icon={siNginx} size={17} color="currentColor" />
      },
      {
        id: 'bash',
        title: 'Bash Scripting',
        color: '#4eaa25',
        icon: <SimpleIconSvg icon={siGnubash} size={17} color="currentColor" />
      },
      {
        id: 'docker',
        title: 'Docker Containers',
        color: '#2496ed',
        icon: <SimpleIconSvg icon={siDocker} size={17} color="currentColor" />
      },
      {
        id: 'git',
        title: 'Git & CI/CD',
        color: '#f05032',
        icon: <SimpleIconSvg icon={siGit} size={17} color="currentColor" />
      },
      {
        id: 'apple-atlas',
        title: 'Apple Atlas Diagnostics',
        color: '#e4e4e7',
        icon: <SimpleIconSvg icon={siApple} size={17} color="currentColor" />
      }
    ];
  };

  // Curated stack items for Apple-style continuous LogoLoop
  const stackLogos: LogoItem[] = [
    {
      title: 'React 19',
      hoverColor: '#61dafb',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-sky-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siReact} size={14} color="currentColor" className="text-zinc-400 group-hover:text-sky-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">React 19</span>
        </div>
      ),
    },
    {
      title: 'Python',
      hoverColor: '#3776ab',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siPython} size={14} color="currentColor" className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Python</span>
        </div>
      ),
    },
    {
      title: 'TypeScript',
      hoverColor: '#38bdf8',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siTypescript} size={14} color="currentColor" className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">TypeScript</span>
        </div>
      ),
    },
    {
      title: 'JavaScript',
      hoverColor: '#f7df1e',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-yellow-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siJavascript} size={14} color="currentColor" className="text-zinc-400 group-hover:text-yellow-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">JavaScript</span>
        </div>
      ),
    },
    {
      title: 'HTML5 & CSS3',
      hoverColor: '#e34f26',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siHtml5} size={14} color="currentColor" className="text-zinc-400 group-hover:text-orange-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">HTML5 / CSS</span>
        </div>
      ),
    },
    {
      title: 'Java',
      hoverColor: '#ea580c',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-orange-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <JavaIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Java</span>
        </div>
      ),
    },
    {
      title: 'Tailwind CSS v4',
      hoverColor: '#06b6d4',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siTailwindcss} size={14} color="currentColor" className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Tailwind v4</span>
        </div>
      ),
    },
    {
      title: 'Laravel',
      hoverColor: '#ff2d20',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-red-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siLaravel} size={14} color="currentColor" className="text-zinc-400 group-hover:text-red-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Laravel</span>
        </div>
      ),
    },
    {
      title: 'Machine Learning',
      hoverColor: '#a855f7',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-purple-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <Brain className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Machine Learning</span>
        </div>
      ),
    },
    {
      title: 'Linux (Debian)',
      hoverColor: '#d70a53',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-rose-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siDebian} size={14} color="currentColor" className="text-zinc-400 group-hover:text-rose-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Debian Linux</span>
        </div>
      ),
    },
    {
      title: 'Docker',
      hoverColor: '#2496ed',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-sky-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siDocker} size={14} color="currentColor" className="text-zinc-400 group-hover:text-sky-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Docker</span>
        </div>
      ),
    },
    {
      title: 'Pandas & NumPy',
      hoverColor: '#38bdf8',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siPandas} size={14} color="currentColor" className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Pandas & NumPy</span>
        </div>
      ),
    },
    {
      title: 'Apple Atlas Diagnostics',
      hoverColor: '#e4e4e7',
      node: (
        <div data-cursor-target="" data-cursor-magnetic="true" className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-500/50 hover:bg-zinc-800/80 transition-all shadow-sm">
          <SimpleIconSvg icon={siApple} size={14} color="currentColor" className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          <span className="font-mono text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Apple Atlas Std</span>
        </div>
      ),
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-24 md:py-32 border-t border-zinc-800/80 bg-zinc-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
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

        {/* Apple-style Continuous LogoLoop Marquee with Hover Pause */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mb-8 sm:mb-14 p-1.5 sm:p-2 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-sm"
        >
          <LogoLoop
            logos={stackLogos}
            speed={24}
            gap={12}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutWidth={40}
            className="py-1.5 sm:py-2"
          />
        </motion.div>

        {/* Categorized Tech Stack Columns using AnimatedList (Matching Capture Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {data.skills.map((category, idx) => {
            const Icon = getIcon(category.category);
            const items = getCategoryItems(category.category, language);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: easeOutExpo }}
                className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-3.5 sm:p-5 backdrop-blur-xl shadow-xl shadow-black/60 hover:border-zinc-700/80 transition-all duration-300"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 px-1 pt-1 pb-2 border-b border-zinc-800/70">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shadow-sm shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-zinc-100 font-sans tracking-tight truncate">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 font-mono text-[10px] sm:text-[11px] shrink-0">
                    {items.length} {language === 'es' ? 'skills' : 'tools'}
                  </span>
                </div>

                {/* AnimatedList inside the column */}
                <AnimatedList
                  items={items}
                  theme="dark"
                  radius={12}
                  gap={7}
                  maxHeight="none"
                  showGradients={false}
                  fadeSize={0}
                  displayScrollbar={false}
                  frame={false}
                  accentColor="#f97316"
                  animation="pop"
                  className="w-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
