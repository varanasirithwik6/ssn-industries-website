'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Factory, Award, Target, Landmark, Truck } from 'lucide-react';

export default function AboutPage() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-brand-slate">
      {/* Header Banner */}
      <section className="bg-slate-900 py-16 text-white border-b border-white/5">
        <div className="container-custom text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Strong Roofs. Strong Structures. Stronger Future.</span>
          <h1 className="font-outfit text-3xl font-extrabold sm:text-5xl mt-2 !text-white">About SSN Industries</h1>
          <p className="text-sm text-gray-400 font-inter max-w-2xl mt-4">
            SSN Industries is a trusted supplier of premium roofing sheets, TMT rods, structural steel, steel pipes, and industrial construction materials, managed by Maddi Bhaskar Rao.
          </p>
        </div>
      </section>

      {/* Legacy and Infrastructure Details */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-outfit text-2xl font-bold text-brand-slate dark:text-white sm:text-3xl">
                Premium Industrial Materials & Trusted Supply Solutions
              </h2>
              <p className="text-sm text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                SSN Industries supplies premium roofing sheets, TMT rods, steel pipes, structural steel, and roofing accessories sourced from India&apos;s leading manufacturers. We serve residential, commercial, industrial, and infrastructure projects with a strong focus on genuine products, competitive pricing, dependable service, and on-time delivery.
              </p>
              <p className="text-sm text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                Under the leadership of <strong className="font-semibold text-brand-slate dark:text-white">Maddi Bhaskar Rao</strong>, we have built a reputation for reliability by supporting contractors, builders, fabricators, industries, and government projects across Andhra Pradesh with quality materials and responsive customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 border border-brand-charcoal/10 rounded-sm bg-white dark:bg-slate-950 p-3 shrink-0">
                  <ShieldCheck className="h-5 w-5 text-brand-amber" />
                  <span className="text-xs font-bold text-brand-slate dark:text-white">IS 1786 COMPLIANT</span>
                </div>
                <div className="flex items-center space-x-2 border border-brand-charcoal/10 rounded-sm bg-white dark:bg-slate-950 p-3 shrink-0">
                  <ShieldCheck className="h-5 w-5 text-brand-amber" />
                  <span className="text-xs font-bold text-brand-slate dark:text-white">IS 2062 STRUCTURAL</span>
                </div>
              </div>
            </div>

            {/* Grid display of vision, mission, and assets */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants} className="ent-card">
                <Target className="h-8 w-8 text-brand-amber mb-3" />
                <h3 className="font-outfit text-md font-bold text-brand-slate dark:text-white mb-2">Our Mission</h3>
                <p className="text-xs text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                  To deliver genuine, high-quality roofing sheets, TMT rods, steel products, and industrial materials with reliable service, competitive pricing, and timely delivery, helping customers build stronger and safer projects.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="ent-card">
                <Award className="h-8 w-8 text-brand-amber mb-3" />
                <h3 className="font-outfit text-md font-bold text-brand-slate dark:text-white mb-2">Quality Assurance</h3>
                <p className="text-xs text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                  We source products from trusted manufacturers and maintain strict quality standards to ensure customers receive genuine materials that meet industry requirements for strength, durability, and long-term performance.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="ent-card">
                <Truck className="h-8 w-8 text-brand-amber mb-3" />
                <h3 className="font-outfit text-md font-bold text-brand-slate dark:text-white mb-2">Reliable Supply</h3>
                <p className="text-xs text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                  With an efficient supply network and dependable logistics, we ensure prompt delivery of materials for residential, commercial, industrial, and infrastructure projects across Andhra Pradesh.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="ent-card">
                <ShieldCheck className="h-8 w-8 text-brand-amber mb-3" />
                <h3 className="font-outfit text-md font-bold text-brand-slate dark:text-white mb-2">Customer Commitment</h3>
                <p className="text-xs text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                  We are committed to building long-term relationships through transparent pricing, responsive support, technical guidance, and dependable after-sales service for every customer.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
