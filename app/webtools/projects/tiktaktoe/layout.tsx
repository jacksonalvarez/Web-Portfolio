'use client';

import { useRouter } from 'next/navigation';

export default function TikTakToeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      {/* Back button overlay - always visible, high z-index */}
      <button 
        onClick={() => router.push('/webtools/projects')}
        className="project-back-button"
        aria-label="Back to Projects"
      >
        ← Projects
      </button>
      
      {/* Clean content wrapper with no layout interference */}
      <div className="project-clean-content">
        {children}
      </div>

      <style jsx>{`
        .project-back-button {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 9999;
          background: rgba(35, 213, 32, 0.9);
          color: #000;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(35, 213, 32, 0.3);
        }

        .project-back-button:hover {
          background: rgba(35, 213, 32, 1);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(35, 213, 32, 0.4);
        }

        .project-clean-content {
          /* Minimal wrapper - no layout interference */
          width: 100%;
          height: 100%;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
