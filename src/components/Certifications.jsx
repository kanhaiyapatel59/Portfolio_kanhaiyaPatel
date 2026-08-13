import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';

export default function Certifications({ certifications }) {
  const sorted = [...certifications].reverse();
  const [lightbox, setLightbox] = useState(null);
  const withImages = sorted.map((_, i) => i).filter((i) => sorted[i].image);

  const moveLightbox = (dir) => {
    const pos = withImages.indexOf(lightbox);
    setLightbox(withImages[(pos + dir + withImages.length) % withImages.length]);
  };

  return (
    <section id="certifications" className="py-24 section-padding relative">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          description="Verified learning milestones that back up the skills I bring to every project."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {sorted.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <Tilt3D
                className="glass-card glow-border p-5 h-full flex flex-col"
                glowColor="rgba(0,229,255,0.22)"
              >
                {/* Image — top Z layer */}
                <div className="mb-4" style={{ transform: 'translateZ(24px)' }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onClick={() => setLightbox(index)}
                      className="w-full h-24 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,229,255,0.2))' }}
                    />
                  ) : (
                    <div
                      className="w-full h-24 rounded-lg flex items-center justify-center"
                      style={{ border: '1px dashed var(--card-border)', background: 'var(--glass-bg)' }}
                    >
                      <BadgeCheck size={24} style={{ color: 'var(--accent)' }} />
                    </div>
                  )}
                </div>

                {/* Title — mid Z */}
                <div style={{ transform: 'translateZ(14px)' }}>
                  <h3 className="text-sm font-semibold mb-1 leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: 'var(--accent-secondary)' }}>
                    {item.provider}
                  </p>
                </div>

                {/* Badge — base Z */}
                <div className="mt-auto" style={{ transform: 'translateZ(8px)' }}>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                      background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    {item.year}
                  </span>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={sorted[lightbox].image} alt="" loading="lazy" decoding="async" className="w-full rounded-2xl shadow-2xl" />
              <p className="text-center text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
                {sorted[lightbox].title} — {sorted[lightbox].provider}
              </p>
              <button onClick={() => setLightbox(null)} className="absolute -top-3 -right-3 p-1.5 rounded-full border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
                <X size={16} />
              </button>
              {withImages.length > 1 && (
                <>
                  <button onClick={() => moveLightbox(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => moveLightbox(1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
