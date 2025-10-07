'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log('Session detected:', session);
      router.replace('/webtools/projects');
    }
  }, [session, router]);

  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      console.error('Auth error:', error);
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const result = await signIn('google', { 
        callbackUrl: '/webtools/projects',
        redirect: false
      });
      console.log('Sign in result:', result);
      
      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to initiate sign in. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="webtools-intro">
        <div className="intro-content">
          <h1>Welcome to WebTools</h1>
          <p>A private space where I manage and showcase my software projects with different visibility levels based on your credentials.</p>
          
          <div className="features">
            <div className="feature-item">
              <svg viewBox="0 0 24 24" className="feature-icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3>Secure Access</h3>
              <p>Authentication-based project visibility with different access levels</p>
            </div>
            <div className="feature-item">
              <svg viewBox="0 0 24 24" className="feature-icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3>Project Management</h3>
              <p>Organize and track both personal and professional projects</p>
            </div>
            <div className="feature-item">
              <svg viewBox="0 0 24 24" className="feature-icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3>Collaboration</h3>
              <p>Different views for work, personal, and public projects</p>
            </div>
          </div>
        </div>

        <div className="login-box">
          <div className="login-header">
            <h2>Sign In</h2>
            <p>Access your projects with Google authentication</p>
          </div>
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          <div className="login-note">
            <p>Your email domain determines your access level:</p>
            <ul>
              <li>Work email (@company.com): Work projects</li>
              <li>Personal email: All projects</li>
              <li>Other emails: Public projects only</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0d1117;
          padding: 40px 20px;
        }

        .webtools-intro {
          display: flex;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }

        .intro-content {
          flex: 1;
          padding-right: 48px;
        }

        .intro-content h1 {
          font-size: 48px;
          background: linear-gradient(45deg, #23d520, #1f8347);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
        }

        .intro-content > p {
          font-size: 18px;
          color: #8b949e;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-item {
          background: rgba(35, 213, 32, 0.1);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(35, 213, 32, 0.2);
          text-align: center;
        }

        .feature-icon {
          width: 32px;
          height: 32px;
          color: #23d520;
          margin-bottom: 16px;
        }

        .feature-item h3 {
          color: #23d520;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .feature-item p {
          color: #8b949e;
          font-size: 14px;
          line-height: 1.5;
        }

        .login-box {
          background-color: rgba(22, 27, 34, 0.8);
          padding: 40px;
          border-radius: 12px;
          border: 1px solid #30363d;
          width: 100%;
          max-width: 400px;
          backdrop-filter: blur(10px);
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h2 {
          color: #23d520;
          font-size: 24px;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #8b949e;
          font-size: 14px;
        }

        .google-signin-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          background-color: #ffffff;
          color: #000000;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .google-signin-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .google-icon {
          width: 24px;
          height: 24px;
        }

        .login-note {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #30363d;
        }

        .login-note p {
          color: #8b949e;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .login-note ul {
          list-style: none;
          padding: 0;
        }

        .login-note li {
          color: #8b949e;
          font-size: 14px;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .login-note li:before {
          content: "•";
          color: #23d520;
          position: absolute;
          left: 0;
        }

        @media (max-width: 1024px) {
          .webtools-intro {
            flex-direction: column;
            padding: 20px;
          }

          .intro-content {
            padding-right: 0;
            margin-bottom: 48px;
            text-align: center;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .login-box {
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .intro-content h1 {
            font-size: 36px;
          }

          .intro-content > p {
            font-size: 16px;
          }

          .login-container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}