'use client';

import { useState, FormEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Access environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      // Verify that all required environment variables are set
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        // Reset form
        formRef.current.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {/* Modal Container */}
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h3>Get In Touch</h3>
          <button 
            className="modal-close-btn"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="modal-body">
          {submitStatus.type === 'success' ? (
            <div className="success-container">
              <div className="success-icon">✓</div>
              <p className="success-message">{submitStatus.message}</p>
              <button 
                onClick={onClose}
                className="btn-submit"
              >
                Close
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="from_name">Name</label>
    <input
      type="text"
      id="from_name"
      name="from_name" /* Updated to match EmailJS template */
      required
      className="form-control"
      placeholder="Your name"
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="from_email">Email</label>
    <input
      type="email"
      id="from_email"
      name="from_email" /* Updated to match EmailJS template */
      required
      className="form-control"
      placeholder="your.email@example.com"
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea
      id="message"
      name="message" /* Updated to match EmailJS template */
      required
      rows={4}
      className="form-control"
      placeholder="How can I help you?"
    ></textarea>
  </div>

  {submitStatus.type === 'error' && (
    <div className="error-message">
      {submitStatus.message}
    </div>
  )}
  
  <div className="form-actions">
    <button
      type="button"
      onClick={onClose}
      className="btn-cancel"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn-submit"
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </div>
</form>
          )}
        </div>
      </div>
    </div>
  );
}