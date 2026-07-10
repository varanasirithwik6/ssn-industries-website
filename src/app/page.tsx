'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Shield, Phone, ArrowRight, Gauge, ChevronRight, ChevronLeft } from 'lucide-react';
import DeliveryCoverage from '@/components/home/DeliveryCoverage';
import GoogleReviews from '@/components/home/GoogleReviews';

export default function Home() {
  const heroImages = [
    '/images/hero/home-factory-warehouse.jpg',
    '/images/hero/home-hero-materials.jpg',
    '/images/hero/home-roofing-sheets.jpg',
    '/images/gallery/storage-yard.jpg',
    '/images/gallery/plant-facade.jpg',
  ];

  const homeBrands = [
    { name: 'Jindal India', logoPath: '/images/logos/logo-jindal.png' },
    { name: 'Tata Steel', logoPath: '/images/logos/logo-tata.png' },
    { name: 'JSW Steel', logoPath: '/images/logos/logo-jsw.png' },
    { name: 'Visakha Steel', logoPath: '/images/logos/logo-vizag.png' },
    { name: 'Simhadri Steel', logoPath: '/images/logos/logo-simhadri.png' },
    { name: 'OMPL', logoPath: '/images/logos/logo-ompl-tmt.png' },
    { name: 'uPVC Pipes', logoPath: '/images/logos/logo-upvc.png' },
    { name: 'Hariom Pipes', logoPath: '/images/logos/logo-hariom.png' },
    { name: 'AG Gold Steel', logoPath: '/images/logos/logo-aggold.png' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };


  const statisticsBar = [
    { label: '500+', desc: 'Happy Customers' },
    { label: '100%', desc: 'Genuine Products' },
    { label: '20+', desc: 'Cities Served' },
    { label: '10+', desc: 'Years of Trust' },
  ];

  const categoryCards = [
    {
      title: 'Roofing Sheets',
      desc: 'Colour Coated | Galvalume | PPGI | GI Sheets',
      imageUrl: '/images/hero/home-roofing-sheets.jpg',
      href: '/products?category=roofing-sheets',
    },
    {
      title: 'TMT Rods',
      desc: 'High Strength | Superior Grade | Reliable & Durable',
      imageUrl: '/images/gallery/tmt-rebars.jpg',
      href: '/products?category=tmt-rods',
    },
    {
      title: 'Structural Steel',
      desc: 'Angles | Channels | Beams | Flats | Hollow Sections',
      imageUrl: '/images/products/structural-steel.jpg',
      href: '/products?category=structural-steel',
    },
    {
      title: 'Zinc Pipes',
      desc: 'Corrosion Resistant | Zinc Coated | Heavy & Industrial Grade',
      imageUrl: '/images/products/zinc-pipes.jpg',
      href: '/products?category=zinc-pipes',
    },
    {
      title: 'UPVC Roofing',
      desc: 'Durable | Corrosion Resistant | Weather Proof',
      imageUrl: '/images/products/upvc-roofing.jpg',
      href: '/products?category=upvc-roofing',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white dark:bg-brand-slate">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-[#030F1C] text-white py-28 md:py-40 min-h-[650px] flex items-center">
        {/* Full-bleed Background Images Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt="SSN Premium Steel Factory Scene"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover brightness-150 contrast-105"
              />
            </div>
          ))}
          {/* Refined Dark navy-blue gradient overlay + Vignette for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030F1C]/70 via-[#030F1C]/45 to-transparent/20 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(3,15,28,0.25)_100%)] z-10"></div>
        </div>
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] z-10"></div>
        
        <div className="relative container-custom z-20 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl md:max-w-2xl text-left space-y-6 lg:pr-8"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center space-x-2 rounded-sm bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-brand-amber uppercase border border-white/15 shadow-sm backdrop-blur-sm"
            >
              <Shield className="h-3.5 w-3.5 text-brand-amber" />
              <span>IS & ISO Compliant Supply</span>
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white leading-[1.1]"
            >
              Premium Roofing Sheets & <span className="text-brand-amber">Steel Solutions</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-300 font-inter leading-relaxed max-w-xl"
            >
              SSN Industries supplies premium roofing sheets, TMT rods, structural steel, GI/MS pipes, zinc pipes, and roofing accessories for residential, commercial, and industrial projects across Andhra Pradesh with dependable quality, competitive pricing, and timely delivery.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="ent-btn-primary"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="ent-btn-secondary"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>CONTACT US</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Manual navigation buttons (placed at section-level with high z-index for clickability) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/45 hover:bg-slate-950/70 text-white transition-all border border-white/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
          aria-label="Previous background image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/45 hover:bg-slate-950/70 text-white transition-all border border-white/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
          aria-label="Next background image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot slide indicators (placed at section-level with high z-index for clickability) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber ${
                index === currentSlide ? 'bg-brand-amber w-6' : 'bg-white/30 hover:bg-white/60 w-2.5'
              }`}
              aria-label={`Switch to background slide ${index + 1}`}
            />
          ))}
        </div>

      </section>


      {/* Floating Statistics Bar */}
      <section className="relative -mt-8 z-10 container-custom">
        <div className="bg-[#071421]/95 backdrop-blur-md border border-white/10 rounded-sm p-6 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white md:divide-x md:divide-white/5">
          {statisticsBar.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-2 flex flex-col justify-center transition-transform duration-300 hover:scale-[1.02] cursor-default">
              <span className="font-outfit text-xl font-extrabold text-white block uppercase">{stat.label}</span>
              <span className="text-[10px] text-brand-amber font-bold tracking-wider uppercase block">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Products Section */}
      <section className="section-spacing bg-white dark:bg-brand-slate">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Our Products</span>
            <h2 className="font-outfit text-3xl font-bold tracking-tight text-brand-slate dark:text-white sm:text-4xl">
              Premium Materials For <span className="text-brand-amber">Stronger Structures</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoryCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="ent-card ent-card-hover group p-0 overflow-hidden"
              >
                <div>
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-900 rounded-t-[calc(var(--radius-md)-1px)]">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-outfit text-base font-bold text-brand-slate dark:text-white group-hover:text-brand-amber transition-colors duration-300">{card.title}</h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium dark:text-gray-400 whitespace-pre-line">{card.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href={card.href}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white border border-brand-charcoal/10 text-brand-slate transition-all duration-300 hover:bg-brand-amber hover:text-brand-slate hover:scale-110 dark:bg-slate-900 dark:border-white/5 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator Tools Banner */}
      <section className="relative overflow-hidden bg-brand-slate py-16 text-white border-t border-b border-white/5">
        <div className="container-custom">
          <div className="glassmorphic rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs font-bold tracking-widest text-white uppercase">Free Estimators</span>
              <h3 className="font-outfit text-2xl font-bold md:text-3xl text-white">
                Calculate Structural Weight & Material Layouts Instantly
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Use our automated estimators for steel beams, pipes, and roofing sheets to get precise dimensional details before generating your quotation basket.
              </p>
            </div>
            <div>
              <Link
                href="/tools"
                className="ent-btn-primary whitespace-nowrap"
              >
                <span>OPEN STEEL TOOLS</span>
                <Gauge className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <DeliveryCoverage />
      <GoogleReviews />

      {/* Trust Elements / Stats */}
      <section className="section-spacing bg-slate-50 dark:bg-slate-950/40">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-6 rounded-md bg-white dark:bg-slate-900 shadow-ent-sm border border-brand-charcoal/5 dark:border-white/5 transition-transform duration-350 hover:-translate-y-1">
              <span className="font-outfit text-4xl font-extrabold text-brand-amber block">3+ YEARS</span>
              <p className="text-xs font-bold tracking-wider text-brand-charcoal uppercase dark:text-gray-300">Industrial Legacy</p>
            </div>
            <div className="space-y-2 p-6 rounded-md bg-white dark:bg-slate-900 shadow-ent-sm border border-brand-charcoal/5 dark:border-white/5 transition-transform duration-350 hover:-translate-y-1">
              <span className="font-outfit text-4xl font-extrabold text-brand-amber block">100K+ TONS</span>
              <p className="text-xs font-bold tracking-wider text-brand-charcoal uppercase dark:text-gray-300">Annual Capacity</p>
            </div>
            <div className="space-y-2 p-6 rounded-md bg-white dark:bg-slate-900 shadow-ent-sm border border-brand-charcoal/5 dark:border-white/5 transition-transform duration-350 hover:-translate-y-1">
              <span className="font-outfit text-4xl font-extrabold text-brand-amber block">250+</span>
              <p className="text-xs font-bold tracking-wider text-brand-charcoal uppercase dark:text-gray-300">Dealers Pan India</p>
            </div>
            <div className="space-y-2 p-6 rounded-md bg-white dark:bg-slate-900 shadow-ent-sm border border-brand-charcoal/5 dark:border-white/5 transition-transform duration-350 hover:-translate-y-1">
              <span className="font-outfit text-4xl font-extrabold text-brand-amber block">100%</span>
              <p className="text-xs font-bold tracking-wider text-brand-charcoal uppercase dark:text-gray-300">IS Standard Compliant</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
