'use client';

import Image from 'next/image';
import { CheckCircle, CalendarCheck, BadgePercent } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF3E0]">
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply">
        <div className="h-full w-full bg-gradient-to-br from-[#FFF7ED] via-[#FDF0D5] to-[#FFE9C7]" />
      </div>

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:pt-40">
        {/* Left column */}
        <div className="max-w-xl space-y-8 lg:w-1/2">
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
              Accountants in London
              <br />
              for Contractors, Sole
              <br />
              Traders &amp; Limited
              <br />
              Companies
            </h1>

            <p className="text-lg text-gray-700">
              Get expert tax advice from ACCA and ACA qualified London accountants, affordable accounting packages, and dedicated support designed to help you save time and money.
            </p>
          </div>

          <ul className="space-y-3 text-base text-gray-700">
            {[
              'Your own dedicated and qualified accountant in London',
              'Company set up, easy accountant switch and take home pay help',
              'FreeAgent accounting software and virtual office included',
              'Trusted by 150+ clients with 4.9★ rating on Google and Trustpilot',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#0B59FF]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F43F5E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#be123c]"
            >
              <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Schedule a call
            </a>
            <a
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            >
               <BadgePercent className="h-3.5 w-3.5" aria-hidden="true" />
              Instant Quote
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Image src="/images/google-icon.avif" alt="Google Logo" width={60} height={60} />
              <span>
                <strong className="text-gray-900">100 reviews</strong> on Google
              </span>
            </div>
            <Image className="rounded-md"  src="/images/company logo/company-logo.jpg" alt="YouAccount Premium Badge" width={50} height={50} />
          </div>
        </div>

        {/* Right column */}
        <div className="relative mt-12 flex w-full justify-center lg:mt-0 lg:w-1/2">
          <div className="relative flex h-[525px] w-[525px] items-center justify-center rounded-[48px] bg-[#FEEDD3] ">
            <Image
              src="/images/slider-image.avif"
              alt="Accountant portrait"
              width={525}
              height={525}
              priority
              className="h-auto w-full object-contain"
            />

  
          </div>
        </div>
      </div>
    </section>
  );
}