import { useState } from 'react';
import { FileText } from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';

import logoImg from '../assets/logo.webp';

export function Navbar() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 shadow-2xl shadow-black/50 text-sm max-w-4xl w-full">
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
            <a href="#pipeline" className="hover:text-zinc-100 transition-colors">
              Data Lifecycle
            </a>
            <a href="#experiencia" className="hover:text-zinc-100 transition-colors">
              Experiencia
            </a>
            <a href="#certificaciones" className="hover:text-zinc-100 transition-colors">
              Formación
            </a>
            <a href="#stack" className="hover:text-zinc-100 transition-colors">
              Stack
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View CV Button */}
            <button
              onClick={() => setIsCvOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 border border-zinc-700/80 active:scale-95 transition-all font-medium text-xs shadow-sm cursor-pointer"
              title="Ver Currículum Vitae en PDF"
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>CV</span>
            </button>

            {/* Scroll to Contact CTA */}
            <a
              href="#contacto"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white active:scale-95 transition-all font-semibold text-xs shadow-sm"
              title="Ir a la sección de contacto"
            >
              <span>Contactar</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Reusable PDF Modal for CV */}
      <PdfViewerModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        title="Curriculum Vitae — Mario Luna López"
        pdfUrl="/docs/CV_Mario_Luna.pdf"
        downloadName="CV_Mario_Luna_Lopez.pdf"
        subtitle="Software & ML Engineer // Perfil Profesional"
      />
    </>
  );
}
