'use client';

import { useState, useEffect } from 'react';
import ContactModal from './Contact';
import { init } from '@emailjs/browser';
import { Analytics } from "@vercel/analytics/react";
import ClientWrapper from './components/ClientWrapper';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with public key from environment variable
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      init(publicKey);
    } else {
      console.error("EmailJS public key is not configured");
    }
  }, []);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <main>
      <ClientWrapper openContactModal={openContactModal} />
      <Analytics/>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </main>
  );
}