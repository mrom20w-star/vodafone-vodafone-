import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Delete } from 'lucide-react';
import { VodafoneCashBadge } from './VodafoneIcons';
import { playKeypadTick, unlockAudio } from '../utils/audio';

interface PinScreenProps {
  onComplete: (pin: string) => void;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}

export const PinScreen: React.FC<PinScreenProps> = ({
  onComplete,
  title = 'ادخل رقم المحفظة السري',
}) => {
  const [pin, setPin] = useState<string>('');

  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      unlockAudio();
      playKeypadTick();
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 6) {
        setTimeout(() => {
          onComplete(newPin);
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    playKeypadTick();
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 justify-between select-none" dir="rtl">
      {/* Top Header & Logo */}
      <div className="pt-12 px-6 flex flex-col items-center">
        {/* Vodafone Cash Logo Badge */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-[#e60000] rounded-2xl flex flex-col items-center justify-center p-2 shadow-md">
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mb-0.5">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="#e60000">
                <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
              </svg>
            </div>
            <span className="text-[12px] font-black text-white leading-none">كاش</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h1>

        {/* 6 Pin Dots */}
        <div className="flex items-center justify-center gap-3.5 mb-5" dir="ltr">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  scale: isFilled ? 1.15 : 1,
                  backgroundColor: isFilled ? '#e60000' : '#d1d5db',
                }}
                className="w-3.5 h-3.5 rounded-full transition-colors duration-150"
              />
            );
          })}
        </div>

        {/* Forgot PIN link */}
        <button
          type="button"
          className="text-sm font-semibold text-[#e60000] hover:underline"
        >
          نسيت الرقم السري؟
        </button>
      </div>

      {/* Keypad */}
      <div className="w-full px-8 pb-10 max-w-sm mx-auto" dir="ltr">
        <div className="grid grid-cols-3 gap-y-4 gap-x-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              className="w-18 h-18 mx-auto rounded-full bg-white active:bg-gray-200 transition-colors shadow-xs border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-900"
            >
              {num}
            </button>
          ))}

          {/* Empty bottom-left slot */}
          <div className="w-18 h-18"></div>

          {/* 0 digit */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="w-18 h-18 mx-auto rounded-full bg-white active:bg-gray-200 transition-colors shadow-xs border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-900"
          >
            0
          </button>

          {/* Backspace */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-18 h-18 mx-auto rounded-full active:bg-gray-200 transition-colors flex items-center justify-center text-gray-700"
          >
            <div className="p-2">
              <Delete className="w-7 h-7 stroke-[1.75]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
