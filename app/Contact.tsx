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
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .modal-container {
          background: #13131363;
          border-radius: 10px;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 5px 15px #13131363;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #23d520;
          padding-bottom: 1rem;
        }

        .modal-header h3 {
          color: #23d520;
          font-size: 1.5rem;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #23d520;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.2s ease;
        }

        .modal-close-btn:hover {
          transform: scale(1.1);
          color: #1b9119;
        }

        .modal-body {
          color: #fff;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #23d520;
        }

        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #23d520;
          border-radius: 6px;
          background: #13131363;
          color: #fff;
          transition: border-color 0.2s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .form-control:focus {
          outline: none;
          border-color: #1b9119;
          box-shadow: 0 0 0 2px rgba(35, 213, 32, 0.2);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn-submit, .btn-cancel {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .btn-submit {
          background: #1f8347;
          border: none;
          color: rgb(0, 0, 0);
          border-radius: 50px;
          font-weight: bold;
          padding: 1rem 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-submit:disabled {
          background: #1b9119;
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }        .btn-cancel {
          background: transparent;
          border: 1px solid #23d520;
          color: #23d520;
        }

        .btn-cancel:hover {
          background: rgba(35, 213, 32, 0.1);
        }

        .error-message {
          color: #ff4444;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid #ff4444;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .success-container {
          text-align: center;
          padding: 2rem;
        }

        .success-icon {
          color: #23d520;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .success-message {
          color: #fff;
          margin-bottom: 2rem;
        }
      `}</style>
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