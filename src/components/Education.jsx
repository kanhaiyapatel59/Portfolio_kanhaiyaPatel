import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--orb-cyan)' }} />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="The foundation that shaped my technical thinking and problem-solving approach."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), transparent)' }} />

          <div className="space-y-10">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Icon dot */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))', boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 30%, transparent)' }}>
                    <GraduationCap size={20} style={{ color: '#050505' }} />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 ml-4 md:ml-0 ${index % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                  <Tilt3D className="glass-card glow-border p-6" glowColor="color-mix(in srgb, var(--accent) 25%, transparent)">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {item.degree}
                        </h3>
                        <p className="font-semibold text-sm" style={{ color: 'var(--accent-secondary)' }}>
                          {item.institution}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                        style={{ border: '1px solid var(--card-border)', background: 'var(--glass-bg)', color: 'var(--text-muted)' }}>
                        <Calendar size={11} /> {item.period}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <MapPin size={12} style={{ color: 'var(--accent)' }} /> {item.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        <Award size={12} /> {item.grade}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
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
