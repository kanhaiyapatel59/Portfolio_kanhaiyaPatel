import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Helper to generate dynamic canvas textures for the 10 tech logos
function createTechLogoTexture(tech, isLight) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background Badge
  const radius = 36;
  const margin = 20;
  const w = canvas.width - margin * 2;
  const h = canvas.height - margin * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Badge Glass Fill
  ctx.beginPath();
  ctx.roundRect(margin, margin, w, h, radius);
  const bgGradient = ctx.createLinearGradient(margin, margin, margin + w, margin + h);
  
  if (isLight) {
    bgGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    bgGradient.addColorStop(1, 'rgba(240, 244, 248, 0.85)');
  } else {
    bgGradient.addColorStop(0, 'rgba(25, 28, 40, 0.90)');
    bgGradient.addColorStop(1, 'rgba(10, 12, 20, 0.80)');
  }
  ctx.fillStyle = bgGradient;
  ctx.fill();

  // Glow Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = tech.color;
  ctx.shadowColor = tech.color;
  ctx.shadowBlur = 16;
  ctx.stroke();
  ctx.shadowBlur = 0; // Reset blur

  // Draw Specific Icon/Text Content
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  switch (tech.id) {
    case 'js': {
      // JS Emblem
      ctx.fillStyle = '#F7DF1E';
      ctx.fillRect(-45, -45, 90, 90);
      ctx.fillStyle = '#000000';
      ctx.font = '900 48px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('JS', 38, 38);
      break;
    }

    case 'react': {
      // React Atom Orbits
      ctx.strokeStyle = '#61DAFB';
      ctx.lineWidth = 5;

      // Nucleus
      ctx.fillStyle = '#61DAFB';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      // 3 Ellipses
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.ellipse(0, 0, 48, 18, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'nextjs': {
      // Next.js Logo
      ctx.fillStyle = isLight ? '#000000' : '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 44, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isLight ? '#ffffff' : '#000000';
      ctx.font = '900 42px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', 0, 2);
      break;
    }

    case 'tailwind': {
      // Tailwind Waves
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(-16, -10, 16, Math.PI, 0, false);
      ctx.arc(16, 10, 16, 0, Math.PI, false);
      ctx.font = '900 28px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Tailwind', 0, 10);
      break;
    }

    case 'node': {
      // Node.js Hexagon
      ctx.strokeStyle = '#5FA04E';
      ctx.lineWidth = 6;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 6;
        const x = 45 * Math.cos(angle);
        const y = 45 * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#5FA04E';
      ctx.font = '800 26px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Node', 0, 2);
      break;
    }

    case 'express': {
      // Express.js
      ctx.fillStyle = isLight ? '#111827' : '#ffffff';
      ctx.font = '800 36px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('express', 0, -4);

      ctx.fillStyle = '#6366f1';
      ctx.font = '600 16px Inter, sans-serif';
      ctx.fillText('.JS', 0, 28);
      break;
    }

    case 'mongodb': {
      // MongoDB Leaf
      ctx.fillStyle = '#47A248';
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.bezierCurveTo(30, -10, 30, 25, 0, 42);
      ctx.bezierCurveTo(-30, 25, -30, -10, 0, -42);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-2, -35, 4, 70);
      break;
    }

    case 'postgresql': {
      // Postgres Badge
      ctx.fillStyle = '#336791';
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 22px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Postgres', 0, 0);
      break;
    }

    case 'aws': {
      // AWS Badge
      ctx.fillStyle = '#FF9900';
      ctx.font = '900 36px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('aws', 0, -8);

      // Smile arrow
      ctx.strokeStyle = '#FF9900';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 5, 30, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
      break;
    }

    case 'docker': {
      // Docker Emblem
      ctx.fillStyle = '#2496ED';
      // Draw container grid
      ctx.fillRect(-30, -20, 16, 12);
      ctx.fillRect(-10, -20, 16, 12);
      ctx.fillRect(10, -20, 16, 12);
      ctx.fillRect(-10, -36, 16, 12);

      // Whale curve
      ctx.beginPath();
      ctx.arc(0, 10, 36, 0, Math.PI);
      ctx.fill();
      break;
    }

    default:
      break;
  }

  // Label text under icon
  if (['js', 'react', 'nextjs', 'tailwind', 'node', 'express', 'mongodb', 'postgresql', 'aws', 'docker'].includes(tech.id)) {
    ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
    ctx.font = '700 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tech.name, 0, 68);
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Background3D({ isLight }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const darkColors = {
      primary: new THREE.Color(0x00e5ff),
      secondary: new THREE.Color(0x7c3aed),
      particle: new THREE.Color(0x00e5ff),
      fog: new THREE.Color(0x050505)
    };

    const lightColors = {
      primary: new THREE.Color(0x0284c7),
      secondary: new THREE.Color(0x6366f1),
      particle: new THREE.Color(0x0284c7),
      fog: new THREE.Color(0xf1f5f9)
    };

    const targetColors = isLight ? lightColors : darkColors;
    scene.fog = new THREE.FogExp2(targetColors.fog.getHex(), 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Particles Starfield
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 350 : 700;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 90;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: targetColors.particle,
      size: 0.28,
      transparent: true,
      opacity: 0.60,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Wireframe Geometric Shapes
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TorusKnotGeometry(1.6, 0.4, 64, 8),
      new THREE.DodecahedronGeometry(1.8, 0)
    ];

    const shapes = [];
    const shapePositions = [
      { x: -16, y: 10, z: -6 },
      { x: 16, y: -8, z: -10 },
      { x: 12, y: 14, z: -8 },
      { x: -14, y: -12, z: -5 }
    ];

    shapePositions.forEach((pos, idx) => {
      const geo = shapeGeometries[idx % shapeGeometries.length];
      const wireMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? targetColors.primary : targetColors.secondary,
        wireframe: true,
        transparent: true,
        opacity: 0.30
      });
      const mesh = new THREE.Mesh(geo, wireMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.008,
        initialY: pos.y
      };
      mainGroup.add(mesh);
      shapes.push(mesh);
    });

    // 4. Tech Logos 3D Floating Mesh Group
    const techStack = [
      { id: 'js', name: 'JavaScript', color: '#F7DF1E', pos: { x: -18, y: 16, z: -8 } },
      { id: 'react', name: 'React', color: '#61DAFB', pos: { x: 18, y: 18, z: -7 } },
      { id: 'nextjs', name: 'Next.js', color: isLight ? '#000000' : '#FFFFFF', pos: { x: -20, y: 4, z: -9 } },
      { id: 'tailwind', name: 'Tailwind CSS', color: '#38BDF8', pos: { x: 20, y: -2, z: -8 } },
      { id: 'node', name: 'Node.js', color: '#5FA04E', pos: { x: -16, y: -12, z: -6 } },
      { id: 'express', name: 'Express', color: isLight ? '#111827' : '#FFFFFF', pos: { x: 16, y: -14, z: -10 } },
      { id: 'mongodb', name: 'MongoDB', color: '#47A248', pos: { x: -12, y: 28, z: -11 } },
      { id: 'postgresql', name: 'PostgreSQL', color: '#4169E1', pos: { x: 12, y: 30, z: -9 } },
      { id: 'aws', name: 'AWS', color: '#FF9900', pos: { x: -10, y: -24, z: -8 } },
      { id: 'docker', name: 'Docker', color: '#2496ED', pos: { x: 10, y: -26, z: -7 } }
    ];

    const logoMeshes = [];
    const logoGeom = new THREE.PlaneGeometry(3.6, 3.6);

    techStack.forEach((tech, idx) => {
      const texture = createTechLogoTexture(tech, isLight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(logoGeom, material);
      mesh.position.set(tech.pos.x, tech.pos.y, tech.pos.z);
      mesh.userData = {
        initialY: tech.pos.y,
        floatSpeed: 0.8 + (idx % 4) * 0.3,
        rotSpeed: (idx % 2 === 0 ? 1 : -1) * 0.003,
        offset: idx * 0.7
      };

      mainGroup.add(mesh);
      logoMeshes.push({ mesh, material, texture });
    });

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(targetColors.primary, 2, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(targetColors.secondary, 2, 60);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // 6. Parallax Mouse & Scroll Event Listeners
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX * 0.20;
      mainGroup.rotation.x = -mouseY * 0.20;

      camera.position.y = -scrollY * 0.010;

      particles.rotation.y = elapsedTime * 0.02;

      // Animate 3D Shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotX;
        shape.rotation.y += shape.userData.rotY;
        shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * 1.5) * 0.8;
      });

      // Animate Tech Logo Meshes
      logoMeshes.forEach(({ mesh }) => {
        mesh.rotation.y = Math.sin(elapsedTime * mesh.userData.rotSpeed + mesh.userData.offset) * 0.25;
        mesh.position.y =
          mesh.userData.initialY +
          Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.offset) * 0.9;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      logoGeom.dispose();
      shapeGeometries.forEach((g) => g.dispose());
      logoMeshes.forEach(({ material, texture }) => {
        texture.dispose();
        material.dispose();
      });
      renderer.dispose();
    };
  }, [isLight]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
