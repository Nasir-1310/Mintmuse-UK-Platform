'use client';

import Link from 'next/link';
import { ArrowUpRight, LayoutGrid, UserCheck, MapPin, FileLock, Bitcoin, Calendar, BadgePercent } from 'lucide-react';

interface ServiceCard {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    iconBg: 'bg-blue-100',
    title: 'Monthly Business Accounting Packages',
    description: 'All-inclusive accounting services from contractor accountants, sole trader accountants & limited company accountants',
    href: '/services/monthly-accounting',
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    iconBg: 'bg-red-100',
    title: 'Self Assessment Tax Returns',
    description: 'Personal tax return filing from experienced self employed accountants for individuals and self-employed professionals',
    href: '/services/self-assessment',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    iconBg: 'bg-orange-100',
    title: 'London Virtual Office & Mail Handling',
    description: 'Ideal for remote businesses and startups needing a prestigious London business address for Companies House registration',
    href: '/services/virtual-office',
  },
  {
    icon: <FileLock className="h-6 w-6" />,
    iconBg: 'bg-blue-100',
    title: 'Limited Company Set Up & Registration',
    description: 'Free company incorporation when you join a monthly accounting package. We handle all Companies House paperwork and HMRC registrations',
    href: '/services/company-setup',
  },
  {
    icon: <Bitcoin className="h-6 w-6" />,
    iconBg: 'bg-red-100',
    title: 'Crypto & Capital Gains Tax Filing',
    description: 'Expert guidance on cryptocurrency taxation, crypto tax returns and help with capital gains tax for crypto traders',
    href: '/services/crypto-tax',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    iconBg: 'bg-orange-100',
    title: 'End of Year Accounts & Corporation Tax',
    description: 'Accurate annual accounts & corporation tax filing ensuring full compliance with Companies Act and HMRC requirements',
    href: '/services/year-end-accounts',
  },
];

export default function Services() {
  const highlightText = (text: string) => {
    // Highlight specific phrases with links
    const phrases = [
      { text: 'contractor accountants', href: '/services/contractor-accountants' },
      { text: 'sole trader accountants', href: '/services/sole-trader-accountants' },
      { text: 'limited company accountants', href: '/services/limited-company-accountants' },
      { text: 'self employed accountants', href: '/services/self-employed-accountants' },
      { text: 'London business address', href: '/services/virtual-office' },
    ];

    let highlightedText = text;
    phrases.forEach((phrase) => {
      const regex = new RegExp(`(${phrase.text})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<a href="${phrase.href}" class="text-blue-600 underline hover:text-blue-800 transition-colors">$1</a>`
      );
    });

    return highlightedText;
  };

  return (
    <section id="services" className="bg-[#F0F9F4] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-12 sm:mb-16">
          Our Accounting Services in London
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Arrow icon in top right - always visible */}
              <div className="absolute top-4 right-4">
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>

              {/* Icon */}
              <div className={`${service.iconBg} rounded-lg w-12 h-12 flex items-center justify-center text-white mb-4`}>
                <div className="text-gray-700">
                  {service.icon}
                </div>
              </div>

              {/* Title as Link */}
              <Link
                href={service.href}
                className="block text-lg font-bold text-gray-900 mb-3 pr-8 hover:text-blue-600 transition-colors"
              >
                {service.title}
              </Link>

              {/* Description with highlighted links */}
              <p
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightText(service.description) }}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
        <a
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            >
               <BadgePercent className="h-3.5 w-3.5" aria-hidden="true" />
              Instant Quote
            </a>
        </div>
      </div>
    </section>
  );
}