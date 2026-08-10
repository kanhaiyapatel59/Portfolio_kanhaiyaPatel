import { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';
import Background3D from './components/Background3D';
import TerminalModal from './components/TerminalModal';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { profile, skills, timeline } = portfolioData;
  const projects = [...portfolioData.projects].reverse();
  const certifications = [...portfolioData.certifications].reverse();
  const achievements = [...portfolioData.achievements].reverse();
  const education = [...portfolioData.education].reverse();
  const { theme, toggle, isLight } = useTheme();

  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Preloader />
      <Background3D isLight={isLight} />
      <div className="relative z-10 min-h-screen overflow-x-hidden" style={{ color: 'var(--text-primary)' }}>
        <Navbar
          name={profile.name}
          theme={theme}
          toggle={toggle}
          isLight={isLight}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <Hero profile={profile} isLight={isLight} />
        <About profile={profile} isLight={isLight} />
        <Skills skills={skills} isLight={isLight} />
        <Projects projects={projects} />
        <Experience timeline={timeline} isLight={isLight} />
        <Education education={education} />
        <Achievements achievements={achievements} />
        <Certifications certifications={certifications} />
        <Contact profile={profile} isLight={isLight} />
        <Footer profile={profile} isLight={isLight} />
        <BackToTop />
      </div>

      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        toggleTheme={toggle}
        isLight={isLight}
      />
    </>
  );
}
