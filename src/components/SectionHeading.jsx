import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, large }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      {large ? (
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-gradient">{eyebrow}</h2>
      ) : (
        <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{eyebrow}</p>
      )}
      {title && <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>}
      {description && <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{description}</p>}
    </motion.div>
  );
}
