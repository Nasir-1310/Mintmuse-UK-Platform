'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, CalendarCheck } from 'lucide-react';

const services = [
  {
    title: 'Monthly Accounting Support',
    description: 'Dedicated accountant, filings, FreeAgent software & advice',
  },
  {
    title: 'Tax Efficiency Guidance',
    description: 'We\'ll show you the most efficient setup for your income',
  },
  {
    title: 'Sole Trader & Self-Employed Support',
    description: 'We register you with HMRC and file your self-assessment',
  },
];

export default function WhatWeDo() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Start Right: Expert Guidance on Business Structure Setup',
    description: 'Confused about limited vs sole trader? Our ACCA and AAT qualified London accountants will walk you through the best option for your business.',
    provider: {
      '@type': 'AccountingService',
      name: 'London Accountants',
      qualification: ['ACCA', 'AAT'],
    },
    areaServed: {
      '@type': 'City',
      name: 'London',
    },
    serviceType: services.map((service) => service.title),
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section 
        id="what-we-do" 
        className="bg-[#E0F2FE] py-16 sm:py-20 lg:py-24"
        aria-labelledby="what-we-do-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <figure className="relative w-full max-w-[525px] aspect-square">
                <Image
                  src="/images/what-we-do.avif"
                  alt="ACCA and AAT qualified London accountant providing expert guidance on business structure setup, including limited company vs sole trader consultation, monthly accounting support, and tax efficiency guidance"
                  width={525}
                  height={525}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                  loading="eager"
                />
              </figure>
            </div>

            {/* Right Column - Text Content */}
            <article className="order-1 lg:order-2 space-y-6">
              <header>
                <h2 
                  id="what-we-do-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight"
                >
                  Start Right: Expert Guidance on Business Structure Setup
                </h2>
              </header>

              <p className="text-lg sm:text-xl text-blue-800 leading-relaxed">
                Confused about limited vs sole trader? Our ACCA and AAT qualified London accountants will walk you through the best option for your business.
              </p>

              <div className="space-y-4">
                <ul className="space-y-4" role="list">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle 
                        className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" 
                        aria-hidden="true"
                        role="img"
                        aria-label="Service included"
                      />
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[#F43F5E] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#be123c]"
                  aria-label="Schedule a consultation call for business structure guidance"
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Schedule a call
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}