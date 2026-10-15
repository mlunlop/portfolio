import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe } from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { easeOutExpo } from '../utils/motion';

import logoImg from '../assets/logo.webp';

export function Navbar() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = TRANSLATIONS[language].nav;
  const tModal = TRANSLATIONS[language].modals.pdf;

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav className="pointer-events-auto flex items-center justify-between gap-2.5 sm:gap-6 px-3.5 sm:px-6 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 shadow-2xl shadow-black/50 text-sm max-w-4xl w-full">
          {/* Brand / Logo */}
          <a 
            href="#" 
            className="flex items-center transition-opacity hover:opacity-80 active:scale-95 shrink-0 py-0.5"
            aria-label="Mario Luna"
          >
            <img 
              src={logoImg} 
              alt="Mario Luna" 
              className="h-3.5 sm:h-4 w-auto object-contain"
            />
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium">
            <a href="#experiencia" className="hover:text-zinc-100 transition-colors">
              {t.experience}
            </a>
            <a href="#certificaciones" className="hover:text-zinc-100 transition-colors">
              {t.education}
            </a>
            <a href="#proyectos" className="hover:text-zinc-100 transition-colors">
              {t.projects}
            </a>
            <a href="#stack" className="hover:text-zinc-100 transition-colors">
              {t.stack}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 border border-zinc-700/80 transition-colors font-mono font-medium text-xs shadow-sm cursor-pointer"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </motion.button>

            {/* View CV Button */}
            <motion.button
              onClick={() => setIsCvOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 border border-zinc-700/80 transition-colors font-medium text-xs shadow-sm cursor-pointer"
              title={t.cvTitle}
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.cv}</span>
            </motion.button>

            {/* Scroll to Contact CTA */}
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white transition-colors font-semibold text-xs shadow-sm"
              title={t.contactTitle}
            >
              <span>{t.contact}</span>
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* Reusable PDF Modal for CV */}
      <PdfViewerModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        title={tModal.cvTitle}
        pdfUrl="/docs/CV_Mario_Luna.pdf"
        downloadName="CV_Mario_Luna_Lopez.pdf"
        subtitle={tModal.cvSubtitle}
      />
    </>
  );
}
