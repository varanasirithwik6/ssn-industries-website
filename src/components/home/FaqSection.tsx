"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const faqs: FaqItem[] = [
    {
      question: "What types and dimensions of roofing sheets do you supply?",
      answer: "We supply premium Galvalume, Aluzinc, and co-extruded 3-layer UPVC roofing sheets. Thickness options range from 0.40mm to 0.50mm for Aluzinc, and up to 3.0mm for UPVC. All our roofing sheets support custom roll-forming sheared exactly to your structural drawing length in feet to eliminate installation waste."
    },
    {
      question: "What grades and specifications of TMT rods do you offer?",
      answer: "We offer Fe 550D grade TMT reinforcement rebars conforming strictly to IS 1786. These feature high bond strength and ductility for seismic safety. Available diameters include 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm, sourced from certified suppliers Vizag Steel, Simhadri TMT, and OMPL TMT."
    },
    {
      question: "Which delivery areas and transit logistics do you cover?",
      answer: "We handle bulk deliveries throughout Andhra Pradesh, with dedicated, rapid logistics routing directly to construction sites in Srikakulam, Vizianagaram, Visakhapatnam, and surrounding coastal districts."
    },
    {
      question: "Which authorized manufacturer brands are available in your catalog?",
      answer: "Our catalog consists of leading, verified steel and plumbing brands including Tata Steel, JSW Steel, Jindal, Vizag Steel, Simhadri TMT, OMPL TMT, and premium UPVC products."
    },
    {
      question: "How can I request a price quotation for my project?",
      answer: "You can request a custom quotation by clicking 'Get In Touch' and filling out our contact form, sending us an email, or messaging us directly on WhatsApp with your product specs and delivery location."
    },
    {
      question: "How can I get in touch with your corporate office?",
      answer: "Our corporate headquarters is located at Chittapullivalasa, Veeraghattam, Andhra Pradesh – 532460. You can reach MD Maddi Bhaskar Rao directly via phone at +91 77802 24863 or email at ssnindustries7@gmail.com."
    },
    {
      question: "Do you support commercial bulk orders and custom rolling?",
      answer: "Yes! We specialize in catering to bulk industrial orders for contractors, developers, and builders. Sourcing directly from premium mills helps bulk buyers secure competitive wholesale pricing grids and custom shearing batches."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-spacing bg-white dark:bg-brand-slate border-t border-brand-charcoal/5 dark:border-white/5">
      <div className="container-custom max-w-4xl">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">FAQ Section</span>
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-brand-slate dark:text-white sm:text-4xl">
            Frequently Asked <span className="text-brand-amber">Questions</span>
          </h2>
          <p className="text-xs text-brand-charcoal dark:text-gray-400 max-w-lg mx-auto font-medium">
            Common questions answered about our deliveries, customization limits, and certification parameters.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-white/10 rounded-md overflow-hidden bg-slate-50/50 dark:bg-slate-900/40 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-outfit text-sm sm:text-base font-bold text-slate-800 dark:text-white hover:text-brand-amber dark:hover:text-brand-amber transition-colors duration-300 focus-visible:outline-none focus-visible:bg-slate-100/50 dark:focus-visible:bg-slate-800/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="h-4.5 w-4.5 text-brand-amber shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-brand-steel transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-amber' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 font-inter text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
