'use client';

import { useState, useEffect } from 'react';
import ContactModal from './Contact';
import { init } from '@emailjs/browser';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with public key from environment variable
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      init(publicKey);
    } else {
      console.error("EmailJS public key is not configured");
    }
  }, []);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <main>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Hello, I'm Jackson Alvarez</h1>
          <h3>Junior Software Engineer</h3>
          <p>
            Building innovative web applications with clean code and exceptional user experiences. Based in Charlotte, NC and passionate about turning complex problems into elegant solutions.
          </p>
          <div className="hero-buttons">
            <button onClick={openContactModal} className="btn">Get In Touch</button>
            <a href="/Jackson-Alvarez-Resume.pdf" className="btn btn-resume" download>Resume</a>
            <a href="https://www.linkedin.com/in/jackson-alvarez-911b12187/" className="social-button" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/jacksonalvarez" className="social-button" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-pic">
          <img src="/picfs.png" alt="Jackson Alvarez" />
        </div>
      </section>
          
      <section id="skills">
        <h2>Skills & Expertise</h2>
        <div className="skills">
          <div className="skill-category">
            <h3>Languages</h3>
            <ul className="skill-list">
              <li>Python</li>
              <li>Java</li>
              <li>C/C++/C#</li>
              <li>JavaScript</li>
              <li>Haskell</li>
              <li>R</li>
            </ul>
          </div>
          
          <div className="skill-category">
            <h3>Web-Dev</h3>
            <ul className="skill-list">
              <li>React</li>
              <li>Node</li>
              <li>HTML/CSS</li>
              <li>MongoDB/Atlas</li>
              <li>Vercel</li>
              <li>Bootstrap</li>

            </ul>
          </div>
          
          <div className="skill-category">
            <h3>Soft Skills</h3>
            <ul className="skill-list">
              <li>Easy to train</li>
              <li>Strong mathmatics</li>
              <li>Data science</li>
              <li>Team collaboration</li>
              <li>Project management</li>
              <li>Problem solving</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2>Featured Projects</h2>
        <div className="projects">
          <div className="project-card">
            <div className="project-img">        <img
          id="img1"
          src="/p1.png"
          alt="Jackson Alvarez"
          
          style={{ width: '100%', height: '150%', transform: 'translate(0px, 0px)'}}
        /></div>
            <div className="project-info">
              <h3>2D Drawing Engine (Haskell)</h3>
              <p>Developed a functional graphics engine to explore declarative rendering and recursion.</p>
              <div className="tech-stack">
                <span className="tech">Haskell</span>
                <span className="tech">Tokenization</span>
                <span className="tech">Graphics</span>
                <span className="tech">Custom File Types</span>
              </div>
              <a href="https://github.com/jacksonalvarez/Rasterization-Engine-in-Haskell" className="btn" target="_blank">View Project</a>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">        <img
          src="/p2.png"
          alt="Jackson Alvarez"
          style={{ width: '100%', height: 'auto' }}
        /></div>
            <div className="project-info">
              <h3>Web Portfolio</h3>
              <p>Built a personal website to showcase projects and practice modern web development. No Bootstrap, just custom CSS.</p>
              <div className="tech-stack">
                <span className="tech">React</span>
                <span className="tech">Next.js</span>
                <span className="tech">CSS</span>
                <span className="tech">TypeScript</span>
                <span className="tech">Three.js</span>
              </div>
              <a href="https://github.com/jacksonalvarez/Web-Portfolio" className="btn" target="_blank">View Project</a>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-img">        <img
          src="/p3.jpg"
          alt="Jackson Alvarez"
          style={{ width: '100%', height: '150%', transform: 'translate(0px, 0px)'}}
        /></div>
            <div className="project-info">
              <h3>y86-64 simulator and compiler</h3>
              <p>Implemented a low-level simulator and compiler to understand assembly and CPU architecture. (I am not allowed to share code.)</p>
              <div className="tech-stack">
                <span className="tech">C/C++</span>
                <span className="tech">Assembly</span>
                <span className="tech">Computer Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Analytics/>
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </main>
  );
}