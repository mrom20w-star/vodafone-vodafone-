import React, { useEffect } from 'react';
import { ChevronRight, Check, Share2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { VodafoneCashIcon, VodafoneCashBadge, MeezaLogo } from './VodafoneIcons';
import { playCashRegisterSound } from '../utils/audio';

interface TransferSuccessScreenProps {
  senderPhone: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  fee: number;
  dateTime: string;
  referenceNumber: string;
  onDone: () => void;
  onShare?: () => void;
}

export const TransferSuccessScreen: React.FC<TransferSuccessScreenProps> = ({
  senderPhone,
  recipientPhone,
  recipientName,
  amount,
  fee,
  dateTime,
  referenceNumber,
  onDone,
}) => {
  const totalAmount = amount + fee;

  // Immediately play the user's custom cash sound when the success screen loads!
  useEffect(() => {
    playCashRegisterSound();
  }, []);

  const handleShare = async () => {
    const textToShare = `تم الدفع بمبلغ ${amount} جنيه لرقم ${recipientPhone} من خلال فودافون كاش. رقم العملية: ${referenceNumber}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'إيصال دفع فودافون كاش',
          text: textToShare,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard?.writeText(textToShare);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 justify-between select-none overflow-hidden" dir="rtl">
      {/* Top Header */}
      <div className="shrink-0 pt-3 pb-3 px-4 flex items-center justify-between border-b border-gray-200 bg-white">
        <button
          type="button"
          onClick={onDone}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold text-gray-900">تم الدفع</h2>

        <button
          type="button"
          onClick={() => playCashRegisterSound()}
          className="p-1.5 text-gray-400 hover:text-[#e60000] transition-colors"
          title="إعادة تشغيل الصوت"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Animated Success Checkmark */}
        <div className="flex flex-col items-center justify-center pt-2">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => playCashRegisterSound()}
            className="w-16 h-16 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-lg mb-2 cursor-pointer active:scale-95 transition-transform"
            title="انقر لإعادة تشغيل صوت الدفع"
          >
            <Check className="w-9 h-9 stroke-[3]" />
          </motion.div>
          <p className="text-base font-black text-gray-900">
            تم الدفع
          </p>
        </div>

        {/* Amount Display in Cyan / Blue */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#0284c7] tracking-tight">
            {amount} جنيه
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">
            مبلغ التحويل
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
          {/* Sender (من) */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-gray-400 block">من</span>
              <span className="text-base font-bold font-mono text-gray-900 tracking-wider">
                {senderPhone}
              </span>
            </div>
            <VodafoneCashIcon className="w-9 h-9" />
          </div>

          {/* Recipient (إلى) */}
          <div className="flex items-start justify-between border-t border-gray-100 pt-3">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-gray-400 block">إلى</span>
              <span className="text-base font-bold font-mono text-gray-900 tracking-wider">
                {recipientPhone}
              </span>
              <p className="text-xs font-semibold text-gray-600">
                {recipientName}
              </p>
            </div>
            <VodafoneCashIcon className="w-9 h-9" />
          </div>
        </div>

        {/* Breakdown & Transaction Metadata Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">الرسوم</span>
            <span className="font-bold text-gray-900">{fee} جنيه</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">المبلغ الكلي المستحق</span>
            <span className="font-extrabold text-sm text-gray-900">
              {totalAmount} جنيه
            </span>
          </div>

          <div className="border-t border-gray-100 pt-2 flex items-center justify-between text-gray-600">
            <span className="font-semibold">تاريخ العملية</span>
            <span className="font-bold text-gray-900">{dateTime}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">رقم العملية</span>
            <span className="font-mono font-bold text-gray-900 tracking-wider">
              {referenceNumber}
            </span>
          </div>
        </div>

        {/* Official Partner Badges (Vodafone Cash + Meeza) */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <VodafoneCashBadge className="h-7 px-3" />
          <MeezaLogo className="h-7 px-3" />
        </div>
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3" dir="rtl">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 py-3.5 rounded-full bg-[#e60000] text-white text-base font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5 stroke-[2.2]" />
          <span>شارك</span>
        </button>

        {/* Done Button */}
        <button
          type="button"
          onClick={onDone}
          className="flex-1 py-3.5 rounded-full bg-white border border-gray-300 text-gray-800 text-base font-bold shadow-xs hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>تم</span>
        </button>
      </div>
    </div>
  );
};
