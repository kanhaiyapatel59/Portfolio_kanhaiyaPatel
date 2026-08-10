import { useRef } from 'react';

export default function Tilt3D({ children, className, style, glowColor = 'rgba(0,229,255,0.35)' }) {
  const ref = useRef(null);
  const shineRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    el.style.transform = `perspective(700px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.04)`;
    el.style.boxShadow = `${x * 12}px ${y * 12}px 40px ${glowColor}, 0 8px 32px ${glowColor}`;

    // Move shine based on cursor position
    if (shineRef.current) {
      const px = ((e.clientX - left) / width) * 100;
      const py = ((e.clientY - top) / height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 65%)`;
      shineRef.current.style.opacity = '1';
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.boxShadow = '';
    if (shineRef.current) shineRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className ?? ''}`}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
      {/* Cursor-tracked shine overlay */}
      <div
        ref={shineRef}
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-200"
        style={{ zIndex: 10 }}
      />
    </div>
  );
}
