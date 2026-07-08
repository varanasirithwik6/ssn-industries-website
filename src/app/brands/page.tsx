'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BrandPartner {
  name: string;
  type: string;
  description: string;
  logoText: string;
  logoBg: string;
  logoPath: string;
}

const STATIC_BRANDS: BrandPartner[] = [
  { name: 'Tata Steel', type: 'Primary Steel Supplier', description: 'Supplying high yield strength carbon steel coils, structural beams, and foundational TMT reinforcement billets.', logoText: 'TATA', logoBg: 'bg-blue-600', logoPath: '/images/logos/logo-tata.png' },
  { name: 'JSW Steel', type: 'Galvanized Coil Partner', description: 'Supplying premium zinc-aluminium coated coil sheets used in our custom corrugated roofing rolling mills.', logoText: 'JSW', logoBg: 'bg-indigo-900', logoPath: '/images/logos/logo-jsw.png' },
  { name: 'Jindal', type: 'Heavy Structural Member Supplier', description: 'Sourcing heavy-duty Universal Beams, massive column members, and structural channel sections.', logoText: 'JINDAL', logoBg: 'bg-teal-700', logoPath: '/images/logos/logo-jindal.png' },
  { name: 'Vizag Steel', type: 'Premium TMT Supplier', description: 'Sourcing high-ductility, earthquake-resistant reinforcement rebars for critical concrete projects.', logoText: 'VIZAG', logoBg: 'bg-blue-900', logoPath: '/images/logos/logo-vizag.png' },
  { name: 'Simhadri TMT', type: 'Authorized Rebar Supplier', description: 'Premium quality TMT rebars engineered for high corrosion resistance and high concrete bonding strength.', logoText: 'SIMHADRI', logoBg: 'bg-amber-600', logoPath: '/images/logos/logo-simhadri.png' },
  { name: 'OMPL Steel Pipes', type: 'Authorized Pipe Partner', description: 'Industrial grade mild steel, galvanized iron, and hollow sections manufactured to precise dimensions.', logoText: 'OMPL', logoBg: 'bg-slate-700', logoPath: '/images/logos/logo-ompl.png' },
  { name: 'UPVC Roofing Products', type: 'Premium Roofing Partner', description: 'Weatherproof, corrosion-free, and thermal-insulating multi-layered UPVC roofing sheet solutions.', logoText: 'UPVC', logoBg: 'bg-green-700', logoPath: '/images/logos/logo-upvc.png' },
  { name: 'Hariom Pipes', type: 'Strategic Pipe Partner', description: 'Providing premium quality ERW black pipes, galvanized pipes, and scaffolding solutions engineered to strict safety guidelines.', logoText: 'HARIOM', logoBg: 'bg-orange-600', logoPath: '/images/logos/logo-hariom.png' },
  { name: 'AG Gold Steel', type: 'Authorized Rebar Partner', description: 'Supplying premium quality structural rebars, alloy products, and building steel materials for long-lasting structural foundations.', logoText: 'AG GOLD', logoBg: 'bg-red-800', logoPath: '/images/logos/logo-aggold.png' },
];

export default function BrandsPage() {
  const [brandPartners, setBrandPartners] = useState<BrandPartner[]>(STATIC_BRANDS);

  // Merge admin-added brands from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssn_admin_brands');
      if (saved) {
        const adminItems: Array<{ name: string; slug: string; description: string }> = JSON.parse(saved);
        const staticNames = new Set(STATIC_BRANDS.map(b => b.name.toLowerCase()));
        const extras: BrandPartner[] = adminItems
          .filter(item => !staticNames.has(item.name.toLowerCase()))
          .map(item => ({
            name: item.name,
            type: 'Brand Partner',
            description: item.description || `Authorised partner supplying quality ${item.name} products.`,
            logoText: item.name.slice(0, 5).toUpperCase(),
            logoBg: 'bg-brand-slate',
            logoPath: '',
          }));
        if (extras.length > 0) setBrandPartners([...STATIC_BRANDS, ...extras]);
      }
    } catch { /* use static fallback */ }
  }, []);

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-brand-slate">
      {/* Header Banner */}
      <section className="bg-slate-900 py-16 text-white border-b border-white/5">
        <div className="container-custom text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Strategic Alliances</span>
          <h1 className="font-outfit text-3xl font-extrabold sm:text-5xl mt-2 !text-white">Brand & Supply Partners</h1>
          <p className="text-sm text-gray-400 font-inter max-w-2xl mt-4">
            We partner with industry-leading steel mills and raw material giants to guarantee our products survive rigorous stress testing.
          </p>
        </div>
      </section>

      {/* Grid of Partners */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {brandPartners.map((brand, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Badge & Award icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-sm uppercase">
                      {brand.type}
                    </span>
                    <Award className="h-5 w-5 text-brand-amber" />
                  </div>

                  {/* Content Row: Logo on left, text on right */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative h-24 w-40 shrink-0 border border-slate-100 dark:border-slate-800 bg-white rounded-sm flex items-center justify-center p-2 group-hover:border-slate-200 transition-all shadow-sm overflow-hidden">
                      {brand.logoPath ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={brand.logoPath}
                            alt={`${brand.name} Logo`}
                            fill
                            sizes="160px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`w-full h-full rounded-sm ${brand.logoBg} text-white flex items-center justify-center font-outfit text-xs font-black tracking-wider uppercase`}>
                          {brand.logoText}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <h3 className="font-outfit text-2xl font-bold text-slate-800 dark:text-white leading-tight">
                        {brand.name}
                      </h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-inter">
                        {brand.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center space-x-2 text-xs font-semibold text-brand-success">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>100% Quality Trace-ability Enabled</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value Prop Banner */}
          <div className="bg-[#071421] border border-white/10 rounded-sm p-8 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
            <ShieldCheck className="h-10 w-10 text-brand-amber mx-auto" />
            <h3 className="font-outfit text-2xl font-extrabold text-white tracking-tight">Direct Mill Sourcing Advantage</h3>
            <p className="text-xs font-semibold text-white leading-relaxed max-w-xl mx-auto">
              Our direct-to-mill logistics chains bypass retail broker markups, translating to double-digit percentage savings for civil contractors and government building companies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
