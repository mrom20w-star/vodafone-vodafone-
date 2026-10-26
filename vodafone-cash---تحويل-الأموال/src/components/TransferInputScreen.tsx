import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Contact, X, Star, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playKeypadTick, unlockAudio } from '../utils/audio';

interface TransferInputScreenProps {
  onBack: () => void;
  onProceed: (phone: string, amount: number) => void;
  defaultPhone?: string;
  defaultAmount?: number;
  balance?: number | string;
}

export const TransferInputScreen: React.FC<TransferInputScreenProps> = ({
  onBack,
  onProceed,
  defaultPhone = '',
  defaultAmount = 200,
  balance = 'unlimited',
}) => {
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone);
  const [amount, setAmount] = useState<number | ''>(defaultAmount || '');
  const [focusedField, setFocusedField] = useState<'phone' | 'amount'>('phone');

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Focus phone input on mount so native device keyboard opens
  useEffect(() => {
    const timer = setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Validation
  const isPhoneComplete = phoneNumber.length === 11;
  const isPhoneValid = isPhoneComplete && phoneNumber.startsWith('01');
  const numericAmount = typeof amount === 'number' ? amount : 0;
  const isAmountValid = numericAmount >= 5 && numericAmount <= 60000;
  // Infinite funds: always sufficient, no restriction
  const isBalanceSufficient = true;
  const canConfirm = isPhoneValid && isAmountValid && isBalanceSufficient;

  // Auto focus amount input as soon as user types 11 digits
  useEffect(() => {
    if (phoneNumber.length === 11) {
      amountInputRef.current?.focus();
      setFocusedField('amount');
    }
  }, [phoneNumber.length]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(raw);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 5);
    setAmount(raw === '' ? '' : Number(raw));
  };

  const addQuickAmount = (val: number) => {
    playKeypadTick();
    const current = typeof amount === 'number' ? amount : 0;
    const updated = current + val;
    if (updated <= 60000) {
      setAmount(updated);
    }
    amountInputRef.current?.focus();
  };

  const selectFavorite = (num: string) => {
    playKeypadTick();
    setPhoneNumber(num);
  };

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (canConfirm) {
      unlockAudio();
      onProceed(phoneNumber, numericAmount);
    }
  };

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

        <h2 className="text-lg font-bold text-gray-900">تحويل إلي</h2>

        <div className="w-6"></div>
      </div>

      {/* Main Content Form */}
      <form
        onSubmit={handleFormSubmit}
        className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar flex flex-col justify-between"
      >
        <div className="space-y-4">
          {/* Mobile Number Card */}
          <div
            onClick={() => {
              phoneInputRef.current?.focus();
              setFocusedField('phone');
            }}
            className={`bg-white rounded-2xl p-4 border transition-all cursor-text shadow-xs ${
              focusedField === 'phone'
                ? 'border-[#e60000] ring-2 ring-[#e60000]/15'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-600">
                رقم الموبايل
              </label>
              <span className="text-[11px] font-mono text-gray-400">
                {phoneNumber.length}/11
              </span>
            </div>

            <div className="flex items-center justify-between">
              <input
                ref={phoneInputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phoneNumber}
                onChange={handlePhoneChange}
                onFocus={() => setFocusedField('phone')}
                placeholder="ادخل رقم الموبايل (11 رقم)"
                className="w-full bg-transparent border-0 p-0 text-xl font-bold text-gray-900 tracking-wider focus:outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal font-mono"
                maxLength={11}
                autoComplete="tel"
              />

              <div className="flex items-center gap-2 pr-2">
                {phoneNumber.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhoneNumber('');
                      phoneInputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <div className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 text-[#e60000] flex items-center justify-center">
                  <Contact className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Numbers Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center shadow-xs">
            <div className="w-8 h-8 mx-auto mb-2 text-gray-400 flex items-center justify-center">
              <Star className="w-7 h-7 stroke-[1.5]" />
            </div>
            <p className="text-xs font-bold text-gray-800 mb-1">
              زود أرقامك المفضلة هنا علشان تلاقيهم بسهولة!
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => selectFavorite('01036985270')}
                className="text-xs font-bold text-[#e60000] bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors border border-red-100"
              >
                01036985270 (عمرو)
              </button>
              <button
                type="button"
                className="text-xs font-bold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                زود رقم مفضل +
              </button>
            </div>
          </div>

          {/* Amount Card - Always available, expands with emphasis when phone is complete */}
          <AnimatePresence>
            {isPhoneComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  amountInputRef.current?.focus();
                  setFocusedField('amount');
                }}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-text shadow-xs ${
                  focusedField === 'amount'
                    ? 'border-[#e60000] ring-2 ring-[#e60000]/15'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800">مبلغ التحويل</span>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    <span>الرسوم مجاناً</span>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="text-center py-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      ref={amountInputRef}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={amount}
                      onChange={handleAmountChange}
                      onFocus={() => setFocusedField('amount')}
                      placeholder="0"
                      className="w-44 text-center bg-transparent border-0 p-0 text-4xl font-black text-gray-900 tracking-tight focus:outline-none placeholder:text-gray-300 font-mono"
                      maxLength={5}
                    />
                    <span className="text-xl font-bold text-gray-800">جنيه</span>
                  </div>
                </div>

                {/* Quick Add Chips */}
                <div className="flex items-center justify-center gap-2 mt-2" dir="ltr">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addQuickAmount(10);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    + ١٠ جنيه
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addQuickAmount(100);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    + ١٠٠ جنيه
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addQuickAmount(500);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    + ٥٠٠ جنيه
                  </button>
                </div>

                {/* Limit Notice or Warning */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-3 px-1">
                  <span>الحد: ٥ - ٦٠,٠٠٠ جنيه</span>
                  <span className="text-gray-600 font-semibold">
                    الرصيد المتاح: غير محدود
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Confirm Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!canConfirm}
            className={`w-full py-4 rounded-full text-base font-bold transition-all shadow-md ${
              canConfirm
                ? 'bg-[#e60000] text-white hover:bg-[#cc0000] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            تأكيد
          </button>
        </div>
      </form>
    </div>
  );
};
