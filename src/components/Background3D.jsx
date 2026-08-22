import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    scene.fog = new THREE.FogExp2(targetColors.fog.getHex(), 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Floating 3D Geometries Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Particle Cloud / Starfield
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 300 : 700;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: targetColors.particle,
      size: 0.25,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Floating 3D Wireframe Shapes
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TorusKnotGeometry(1.5, 0.4, 64, 8),
      new THREE.DodecahedronGeometry(1.8, 0)
    ];

    const shapes = [];
    const shapePositions = [
      { x: -14, y: 8, z: -5 },
      { x: 14, y: -6, z: -10 },
      { x: 10, y: 12, z: -8 },
      { x: -12, y: -10, z: -4 }
    ];

    shapePositions.forEach((pos, idx) => {
      const geo = shapeGeometries[idx % shapeGeometries.length];
      const wireMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? targetColors.primary : targetColors.secondary,
        wireframe: true,
        transparent: true,
        opacity: 0.35
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

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(targetColors.primary, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(targetColors.secondary, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // 4. Parallax Mouse & Scroll Tracking
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

    // 5. Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX * 0.25;
      mainGroup.rotation.x = -mouseY * 0.25;

      camera.position.y = -scrollY * 0.012;

      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.01;

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotX;
        shape.rotation.y += shape.userData.rotY;
        shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * 1.5) * 0.8;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
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
      shapeGeometries.forEach((g) => g.dispose());
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
