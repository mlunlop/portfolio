import { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Globe,
  Maximize2,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { WebsiteSkeleton } from './skeletons/WebsiteSkeleton';

export interface WebProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url: string;
  thumbnail: string;
  accentColor: string;
  category: string;
  date: string;
}

interface WebPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WebProject | null;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function WebPreviewModal({
  isOpen,
  onClose,
  project,
}: WebPreviewModalProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].modals.web;

  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  // Reset state when modal opens or project changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setDevice('desktop');
      setKey((prev) => prev + 1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const handleReload = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  // Device container sizing
  const getDeviceStyle = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] max-w-full h-full rounded-2xl border-2 border-zinc-700 shadow-2xl overflow-hidden';
      case 'tablet':
        return 'w-[768px] max-w-full h-full rounded-2xl border-2 border-zinc-700 shadow-2xl overflow-hidden';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[96vw] h-[94vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 shrink-0">
          {/* Project Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-normal text-zinc-100 truncate font-display tracking-tight">
                  {project.title}
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {project.category}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  {project.date}
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 truncate">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Device Switcher (Desktop, Tablet, Mobile) */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 gap-0.5">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              title={t.desktopView}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                device === 'desktop'
                  ? 'bg-orange-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              title={t.tabletView}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                device === 'tablet'
                  ? 'bg-orange-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              title={t.mobileView}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                device === 'mobile'
                  ? 'bg-orange-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{language === 'es' ? 'Móvil' : 'Mobile'}</span>
            </button>
          </div>

          {/* Action buttons (Reload, Open in New Tab, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleReload}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              title={t.reload}
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:white font-mono text-xs border border-zinc-700 transition-all cursor-pointer"
              title={t.openTab}
            >
              <Maximize2 className="w-3.5 h-3.5 hidden sm:inline" />
              <span>{language === 'es' ? 'Abrir fuera' : 'Open external'}</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Frame Container */}
        <div className="relative flex-1 bg-zinc-950 flex items-center justify-center overflow-auto p-0 sm:p-2">
          {/* Device Mockup Wrapper */}
          <div
            className={`transition-all duration-300 relative bg-white flex flex-col overflow-hidden ${getDeviceStyle()}`}
          >
            {/* Elegant Website Skeleton Loader */}
            <div
              className={`absolute inset-0 z-20 transition-opacity duration-500 ease-out ${
                isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <WebsiteSkeleton
                projectTitle={project.title}
                projectUrl={project.url}
                thumbnailUrl={project.thumbnail}
                device={device}
                language={language}
              />
            </div>

            <iframe
              key={key}
              src={project.url}
              title={project.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
