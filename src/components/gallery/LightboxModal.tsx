import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag, X } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';

interface LightboxModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus the modal itself or the first focusable element on mount
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: loop back to last
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          // Tab: loop to first
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus to pre-modal active element
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative max-w-4xl w-full bg-white dark:bg-slate-900 border border-brand-charcoal/10 dark:border-white/10 rounded-md overflow-hidden shadow-2xl cursor-default focus-visible:outline-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/50 hover:bg-slate-950/70 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Layout */}
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-video md:aspect-auto md:w-3/5 h-64 md:h-[450px] bg-slate-950">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 60vw, 800px"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:w-2/5 flex flex-col justify-between space-y-6 bg-white dark:bg-slate-950">
            <div className="space-y-4">
              <span className="inline-flex items-center space-x-1.5 text-[9px] font-bold text-brand-amber uppercase bg-brand-amber/10 px-2.5 py-1 rounded-sm">
                <Tag className="h-3 w-3" />
                <span>{item.category}</span>
              </span>
              <h3 id="modal-title" className="font-outfit text-xl font-bold text-brand-slate dark:text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-brand-charcoal dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="pt-4 border-t border-brand-charcoal/10 dark:border-white/5">
              <button
                onClick={onClose}
                className="ent-btn-primary w-full"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
