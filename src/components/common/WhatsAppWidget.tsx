"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds, then hide it after 8 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const phoneNumber = "917780224863";
  const message = "Hi! I am interested in getting a quote for steel/roofing materials.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip Notification */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white px-4 py-2.5 rounded-md shadow-xl text-xs font-semibold tracking-wide flex items-center space-x-2 max-w-xs transition-colors"
          >
            <span>Need a Quick Quote? Chat on WhatsApp!</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 rounded-full transition-colors"
              aria-label="Close tooltip"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition-all relative group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping z-0 pointer-events-none" />

        <div className="relative h-7 w-7 z-10">
          <Image
            src="/images/logos/logo-whatsapp.png"
            alt="WhatsApp Logo"
            fill
            sizes="28px"
            className="object-contain"
          />
        </div>

        {/* Desktop Hover Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
          WhatsApp Us
        </span>
      </motion.a>
    </div>
  );
}
