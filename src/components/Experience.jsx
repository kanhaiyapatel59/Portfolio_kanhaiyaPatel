import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';

export default function Experience({ timeline }) {
  return (
    <section id="experience" className="py-24 section-padding relative">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="My Journey"
          description="The path that shaped my skills and perspective as a developer."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), transparent)' }}
          />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Icon dot */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))', boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 30%, transparent)' }}
                  >
                    {item.type === 'experience'
                      ? <Briefcase size={18} style={{ color: '#050505' }} />
                      : <GraduationCap size={18} style={{ color: '#050505' }} />
                    }
                  </div>
                </div>

                {/* 3D Card */}
                <div className={`flex-1 ml-4 md:ml-0 ${index % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                  <Tilt3D className="glass-card glow-border p-6" glowColor="color-mix(in srgb, var(--accent) 25%, transparent)">
                    <div className="flex items-start justify-between gap-3 mb-3" style={{ transform: 'translateZ(16px)' }}>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                          {item.type}
                        </p>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="font-medium text-sm" style={{ color: 'var(--accent-secondary)' }}>
                          {item.organization}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-xs px-3 py-1 rounded-full"
                        style={{ border: '1px solid var(--card-border)', background: 'var(--glass-bg)', color: 'var(--text-muted)' }}
                      >
                        {item.period}
                      </span>
                    </div>

                    <div style={{ transform: 'translateZ(8px)' }}>
                      {Array.isArray(item.description) ? (
                        <ul className="space-y-1.5">
                          {item.description.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Tilt3D>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
