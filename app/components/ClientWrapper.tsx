"use client";

import React from 'react';
import Story from './Story';
import Skills from './Skills';
import Projects from './Projects';
import Hero from './Hero';

interface ClientWrapperProps {
  openContactModal: () => void;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ openContactModal }) => {
  return (
    <div className="sections-wrapper">
      <section className="section-container">
        <Hero openContactModal={openContactModal} />
      </section>
      
      <section className="section-container">
        <Skills />
      </section>
      
      <section className="section-container">
        <Projects />
      </section>
      
      <section className="section-container">
        <Story />
      </section>
      <style jsx>{`
        .sections-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 2rem;
          /* create a stacking context so backdrop-filter on section children can access the canvas behind */
          isolation: isolate;
        }

        .section-container {
          margin: 2rem 0;
          width: 100%;
          max-width: 2500px;
          /* use rgba for wider compatibility with alpha channel */
          background: rgba(0, 0, 0, 0.99);
          border-radius: 4px;
          
          box-shadow: 0 5px 35px #111111ff;
          backdrop-filter: blur(35px);
          -webkit-backdrop-filter: blur(35px);
          /* Make sure the element participates in stacking so backdrop-filter can access the backdrop
             (backdrop-filter only blurs elements behind it within the same stacking context). */
          position: relative;
          z-index: 1;
          padding: 4rem;
        }

        .section-container:first-child {
          margin-top: 8rem;
        }

        .section-container:last-child {
          margin-bottom: 4rem;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .sections-wrapper {
            padding: 0 1.5rem;
          }

          .section-container {
            padding: 3rem;
            margin: 1.5rem 0;
          }

          .section-container:first-child {
            margin-top: 7rem;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .sections-wrapper {
            padding: 0 1rem;
          }

          .section-container {
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 12px;
          }

          .section-container:first-child {
            margin-top: 5rem;
          }

          .section-container:last-child {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientWrapper;