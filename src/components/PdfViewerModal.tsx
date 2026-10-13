import { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';

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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-zinc-900 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-normal text-zinc-100 truncate font-display tracking-tight">
                {title}
              </h3>
              <p className="text-[11px] font-mono text-zinc-500 truncate">
                {displaySubtitle}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <a
              href={pdfUrl}
              download={downloadName}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-medium text-xs shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
              title={t.download}
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">{t.download}</span>
            </a>

            {/* Open in new tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs border border-zinc-700 transition-colors"
              title={t.openNewTab}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.openNewTab}</span>
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 border border-zinc-700/80 transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Frame Viewer */}
        <div className="relative flex-1 bg-zinc-900 w-full h-full overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title={title}
            className="w-full h-full border-0"
          />

          {/* Mobile / Fallback info bar */}
          <div className="sm:hidden absolute bottom-2 inset-x-2 p-2 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 text-center flex items-center justify-between">
            <span>{language === 'es' ? '¿Problemas de vista previa?' : 'Preview issues?'}</span>
            <a
              href={pdfUrl}
              download={downloadName}
              className="text-orange-400 underline font-semibold ml-2"
            >
              {language === 'es' ? 'Descargar archivo' : 'Download file'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
