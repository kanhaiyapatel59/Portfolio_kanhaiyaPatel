import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function Navbar({ name, toggle, isLight }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      let current = '';
      navLinks.forEach((l) => {
        const sec = document.getElementById(l.toLowerCase());
        if (sec && window.scrollY >= sec.offsetTop - 120) current = l.toLowerCase();
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={scrolled ? { background: 'var(--nav-bg)', borderColor: 'var(--nav-border)' } : {}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl border-b shadow-sm' : 'bg-transparent'}`}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#lg)" />
              <path d="M9 8h3.2v6.8l5.6-6.8H21l-6 7.2L21.4 24H18l-5.8-7.6V24H9V8z" fill="#050505" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00E5FF" /><stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <span className="hidden sm:flex items-baseline">
              <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>{name.split(' ')[0]}</span>
              {name.split(' ')[1] && (
                <span className="font-bold text-lg tracking-tight ml-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]">{name.split(' ')[1]}</span>
              )}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = activeSection === item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{ color: active ? 'var(--accent)' : 'var(--text-secondary)' }}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${active ? 'bg-[#00E5FF]/10' : 'hover:bg-black/5'}`}
                >
                  {item}
                  {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00E5FF]" />}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={isLight ? 'Switch to dark' : 'Switch to light'}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a href="#contact" className="hidden md:inline-flex btn-primary text-sm px-5 py-2">Hire Me</a>

            <button
              className="md:hidden p-2 rounded-lg"
              style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 backdrop-blur-xl" style={{ background: 'var(--mobile-menu-bg)' }} />
          <div className="relative flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ color: activeSection === item.toLowerCase() ? 'var(--accent)' : 'var(--text-secondary)' }}
                className="text-2xl font-semibold transition-colors hover:opacity-80"
              >
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4">Hire Me</a>
          </div>
        </div>
      )}
    </header>
  );
}
