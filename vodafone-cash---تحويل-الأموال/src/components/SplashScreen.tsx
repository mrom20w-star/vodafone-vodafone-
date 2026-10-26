import React from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#e60000] text-white select-none relative overflow-hidden">
      {/* Animated Vodafone White Emblem */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative flex items-center justify-center"
      >
        {/* Subtle rotating pulse ring */}
        <div className="w-28 h-28 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>

        {/* Vodafone Speechmark circular icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-3 shadow-xl">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="#e60000">
              <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
