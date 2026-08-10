import React, { useState, useRef } from 'react';
import cartoonAvatar from '../assets/avatar-cartoon.png';

export default function FlipProfileCard({ avatarUrl, name, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Apply subtle 3D tilt while flipped or unflipped
    const flipDeg = isHovered ? 180 : 0;
    el.style.transform = `perspective(1000px) rotateY(${flipDeg + x * 15}deg) rotateX(${-y * 15}deg) scale(1.03)`;
    el.style.boxShadow = `${x * 20}px ${y * 20}px 50px rgba(0, 229, 255, 0.35), 0 8px 30px rgba(124, 58, 237, 0.3)`;

    if (shineRef.current) {
      const px = ((e.clientX - left) / width) * 100;
      const py = ((e.clientY - top) / height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22) 0%, transparent 60%)`;
      shineRef.current.style.opacity = '1';
    }
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    const el = cardRef.current;
    if (el) {
      el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
      el.style.boxShadow = '';
    }
    if (shineRef.current) shineRef.current.style.opacity = '0';
  };

  return (
    <div
      className={`relative w-full h-full cursor-pointer select-none ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full relative rounded-3xl"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease',
          transform: isHovered ? 'perspective(1000px) rotateY(180deg)' : 'perspective(1000px) rotateY(0deg)'
        }}
      >
        {/* Front Face: Real Photo */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl glass-card overflow-hidden border border-white/10"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover object-top rounded-3xl"
          />
          {/* Badge indicator */}
          <div
            className="absolute bottom-4 left-4 right-4 py-2 px-4 rounded-full backdrop-blur-md border border-white/20 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            style={{ background: 'rgba(5, 5, 5, 0.65)', color: '#ffffff' }}
          >
            <span>Hover to flip</span>
            <span className="animate-bounce">✨</span>
          </div>
        </div>

        {/* Back Face: Cartoon Avatar with Waving Hand saying Hii! 👋 */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl glass-card overflow-hidden border border-cyan-400/30"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <img
            src={cartoonAvatar}
            alt={`${name} Cartoon Avatar`}
            className="w-full h-full object-cover object-center rounded-3xl"
          />

          {/* Interactive Waving Speech Bubble */}
          <div className="absolute top-4 right-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-extrabold text-sm shadow-2xl flex items-center gap-2 border-2 border-white animate-bounce">
            <span className="text-base tracking-wide">Hii!</span>
            <span className="animate-wave text-xl inline-block origin-bottom-right">👋</span>
          </div>

          {/* Bottom Badge */}
          <div
            className="absolute bottom-4 left-4 right-4 py-2 px-4 rounded-full backdrop-blur-md border border-cyan-400/30 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            style={{ background: 'rgba(5, 5, 5, 0.75)', color: '#00e5ff' }}
          >
            <span>Welcome to my Portfolio!</span> 👋
          </div>
        </div>

        {/* Lighting shine layer */}
        <div
          ref={shineRef}
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-200"
          style={{ zIndex: 10 }}
        />
      </div>
    </div>
  );
}
