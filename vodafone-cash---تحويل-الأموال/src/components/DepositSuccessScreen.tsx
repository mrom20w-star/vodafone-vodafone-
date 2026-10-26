import React, { useEffect } from 'react';
import { ChevronRight, Check, Share2, ArrowLeftRight } from 'lucide-react';
import { motion } from 'motion/react';
import { VodafoneCashBadge, MeezaLogo } from './VodafoneIcons';
import { NotificationBanner } from './NotificationBanner';
import { playCashRegisterSound } from '../utils/audio';

interface DepositSuccessScreenProps {
  amount: number;
  newBalance?: number | string;
  method: string;
  onDone: () => void;
  onGoToTransfer: () => void;
}

export const DepositSuccessScreen: React.FC<DepositSuccessScreenProps> = ({
  amount,
  newBalance,
  method,
  onDone,
  onGoToTransfer,
}) => {
  // Play cash sound on mount
  useEffect(() => {
    playCashRegisterSound();
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 select-none relative" dir="rtl">
      {/* Top Push Notification Banner */}
      <NotificationBanner
        show={true}
        amount={amount}
        recipientPhone="محفظتك الشخصية"
      />

      {/* Top Header */}
      <div className="shrink-0 pt-3 pb-3 px-4 flex items-center justify-between border-b border-gray-200 bg-white">
        <button
          type="button"
          onClick={onDone}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold text-gray-900">إيداع ناجح</h2>

        <div className="w-6"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Animated Checkmark */}
        <div className="flex flex-col items-center justify-center pt-2">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => playCashRegisterSound()}
            className="w-16 h-16 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-lg mb-2 cursor-pointer active:scale-95 transition-transform"
            title="انقر لتشغيل صوت الإيداع"
          >
            <Check className="w-9 h-9 stroke-[3]" />
          </motion.div>
          <p className="text-sm font-bold text-gray-800">
            تم الإيداع بنجاح في المحفظة
          </p>
        </div>

        {/* Amount Display in Emerald */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-emerald-600 tracking-tight">
            +{amount.toLocaleString()} جنيه
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">
            تمت إضافة المبلغ إلى رصيدك
          </p>
        </div>

        {/* Current Balance Banner */}
        <div className="bg-gradient-to-r from-[#2a060d] to-[#420914] text-white rounded-2xl p-4 shadow-sm text-center">
          <span className="text-xs text-red-200 block font-medium">رصيد فودافون كاش الحالي</span>
          <span className="text-2xl font-black tracking-tight text-white block mt-0.5">
            {typeof newBalance === 'number' ? `${newBalance.toLocaleString()} ج.م` : 'غير محدود'}
          </span>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500 font-medium">طريقة الإيداع</span>
            <span className="font-bold text-gray-900">{method}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500 font-medium">رسوم الخدمة</span>
            <span className="font-bold text-emerald-600">0.00 جنيه (مجاناً)</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500 font-medium">التاريخ والوقت</span>
            <span className="font-semibold text-gray-800 font-mono text-[11px] dir-ltr">
              {dateStr} • {timeStr}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-gray-500 font-medium">رقم العملية المرجعي</span>
            <span className="font-mono text-gray-900 font-bold tracking-wider text-[11px]">
              DEP-88492019
            </span>
          </div>
        </div>

        {/* Official Partner Badges */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <VodafoneCashBadge className="h-7 px-3" />
          <MeezaLogo className="h-7 px-3" />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-200 flex items-center gap-3" dir="rtl">
        {/* Go to Transfer Button */}
        <button
          type="button"
          onClick={onGoToTransfer}
          className="flex-1 py-3.5 rounded-full bg-[#e60000] text-white text-base font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeftRight className="w-5 h-5 stroke-[2.2]" />
          <span>تحويل أموال الآن</span>
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
