"use client";

import { motion } from 'framer-motion';
import { Star, MapPin, ExternalLink } from 'lucide-react';

export default function GoogleReviews() {
  const mapUrl = "https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9";

  return (
    <section className="section-spacing bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden border-t border-b border-slate-100 dark:border-white/5">
      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#D4A017] uppercase">Verified Ratings</span>
          <h2 className="font-outfit text-3xl font-extrabold text-brand-slate dark:text-white sm:text-4xl">
            Trusted by Our Customers
          </h2>
        </div>

        {/* Premium Google Review Card */}
        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block w-full max-w-2xl bg-white dark:bg-[#071421] border border-slate-200/60 dark:border-white/5 rounded-[20px] p-8 md:p-12 text-center shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer group"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Google Identity Logo representation */}
            <div className="flex items-center space-x-2.5">
              <span className="font-outfit text-2xl font-bold tracking-tight">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 px-2 py-0.5 rounded-sm">
                Maps
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-[#D4A017] text-[#D4A017] transition-transform duration-300 group-hover:scale-110"
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>

            {/* Rating Details */}
            <div className="space-y-2">
              <span className="font-outfit text-4xl font-extrabold text-brand-slate dark:text-white block tracking-tight">
                4.9 <span className="text-xl font-bold text-gray-400 dark:text-gray-500">/ 5</span>
              </span>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Based on Google Customer Reviews
              </p>
            </div>

            {/* Quote Block */}
            <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 font-inter leading-relaxed max-w-md italic">
              "Trusted by builders, contractors, homeowners and industrial customers across Andhra Pradesh."
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
              <span
                className="inline-flex h-12 items-center justify-center px-6 bg-[#0F2942] hover:bg-[#163c61] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm"
              >
                ⭐ View Google Reviews
              </span>
              <span
                className="inline-flex h-12 items-center justify-center px-6 bg-white hover:bg-slate-50 border border-slate-200 text-[#0F2942] font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-300 shadow-sm dark:bg-slate-950 dark:border-white/10 dark:text-white dark:hover:bg-slate-900"
              >
                <MapPin className="h-3.5 w-3.5 mr-2 text-brand-amber" />
                <span>Open Google Maps</span>
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
