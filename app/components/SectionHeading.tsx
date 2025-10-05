"use client";

import React from 'react';

interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle,
  align = 'center' 
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className="section-heading">
      {title && <h2>{title}</h2>}
      {subtitle && <p className="subtitle">{subtitle}</p>}

      <style jsx>{`
        .section-heading {
          margin-bottom: 3rem;
          text-align: ${align};
        }

        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(100deg, #0c6a32ff , #1f8347 );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: ${subtitle ? '1rem' : '0'};
          line-height: 1.2;
        }

        .subtitle {
          color: #273b2bff;
          font-size: 1.1rem;
          line-height: 1.6;
          font-weight: 700;

          opacity: 0.9;
          max-width: 600px;
          margin: ${align === 'center' ? '0 auto' : '0'};
        }

        @media (max-width: 768px) {
          .section-heading {
            margin-bottom: 2rem;
          }

          h2 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionHeading;