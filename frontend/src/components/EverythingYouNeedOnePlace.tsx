'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, CalendarCheck, FileCheck, BadgePercent } from 'lucide-react';

const services = [
  {
    title: 'Monthly Accounting Support',
    description: 'Dedicated London accountant, filings, FreeAgent software & more.',
  },
  {
    title: 'Tax Guidance & Filing',
    description: 'Self assessments, corporation tax, end of year accounts, crypto we\'ve got you covered.',
  },
  {
    title: 'Optional Extras',
    description: 'London virtual office address, banking and insurance partnerships.',
  },
];

export default function EverythingYouNeedOnePlace() {
  // Structured data for SEO    
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Everything You Need, In One Place',
    description: 'Always speak to the same expert - no call centres, no bots. Monthly accounting support, tax guidance & filing, and optional extras.',
    provider: {
      '@type': 'AccountingService',
      name: 'London Accountants',
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
       
        className="bg-[#E0F2FE] py-16 sm:py-20 lg:py-24"
        aria-labelledby="Everything-in-one-place-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <figure className="relative w-full max-w-[525px] aspect-square">
                <Image
                  src="/images/everything-in-one-place.avif"
                  alt="Professional accountant with comprehensive accounting services including monthly support, tax guidance, and optional extras"
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
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 leading-tight"
                >
                  Everything You Need, In One Place
                </h2>
              </header>

              <p className="text-sm sm:text-lg text-blue-800 font-medium leading-relaxed">
                Always speak to the same expert - no call centres, no bots.
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
                        <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
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

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[#F43F5E] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#be123c]"
                  aria-label="Schedule a consultation call"
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Schedule a call
                </Link>

                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-md bg-[#111827] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
                  aria-label="Get an instant quote"
                >
                  <BadgePercent className="h-5 w-5" aria-hidden="true" />
                  Instant Quote
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}