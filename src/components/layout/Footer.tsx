"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Factory, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer completely on the /scan route
  if (pathname?.startsWith('/scan')) return null;

  return (
    <footer className="border-t border-brand-charcoal/10 bg-slate-900 text-gray-400 dark:border-white/5">
      {/* Top Certifications banner */}
      <div className="border-b border-white/5 bg-slate-950/80 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold tracking-wider text-gray-300">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-brand-amber" />
              <span>ISO 9001:2015 CERTIFIED MANUFACTURING</span>
            </div>
            <div>IS 2062 / IS 1786 COMPLIANT STRUCTURAL MEMBERS</div>
            <div>GOVERNMENT APPROVED CONTRACTS SUPPLIER</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand block */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-16 w-16 shrink-0 bg-white rounded-full border border-brand-amber/30 flex items-center justify-center shadow-md">
                <Image
                  src="/images/logos/logo-ssn.png"
                  alt="SSN Industries Logo"
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <span className="font-outfit text-xl font-black tracking-tight text-white uppercase block leading-none group-hover:text-brand-amber transition-colors duration-300">
                  SSN <span className="text-brand-amber">INDUSTRIES</span>
                </span>
                <span className="text-[7.5px] font-bold tracking-widest text-brand-amber/80 uppercase block mt-1">Strong Roofs. Strong Structures.</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400">
              Strong Roofs. Strong Structures. Stronger Future. Trusted supplier of premium roofing sheets, TMT rods, structural steel, and steel pipes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-outfit text-sm font-semibold tracking-wider !text-brand-amber uppercase mb-4">Sitemap</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Products</Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Brands</Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Calculators</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 block">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Core products quick guide */}
          <div>
            <h4 className="font-outfit text-sm font-semibold tracking-wider !text-brand-amber uppercase mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 cursor-default">Colour Coated Roofing Sheets</li>
              <li className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 cursor-default">Galvanized & Galvalume Sheets</li>
              <li className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 cursor-default">TMT Rods (Vizag, Simhadri, OMPL)</li>
              <li className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 cursor-default">Structural Steel Beams</li>
              <li className="text-gray-300 hover:text-brand-amber hover:pl-1 transition-all duration-300 cursor-default">OMPL TMT Rods</li>
            </ul>
          </div>

          {/* Contact and address details */}
          <div className="space-y-3 text-sm">
            <h4 className="font-outfit text-sm font-semibold tracking-wider !text-brand-amber uppercase mb-4">Corporate Office</h4>
            <a
              href="https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-2 text-gray-300 hover:text-brand-amber transition-colors"
            >
              <MapPin className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
              <span>Chittapullivalasa, Veeraghattam, Andhra Pradesh – 532460, India</span>
            </a>
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="h-4 w-4 text-brand-amber shrink-0" />
              <a href="tel:+917780224863" className="hover:text-brand-amber underline transition-colors">+91 77802 24863</a>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4 text-brand-amber shrink-0" />
              <a href="mailto:ssnindustries7@gmail.com" className="hover:text-brand-amber underline transition-colors">ssnindustries7@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-500">
          <p>&copy; {currentYear} SSN Industries. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/privacy" className="hover:text-brand-amber transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-amber transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
