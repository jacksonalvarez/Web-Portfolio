"use client";
"use client";

import React, { useState } from 'react';
import SectionHeading from './SectionHeading';

interface SkillCategory {
  title: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "Java", "Python", "C/C#/C++", "Haskell", "Assembly", "Powershell ", "Active Directory", "LaTeX", "MATLAB", "R"]
    },
    {
      title: "Web Dev",
      skills: ["React/React-Native", "SQL/NoSQL", "Node", "Next.js", "HTML/CSS/Javascript","Azure", "AWS", "AWS Lambda", "Kubernetes", "Terraform", "MongoDB/Atlas", "Bootstrap"]
    },
    {
      title: "Soft Skills",
      skills: ["Team Player", "Strong Mathematics", "Unique Problem Solver", "Attention to Detail", "Project Management", "Friendly & Approachable", "Leadership & Accountability", "#ILoveCoding", "Quick Learner", "Effective Communication", "Time Management", "Confidenct Presenter"]
    },
  {
      title: "Industries",
      skills: ["Web Development", "Application Development", "Product Development","IT Support", "Environmental Conservation", "Gov-Tech", "Data Visualization", "Manufacturing", "Government Contracting", "Computer Science Education", "Entrepreneurship", "AI/ML"]
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) { // Swipe left
        setActiveCategory((prev) => (prev + 1) % categories.length);
      } else { // Swipe right
        setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length);
      }
    }
  };

  const handlePrevCategory = () => {
    setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleNextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % categories.length);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-outer-container">
        <SectionHeading title="Experience" subtitle="Explore my technical expertise" />
        <div className="skills-container">
        <div className="category-navigation">
          {categories.map((category, index) => (
            <button
              key={category.title}
              className={`category-button ${index === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              {category.title}
              <span className="button-highlight"></span>
            </button>
          ))}
        </div>
        
        <div 
          className="skills-content"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mobile-nav">
            <button onClick={handlePrevCategory} className="nav-arrow left">←</button>
            <h2>{categories[activeCategory].title}</h2>
            <button onClick={handleNextCategory} className="nav-arrow right">→</button>
          </div>
          
          <div className="skills-list">
            {categories[activeCategory].skills.map((skill, index) => (
              <div 
                key={skill} 
                className="skill-item"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        .skills-section {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          margin-bottom: 1rem;
        }

        .skills-outer-container {
          background: #13131363;
          border-radius: 10px;
          box-shadow: 0 5px 15px #13131363;
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(10px);
          padding: 2rem;
        }

        .skills-container {
          display: flex;
          gap: 2rem;
          padding: 2rem;
          min-height: 400px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .category-navigation {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 200px;
          padding-right: 2rem;
          border-right: 1px solid rgba(35, 213, 32, 0.2);
          position: absolute;
          left: 0;
        }

        .category-button {
          position: relative;
          background: transparent;
          border: none;
          color: #e0e0e0;
          padding: 1rem 2rem;
          text-align: left;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          border-radius: 8px;
        }

        .category-button:hover {
          color: #23d520;
          background: rgba(35, 213, 32, 0.1);
        }

        .category-button.active {
          color: #23d520;
          background: rgba(35, 213, 32, 0.15);
        }

        .button-highlight {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #23d520;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .category-button.active .button-highlight {
          transform: scaleY(1);
        }

        .skills-content {
          flex: 1;
          padding-left: calc(200px + 4rem);
          width: 100%;
        }

        .mobile-nav {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .nav-arrow {
          background: transparent;
          border: none;
          color: #23d520;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }

        .nav-arrow:hover {
          transform: scale(1.2);
        }

        .skills-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .skill-item {
          background: rgba(35, 213, 32, 0.1);
          padding: 1rem;
          border-radius: 8px;
          color: #e0e0e0;
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .skill-item:hover {
          background: rgba(35, 213, 32, 0.2);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1200px) and (min-width: 769px) {
          .skills-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .skills-container {
            flex-direction: column;
            padding: 1rem;
          }

          .category-navigation {
            display: none;
          }

          .mobile-nav {
            display: flex;
          }

          .skills-content {
            padding-left: 0;
          }

          .skills-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
