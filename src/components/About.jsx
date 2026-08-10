import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Download } from 'lucide-react';
import SectionHeading from './SectionHeading';

function Tilt3D({ children, className }) {
  const ref = useRef(null);
  const shineRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg) scale(1.04)`;
    el.style.boxShadow = `${x * 20}px ${y * 20}px 60px rgba(0,229,255,0.3), 0 8px 40px rgba(124,58,237,0.25)`;
    if (shineRef.current) {
      const px = ((e.clientX - left) / width) * 100;
      const py = ((e.clientY - top) / height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      shineRef.current.style.opacity = '1';
    }
  };

  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.boxShadow = '';
    if (shineRef.current) shineRef.current.style.opacity = '0';
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`relative ${className}`}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', transformStyle: 'preserve-3d' }}>
      {children}
      <div ref={shineRef} className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-200" style={{ zIndex: 10 }} />
    </div>
  );
}

export default function About({ profile }) {
  return (
    <section id="about" className="py-24 section-padding relative">
      <div className="container mx-auto">
        <SectionHeading eyebrow="About Me" title="" large />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: 'linear-gradient(135deg, var(--orb-cyan), var(--orb-purple))' }} />
            <Tilt3D className="glass-card h-full overflow-hidden rounded-3xl">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-3xl" style={{ objectFit: 'cover', objectPosition: 'top center', transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }} />
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, transparent 60%)', transform: 'translateZ(40px)' }} />
            </Tilt3D>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{profile.name}</h3>
            <p className="font-medium text-lg mb-5" style={{ color: 'var(--accent)' }}>{profile.title}</p>

            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{profile.aboutDescription}</p>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{profile.aboutBody}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin size={16} style={{ color: 'var(--accent)' }} />{profile.location}
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={16} style={{ color: 'var(--accent)' }} />{profile.email}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${profile.email}`} className="btn-primary inline-flex items-center gap-2"><Mail size={16} /> Get In Touch</a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center gap-2"><Download size={16} /> Download CV</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
