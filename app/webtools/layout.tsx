'use client';

import { SessionProvider } from 'next-auth/react';

export default function WebToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="webtools-layout">
        <div className="webtools-overlay" />
        <div className="webtools-content">
          {children}
        </div>
      <style jsx>{`
        .webtools-layout {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .webtools-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(13, 17, 23, 0.95);
          backdrop-filter: blur(8px);
          z-index: 1;
        }

        .webtools-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          /* Custom scrollbar styles */
          scrollbar-width: thin;
          scrollbar-color: #23d520 #0d1117;
        }

        .webtools-content::-webkit-scrollbar {
          width: 8px;
        }

        .webtools-content::-webkit-scrollbar-track {
          background: #0d1117;
        }

        .webtools-content::-webkit-scrollbar-thumb {
          background-color: #23d520;
          border-radius: 20px;
          border: 2px solid #0d1117;
        }
      `}</style>
      </div>
    </SessionProvider>
  );
}
