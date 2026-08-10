import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent-secondary)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
