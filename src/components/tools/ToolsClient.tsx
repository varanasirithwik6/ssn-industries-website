'use client';

import { useState } from 'react';
import { Calculator, Hammer, Layers, ChevronRight } from 'lucide-react';
import SteelCalculator from '@/components/tools/SteelCalculator';
import RoofingEstimator from '@/components/tools/RoofingEstimator';

export default function ToolsClient() {
  const [activeTab, setActiveTab] = useState<'steel' | 'roofing'>('steel');

  return (
    <div className="container-custom py-12 font-inter">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-charcoal uppercase mb-2">
          <span>Home</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-slate dark:text-white">Calculators & Layout Tools</span>
        </div>
        <h1 className="font-outfit text-3xl font-extrabold text-brand-slate dark:text-white flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-brand-amber" />
          <span>Industrial Calculation Tools</span>
        </h1>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-brand-charcoal/10 dark:border-white/5 mb-8">
        <button
          onClick={() => setActiveTab('steel')}
          className={`flex items-center space-x-2 px-6 py-3 border-b-2 text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === 'steel'
              ? 'border-brand-amber text-brand-amber'
              : 'border-transparent text-brand-charcoal hover:text-brand-slate dark:hover:text-white'
          }`}
        >
          <Hammer className="h-4.5 w-4.5" />
          <span>Steel Weight Calculator</span>
        </button>
        <button
          onClick={() => setActiveTab('roofing')}
          className={`flex items-center space-x-2 px-6 py-3 border-b-2 text-sm font-bold uppercase tracking-wider transition-all ${
            activeTab === 'roofing'
              ? 'border-brand-amber text-brand-amber'
              : 'border-transparent text-brand-charcoal hover:text-brand-slate dark:hover:text-white'
          }`}
        >
          <Layers className="h-4.5 w-4.5" />
          <span>Roofing Sheet Layout Estimator</span>
        </button>
      </div>

      {/* Calculator Content */}
      <div className="mt-4">
        {activeTab === 'steel' ? <SteelCalculator /> : <RoofingEstimator />}
      </div>
    </div>
  );
}
