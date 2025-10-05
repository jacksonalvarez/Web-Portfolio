import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import ClientLayout from './components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>Jackson | Fullstack Developer</title>
        <meta name="description" content="Portfolio of Jackson, a fullstack developer specializing in modern web applications" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}