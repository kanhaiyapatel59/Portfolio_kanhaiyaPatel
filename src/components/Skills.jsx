import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGit } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import SectionHeading from './SectionHeading';

const iconMap = { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiAmazonwebservices: FaAws, SiDocker, SiGit };

function SkillCard({ skill }) {
  const ref = useRef(null);
  const Icon = iconMap[skill.icon];

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg) scale(1.08)`;
    el.style.boxShadow = `0 8px 32px ${skill.color}40, 0 0 0 1px ${skill.color}30`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.boxShadow = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass-card glow-border p-5 flex flex-col items-center gap-3 cursor-pointer"
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', transformStyle: 'preserve-3d' }}
    >
      {/* Icon floats forward in Z */}
      <div style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}>
        {Icon && <Icon size={38} style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}80)` }} />}
      </div>

      {/* Name sits slightly behind */}
      <span
        className="text-xs font-semibold text-center"
        style={{ color: 'var(--text-secondary)', transform: 'translateZ(12px)' }}
      >
        {skill.name}
      </span>

      {/* Subtle color tint on the card face */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-200"
        style={{ background: `radial-gradient(circle at center, ${skill.color}12 0%, transparent 70%)` }}
        ref={(el) => {
          if (el) {
            const parent = el.parentElement;
            parent?.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
            parent?.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
          }
        }}
      />
    </div>
  );
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="py-24 section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--orb-purple)' }} />
      <div className="container mx-auto relative z-10">
        <SectionHeading
          eyebrow="Skills"
          title="My Tech Stack"
          description="Technologies I work with to build modern, scalable applications."
        />
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
