'use client';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ClientForm from './ClientForm';

export default function ContactTabs() {
  const [active, setActive] = useState<'general' | 'client'>('general');

  useEffect(() => {
    // Check URL hash on mount and when hash changes
    const checkHash = () => {
      const hash = window.location.hash;

      if (hash) {
        // Remove the # symbol
        const hashValue = hash.substring(1);

        // Parse hash format: #contact?client or #contact or #client
        // Format: #<anchor>?<tab> or #<tab> or #<anchor>
        if (hashValue.includes('?')) {
          // Format: #contact?client
          const [anchor, tab] = hashValue.split('?');

          // Set the active tab based on the query parameter
          if (tab === 'client') {
            setActive('client');
          } else if (tab === 'general') {
            setActive('general');
          }

          // Scroll to the anchor section
          if (anchor) {
            setTimeout(() => {
              const element = document.getElementById(anchor);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        } else {
          // Simple hash format: #client or #contact
          if (hashValue === 'client') {
            setActive('client');
          } else if (hashValue === 'contact') {
            // Just scroll to contact section, don't change tab
            setTimeout(() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }
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
    <div className="mx-auto">
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
