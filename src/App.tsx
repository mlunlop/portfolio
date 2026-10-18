import { useState } from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationCertifications } from './components/EducationCertifications';
import { TechStack } from './components/TechStack';
import { ContactFooter } from './components/ContactFooter';

import { ScrollProgressBar } from './components/ScrollProgressBar';

import { CursorProvider } from './components/cursor/CursorProvider';
import { Cursor } from './components/cursor/Cursor';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LanguageProvider>
      <CursorProvider>
        <Cursor />
        {/* Visual Preloader / Splash Screen */}
        <Preloader onComplete={() => setIsLoaded(true)} />

        {/* Hairline Scroll Progress */}
        <ScrollProgressBar />

        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
          {/* Floating Pill Navigation */}
          <Navbar />

          {/* Main Single Page Content */}
          <main className="flex-1">
            <Hero isLoaded={isLoaded} />
            <ExperienceSection />
            <EducationCertifications />
            <ProjectsSection />
            <TechStack />
          </main>

          {/* Editorial Contact Footer */}
          <ContactFooter />
        </div>
      </CursorProvider>
    </LanguageProvider>
  );
}

export default App;
