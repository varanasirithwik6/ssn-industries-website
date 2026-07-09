"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Globe, MapPin, Star, MessageSquare, Phone, Mail, Download, 
  Bot, Shield, Award, Briefcase, Zap, CheckCircle2, ChevronRight, Clock
} from 'lucide-react';

export default function ScanPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token === 'SSN2026CARD') {
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
      router.replace('https://www.ssn-industries.in');
    }
  }, [searchParams, router]);

  if (isValidToken === null || isValidToken === false) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-amber border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleAnalytics = (action: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Digital Business Hub',
        event_label: action,
      });
    }
  };

  const mdPhone = "+917780224863";
  const mdEmail = "ssnindustries7@gmail.com";
  const waUrl = `https://wa.me/917780224863?text=${encodeURIComponent("Hello SSN Industries, I would like to know more about your products.")}`;
  const mapUrl = "https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9";
  const reviewUrl = "https://search.google.com/local/writereview?placeid=ChIJy5T-mWE5V2uRGs20eu24W9w";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-brand-slate dark:to-slate-950 font-inter text-slate-800 dark:text-gray-100 flex flex-col items-center py-8 px-4 relative overflow-hidden select-none">
      
      {/* Decorative premium background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Hub Wrapper */}
      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Profile Card Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-white/5 shadow-xl text-center space-y-4 relative"
        >
          <div className="flex justify-center">
            <div className="relative h-24 w-24 bg-white rounded-full border-2 border-brand-amber p-1 shadow-lg overflow-hidden">
              <Image
                src="/images/logos/logo-ssn.png"
                alt="SSN Industries Logo"
                fill
                priority
                sizes="96px"
                className="object-contain p-2"
              />
            </div>
          </div>
          <div>
            <h1 className="font-outfit text-2xl font-black text-brand-slate dark:text-white uppercase leading-none tracking-tight">
              SSN <span className="text-brand-amber">INDUSTRIES</span>
            </h1>
            <p className="text-[9px] font-bold tracking-widest text-brand-steel dark:text-gray-400 uppercase mt-1">
              Premium Industrial Materials Hub
            </p>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-medium">
            Trusted supplier of premium roofing sheets, TMT rods, structural steel, GI/MS pipes and industrial construction materials serving residential, commercial, industrial and infrastructure projects.
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center pt-2">
            {['Roofing Sheets', 'Structural Steel', 'TMT Rods', 'GI/MS Pipes'].map((tag) => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-brand-slate dark:text-gray-300 px-2 py-0.5 rounded-sm border border-slate-200/50 dark:border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons Section */}
        <div className="space-y-3.5">
          <h2 className="text-[10px] font-bold tracking-widest text-brand-steel dark:text-gray-400 uppercase text-left pl-1">
            Quick Connect Channels
          </h2>

          <div className="grid grid-cols-1 gap-3.5">
            {/* Card 1: Visit Website */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              href="https://www.ssn-industries.in"
              onClick={() => handleAnalytics('website_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <Globe className="h-5 w-5 text-brand-amber" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Visit Website</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Browse products, dynamic calculators, and portfolio</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>

            {/* Card 2: Google Maps */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              href={mapUrl || '#'}
              target={mapUrl ? '_blank' : undefined}
              rel={mapUrl ? 'noopener noreferrer' : undefined}
              onClick={() => handleAnalytics('maps_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Google Maps</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">
                    {mapUrl ? 'Navigate to office, find directions and hours' : 'Location will be available shortly.'}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>

            {/* Card 3: Google Review */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAnalytics('review_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Leave Google Review</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Support us by leaving a review on Google Maps</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>

            {/* Card 4: WhatsApp */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAnalytics('whatsapp_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <MessageSquare className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">WhatsApp Sales</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Chat instantly to request quote or specifications</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>

            {/* Card 5: Call Sales */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              href={`tel:${mdPhone}`}
              onClick={() => handleAnalytics('phone_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <Phone className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Call Sales Desk</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Speak directly with MD Maddi Bhaskar Rao</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>


            {/* Card 7: Download Catalogue */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              href="/products"
              onClick={() => handleAnalytics('brochure_download')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <Download className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Product Catalogue</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Download company profile and specifications brochure</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>

            {/* Card 8: AI Assistant */}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              href="/?ai=open"
              onClick={() => handleAnalytics('ai_click')}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 shadow-md transition-all hover:scale-[1.01] duration-300 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/20 transition-all">
                  <Bot className="h-5 w-5 text-[#D4A017]" />
                </div>
                <div className="text-left">
                  <h3 className="font-outfit text-sm font-bold text-brand-slate dark:text-white leading-tight">Ask AI Assistant</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-normal mt-0.5">Get instant answers about specifications & quotes</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-brand-amber transition-colors" />
            </motion.a>
          </div>
        </div>

        {/* Why Choose Us features list */}
        <div className="space-y-3.5">
          <h2 className="text-[10px] font-bold tracking-widest text-brand-steel dark:text-gray-400 uppercase text-left pl-1">
            Why Choose SSN Industries
          </h2>
          <div className="bg-white/85 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 dark:border-white/5 shadow-lg">
            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                { title: 'Genuine Products', desc: '100% certified metals', icon: <Shield className="h-4 w-4 text-brand-amber" /> },
                { title: 'Indian Brands', desc: 'JSW, Tata, Jindal partner', icon: <Award className="h-4 w-4 text-brand-amber" /> },
                { title: 'Bulk Supply', desc: 'Continuous construction stocks', icon: <Briefcase className="h-4 w-4 text-brand-amber" /> },
                { title: 'Fast Delivery', desc: 'Dedicated logistical transport', icon: <Zap className="h-4 w-4 text-brand-amber" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-2.5 items-start">
                  <div className="mt-0.5 p-1 rounded-sm bg-slate-100 dark:bg-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-outfit text-xs font-bold text-brand-slate dark:text-white leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-gray-400 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200/50 dark:border-white/5 pt-3.5 mt-3.5 flex items-center space-x-2 text-left">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-amber shrink-0" />
              <span className="text-[11px] font-medium text-slate-500 dark:text-gray-400 leading-normal">
                Quality assured products trusted by builders and infrastructure contractors.
              </span>
            </div>
          </div>
        </div>

        {/* Corporate contact Details card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-white/5 shadow-xl text-left space-y-4">
          <h3 className="font-outfit text-sm font-bold text-brand-amber uppercase tracking-wider">Business Details</h3>
          
          <div className="grid grid-cols-1 gap-3.5 text-xs font-medium text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-brand-amber font-bold text-[10px]">MD</div>
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Managing Director</span>
                <span className="text-white font-semibold">Maddi Bhaskar Rao</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-brand-amber shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Business Hours</span>
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-brand-amber shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Phone</span>
                <a href={`tel:${mdPhone}`} className="hover:underline">{mdPhone}</a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-brand-amber shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Email</span>
                <a href={`mailto:${mdEmail}`} className="hover:underline">{mdEmail}</a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        {/* Floating Maps */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAnalytics('maps_click')}
          className="h-12 w-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 flex items-center justify-center shadow-lg text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
          aria-label="Find on Google Maps"
        >
          <MapPin className="h-5 w-5" />
        </motion.a>

        {/* Floating Call */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${mdPhone}`}
          onClick={() => handleAnalytics('phone_click')}
          className="h-12 w-12 rounded-full bg-[#0F2942] hover:bg-[#163c61] flex items-center justify-center shadow-lg text-brand-amber cursor-pointer"
          aria-label="Call Sales Desk"
        >
          <Phone className="h-5 w-5" />
        </motion.a>

        {/* Floating WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAnalytics('whatsapp_click')}
          className="h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center shadow-lg text-white cursor-pointer"
          aria-label="Open Chat on WhatsApp"
        >
          <MessageSquare className="h-5 w-5" />
        </motion.a>
      </div>

    </div>
  );
}
