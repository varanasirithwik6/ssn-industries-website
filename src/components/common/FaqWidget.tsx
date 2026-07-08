"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const faqs: FaqItem[] = [
    {
      question: "What roofing sheet types do you supply?",
      answer: "We supply premium Galvalume, Aluzinc, and co-extruded 3-layer UPVC roofing sheets. Thickness options range from 0.40mm to 0.50mm for Aluzinc, and up to 3.0mm for UPVC. All support custom roll-forming sheared exactly to your structural drawings in feet."
    },
    {
      question: "What grades of TMT rods do you offer?",
      answer: "We offer Fe 550D grade TMT reinforcement rebars conforming strictly to IS 1786. Sourced from certified suppliers Vizag Steel and Simhadri TMT. Diameters range from 8mm to 32mm."
    },
    {
      question: "Which delivery areas do you cover?",
      answer: "We handle bulk deliveries throughout Andhra Pradesh, with dedicated, rapid logistics directly to sites in Srikakulam, Vizianagaram, Visakhapatnam, and surrounding coastal districts."
    },
    {
      question: "Which steel brands are available?",
      answer: "Our catalog consists of leading, verified steel and plumbing brands including Tata Steel, JSW Steel, Jindal, Vizag Steel, Simhadri TMT, OMPL Steel, and premium UPVC products."
    },
    {
      question: "How can I request a price quotation?",
      answer: "You can request a custom quotation by clicking 'Get In Touch' and filling out our contact form, sending us an email, or messaging us directly on WhatsApp with your product specs and delivery location."
    },
    {
      question: "How can I get in touch with your office?",
      answer: "Our corporate headquarters is located at Chittapullivalasa, Veeraghattam, Andhra Pradesh – 532460. You can reach MD Maddi Bhaskar Rao directly via phone at +91 77802 24863 or email at ssnindustries7@gmail.com."
    },
    {
      question: "Do you support commercial bulk orders?",
      answer: "Yes! We specialize in catering to bulk industrial orders for contractors, developers, and builders. Sourcing directly from premium mills helps bulk buyers secure competitive wholesale pricing grids and custom shearing batches."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Close widget if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="font-inter">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 sm:right-24 z-50 bg-white dark:bg-[#0F2942] border border-slate-200 dark:border-white/10 rounded-md shadow-2xl w-80 sm:w-[360px] h-[480px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-slate text-white px-4 py-3.5 flex items-center justify-between border-b border-white/5 dark:bg-[#071421]">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-brand-amber" />
                <span className="font-outfit text-sm font-extrabold tracking-wide text-white">
                  Quick FAQs Helpdesk
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close FAQ desk"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Accordion Content */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900/35">
              {faqs.map((faq, idx) => {
                const isAccordionOpen = openAccordion === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-white/5 rounded-md overflow-hidden bg-white dark:bg-[#071421] shadow-sm transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-outfit text-xs font-bold text-slate-800 dark:text-gray-200 hover:text-brand-amber dark:hover:text-brand-amber transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 shrink-0 ${
                          isAccordionOpen ? 'rotate-180 text-brand-amber' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isAccordionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="p-3.5 pt-0 border-t border-slate-100 dark:border-white/5 font-inter text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[160px] right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-brand-slate text-white shadow-2xl hover:bg-[#071421] transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-slate/40"
        aria-label="Toggle FAQ support window"
      >
        <HelpCircle className="h-6 w-6 text-brand-amber" />
        <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 bg-brand-amber border-2 border-brand-slate rounded-full flex items-center justify-center animate-pulse" />
      </motion.button>
    </div>
  );
}
