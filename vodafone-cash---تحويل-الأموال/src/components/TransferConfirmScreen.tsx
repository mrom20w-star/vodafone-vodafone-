import React, { useState } from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { VodafoneCashIcon } from './VodafoneIcons';
import { unlockAudio } from '../utils/audio';

interface TransferConfirmScreenProps {
  senderPhone: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  fee: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const TransferConfirmScreen: React.FC<TransferConfirmScreenProps> = ({
  senderPhone,
  recipientPhone,
  recipientName,
  amount,
  fee,
  onBack,
  onConfirm,
}) => {
  const [addGreetingCard, setAddGreetingCard] = useState(false);
  const totalAmount = amount + fee;

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] text-gray-900 select-none" dir="rtl">
      {/* Top Header */}
      <div className="shrink-0 pt-3 pb-3 px-4 flex items-center justify-between border-b border-gray-200 bg-white">
        <button
          type="button"
          onClick={onBack}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold text-gray-900">تأكيد</h2>

        <div className="w-6"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Big Amount Display in Cyan / Blue */}
          <div className="text-center pt-2 pb-1">
            <h1 className="text-3xl font-black text-[#0284c7] tracking-tight">
              {amount} جنيه
            </h1>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              مبلغ التحويل
            </p>
          </div>

          {/* Transfer Route Card (From & To) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-4">
            {/* Sender (من) */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-gray-400 block">من</span>
                <span className="text-base font-bold font-mono text-gray-900 tracking-wider">
                  {senderPhone}
                </span>
              </div>
              <VodafoneCashIcon className="w-9 h-9" />
            </div>

            {/* Downward Connector line */}
            <div className="flex items-center gap-3 pr-2">
              <div className="w-6 flex justify-center text-gray-400">
                <ArrowDown className="w-4 h-4 text-gray-300 stroke-[2.5]" />
              </div>
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
            </div>

            {/* Recipient (إلى) */}
            <div className="flex items-start justify-between">
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

          {/* Summary Breakdown (Fees & Total) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span className="font-semibold">الرسوم</span>
              <span className="font-bold text-gray-900">{fee.toFixed(1)} جنيه</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
              <span className="font-bold text-gray-900">المبلغ الكلي المستحق</span>
              <span className="font-extrabold text-base text-gray-900">
                {totalAmount.toFixed(1)} جنيه
              </span>
            </div>
          </div>

          {/* Greeting Card Toggle */}
          <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-10 rounded-lg overflow-hidden bg-gradient-to-r from-red-600 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold shadow-inner">
                <span>كارت تهنئة</span>
              </div>
              <span className="text-xs font-bold text-gray-800">
                اضف كارت معايدة؟
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={addGreetingCard}
                onChange={() => setAddGreetingCard(!addGreetingCard)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e60000]"></div>
            </label>
          </div>

          {/* Disclaimer & Warning Notice */}
          <div className="space-y-1.5 px-2 text-[11px] text-gray-500 leading-relaxed">
            <p className="font-semibold text-gray-600">
              * لمستخدمين فودافون كاش فقط
            </p>
            <p>
              تأكد من ادخال الرقم الصحيح وفي حالة التحويل الخاطئ لن تتمكن من إعادة المبلغ مرة اخرى.
            </p>
          </div>
        </div>

      {/* Sticky Bottom Action Button */}
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            onConfirm();
          }}
          className="w-full py-3.5 rounded-full bg-[#e60000] text-white text-base font-bold shadow-md hover:bg-[#cc0000] active:scale-[0.98] transition-all"
        >
          تأكيد
        </button>
      </div>
    </div>
  );
};
