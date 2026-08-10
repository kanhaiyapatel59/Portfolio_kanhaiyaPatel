import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';

const icons = [Trophy, Star, Zap];

export default function Achievements({ achievements }) {
  const [lightbox, setLightbox] = useState(null);
  const withImages = achievements.map((_, i) => i).filter((i) => achievements[i].image);

  const moveLightbox = (dir) => {
    const pos = withImages.indexOf(lightbox);
    setLightbox(withImages[(pos + dir + withImages.length) % withImages.length]);
  };

  return (
    <section id="achievements" className="py-24 section-padding relative">
      <div className="container mx-auto">
        <SectionHeading eyebrow="Achievements" title="Recognition & Impact" />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
              >
                <Tilt3D
                  className="glass-card glow-border p-6 text-center flex flex-col h-full"
                  glowColor="rgba(124,58,237,0.3)"
                >
                  {/* Icon — highest Z */}
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] flex items-center justify-center"
                    style={{ transform: 'translateZ(32px)', boxShadow: '0 4px 20px rgba(0,229,255,0.3)' }}
                  >
                    <Icon size={22} style={{ color: '#050505' }} />
                  </div>

                  {/* Image — mid Z */}
                  {item.image && (
                    <div style={{ transform: 'translateZ(16px)' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        onClick={() => setLightbox(index)}
                        className="w-full h-36 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </div>
                  )}

                  {/* Text — base Z */}
                  <div style={{ transform: 'translateZ(10px)' }}>
                    <h3 className="text-sm font-semibold mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </p>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
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
              <img src={achievements[lightbox].image} alt="" className="w-full rounded-2xl shadow-2xl" />
              <p className="text-center text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
                {achievements[lightbox].title}
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
