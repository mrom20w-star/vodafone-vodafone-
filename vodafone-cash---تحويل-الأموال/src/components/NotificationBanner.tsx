import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VodafoneLogo } from './VodafoneIcons';

interface NotificationBannerProps {
  show: boolean;
  amount: number;
  recipientPhone: string;
  onDismiss?: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  show,
  amount,
  recipientPhone,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -120, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_e, info) => {
            if (info.offset.y < -20) {
              setVisible(false);
              onDismiss?.();
            }
          }}
          onClick={() => {
            onDismiss?.();
          }}
          className="absolute top-3 inset-x-3 z-50 cursor-pointer select-none"
          dir="rtl"
        >
          <div className="bg-[#1e1e20]/95 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-3.5 shadow-2xl flex items-start gap-3 ring-1 ring-black/30">
            <div className="shrink-0 w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-[#e60000] shadow-md mt-0.5">
              <VodafoneLogo className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs text-gray-300 font-medium mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[13px]">VF-Cash</span>
                  <span className="text-gray-400 text-[11px] font-normal">• الآن</span>
                </div>
              </div>
              <p className="text-[12px] leading-relaxed text-gray-100 font-normal line-clamp-2">
                تم تحويل {amount} جنيه لرقم {recipientPhone} مصاريف الخدمة 0 جنيه رصيد حسابك في فودافون كاش الحالي...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
