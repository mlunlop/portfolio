import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Globe, Menu, X } from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { easeOutExpo } from '../utils/motion';
import GlassSurface from './GlassSurface';
import { PillNav, type PillNavItem } from './PillNav';

import logoImg from '../assets/logo.webp';

const SECTION_IDS = ['experiencia', 'certificaciones', 'proyectos', 'stack'];

export function Navbar() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { language, toggleLanguage } = useLanguage();
  const t = TRANSLATIONS[language].nav;
  const tModal = TRANSLATIONS[language].modals.pdf;

  // Scroll spy to detect active section dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Close to the top (Hero)
      if (scrollY < 160) {
        setActiveSection('');
        return;
      }

      const threshold = 220;
      let current = '';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = `#${id}`;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: PillNavItem[] = [
    { label: t.experience, href: '#experiencia' },
    { label: t.education, href: '#certificaciones' },
    { label: t.projects, href: '#proyectos' },
    { label: t.stack, href: '#stack' },
  ];

  const handleNavClick = (item: PillNavItem, _index: number, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (item.href?.startsWith('#')) {
      const id = item.href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const topOffset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
        setActiveSection(item.href);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('contacto');
    if (target) {
      const targetPos = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none"
      >
        <GlassSurface
          borderRadius={9999}
          blur={10}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          backgroundOpacity={0.64}
          brightness={50}
          opacity={0.93}
          saturation={1}
          className="pointer-events-auto max-w-4xl w-full border border-white/10 shadow-2xl shadow-black/60"
          contentClassName="relative z-[1] w-full flex items-center justify-between gap-2.5 sm:gap-6 px-3 sm:px-5 py-1.5 sm:py-2"
        >
          <nav className="flex items-center justify-between w-full text-sm">
            {/* Brand / Logo */}
            <a 
              href="#" 
              onClick={handleLogoClick}
              className="flex items-center transition-all hover:opacity-80 active:scale-95 shrink-0 py-0.5 group"
              aria-label="Mario Luna - Inicio"
            >
              <img 
                src={logoImg} 
                alt="Mario Luna" 
                className="h-3.5 sm:h-4 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            {/* React Bits PillNav with Section Effect (Desktop) */}
            <div className="hidden md:flex items-center justify-center">
              <PillNav
                items={navItems}
                activeHref={activeSection}
                onItemClick={handleNavClick}
                surface="none"
                theme="dark"
                size="sm"
                hoverEffect="glide"
                indicator="both"
                highlightColor="linear-gradient(180deg, rgba(249, 115, 22, 0.22) 0%, rgba(234, 88, 12, 0.12) 100%)"
                highlightTextColor="#ffffff"
                textColor="rgba(244, 244, 245, 0.7)"
                bounce={0.25}
                stretch={0.35}
                collapse="never"
              />
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
                onClick={handleContactClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white transition-colors font-semibold text-xs shadow-sm cursor-pointer"
                title={t.contactTitle}
              >
                <span>{t.contact}</span>
              </motion.a>

              {/* Mobile Menu Hamburger Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800/90 text-zinc-200 border border-zinc-700/80 cursor-pointer ml-0.5"
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-orange-400" />
                ) : (
                  <Menu className="w-4 h-4 text-zinc-300" />
                )}
              </motion.button>
            </div>
          </nav>
        </GlassSurface>

        {/* Mobile Dropdown Menu with Active Section Effect */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden pointer-events-auto mt-2 w-full max-w-sm"
            >
              <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={(e) => {
                        handleNavClick(item, 0, e);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                        isActive
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 font-semibold'
                          : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
export default Navbar;
