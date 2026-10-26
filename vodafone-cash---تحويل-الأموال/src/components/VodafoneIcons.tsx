import React from 'react';

/**
 * Authentic Vodafone Speechmark Droplet Logo
 */
export const VodafoneLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="100" fill="#E60000" />
    <path
      d="M100 42C67.97 42 42 67.97 42 100C42 132.03 67.97 158 100 158C132.03 158 158 132.03 158 100C158 75.25 142.45 54.14 120.67 46.04C121.2 48.06 121.5 50.18 121.5 52.37C121.5 70.36 106.86 85 88.87 85C83.39 85 78.26 83.63 73.78 81.25C72.63 87.12 72 93.18 72 99.4C72 119.06 87.94 135 107.6 135C127.26 135 143.2 119.06 143.2 99.4C143.2 67.7 117.7 42 100 42Z"
      fill="white"
    />
  </svg>
);

/**
 * White Speechmark without red circle background (for red cards)
 */
export const VodafoneSpeechmarkWhite: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 32.1 80.7 16.8 64.9 10.9C65.3 12.4 65.5 13.9 65.5 15.5C65.5 28.5 54.9 39.1 41.9 39.1C38 39.1 34.3 38.1 31 36.4C30.2 40.6 29.7 45 29.7 49.5C29.7 63.8 41.2 75.3 55.5 75.3C69.8 75.3 81.3 63.8 81.3 49.5C81.3 26.5 62.8 8 50 8Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Vodafone Cash rectangular badge as seen in video (Red box with speechmark + "كاش")
 */
export const VodafoneCashBadge: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#e60000] text-white shadow-xs ${className}`}>
    <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="#e60000">
        <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
      </svg>
    </div>
    <span className="text-[12px] font-bold tracking-tight leading-none pt-0.5">كاش</span>
  </div>
);

/**
 * Meeza (ميزة) Official Egyptian Payment Network Logo
 */
export const MeezaLogo: React.FC<{ className?: string }> = ({ className = 'h-5' }) => (
  <div className={`inline-flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-xs ${className}`}>
    <div className="flex -space-x-1 items-center">
      <span className="w-2.5 h-2.5 rounded-full bg-[#00A859] inline-block opacity-90"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#F39200] inline-block opacity-90 -mr-1"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#E50019] inline-block opacity-90 -mr-1"></span>
    </div>
    <span className="text-[11px] font-extrabold text-[#1f2937] tracking-tight leading-none">ميزة</span>
  </div>
);

/**
 * Vodafone Cash square receipt icon with ribbon
 */
export const VodafoneCashIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center bg-white border border-red-200 rounded-lg shadow-xs overflow-hidden ${className}`}>
    <div className="flex flex-col items-center justify-center p-1">
      <div className="w-5 h-5 bg-[#e60000] rounded-full flex items-center justify-center p-0.5">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="white">
          <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
        </svg>
      </div>
      <span className="text-[9px] font-black text-[#e60000] leading-none mt-0.5">كاش</span>
    </div>
    {/* Bottom red ribbon decoration */}
    <div className="absolute bottom-0 inset-x-0 h-1 bg-[#e60000]"></div>
  </div>
);
