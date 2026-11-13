import { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { PdfSkeleton } from './skeletons/PdfSkeleton';

export interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  downloadName?: string;
  subtitle?: string;
}

export function PdfViewerModal({
  isOpen,
  onClose,
  title,
  pdfUrl,
  downloadName = 'documento.pdf',
  subtitle,
}: PdfViewerModalProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].modals.pdf;
  const displaySubtitle = subtitle || t.defaultSubtitle;
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press and reset loading state on open
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
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
  }, [isOpen, pdfUrl, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="surface-card relative w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-hairline shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-4 h-4 shrink-0 text-orange-400" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-label truncate">
                {title}
              </h3>
              <p className="text-[12px] text-label-tertiary truncate">{displaySubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download={downloadName}
              className="btn-primary h-9 px-3.5 text-[13px]"
              title={t.download}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{t.download}</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-pill h-9 hidden sm:inline-flex"
              title={t.openNewTab}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              {t.openNewTab}
            </a>

            <button
              type="button"
              onClick={onClose}
              className="glass glass-pill h-9 w-9 px-0 cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* PDF frame with skeleton loader */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-[#121214]">
          <div
            className={`absolute inset-0 z-20 transition-opacity duration-500 ease-out ${
              isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <PdfSkeleton title={title} language={language} />
          </div>

          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title={title}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0"
          />

          {/* Mobile fallback */}
          <div className="sm:hidden glass-dark absolute bottom-3 inset-x-3 px-4 py-2.5 rounded-2xl text-[12px] text-label-secondary flex items-center justify-between">
            <span>{language === 'es' ? '¿Problemas de vista previa?' : 'Preview issues?'}</span>
            <a href={pdfUrl} download={downloadName} className="ml-2 font-medium text-orange-400">
              {language === 'es' ? 'Descargar' : 'Download'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
