"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Factory, Phone, MapPin, Mail, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide header completely on the /scan route
  if (pathname?.startsWith('/scan')) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      {/* Top Utility Bar */}
      <div className="hidden lg:block w-full bg-[#071421] text-[10px] text-gray-300 py-2 border-b border-white/5 font-inter">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-amber" />
              <span>Chittapullivalasa, Veeraghattam, Andhra Pradesh - 532460</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-amber" />
              <span>+91 77802 24863</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="h-3.5 w-3.5 text-brand-amber" />
              <span>ssnindustries7@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 border-r border-white/10 pr-6">
              <Clock className="h-3.5 w-3.5 text-brand-amber" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-brand-amber transition-colors" aria-label="Facebook">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-brand-amber transition-colors" aria-label="Instagram">
                <svg className="h-3.5 w-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 w-full border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-md dark:border-white/5 dark:bg-brand-slate">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-14 w-14 shrink-0 bg-white rounded-full border border-brand-amber/30 flex items-center justify-center shadow-sm">
              <Image
                src="/images/logos/logo-ssn.png"
                alt="SSN Industries Logo"
                fill
                priority
                sizes="56px"
                className="object-contain p-1.5"
              />
            </div>
            <div>
              <span className="font-outfit text-xl md:text-2xl font-black tracking-tight text-brand-slate dark:text-white uppercase block leading-none group-hover:text-brand-amber transition-colors duration-300">
                SSN <span className="text-brand-amber">INDUSTRIES</span>
              </span>
              <span className="text-[7.5px] font-bold tracking-widest text-brand-steel uppercase block mt-1">Premium Industrial Materials</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center space-x-1 font-inter text-xs font-semibold uppercase tracking-wider transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 rounded-sm ${
                    isActive
                      ? 'text-brand-amber after:absolute after:bottom-[-26px] after:left-0 after:right-0 after:h-[3px] after:bg-brand-amber'
                      : 'text-brand-slate hover:text-brand-amber dark:text-gray-300'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons & Quote Basket */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="ent-btn-primary"
            >
              <span>GET IN TOUCH</span>
            </Link>
          </div>

          {/* Mobile menu controls */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-sm p-2 text-brand-slate hover:bg-brand-ice dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-brand-charcoal/10 bg-white dark:border-white/5 dark:bg-brand-slate md:hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-brand-ice text-brand-amber dark:bg-slate-900'
                        : 'text-brand-slate hover:bg-gray-50 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-brand-charcoal/10 dark:border-white/5">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="ent-btn-primary w-full"
                >
                  <span>GET IN TOUCH</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
