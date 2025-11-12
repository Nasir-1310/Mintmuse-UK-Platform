 'use client';

import { useEffect, useState } from 'react';
import PromoTopBar from '@/components/PromoTopBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { api } from '@/services/api';

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await api.getWelcomeMessage();
        setMessage(data.message);
      } catch (err) {
        setError('Failed to connect to the backend');
        console.error('Error fetching message:', err);
      }
    };

    fetchMessage();
  }, []);

  return (
    <>
    <PromoTopBar />
      <Header />

      {/* main content; add top padding to account for fixed header */}
      <main className="pt-24 min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <Hero />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-sm mt-12">
          {/* backend connectivity status */}
          <div className="mb-6">
            {error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            ) : (
              message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="status">
                  <span className="block sm:inline">Backend says: {message}</span>
                </div>
              )
            )}
          </div>

          <section className="mt-8">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
              <h2 className="text-2xl font-semibold">Developer notes</h2>
              <p className="text-gray-600 max-w-2xl">
                This sample page includes a responsive, accessible header and a hero section. For SEO we use proper semantic elements
                (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;h1&gt;</code>). Replace the placeholder images in
                <code> /public/images/</code> with your provided assets (see instructions below).
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
