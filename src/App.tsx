import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DataPipelineWidget } from './components/DataPipelineWidget';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationCertifications } from './components/EducationCertifications';
import { TechStack } from './components/TechStack';
import { ContactFooter } from './components/ContactFooter';

export function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main className="flex-1">
        <Hero />
        <DataPipelineWidget />
        <ExperienceSection />
        <EducationCertifications />
        <TechStack />
      </main>

      {/* Editorial Contact Footer */}
      <ContactFooter />
    </div>
  );
}

export default App;
