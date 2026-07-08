"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, Hammer, Layers } from 'lucide-react';
import SteelCalculator from '@/components/tools/SteelCalculator';
import RoofingEstimator from '@/components/tools/RoofingEstimator';

export default function CalculatorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'steel' | 'roofing'>('steel');
  const widgetRef = useRef<HTMLDivElement>(null);

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
            className="fixed bottom-24 right-6 sm:right-24 z-50 bg-white dark:bg-[#0F2942] border border-slate-200 dark:border-white/10 rounded-md shadow-2xl w-[340px] sm:w-[450px] h-[520px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-slate text-white px-4 py-3 flex items-center justify-between border-b border-white/5 dark:bg-[#071421] shrink-0">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-brand-amber" />
                <span className="font-outfit text-sm font-extrabold tracking-wide text-white">
                  Industrial Estimator Desk
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close estimator desk"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60 shrink-0">
              <button
                onClick={() => setActiveTab('steel')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'steel'
                    ? 'border-brand-amber text-brand-amber bg-white dark:bg-[#0F2942]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Hammer className="h-4 w-4" />
                <span>Steel Weight</span>
              </button>
              <button
                onClick={() => setActiveTab('roofing')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'roofing'
                    ? 'border-brand-amber text-brand-amber bg-white dark:bg-[#0F2942]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Roofing Estimator</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-3 bg-slate-50 dark:bg-slate-900/35 select-text">
              {activeTab === 'steel' ? <SteelCalculator isWidget={true} /> : <RoofingEstimator isWidget={true} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[228px] right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-brand-slate text-white shadow-2xl hover:bg-[#071421] transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-slate/40"
        aria-label="Toggle calculator widget"
      >
        <Calculator className="h-6 w-6 text-brand-amber" />
        <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 bg-brand-amber border-2 border-brand-slate rounded-full flex items-center justify-center animate-pulse" />
      </motion.button>
    </div>
  );
}
