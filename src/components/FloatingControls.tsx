import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const FloatingControls: React.FC = () => {
  const { toast } = useStore();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#101A36] dark:bg-white text-white dark:text-slate-900 shadow-2xl border border-white/15 dark:border-slate-200 flex items-center gap-2 text-xs sm:text-sm font-medium max-w-[90vw]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#22D3EE] dark:text-[#2F6BFF] shrink-0" />
            <span className="truncate">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              title="Back to top"
              className="w-11 h-11 rounded-full bg-white dark:bg-[#111B3A]/90 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 shadow-lg hover:border-[#2F6BFF] flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
            `Assalam-o-Alaikum ${STORE_INFO.name}, I need assistance with a product.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat with us on WhatsApp"
          className="h-12 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 flex items-center gap-2 text-sm font-medium transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </>
  );
};
