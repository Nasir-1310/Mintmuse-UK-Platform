'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, CalendarCheck } from 'lucide-react';

const services = [
  { label: 'Contractor accountants', href: '/services/contractor-accountants' },
  { label: 'Ecommerce & shopify accountants', href: '/services/ecommerce-accountants' },
  { label: 'Creative industry accountants', href: '/services/creative-accountants' },
  { label: 'Therapist & psychologist accountants', href: '/services/therapist-accountants' },
  { label: 'Startups accountants', href: '/services/startup-accountants' },
  { label: 'Doctors & healthcare accountants', href: '/services/healthcare-accountants' },
  { label: 'Consultants & project managers accountants', href: '/services/consultant-accountants' },
  { label: 'UK crypto tax accountants', href: '/services/crypto-tax-accountants' },
];

export default function WhoWeHelp() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Specialist Accounting Services Across Multiple Industries',
    description: 'We support businesses across multiple industries with tailored accounting services. You\'ll have a dedicated accountant working with you and we\'ll make sure all your filings are sorted out.',
    provider: {
      '@type': 'AccountingService',
      name: 'London Accountants',
    },
    areaServed: {
      '@type': 'City',
      name: 'London',
    },
    serviceType: services.map((service) => service.label),
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section 
        id="who-we-help" 
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="who-we-help-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 bg-yellow lg:order-1 flex justify-center lg:justify-start">
              <figure className="relative w-full max-w-[525px] aspect-square">
                <Image
                  src="/images/WhoWeAre.png"
                  alt="Professional accountant providing specialist accounting services across multiple industries including technology, healthcare, e-commerce, and creative sectors"
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
                  id="who-we-help-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                >
                  Specialist Accounting Services Across Multiple Industries
                </h2>
              </header>

              <p className="text-lg text-gray-700 leading-relaxed">
                We support businesses across multiple industries with tailored accounting services. You'll have a dedicated accountant working with you and we'll make sure all your filings are sorted out. Whether you need{' '}
                <Link
                  href="/services/london-accountants"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  aria-label="Find an accountant in London"
                >
                  accountant in London
                </Link>{' '}
                or reliable{' '}
                <Link
                  href="/services/online-accountants"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  aria-label="Find reliable online accountants"
                >
                  online accountants
                </Link>
                , we're here to help.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Our specialist accounting services cover:
                </h3>

                <nav aria-label="Specialist accounting services">
                  <ul className="space-y-3" role="list">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle 
                          className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" 
                          aria-hidden="true"
                          role="img"
                          aria-label="Service available"
                        />
                        <Link
                          href={service.href}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          aria-label={`Learn more about ${service.label}`}
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[#F43F5E] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#be123c]"
                  aria-label="Schedule a consultation call"
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