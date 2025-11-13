"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  useEffect(() => {
    // lightweight analytics: send a beacon if available
    try {
      const url = '/api/telemetry/404' // optional endpoint, replace if you have one
      const payload = JSON.stringify({ path: typeof window !== 'undefined' ? window.location.pathname : '/', ts: Date.now() })
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, payload)
      } else {
        // fallback: fire-and-forget fetch
        fetch(url, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' } }).catch(() => {})
      }
    } catch (e) {
      // ignore telemetry failures
      // console.debug('telemetry failed', e)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-8">
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900">We're building this page</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">This area of the site is currently under development.</p>
        <p className="mt-2 text-gray-500">We're actively building features here — when the work is complete this page will be accessible. Thanks for your patience.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition"
          >
            Go home
          </Link>

          {/* <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border rounded-full text-gray-700 hover:bg-gray-50 transition"
          >
            Contact support
          </Link> */}
        </div>
      </motion.div>
    </div>
  )
}
