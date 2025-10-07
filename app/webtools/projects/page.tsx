'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  language: string;
  visibility: 'public' | 'private' | 'work';
  repoType: 'personal' | 'work';
}

export default function Projects() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Web Portfolio',
      description: 'A modern portfolio website built with Next.js and Three.js',
      lastUpdated: '2025-10-06',
      language: 'TypeScript',
      visibility: 'public',
      repoType: 'personal'
    },
    {
      id: '2',
      name: 'SWE Spaces Blog',
      description: 'A developer blog about software engineering and programming',
      lastUpdated: '2025-10-05',
      language: 'JavaScript',
      visibility: 'private',
      repoType: 'personal'
    },
    {
      id: '3',
      name: 'Test Project',
      description: 'A sample project to demonstrate the WebTools interface',
      lastUpdated: '2025-10-04',
      language: 'Python',
      visibility: 'work',
      repoType: 'work'
    }
  ]);

  // If not authenticated or still loading, show login prompt
  if (status === 'unauthenticated' || status === 'loading') {
    return (
      <div className="login-prompt">
        <h2>Authentication Required</h2>
        <p>Please log in to view the projects section.</p>
        <button
          onClick={() => router.push('/webtools/login')}
          className="btn"
        >
          Go to Login
        </button>

        <style jsx>{`
          .login-prompt {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 2rem;
            background: rgba(22, 27, 34, 0.8);
            border-radius: 12px;
            border: 1px solid #30363d;
            max-width: 600px;
            margin: 2rem auto;
          }

          .login-prompt h2 {
            color: #23d520;
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .login-prompt p {
            color: #8b949e;
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background: #23d520;
            color: #000;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn:hover {
            transform: translateY(-2px);
            background: #1f8347;
          }
        `}</style>
      </div>
    );
  }

  // Get user role based on OAuth session data
  const getUserRole = () => {
    console.log('Session in getUserRole:', session);
    console.log('Session user:', session?.user);
    
    if (!session?.user) {
      console.log('No session user found');
      return 'public';
    }
    
    // These properties are guaranteed by Google OAuth
    const { email = '', email_verified } = session.user;
    console.log('User email:', email);
    console.log('Email verified:', email_verified);
    console.log('Hosted domain:', session.user.hd);
    
    // Only trust verified emails from Google OAuth
    if (!email_verified) {
      console.log('Email not verified');
      return 'public';
    }
    
    // Admin/owner check - use environment variable for security
    if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.log('Admin user detected');
      return 'admin';
    }

    // Work domain check using Google OAuth's hosted_domain
    const isWorkDomain = session.user.hd === process.env.NEXT_PUBLIC_WORK_DOMAIN;
    console.log('Work domain check:', {
      userDomain: session.user.hd,
      expectedDomain: process.env.NEXT_PUBLIC_WORK_DOMAIN,
      isWorkDomain
    });
    
    if (isWorkDomain) {
      console.log('Work user detected');
      return 'work';
    }

    console.log('Public user detected');
    return 'public';
  };

  // Filter projects based on user role from OAuth
  const userRole = getUserRole();
  const filteredProjects = projects.filter(project => {
    switch (userRole) {
      case 'admin':
        return true; // Show all projects
      case 'work':
        return project.repoType === 'work'; // Only show work projects
      case 'public':
      default:
        return project.visibility === 'public';
    }
  });

  // If work user, customize the welcome message and hide non-work sections
  const isWorkUser = userRole === 'work';

  return (
    <div className="webtools-container">
      <div className="welcome-section">
        <h1>{isWorkUser ? 'Welcome to Work Tools' : 'Welcome to WebTools'}</h1>
        <p className="welcome-description">
          {isWorkUser ? 
            'Access your work-related projects and professional tools here. This space is exclusively for work-related content.' :
            'This is a private space where I manage and showcase my software projects. Access levels are determined by your login status:'
          }
        </p>
        {!isWorkUser && (
          <div className="access-levels">
            <div className="access-level">
              <h3>Public Visitors</h3>
              <p>View selected public projects and their documentation</p>
            </div>
            <div className="access-level">
              <h3>Work Account</h3>
              <p>Access to work-related projects and professional collaborations</p>
            </div>
            <div className="access-level">
              <h3>Personal Account</h3>
              <p>Full access to all personal and public projects</p>
            </div>
          </div>
        )}
      </div>

      <div className="projects-section">
        <div className="projects-header">
          <h2>{isWorkUser ? 'Work Projects' : 'Your Projects'}</h2>
          <div className="header-buttons">
            {/* Only show New Project button for admin users */}
            {userRole === 'admin' && (
              <button className="new-project-btn">New Project</button>
            )}
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="sign-out-btn"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-info">
                <div className="project-header">
                  <h3>
                    <Link href={`/webtools/projects/${project.id}`}>
                      {project.name}
                    </Link>
                  </h3>
                  <span className={`visibility-badge ${project.visibility}`}>
                    {project.visibility}
                  </span>
                </div>
                <p className="description">{project.description}</p>
              </div>
              <div className="project-meta">
                <span className="language">
                  <span className="language-dot"></span>
                  {project.language}
                </span>
                <span className="updated">Updated {project.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .webtools-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          min-height: 100vh;
          background: #0d1117;
        }

        .welcome-section {
          margin-bottom: 48px;
          padding: 32px;
          background: rgba(22, 27, 34, 0.8);
          border-radius: 12px;
          border: 1px solid #30363d;
        }

        .welcome-section h1 {
          font-size: 32px;
          color: #23d520;
          margin-bottom: 16px;
        }

        .welcome-description {
          color: #8b949e;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .access-levels {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        .access-level {
          padding: 20px;
          background: rgba(35, 213, 32, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(35, 213, 32, 0.2);
        }

        .access-level h3 {
          color: #23d520;
          font-size: 18px;
          margin-bottom: 12px;
        }

        .access-level p {
          color: #8b949e;
          font-size: 14px;
          line-height: 1.5;
        }

        .projects-section {
          background: rgba(22, 27, 34, 0.8);
          border-radius: 12px;
          border: 1px solid #30363d;
          padding: 32px;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .projects-header h2 {
          font-size: 24px;
          color: #23d520;
        }

        .header-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .new-project-btn {
          padding: 8px 20px;
          background-color: #23d520;
          color: #000;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sign-out-btn {
          padding: 8px 20px;
          background-color: transparent;
          color: #23d520;
          border: 1px solid #23d520;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sign-out-btn:hover {
          background-color: rgba(35, 213, 32, 0.1);
          transform: translateY(-2px);
        }

        .new-project-btn:hover {
          background-color: #1f8347;
          transform: translateY(-2px);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .project-card {
          padding: 24px;
          background-color: rgba(22, 27, 34, 0.6);
          border: 1px solid #30363d;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .project-card:hover {
          border-color: #23d520;
          transform: translateY(-4px);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .project-info h3 {
          margin: 0;
          font-size: 18px;
        }

        .project-info h3 a {
          color: #23d520;
          text-decoration: none;
        }

        .project-info h3 a:hover {
          text-decoration: underline;
        }

        .visibility-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .visibility-badge.public {
          background: rgba(35, 213, 32, 0.1);
          color: #23d520;
        }

        .visibility-badge.private {
          background: rgba(249, 117, 131, 0.1);
          color: #f97583;
        }

        .visibility-badge.work {
          background: rgba(121, 184, 255, 0.1);
          color: #79b8ff;
        }

        .description {
          color: #8b949e;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: #8b949e;
        }

        .language {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .language-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #23d520;
        }

        @media (max-width: 768px) {
          .access-levels {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .webtools-container {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}

async function redirect({ url, baseUrl }) {
  console.log('Redirect callback:', { url, baseUrl });
  
  // After successful login, always redirect to projects page
  if (url === baseUrl || url === `${baseUrl}/` || url === '/') {
    const projectsUrl = `${baseUrl}/webtools/projects`;
    console.log('Redirecting to projects page:', projectsUrl);
    return projectsUrl;
  }
  
  // If someone specifically requested /webtools/projects, allow it
  if (url === '/webtools/projects' || url === `${baseUrl}/webtools/projects`) {
    const projectsUrl = `${baseUrl}/webtools/projects`;
    console.log('Direct projects page redirect:', projectsUrl);
    return projectsUrl;
  }
  
  // Handle relative URLs
  if (url.startsWith("/")) {
    // If it's a webtools route, allow it
    if (url.startsWith("/webtools")) {
      const fullUrl = `${baseUrl}${url}`;
      console.log('Webtools route redirect:', fullUrl);
      return fullUrl;
    }
    // For other relative URLs, redirect to projects
    const projectsUrl = `${baseUrl}/webtools/projects`;
    console.log('Fallback to projects for relative URL:', projectsUrl);
    return projectsUrl;
  }

  // Handle absolute URLs that match our base
  if (url.startsWith(baseUrl)) {
    // If it's a webtools URL, allow it
    if (url.includes('/webtools')) {
      console.log('Absolute webtools URL redirect:', url);
      return url;
    }
    // Otherwise redirect to projects
    const projectsUrl = `${baseUrl}/webtools/projects`;
    console.log('Fallback to projects for absolute URL:', projectsUrl);
    return projectsUrl;
  }

  // Default fallback - redirect to projects page
  const projectsUrl = `${baseUrl}/webtools/projects`;
  console.log('Default fallback redirect to projects:', projectsUrl);
  return projectsUrl;
}