import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-[100dvh] bg-[#f4f5f7] flex justify-center items-stretch">
      {/* Full-screen native web application container */}
      <main className="w-full max-w-lg min-h-[100dvh] bg-[#f8f9fa] flex flex-col relative overflow-hidden sm:shadow-sm sm:border-x sm:border-gray-200">
        <div className="flex-1 relative overflow-hidden bg-[#f8f9fa] flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};
