"use client";

import React from 'react';
import SectionHeading from './SectionHeading';

const Story: React.FC = () => (
  <section id="story" className="story">
    <div className="story-content">
      <SectionHeading title="My Story" subtitle="A journey from childhood curiosity to professional software development" />
      <div className="story-text">
        <p>
          My journey into technology began with a simple curiosity at age 11. What started as tinkering with basic HTML and CSS quickly evolved into a deep fascination with how computers work. By high school, I was already developing small games and applications, teaching myself Python and Java through countless hours of experimentation and online tutorials.
        </p>
        <p>
          This passion led me to pursue Computer Science at <span className="highlight">Appalachian State University</span>, where I discovered that programming wasn't just about writing code – it was about solving problems and creating solutions that make a difference. The ability to turn ideas into reality through code has become my driving force.
        </p>
        <p>
          I'm based in the <span className="highlight">Charlotte metropolitan area</span> and have recently joined <span className="highlight">EverBlue</span> as an IT Support Engineer. While I enjoy my role, my true passion lies in software development and entrepreneurship. I'm actively seeking connections with fellow developers and entrepreneurs who share my enthusiasm for creating innovative software solutions.
        </p>
        <p>
          If you're passionate about coding, entrepreneurship, or both, I'd love to connect! Keep an eye out for my upcoming blog about SWE, where I'll be sharing my thoughts on software engineering, development practices, and the occasional programmer rambling. Let's build something amazing together.
        </p>
      </div>
    </div>
    <style jsx>{`
      .story {
        background: rgb(5 5 5 / 95%);
        border-radius: 3px;
        padding: 3rem 2rem;
        box-shadow: 1px 4px 4px rgba(34, 62, 35, 1);
        margin: 2rem auto;
      }

      .story-content {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .story-text {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #e0e0e0;
        font-family: system-ui, -apple-system, sans-serif;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
      }

      .story-text p {
        margin: 0 auto 1.5rem;
        text-align: left;
        padding: 0 1rem;
      }

      .story-text p:last-child {
        margin-bottom: 0;
      }

      .highlight {
        color: #23d520;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .highlight:hover {
        color: #1b9119;
      }

      @media (max-width: 768px) {
        .story {
          padding: 2rem 1.5rem;
          margin: 1rem auto;
        }

        .story-text {
          font-size: 1rem;
          line-height: 1.7;
        }

        .story-text p {
          text-align: left;
        }
      }
    `}</style>
  </section>
);

export default Story;
