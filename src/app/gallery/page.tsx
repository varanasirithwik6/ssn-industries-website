'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Tag } from 'lucide-react';
import { GALLERY_ITEMS, FILTER_TAGS } from '@/constants/gallery';
import { GalleryItem } from '@/types/gallery';
import LightboxModal from '@/components/gallery/LightboxModal';
import ProjectUploadSection from '@/components/contact/ProjectUploadSection';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [allItems, setAllItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  // On mount, merge admin-uploaded items (stored in localStorage) with the static list
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssn_gallery_items');
      if (saved) {
        const adminItems: Array<{ id: string; title: string; tag: string; imageUrl: string; description?: string }> = JSON.parse(saved);
        // Convert admin items to the public GalleryItem shape and map legacy slugs
        const converted: GalleryItem[] = adminItems.map((item, idx) => {
          let categorySlug = item.tag;
          // Map older legacy categories to the new classification layout
          if (categorySlug === 'factory') {
            categorySlug = 'facility';
          }
          return {
            id: GALLERY_ITEMS.length + idx + 1,
            title: item.title,
            category: categorySlug,
            imageUrl: item.imageUrl,
            description: item.description || '',
          };
        });
        setAllItems([...GALLERY_ITEMS, ...converted]);
      }
    } catch {
      // Fall back to static list if localStorage fails
      setAllItems(GALLERY_ITEMS);
    }
  }, []);

  const filteredItems = allItems.filter((item) => filter === 'all' || item.category === filter);

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-brand-slate">
      {/* Header Banner */}
      <section className="bg-slate-900 py-16 text-white border-b border-white/5">
        <div className="container-custom text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Visual Infrastructure</span>
          <h1 className="font-outfit text-3xl font-extrabold sm:text-5xl mt-2 !text-white">Facility & Project Gallery</h1>
          <p className="text-sm text-gray-400 font-inter max-w-2xl mt-4">
            A window into SSN Industries’ rolling foundries, automated machining systems, and heavy loading terminals.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* Filters */}
          <nav className="flex flex-wrap gap-2 mb-12 justify-center" aria-label="Gallery categories">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag.slug}
                onClick={() => setFilter(tag.slug)}
                aria-pressed={filter === tag.slug}
                aria-label={`Filter gallery by ${tag.name}`}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 ${
                  filter === tag.slug
                    ? 'bg-brand-slate text-brand-amber border-brand-slate dark:bg-brand-amber dark:text-brand-slate dark:border-brand-amber'
                    : 'bg-white border-brand-charcoal/10 text-brand-charcoal hover:bg-brand-ice dark:bg-slate-950 dark:border-white/5 dark:hover:bg-slate-900'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </nav>

          {/* Grid display */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View larger image of ${item.title}`}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault();
                       setSelectedItem(item);
                     }
                  }}
                  className="ent-card ent-card-hover group p-0 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Aspect Ratio Box */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 rounded-t-[calc(var(--radius-md)-1px)]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Eye className="h-6 w-6 text-brand-amber mx-auto mb-2" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Inspect Facility</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-1.5 text-[9px] font-bold text-brand-steel uppercase">
                      <Tag className="h-3 w-3" />
                      <span>{item.category}</span>
                    </div>
                    <h4 className="font-outfit text-md font-bold text-brand-slate dark:text-white">{item.title}</h4>
                    <p className="text-xs text-brand-charcoal leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Upload Project Images Section */}
      <section className="section-spacing bg-white dark:bg-slate-950/40 border-t border-brand-charcoal/10 dark:border-white/5">
        <div className="container-custom max-w-4xl">
          <ProjectUploadSection />
        </div>
      </section>

      {/* Lightbox Modal Component */}
      <AnimatePresence>
        {selectedItem && (
          <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
