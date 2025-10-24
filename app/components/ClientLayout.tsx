'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import ContactModal from '../Contact';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Background Animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(15);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create array of particle textures
    const textureLoader = new THREE.TextureLoader();
    const particleCount = 2; // Number of different particle types
    const particleTextures = Array.from({ length: particleCount }, (_, i) => 
      textureLoader.load(`/particle${i + 1}.png`)
    );

    // Create attributes for random texture selection and sizes
    const textureIndexArray = new Float32Array(particlesCount);
    const sizeArray = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      textureIndexArray[i] = Math.floor(Math.random() * particleCount);
      sizeArray[i] = Math.random() * 15 + 15; // Random size between 15 and 30
    }
    particlesGeometry.setAttribute('textureIndex', new THREE.BufferAttribute(textureIndexArray, 1));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    // Create glowing particle material with shader support
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textures: { value: particleTextures },
        color: { value: new THREE.Color(0x23d520) }, // Using 0x23d520 for the hex color
        opacity: { value: 1.0 }
      },
      vertexShader: `
        attribute float textureIndex;
        attribute float size;
        varying float vTextureIndex;
        void main() {
          vTextureIndex = textureIndex;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D textures[${particleCount}];
        uniform vec3 color;
        uniform float opacity;
        varying float vTextureIndex;
        void main() {
          vec4 texColor;
          // Dynamic texture selection based on index
          ${Array.from({ length: particleCount }, (_, i) => `
            if(vTextureIndex < ${i + 0.5} && vTextureIndex >= ${i - 0.5}) {
              texColor = texture2D(textures[${i}], vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y));
            }`).join(' else ')}
          gl_FragColor = texColor * vec4(color, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Set up bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2.5,  // bloom strength
      1.4,  // bloom radius
      .05  // bloom threshold
    );

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    const ambientLight = new THREE.AmbientLight(0x23d520 , 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x23d520, 1.5, 100);
    pointLight1.position.set(20, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x23d520, 1.5, 100);
    pointLight2.position.set(-20, -5, 15);
    scene.add(pointLight2);

    function animate() {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += .00018;
      composer.render();
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />
      <div id="content">
        <header>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openContactModal(); }}>Contact</a></li>
              <li>
                <a href="/webtools">Web Tools</a>
              </li>
              <li className="coming-soon">
                <span className="nav-item">Courses
                  <span className="tooltip">Coming Soon!</span>
                </span>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <p>Jackson-Alvarez.dev © {new Date().getMonth()+1}/{new Date().getDate()}/{new Date().getFullYear()} Jackson Alvarez</p>
        </footer>
      </div>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 2rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(19, 19, 19, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(35, 213, 32, 0.1);
        }

        nav {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        nav a {
          color: #e0e0e0;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        nav a:hover {
          background: rgba(35, 213, 32, 0.1);
          color: #23d520;
        }

        .coming-soon {
          position: relative;
          cursor: not-allowed;
        }

        .coming-soon .nav-item {
          color: rgba(224, 224, 224, 0.5);
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .coming-soon:hover .nav-item {
          background: rgba(35, 213, 32, 0.1);
        }

        .tooltip {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: rgba(35, 213, 32, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.875rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tooltip::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid rgba(35, 213, 32, 0.9);
        }

        .coming-soon:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(4px);
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }

        .coming-soon .nav-item {
          animation: pulse 2s infinite;
        }

        .coming-soon:hover .nav-item {
          animation: none;
        }
      `}</style>

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
};

export default ClientLayout;