import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Globe,
} from 'lucide-react';
import { layoutSpring } from '../utils/motion';
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
        return 'w-[375px] max-w-full h-full rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_30px_60px_-20px_rgba(0,0,0,0.9)] overflow-hidden';
      case 'tablet':
        return 'w-[768px] max-w-full h-full rounded-[22px] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_30px_60px_-20px_rgba(0,0,0,0.9)] overflow-hidden';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none';
    }
  };

  const devices: { id: DeviceMode; label: string; title: string; Icon: typeof Monitor }[] = [
    { id: 'desktop', label: 'Desktop', title: t.desktopView, Icon: Monitor },
    { id: 'tablet', label: 'Tablet', title: t.tabletView, Icon: Tablet },
    { id: 'mobile', label: language === 'es' ? 'Móvil' : 'Mobile', title: t.mobileView, Icon: Smartphone },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl animate-in fade-in duration-200 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="surface-card relative w-full max-w-[96vw] h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-hairline shrink-0">
          {/* Project info */}
          <div className="flex items-center gap-3 min-w-0">
            <Globe className="w-4 h-4 shrink-0 text-orange-400" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-label truncate">
                {project.title}
              </h3>
              <p className="text-[12px] text-label-tertiary truncate">
                {project.category}
                <span className="hidden md:inline"> · {project.date}</span>
              </p>
            </div>
          </div>

          {/* Device switcher — iOS segmented control */}
          <div className="glass p-1 rounded-full flex items-center gap-0.5" role="group" aria-label={language === 'es' ? 'Tamaño de pantalla' : 'Screen size'}>
            {devices.map(({ id, label, title, Icon }) => {
              const isActive = device === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDevice(id)}
                  title={title}
                  aria-pressed={isActive}
                  className={`relative h-7 px-3 rounded-full inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                    isActive ? 'text-zinc-950' : 'text-label-secondary hover:text-label'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="webPreviewDevice"
                      transition={layoutSpring}
                      className="absolute inset-0 rounded-full bg-[#f5f5f7] shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                  <span className="relative z-10 hidden md:inline">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReload}
              className="glass glass-pill h-9 w-9 px-0 cursor-pointer"
              title={t.reload}
              aria-label={t.reload}
            >
              <RotateCw className="w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-9 px-3.5 text-[13px]"
              title={t.openTab}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              {language === 'es' ? 'Abrir fuera' : 'Open external'}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="glass glass-pill h-9 w-9 px-0 cursor-pointer"
              title={t.close}
              aria-label={t.close}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative flex-1 bg-[#121214] flex items-center justify-center overflow-auto p-0 sm:p-3">
          <div
            className={`transition-all duration-300 relative bg-white flex flex-col overflow-hidden ${getDeviceStyle()}`}
          >
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
