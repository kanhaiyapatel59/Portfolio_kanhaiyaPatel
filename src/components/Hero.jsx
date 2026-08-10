import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import ResumeModal from './ResumeModal';
import FlipProfileCard from './FlipProfileCard';

function ParticleCanvas({ isLight }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3, alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.002, drift: (Math.random() - 0.5) * 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        s.x += s.drift;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(2,132,199,${s.alpha * 0.25})`
          : `rgba(0,229,255,${s.alpha * 0.7})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [isLight]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function TypingText({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === word.length) timeout = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0) timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    else { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);
  return (
    <span className="text-gradient">
      {displayed}<span className="cursor-blink" style={{ color: 'var(--accent)' }}>|</span>
    </span>
  );
}

export default function Hero({ profile, isLight }) {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden section-padding pt-20">
        <ParticleCanvas isLight={isLight} />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -top-32 -left-32 z-0" style={{ background: 'var(--orb-cyan)' }} />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0" style={{ background: 'var(--orb-purple)' }} />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-lg font-medium mb-4" style={{ color: 'var(--accent)' }}>
                Hi, I'm {profile.name} 👋
              </motion.p>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <TypingText words={profile.taglines} />
              </h1>

              <p className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a href="#projects" className="btn-primary flex items-center gap-2">
                  View Work <ArrowRight size={18} />
                </a>

                <button onClick={() => setResumeOpen(true)} className="btn-secondary flex items-center gap-2">
                  <Download size={18} /> View Resume
                </button>
              </div>

              <div className="flex items-center gap-6">
                <a href={profile.socials.github} target="_blank" rel="noreferrer"
                  className="p-3 rounded-full border transition-transform hover:scale-110"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                  <FaGithub size={20} />
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer"
                  className="p-3 rounded-full border transition-transform hover:scale-110"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                  <FaLinkedinIn size={20} />
                </a>
                {profile.socials.twitter && (
                  <a href={profile.socials.twitter} target="_blank" rel="noreferrer"
                    className="p-3 rounded-full border transition-transform hover:scale-110"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                    <FaTwitter size={20} />
                  </a>
                )}
                <span className="flex items-center gap-2 text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> {profile.location}
                </span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="relative flex items-center justify-center">
              <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px]">
                <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, var(--orb-cyan), var(--orb-purple))' }} />
                <FlipProfileCard avatarUrl={profile.avatar} name={profile.name} className="p-4" />
              </div>
            </motion.div>
          </div>

          {profile.stats?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ color: 'var(--text-muted)' }}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00E5FF]/50 to-transparent" />
        </div>
      </section>
      {resumeOpen && <ResumeModal url={profile.resumeUrl} onClose={() => setResumeOpen(false)} />}
    </>
  );
}
