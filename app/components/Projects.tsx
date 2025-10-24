"use client";

import React, { useState } from 'react';
import SectionHeading from './SectionHeading';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "VibeCodeCLI",
    description: "An AI-powered development suite featuring recursive code generation, dynamic token allocation, and intelligent prompt engineering. Supports 10+ programming languages with auto-testing.",
    techStack: ["LLM Fine-Tuning", "Dynamic Token Allocation", "Context Model", "Clean CLI Development", "100% Python", "Well Documented"],
    github: "https://github.com/jacksonalvarez/VibeCodeCLI",
    featured: false
  },
  {
    id: 2,
    title: "2D Drawing Engine",
    description: "A functional graphics engine built in Haskell, implementing custom rendering algorithms and recursive pattern generation. Features declarative design patterns and modular architecture.",
    techStack: ["Haskell", "Tokenization", "Graphics", "Custom File Types"],
    github: "https://github.com/jacksonalvarez/Rasterization-Engine-in-Haskell",
    featured: false
  },
  {
    id: 3,
    title: "Web Portfolio",
    description: "A modern web portfolio built with Next.js and React, featuring custom animations and responsive design. Implements Three.js for particle effects and interactive elements.",
    techStack: ["React", "Next.js", "CSS", "TypeScript", "Three.js"],
    github: "https://github.com/jacksonalvarez/Web-Portfolio",
    featured: true
  }
];

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <SectionHeading title="Engineering Projects" subtitle="Explore my recent software engineering projects and experiments" />
        <div className="projects-grid">
        {[...projects]
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
          .map((project) => (
          <div 
            key={project.id}
            className="project-card"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {project.featured && (
              <div className="featured-tag">
                <svg className="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            )}
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack-container">
                <span className="tech-stack-label">Technologies</span>
                <div className="tech-stack-mask">
                  <div className="tech-stack-scroll">
                    {/* Double the tech stack for seamless scrolling */}
                    {[...project.techStack, ...project.techStack].map((tech, index) => (
                      <span 
                        key={`${tech}-${index}`} 
                        className="tech"
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="gradient-left"></div>
                  <div className="gradient-right"></div>
                </div>
              </div>
              <a href={project.github} className="btn" target="_blank" rel="noopener noreferrer">
                <span>View Project on GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          margin-bottom: 1rem;
          width: 100%;
        }



        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .project-card {
          position: relative;
          background: rgba(17, 17, 17, 0.7);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          overflow: hidden;
          height: auto;
          display: flex;
          flex-direction: column;
          min-width: 0;
          box-sizing: border-box;
        }

        .card-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-content p {
          flex-grow: 1;
        }

        .tech-stack {
          margin-top: auto;
          padding: 1rem 0;
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(92, 246, 100, 0.3);
        }

        .featured-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #ffd700, #ffa500);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #000;
          box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
          animation: shine 2s infinite;
        }

        .featured-text {
          background: linear-gradient(45deg, #000, #333);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .star-icon {
          width: 1em;
          height: 1em;
          color: #000;
        }

        @keyframes shine {
          0% {
            background-position: -100% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .card-content h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #23d520, #1b9119);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-content p {
          margin: 0;
          line-height: 1.6;
          color: #e0e0e0;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        .tech-stack-container {
          width: 100%;
          min-height: 2.5rem;
          height: auto;
          overflow: hidden;
          background: rgba(35, 213, 32, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }

        .tech-stack-label {
          position: absolute;
          left: 1rem;
          top: -1.5rem;
          font-size: 0.8rem;
          color: rgba(35, 213, 32, 0.8);
          font-weight: 500;
        }

        .tech-stack-mask {
          position: relative;
          width: 100%;
          height: 100%;
          mask-image: linear-gradient(
            to right,
            black 0%,
            black 75%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            black 0%,
            black 75%,
            transparent 100%
          );
        }

        .tech-stack-scroll {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 2vw, 1rem);
          position: absolute;
          height: 100%;
          white-space: nowrap;
          animation: scrollTags 95s linear infinite;
          padding: 0.25rem 1rem;
        }

        .tech {
          background: rgba(35, 213, 32, 0.1);
          color: #23d520;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: clamp(0.7rem, 1.5vw, 0.85rem);
          transition: all 0.3s ease;
          height: min-content;
          white-space: nowrap;
        }

        .gradient-left,
        .gradient-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          pointer-events: none;
        }

        .gradient-left {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(19, 19, 19, 0.8) 0%,
            rgba(19, 19, 19, 0) 100%
          );
        }

        .gradient-right {
          right: 0;
          background: linear-gradient(
            to left,
            #13131363 0%,
            rgba(19, 19, 19, 0) 100%
          );
        }

        @keyframes scrollTags {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(0.8rem, 2vw, 1.2rem);
          margin-top: auto;
          background: rgba(35, 213, 32, 0.1);
          color: #23d520;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(35, 213, 32, 0.2);
          cursor: pointer;
          width: fit-content;
          gap: 0.8rem;
        }

        .btn:hover {
          transform: translateY(-2px);
          background: rgba(35, 213, 32, 0.15);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .btn svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .projects-section {
            padding: 1rem;
          }
          
          .projects-container {
            padding: 1.5rem;
          }
        }

          .featured-tag {
            top: 0.75rem;
            right: 0.75rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
