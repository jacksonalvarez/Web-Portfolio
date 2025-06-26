'use client';

import "./globals.css";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ContactModal from './Contact'; // Import the ContactModal component
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // State for ContactModal

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
    camera.position.setZ(30);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x5a189a, // Darker purple
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x5a189a, 1.5, 100); // Darker purple
    pointLight1.position.set(20, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x5a189a, 1.5, 100); // Even darker purple
    pointLight2.position.set(-20, -5, 15);
    scene.add(pointLight2);

    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Jackson | Fullstack Developer</title>
        <meta name="description" content="Portfolio of Jackson, a fullstack developer specializing in modern web applications" />
      </head>
      <body>
        <canvas ref={canvasRef} id="bg"></canvas>
        <div id="content">
          <header>
            <div className="logo">JACKSON</div>
            <nav>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li>      <a href="#" onClick={(e) => { e.preventDefault(); openContactModal(); }}>
        Contact
      </a></li>
              </ul>
            </nav>
          </header>
          {children}
          <footer>
            <p>© {new Date().getFullYear()} Jackson. All rights reserved.</p>
          </footer>
        </div>

        {/* Contact Modal */}
        <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
        <Analytics/>
      </body>
    </html>
  );
}