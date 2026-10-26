import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = 'جاري التحميل...',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px]"
          dir="rtl"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="flex flex-col items-center justify-center w-52 min-h-44 rounded-3xl bg-neutral-900/95 text-white shadow-2xl border border-white/10 px-6 py-6"
          >
            {/* Spinning ring with stationary Vodafone speechmark logo in the dead center */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-3.5">
              {/* Outer spinning circular ring / track */}
              <div
                className="w-20 h-20 rounded-full border-[3px] border-white/15 border-t-[#e60000] border-r-[#e60000] animate-spin"
                style={{ animationDuration: '0.85s' }}
              />

              {/* Perfectly centered, upright stationary Vodafone logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-[#e60000] flex items-center justify-center p-2 shadow-md">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-white drop-shadow-xs"
                    fill="currentColor"
                  >
                    {/* Vodafone Speechmark */}
                    <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-sm font-bold tracking-wide text-neutral-100 text-center">
              {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
