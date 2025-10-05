"use client";

import React from 'react';

interface HeroProps {
  openContactModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openContactModal }) => (
  <section id="home" className="hero">
    <div className="hero-content">
      <h1>Hello, I'm Jackson Alvarez</h1>
      <h3>Software Engineer and IT Systems</h3>
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
    <div 
      className="hero-pic-container"
      ref={(el) => {
        if (el) {
          const updateBorderIntensity = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
              Math.pow(e.clientX - elementCenterX, 2) + 
              Math.pow(e.clientY - elementCenterY, 2)
            );
            
            const maxDistance = 500;
            const intensity = Math.max(0, Math.min(1, 1 - (distance / maxDistance)));
            el.style.setProperty('--border-mix', intensity.toString());
          };

          // Add event listener to document
          document.addEventListener('mousemove', updateBorderIntensity);
        }
      }}
    >
          <div className="ring-inner">
            <div className="content">
              <img src="/picfs.png" alt="Jackson Alvarez" />
            </div>
      </div>
    </div>
    <style jsx>{`
      .hero-pic-container {
        position: relative;
        width: 300px;
        height: 300px;
        flex-shrink: 0;
      }

      .ring-outer {
        position: absolute;
        top: -12px;
        left: -12px;
        width: calc(100% + 24px);
        height: calc(100% + 24px);
        border-radius: 50%;
        padding: 2px;
        background: linear-gradient(45deg, 
          rgba(35, 213, 32, calc(0.1 + (0.4 * var(--border-mix, 0)))), 
          rgba(27, 165, 25, calc(0.05 + (0.35 * var(--border-mix, 0))))
        );
        transition: all 0.15s ease;
        box-shadow: 
          0 0 15px rgba(35, 213, 32, calc(0.05 + (0.2 * var(--border-mix, 0)))),
          0 0 30px rgba(35, 213, 32, calc(0.02 + (0.1 * var(--border-mix, 0))));
      }

      .ring-middle {
        position: absolute;
        top: 4px;
        left: 4px;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        border-radius: 50%;
        padding: 2px;
        background: linear-gradient(45deg, 
          rgba(35, 213, 32, calc(0.15 + (0.6 * var(--border-mix, 0)))), 
          rgba(27, 165, 25, calc(0.1 + (0.5 * var(--border-mix, 0))))
        );
        transition: all 0.15s ease;
        box-shadow: 
          0 0 15px rgba(35, 213, 32, calc(0.08 + (0.3 * var(--border-mix, 0)))),
          0 0 30px rgba(35, 213, 32, calc(0.04 + (0.15 * var(--border-mix, 0))));
      }

      .ring-inner {
        position: absolute;
        top: 4px;
        left: 4px;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        border-radius: 50%;
        padding: 2px;
        background: linear-gradient(45deg, 
          rgba(35, 213, 32, calc(0.2 + (0.8 * var(--border-mix, 0)))), 
          rgba(27, 165, 25, calc(0.15 + (0.85 * var(--border-mix, 0))))
        );
        transition: all 0.15s ease;
        box-shadow: 
          0 0 15px rgba(35, 213, 32, calc(0.1 + (0.5 * var(--border-mix, 0)))),
          0 0 30px rgba(35, 213, 32, calc(0.05 + (0.3 * var(--border-mix, 0))));
      }

      .content {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        background: #1a1a1a;
      }

      .content img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1);
        border-radius: 50%;
      }

      .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        background: #13131363;
        border-radius: 10px;
        box-shadow: 0 5px 15px #13131363;
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(10px);
        margin-bottom: 1rem;
      }

      .hero-pic-container {
        position: relative;
        width: 300px;
        height: 300px;
        flex-shrink: 0;
      }

      .border-orb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 4px;
        background: linear-gradient(45deg, 
          rgba(35, 213, 32, calc(0.2 + (0.8 * var(--border-mix, 0)))), 
          rgba(27, 165, 25, calc(0.15 + (0.85 * var(--border-mix, 0))))
        );
        transition: all 0.15s ease;
        box-shadow: 
          0 0 15px rgba(35, 213, 32, calc(0.1 + (0.5 * var(--border-mix, 0)))),
          0 0 30px rgba(35, 213, 32, calc(0.05 + (0.3 * var(--border-mix, 0))));
      }

      .content {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        background: #1a1a1a;
      }

      .border-orb img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(.95);
        border-radius: 50%;
      }
      .hero-content {
        flex: 1;
        padding-right: 2rem;
      }
      .hero h1 {
        color: #d9ead8ff !important;
        background: #1f8347ff;
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 3s ease-in-out infinite;
        transition: transform 0.3s ease;
        font-size: 3rem;
        margin-bottom: 1rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.1;
      }
      .hero h1:hover {
        transform: translateY(-2px);
        text-shadow: 0 4px 8px rgba(43, 124, 54, 0.46);
      }
      .hero h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #9d4edd;
        font-weight: 500;
        text-align: left;
      }
      .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        line-height: 1.6;
        color: #becfbcff;
        max-width: 450px;
        margin-left: 0;
        margin-right: 0;
        padding: 0;
      }
      .hero-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .hero-buttons .btn {
        width: auto;
        max-width: 320px;
        padding: 16px 28px;
        font-size: 1.15rem;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.3s ease;
      }
      .hero-buttons .btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(35, 213, 32, 0.3);
      }
      .social-buttons-row {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .social-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(35, 213, 32, 0.1);
        border: 2px solid rgba(35, 213, 32, 0.2);
        transition: all 0.3s ease;
        margin: 0 10px;
      }
      .social-button:hover {
        background: rgba(35, 213, 32, 0.2);
        transform: scale(1.1);
      }
      .hero-pic-container {
        position: relative;
        width: 300px;
        height: 300px;
        flex-shrink: 0;
      }

      .plasma-orb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 4px;
        background: linear-gradient(45deg, rgba(35, 213, 32, 0.3), rgba(27, 165, 25, 0.3));
        transition: all 0.3s ease;

        overflow: hidden;
      }

      .plasma-content {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        background: #1a1a1a;
        isolation: isolate;
      }

      .plasma-fill {
        position: absolute;
        inset: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(215deg, 
          rgba(35, 213, 32, 0.4), 
          rgba(27, 165, 25, 0.4)
        );
        filter: url('#turbulence') blur(8px);
        opacity: 0.8;
        mix-blend-mode: screen;
        animation: turbulence 8s linear infinite;
      }

      @keyframes turbulence {
        0% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-20px, 10px) scale(1.05); }
        50% { transform: translate(10px, -15px) scale(0.95); }
        75% { transform: translate(-15px, -10px) scale(1.05); }
        100% { transform: translate(0, 0) scale(1); }
      }

      .plasma-sparks {
        position: absolute;
        inset: -50%;
        background: radial-gradient(
          circle at var(--mouse-x) var(--mouse-y), 
          rgba(35, 213, 32, calc(0.4 * var(--intensity) * (1 - var(--is-close)))), 
          rgba(27, 165, 25, calc(0.3 * var(--intensity) * (1 - var(--is-close)))), 
          transparent 50%
        );
        --internal-glow: radial-gradient(
          circle at var(--mouse-x) var(--mouse-y),
          rgba(35, 213, 32, calc(0.6 * var(--intensity) * var(--is-close))),
          rgba(27, 165, 25, calc(0.4 * var(--intensity) * var(--is-close))),
          transparent 30%
        );
        background-image: var(--internal-glow), var(--background);
        mix-blend-mode: screen;
        transform-origin: center;
        opacity: 0.8;
        transition: all 0.3s ease;
      }

      .plasma-orb img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(0.85);
        border-radius: 50%;
        z-index: 1;
      }

      @keyframes fillPlasma {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 0.7; transform: scale(1.1); }
        100% { opacity: 0.5; transform: scale(1); }
      }

      .plasma-orb:hover {
        animation: none;
      }

      .plasma-orb:hover .plasma-fill {
        animation: pulsePlasma 2s ease-in-out infinite;
      }

      @keyframes pulsePlasma {
        0% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
        100% { opacity: 0.5; transform: scale(1); }
      }
      .hero-pic:hover {
        transform: scale(1.05);
      }
      .hero-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        transform: scale(.8);
      }
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      @media (max-width: 600px) {
        .hero {
          flex-direction: column !important;
          text-align: center !important;
          padding: 70px 15px 0px 15px !important;
          min-height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: linear-gradient(135deg, rgba(35, 213, 32, 0.05), rgba(27, 165, 25, 0.05)) !important;
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
          border: 4px solid rgba(35, 213, 32, 0.2) !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          box-shadow: 0 10px 30px rgba(35, 213, 32, 0.15) !important;
          transition: transform 0.3s ease !important;
          box-sizing: border-box !important;
          aspect-ratio: 1 / 1 !important;
          width: 200px !important;
          height: 200px !important;
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
          transform: scale(0.85) !important; /* Zoom out the image on mobile too */
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
          color: #9d4edd !important;
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
        .social-buttons-row {
          display: flex !important;
          flex-direction: row !important;
          gap: 20px !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          margin-top: 25px !important;
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
          margin: 0 !important;
          aspect-ratio: 1 / 1 !important;
        }
        .social-button:hover {
          background: rgba(139, 92, 246, 0.2) !important;
          transform: scale(1.1) !important;
        }
      }

      @media (max-width: 1024px) and (min-width: 769px) {
        .hero-buttons {
          flex-wrap: wrap;
          gap: 1rem;
        }
        .social-buttons-row {
          flex-wrap: nowrap;
          gap: 1rem;
        }
        .hero-buttons .btn {
          min-width: 160px;
        }
      }

      @media (max-width: 768px) and (min-width: 601px) {
        .hero {
          flex-direction: column !important;
          text-align: center !important;
          padding: 70px 15px 0px 15px !important;
          min-height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: linear-gradient(135deg, rgba(35, 213, 32, 0.05), rgba(27, 165, 25, 0.05)) !important;
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
          border: 4px solid rgba(35, 213, 32, 0.2) !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          box-shadow: 0 10px 30px rgba(35, 213, 32, 0.15) !important;
          transition: transform 0.3s ease !important;
          box-sizing: border-box !important;
          aspect-ratio: 1 / 1 !important;
          width: 300px !important;
          height: 200px !important;
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
          transform: scale(0.85) !important; /* Zoom out the image on mobile too */
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
          color: #9d4edd !important;
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
        .social-buttons-row {
          display: flex !important;
          flex-direction: row !important;
          gap: 20px !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          margin-top: 25px !important;
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
          margin: 0 !important;
          aspect-ratio: 1 / 1 !important;
        }
        .social-button:hover {
          background: rgba(139, 92, 246, 0.2) !important;
          transform: scale(1.1) !important;
        }
      }
    `}</style>
  </section>
);

export default Hero;

