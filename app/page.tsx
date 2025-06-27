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
      <style jsx>{`
        .hero h1 {
          color: #c084fc !important;
          background: linear-gradient(45deg, #c084fc, #ddd6fe, #c084fc);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        
        #skills h2,
        #projects h2,
        .story h2,
        .skill-category h3,
        .project-info h3 {
          color: #8b5cf6 !important;
          background: linear-gradient(45deg, #8b5cf6, #a855f7, #8b5cf6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        
        .hero h1:hover,
        #skills h2:hover,
        #projects h2:hover,
        .story h2:hover,
        .skill-category h3:hover,
        .project-info h3:hover {
          transform: translateY(-2px);
          text-shadow: 0 4px 8px rgba(168, 85, 247, 0.3);
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Desktop - social buttons row acts transparent */
        .social-buttons-row {
          display: contents; /* This makes the div "disappear" and children become direct flex items */
        }

        .social-button {
          /* Desktop social button styles */
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 92, 246, 0.1);
          border: 2px solid rgba(139, 92, 246, 0.2);
          transition: all 0.3s ease;
          margin: 0 10px;
        }

        .social-button:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: scale(1.1);
        }

        /* Desktop Hero Picture Styles - Fixed */
        .hero-pic {
          border: 4px solid rgba(192, 132, 252, 0.2);
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
          transition: transform 0.3s ease;
          flex-shrink: 0;
          box-sizing: border-box;
          aspect-ratio: 1 / 1;
        }

        .hero-pic:hover {
          transform: scale(1.05);
        }

        .hero-pic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center-5;
          border-radius: 50%;
        }

        /* Enhanced Mobile Hero Styles */
        @media (max-width: 768px) {
          .hero {
            flex-direction: column !important;
            text-align: center !important;
            padding: 70px 15px 0px 15px !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(192, 132, 252, 0.05)) !important;
          }

          .hero-content {
            order: 2 !important;
            padding: 25px 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .hero-pic {
            order: 1 !important;
            margin: 0 auto 25px auto !important;
            flex-shrink: 0 !important;
            border: 4px solid rgba(192, 132, 252, 0.2) !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15) !important;
            transition: transform 0.3s ease !important;
            box-sizing: border-box !important;
            aspect-ratio: 1 / 1 !important;
          }

          .hero-pic:hover {
            transform: scale(1.05) !important;
          }

          .hero-pic img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            border-radius: 50% !important;
          }

          .hero h1 {
            font-size: 2.5rem !important;
            margin-bottom: 12px !important;
            line-height: 1.1 !important;
            font-weight: 700 !important;
            letter-spacing: -0.02em !important;
          }

          .hero h3 {
            font-size: 1.4rem !important;
            margin-bottom: 18px !important;
            color: #6b7280 !important;
            font-weight: 500 !important;
            text-align: center !important;
          }

          .hero p {
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
            margin-bottom: 30px !important;
            color: #4b5563 !important;
            max-width: 450px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding: 0 10px !important;
          }

          .hero-buttons {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 15px !important;
            width: 100% !important;
          }

          .hero-buttons .btn {
            width: 100% !important;
            max-width: 320px !important;
            padding: 16px 28px !important;
            font-size: 1.15rem !important;
            font-weight: 600 !important;
            border-radius: 12px !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2) !important;
          }

          .hero-buttons .btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3) !important;
          }

          /* Mobile - social buttons row becomes functional */
          .social-buttons-row {
            display: flex !important; /* Override the contents value for mobile */
            flex-direction: row !important;
            gap: 20px !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            margin-top: 25px !important; /* Add padding between hero buttons and social buttons */
          }

          .social-button {
            width: 65px !important;
            height: 65px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(139, 92, 246, 0.1) !important;
            border: 2px solid rgba(139, 92, 246, 0.2) !important;
            transition: all 0.3s ease !important;
            flex-shrink: 0 !important;
            margin: 0 !important; /* Remove desktop margin */
            aspect-ratio: 1 / 1 !important; /* Ensure perfect circle for buttons too */
          }

          .social-button:hover {
            background: rgba(139, 92, 246, 0.2) !important;
            transform: scale(1.1) !important;
          }

          #skills, #projects {
            padding: 40px 20px !important;
          }

          #skills h2, #projects h2 {
            font-size: 1.8rem !important;
            text-align: center !important;
            margin-bottom: 30px !important;
          }

          .skills {
            flex-direction: column !important;
            gap: 30px !important;
          }

          .skill-category {
            text-align: center !important;
            padding: 20px !important;
          }

          .skill-category h3 {
            font-size: 1.3rem !important;
            margin-bottom: 15px !important;
          }

          .skill-list {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 10px !important;
            padding: 0 !important;
            list-style: none !important;
          }

          .skill-list li {
            background: rgba(139, 92, 246, 0.1) !important;
            padding: 8px 15px !important;
            border-radius: 20px !important;
            font-size: 0.9rem !important;
            border: 1px solid rgba(139, 92, 246, 0.3) !important;
          }

          .projects {
            flex-direction: column !important;
            gap: 30px !important;
          }

          .project-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 20px !important;
            border-radius: 15px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          }

          .project-img {
            width: 100% !important;
            height: 200px !important;
            margin-bottom: 20px !important;
            border-radius: 10px !important;
            overflow: hidden !important;
          }

          .project-img img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            transform: none !important;
          }

          .project-info h3 {
            font-size: 1.3rem !important;
            margin-bottom: 10px !important;
          }

          .project-info p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 15px !important;
          }

          .tech-stack {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 8px !important;
            margin-bottom: 20px !important;
          }

          .tech {
            background: rgba(139, 92, 246, 0.1) !important;
            padding: 5px 10px !important;
            border-radius: 15px !important;
            font-size: 0.8rem !important;
            border: 1px solid rgba(139, 92, 246, 0.3) !important;
          }

          .project-info .btn {
            width: 100% !important;
            max-width: 200px !important;
            padding: 10px 20px !important;
          }
        }

        /* Tablet Responsive Styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hero {
            padding: 40px 30px !important;
          }

          .hero h1 {
            font-size: 2.5rem !important;
          }

          .hero-pic {
            width: 280px !important;
            height: 280px !important;
            margin-bottom: 20px !important;
            aspect-ratio: 1 / 1 !important;
          }

          #skills, #projects {
            padding: 50px 30px !important;
          }

          .skills {
            gap: 40px !important;
          }

          .projects {
            gap: 40px !important;
          }

          .project-card {
            flex-direction: column !important;
            text-align: center !important;
          }

          .project-img {
            width: 100% !important;
            height: 250px !important;
            margin-bottom: 20px !important;
          }
        }

        /* Enhanced Small Mobile Styles */
        @media (max-width: 480px) {
          .hero {
            padding: 15px 10px 25px 10px !important;
            min-height: 100vh !important;
          }

          .hero h1 {
            font-size: 2.1rem !important;
          }

          .hero h3 {
            font-size: 1.2rem !important;
          }

          .hero p {
            font-size: 1rem !important;
            padding: 0 5px !important;
          }

          .hero-pic {
            width: 220px !important;
            height: 220px !important;
            margin-bottom: 20px !important;
            aspect-ratio: 1 / 1 !important;
          }

          .hero-buttons .btn {
            max-width: 280px !important;
            padding: 14px 22px !important;
            font-size: 1.05rem !important;
          }

          .social-button {
            width: 55px !important;
            height: 55px !important;
            aspect-ratio: 1 / 1 !important; /* Perfect circles for small mobile */
          }

          .social-buttons-row {
            gap: 15px !important;
            margin-top: 20px !important; /* Slightly less padding on small mobile */
          }

          #skills, #projects {
            padding: 30px 15px !important;
          }

          #skills h2, #projects h2 {
            font-size: 1.5rem !important;
          }

          .skill-category h3, .project-info h3 {
            font-size: 1.1rem !important;
          }

          .project-img {
            height: 180px !important;
          }
        }

        /* My Story Section Styles */
        .story {
          padding: 100px 50px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(192, 132, 252, 0.05));
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }

        .story-content {
          max-width: 800px;
          text-align: center;
        }

        .story h2 {
          font-size: 3.5rem;
          margin-bottom: 50px;
          font-weight: 700;
        }

        .story-text {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .story p {
          font-size: 1.2rem;
          line-height: 1.8;
          color:rgb(116, 99, 114);
          margin: 0;
        }

        .story .highlight {
          color: #8b5cf6;
          font-weight: 600;
        }

        /* Mobile Story Styles */
        @media (max-width: 768px) {
          .story {
            flex-direction: column !important;
            text-align: center !important;
            padding: 80px 15px 80px 15px !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(192, 132, 252, 0.05)) !important;
          }

          .story h2 {
            font-size: 2.5rem !important;
            margin-bottom: 40px !important;
          }

          .story p {
            font-size: 1.1rem !important;
            line-height: 1.7 !important;
            padding: 0 10px !important;
            color: #4b5563 !important;
          }

          .story-text {
            gap: 30px !important;
          }
        }

        /* Small Mobile Story Styles */
        @media (max-width: 480px) {
          .story {
            flex-direction: column !important;
            text-align: center !important;
            padding: 60px 10px 60px 10px !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(192, 132, 252, 0.05)) !important;
          }

          .story h2 {
            font-size: 2rem !important;
            margin-bottom: 30px !important;
          }

          .story p {
            font-size: 1rem !important;
            padding: 0 5px !important;
            line-height: 1.6 !important;
            color: #4b5563 !important;
          }

          .story-text {
            gap: 25px !important;
          }
        }
      `}</style>
      
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
            <div className="social-buttons-row">
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
        </div>
        <div className="hero-pic" style = {{ aspectRatio: '1 / 1' }}>
          <img src="/picfs.png" alt="Jackson Alvarez" style={{ transform: 'scale(1.1)', aspectRatio: '1 / 1'}} />
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
              <li>Strong mathematics</li>
              <li>Data science</li>
              <li>Team collaboration</li>
              <li>Project management</li>
              <li>Problem solving</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="story" className="story">
        <div className="story-content">
          <h2>My Story</h2>
          <div className="story-text">
            <p>
              I graduated from <span className="highlight">Appalachian State University</span> with a <span className="highlight">Bachelor's in Computer Science (6/27/25)</span> and a minor in Mathematics, complemented by a software development internship and two years as a student ITS-Systems research employee. I believe this unique combination of academic foundation and practical experience equips me with a strong understanding of both theoretical concepts and how to apply them effectively in real-world scenarios.
            </p>
            <p>
              Currently, I'm building <span className="highlight">VibeCodeCLI</span>, an AI-powered development suite that revolutionizes how developers work with code. This Python-based tool leverages <span className="highlight">ChatGPT-4</span> to test, compile, and execute code directly from the command line, supporting <span className="highlight">over 10+ programming languages</span>. It's designed to bridge the gap between AI capabilities and real-world development workflows.
            </p>
            <p>
              Beyond my professional focus, I'm a passionate <span className="highlight">hobbyist game developer</span> with 5 years of Unity experience. Currently, I'm working on <span className="highlight">"The Lighthouse"</span>, a horror movie parody story game inspired by Willem Dafoe's iconic film. Unity has become my favorite development workflow due to its <span className="highlight">flashy plug-and-play nature</span> and the never-ending learning experience it provides. I spend my free time crafting small products and applications, always with the intention of improving my craft and learning best practices in software development.
            </p>
            <p>
              My journey in technology began at <span className="highlight">11 years old</span> when I first discovered programming. Now at 21, I've cultivated nearly <span className="highlight">a decade of curiosity</span> and hands-on experience in software development. This early passion has driven me to continuously explore new technologies and push the boundaries of what's possible with code.
            </p>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2>Featured Projects</h2>
        <div className="projects">
                    <div className="project-card">
            <div className="project-img">
              <img
                src="/p3.png"
                alt="VibeCodeCLI Project"
                style={{ width: '100%', height: '150%', transform: 'translate(0px, 0px)'}}
              />
            </div>
            <div className="project-info">
              <h3>VibeCodeCLI</h3>
              <p>An AI-powered development suite that revolutionizes how developers work with code. Features recursive code generation with auto-compilation testing, dynamic token allocation, and intelligent prompt engineering for 10+ programming languages.</p>
              <div className="tech-stack">
                <span className="tech">LLM Fine-Tuning</span>
                <span className="tech">Dynamic Token Allocation</span>
                <span className="tech">Context Model</span>
                <span className="tech">Clean CLI Development</span>
                <span className="tech">100% Python</span>
                <span className="tech">Well Documented</span>


              </div>
              <a href="https://github.com/jacksonalvarez/VibeCodeCLI" className="btn" target="_blank">View Project</a>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img
                id="img1"
                src="/p1.png"
                alt="2D Drawing Engine Project"
                style={{ width: '100%', height: '150%', transform: 'translate(0px, 0px)'}}
              />
            </div> 
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
            <div className="project-img">
              <img
                src="/p2.png"
                alt="Web Portfolio Project"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translate(0px, 0px)'}}
              />
            </div>

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
          

        </div>
      </section>
      <Analytics/>
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </main>
  );
}