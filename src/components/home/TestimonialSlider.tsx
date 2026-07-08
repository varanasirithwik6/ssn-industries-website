"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export default function TestimonialSlider() {
  const staticTestimonials: Testimonial[] = [
    {
      name: "Ramesh Kumar",
      role: "Managing Director",
      company: "Ganga Constructions, Vizag",
      text: "SSN Industries has been our primary steel supplier for over 3 years. Their commitment to supply certified structural steel and TMT rebars on time has helped us keep our project timelines intact.",
      rating: 5
    },
    {
      name: "Satish Raju",
      role: "Lead Developer",
      company: "Srinivasa Builders, Srikakulam",
      text: "We ordered custom-length JSW roofing sheets for a commercial warehouse project. The precision roll-forming saved us significant installation time and resulted in zero cut-waste.",
      rating: 5
    },
    {
      name: "V. Prasad",
      role: "Chief Architect & Structural Consultant",
      company: "Prasad Associates",
      text: "Their automated calculators are a lifesaver for quoting. Coupled with their prompt support on WhatsApp, requesting freight charges and steel specifications is extremely seamless.",
      rating: 5
    }
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Merge admin-added testimonials from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssn_admin_testimonials');
      if (saved) {
        const adminItems: Array<{ name: string; role: string; company?: string; message: string; rating: number }> = JSON.parse(saved);
        const converted: Testimonial[] = adminItems.map(item => ({
          name: item.name,
          role: item.role,
          company: item.company || '',
          text: item.message,
          rating: item.rating,
        }));
        setTestimonials([...staticTestimonials, ...converted]);
      }
    } catch { /* use static fallback */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section-spacing bg-slate-50 dark:bg-slate-950/20 border-t border-b border-brand-charcoal/5 dark:border-white/5 overflow-hidden">
      <div className="container-custom max-w-4xl relative">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Testimonials</span>
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-brand-slate dark:text-white sm:text-4xl">
            What Our Partners <span className="text-brand-amber">Say</span>
          </h2>
        </div>

        <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md p-8 md:p-12 shadow-md min-h-[260px] flex flex-col justify-between">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-slate-100 dark:text-slate-800 pointer-events-none" />

          {/* Testimonial Content with sliding animation */}
          <div className="relative z-10 flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-center"
              >
                {/* Rating stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-brand-amber text-brand-amber" />
                  ))}
                </div>

                <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-gray-200 leading-relaxed italic max-w-2xl mx-auto">
                  "{current.text}"
                </p>

                <div>
                  <h4 className="font-outfit text-base font-bold text-slate-800 dark:text-white">{current.name}</h4>
                  <span className="text-xs font-bold text-brand-steel uppercase tracking-wider block mt-0.5">
                    {current.role}, {current.company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-brand-amber hover:text-white transition-all bg-white dark:bg-slate-900 pointer-events-auto shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-brand-amber hover:text-white transition-all bg-white dark:bg-slate-900 pointer-events-auto shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-brand-amber w-6' : 'bg-slate-300 dark:bg-slate-700 w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
