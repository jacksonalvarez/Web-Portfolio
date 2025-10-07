'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WebtoolsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to projects page
    router.replace('/webtools/projects');
  }, [router]);

  return (
    <div className="redirect-loading">
      <div className="loading-spinner"></div>
      <p>Redirecting to projects...</p>
      
      <style jsx>{`
        .redirect-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          padding: 2rem;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #30363d;
          border-top: 4px solid #23d520;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .redirect-loading p {
          color: #8b949e;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}