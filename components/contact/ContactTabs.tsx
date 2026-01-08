'use client';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ClientForm from './ClientForm';

export default function ContactTabs() {
  const [active, setActive] = useState<'general' | 'client'>('general');

  useEffect(() => {
    // Check URL hash on mount
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#client') {
        setActive('client');
      }
    };

    // Check hash on initial mount
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Tabs */}
      <div className="mb-8 flex border-b">
        <button
          onClick={() => setActive('general')}
          className={`cursor-pointer px-6 py-3 font-semibold transition ${
            active === 'general'
              ? 'border-nugreen-500 text-nugreen-600 border-b-2'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          General Contact
        </button>
        <button
          onClick={() => setActive('client')}
          className={`cursor-pointer px-6 py-3 font-semibold transition ${
            active === 'client'
              ? 'border-nugreen-500 text-nugreen-600 border-b-2'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          New Client
        </button>
      </div>

      {active === 'general' && <ContactForm />}
      {active === 'client' && <ClientForm />}
    </div>
  );
}
