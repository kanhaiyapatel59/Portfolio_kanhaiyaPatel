import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Download } from 'lucide-react';
import SectionHeading from './SectionHeading';
import FlipProfileCard from './FlipProfileCard';

export default function About({ profile }) {
  return (
    <section id="about" className="py-24 section-padding relative">
      <div className="container mx-auto">
        <SectionHeading eyebrow="About Me" title="" large />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: 'linear-gradient(135deg, var(--orb-cyan), var(--orb-purple))' }} />
            <FlipProfileCard avatarUrl={profile.avatar} name={profile.name} className="h-full w-full" />
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
