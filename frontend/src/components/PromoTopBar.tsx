'use client';

import { BadgePercent, CalendarCheck, Phone, User2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function PromoTopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[#0B59FF] text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 md:py-3">
        {/* Desktop Layout (768px and above) */}
        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Discount Badge */}
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Get
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#0B59FF] text-[0.6rem] font-bold">
                50%
              </span>
            </span>
            <span className="text-sm">off for the first 3 months.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Phone Link */}
            <a
              href="tel:+447525486323"
              className="inline-flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-white transition hover:bg-white/10 lg:min-w-[8rem] lg:px-4"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">+44 7525 486323</span>
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/447525486323"
              className="inline-flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-white transition hover:bg-white/10 lg:min-w-[8rem] lg:px-4"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Account Link */}
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-white transition hover:bg-white/10 lg:min-w-[8rem] lg:px-4"
              aria-label="Account"
            >
              <User2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">Account</span>
            </a>

            {/* Instant Quote */}
            <a
              href="/quote"
              className="inline-flex min-w-[8rem] items-center justify-center gap-2 rounded-md bg-[#111827] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1f2937] lg:px-4"
            >
              <BadgePercent className="h-4 w-4" aria-hidden="true" />
              <span className="whitespace-nowrap">Instant Quote</span>
            </a>

            {/* Schedule Call */}
            <a
              href="/contact"
              className="inline-flex min-w-[8rem] items-center justify-center gap-2 rounded-md bg-[#F43F5E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#be123c] lg:px-4"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              <span className="whitespace-nowrap">Schedule Call</span>
            </a>
          </div>
        </div>

        {/* Mobile Layout (below 768px) - 2 Rows */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* Row 1: Discount text on left, icons on right */}
          <div className="flex items-center justify-between">
            {/* Discount Badge - Left side */}
            <div className="flex items-center gap-1.5 text-[0.65rem]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 font-semibold uppercase tracking-wide">
                Get
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[#0B59FF] text-[0.55rem] font-bold">
                  50%
                </span>
              </span>
              <span>off 3 months</span>
            </div>

            {/* Icons - Right side */}
            <div className="flex items-center gap-1.5">
              <a
                href="tel:+447525486323"
                className="inline-flex items-center justify-center rounded-md p-1.5 text-white transition hover:bg-white/10"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/447525486323"
                className="inline-flex items-center justify-center rounded-md p-1.5 text-white transition hover:bg-white/10"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md p-1.5 text-white transition hover:bg-white/10"
                aria-label="Account"
              >
                <User2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Row 2: Action Buttons */}
          <div className="flex items-center justify-center gap-2">
            <a
              href="/quote"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#111827] px-3 py-1.5 text-[0.65rem] font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            >
              <BadgePercent className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="whitespace-nowrap">Instant Quote</span>
            </a>

            <a
              href="/contact"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#F43F5E] px-3 py-1.5 text-[0.65rem] font-semibold text-white shadow-sm transition hover:bg-[#be123c]"
            >
              <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="whitespace-nowrap">Schedule Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}