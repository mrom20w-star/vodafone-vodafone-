import React, { useState } from 'react';
import {
  ChevronRight,
  CreditCard,
  Building2,
  Store,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { MeezaLogo, VodafoneCashBadge } from './VodafoneIcons';
import { unlockAudio, playKeypadTick } from '../utils/audio';

interface DepositScreenProps {
  currentBalance?: number | string;
  onBack: () => void;
  onConfirmDeposit: (amount: number, method: string) => void;
}

export const DepositScreen: React.FC<DepositScreenProps> = ({
  currentBalance = 'unlimited',
  onBack,
  onConfirmDeposit,
}) => {
  const [depositAmount, setDepositAmount] = useState<number | ''>(500);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'atm' | 'store' | 'fawry'>('card');
  const [selectedCard, setSelectedCard] = useState<'card1' | 'card2'>('card1');

  const numericAmount = typeof depositAmount === 'number' ? depositAmount : 0;
  const isValidAmount = numericAmount >= 10 && numericAmount <= 60000;
  const isInfinite = currentBalance === 'unlimited' || typeof currentBalance === 'string';
  const newBalance = typeof currentBalance === 'number' ? currentBalance + numericAmount : 'unlimited';

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setDepositAmount(val === '' ? '' : Number(val));
  };

  const handleQuickAdd = (amt: number) => {
    playKeypadTick();
    setDepositAmount((prev) => {
      const base = typeof prev === 'number' ? prev : 0;
      return Math.min(60000, base + amt);
    });
  };

  const handlePresetSelect = (amt: number) => {
    playKeypadTick();
    setDepositAmount(amt);
  };

  const handleConfirm = () => {
    if (!isValidAmount) return;
    unlockAudio();
    const methodName =
      selectedMethod === 'card'
        ? 'كارت بنكي (ميزة / فيزا)'
        : selectedMethod === 'atm'
        ? 'ماكينة الصراف الآلي ATM'
        : selectedMethod === 'store'
        ? 'فرع فودافون'
        : 'فوري / أمان';
    onConfirmDeposit(numericAmount, methodName);
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

        <h2 className="text-lg font-bold text-gray-900">إيداع أموال</h2>

        <div className="w-6"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Balance Preview Card */}
        <div className="bg-gradient-to-br from-[#2a060d] to-[#450914] text-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-xs text-red-200 mb-2 font-medium">
            <span>الرصيد الحالي في المحفظة</span>
            <span>الرصيد بعد الإيداع</span>
          </div>
          <div className="flex items-center justify-between font-black">
            <span className="text-lg text-gray-200">
              {isInfinite ? 'غير محدود' : `${(currentBalance as number).toLocaleString()} ج.م`}
            </span>
            <span className="text-2xl text-emerald-400 font-black">
              {isInfinite ? 'غير محدود' : `${(newBalance as number).toLocaleString()} ج.م`}
            </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
            <span>رسوم الإيداع: <span className="text-emerald-400 font-bold">مجاناً (0 ج.م)</span></span>
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> فوري ومباشر
            </span>
          </div>
        </div>

        {/* Deposit Amount Input Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">مبلغ الإيداع</label>
            <span className="text-[11px] text-gray-400 font-medium">الحد: ١٠ - ٦٠,٠٠٠ ج.م</span>
          </div>

          <div className="flex items-center border-b-2 border-[#e60000] pb-2">
            <input
              type="text"
              inputMode="numeric"
              value={depositAmount}
              onChange={handleAmountChange}
              placeholder="0"
              className="w-full text-3xl font-black text-gray-900 focus:outline-none bg-transparent"
            />
            <span className="text-base font-bold text-gray-500 shrink-0">جنيه مصري</span>
          </div>

          {/* Preset Chips */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetSelect(amt)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  depositAmount === amt
                    ? 'bg-[#e60000] text-white shadow-xs'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                +{amt} ج.م
              </button>
            ))}
          </div>
        </div>

        {/* Deposit Method Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 px-1 block">طريقة الإيداع</label>

          <div className="space-y-2">
            {/* Method 1: Bank Card */}
            <div
              onClick={() => {
                playKeypadTick();
                setSelectedMethod('card');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedMethod === 'card'
                  ? 'border-[#e60000] ring-2 ring-[#e60000]/15 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e60000] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">كارت بنكي (ميزة / فيزا / ماستركارد)</h4>
                    <p className="text-[11px] text-gray-500">إيداع فوري من أي كارت بنكي مصري</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === 'card'
                      ? 'border-[#e60000] bg-[#e60000] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              {/* Sub-options for Card */}
              {selectedMethod === 'card' && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard('card1');
                    }}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                      selectedCard === 'card1'
                        ? 'border-red-400 bg-red-50/40 text-gray-900 font-semibold'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-emerald-700 rounded text-[9px] text-white font-bold flex items-center justify-center">
                        NBE
                      </div>
                      <span>البنك الأهلي المصري •••• 4821 (ميزة)</span>
                    </div>
                    {selectedCard === 'card1' && (
                      <CheckCircle2 className="w-4 h-4 text-[#e60000]" />
                    )}
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard('card2');
                    }}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                      selectedCard === 'card2'
                        ? 'border-red-400 bg-red-50/40 text-gray-900 font-semibold'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-blue-700 rounded text-[9px] text-white font-bold flex items-center justify-center">
                        BM
                      </div>
                      <span>بنك مصر •••• 9104 (فيزا)</span>
                    </div>
                    {selectedCard === 'card2' && (
                      <CheckCircle2 className="w-4 h-4 text-[#e60000]" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Method 2: ATM */}
            <div
              onClick={() => {
                playKeypadTick();
                setSelectedMethod('atm');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedMethod === 'atm'
                  ? 'border-[#e60000] ring-2 ring-[#e60000]/15 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">ماكينة صراف آلي ATM</h4>
                    <p className="text-[11px] text-gray-500">إيداع نقدي بدون كارت من أي ماكينة تدعم المحافظ</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === 'atm'
                      ? 'border-[#e60000] bg-[#e60000] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === 'atm' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>

            {/* Method 3: Vodafone Store */}
            <div
              onClick={() => {
                playKeypadTick();
                setSelectedMethod('store');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedMethod === 'store'
                  ? 'border-[#e60000] ring-2 ring-[#e60000]/15 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">فروع فودافون</h4>
                    <p className="text-[11px] text-gray-500">إيداع نقدي مباشر من أقرب فرع فودافون</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === 'store'
                      ? 'border-[#e60000] bg-[#e60000] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === 'store' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>

            {/* Method 4: Fawry / Aman */}
            <div
              onClick={() => {
                playKeypadTick();
                setSelectedMethod('fawry');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedMethod === 'fawry'
                  ? 'border-[#e60000] ring-2 ring-[#e60000]/15 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">منافذ أمان وفوري</h4>
                    <p className="text-[11px] text-gray-500">إيداع نقدي باستخدام رقم محفظتك</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === 'fawry'
                      ? 'border-[#e60000] bg-[#e60000] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === 'fawry' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info badges */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <VodafoneCashBadge className="h-6 px-2.5" />
          <MeezaLogo className="h-6 px-2.5" />
        </div>
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-200">
        <button
          type="button"
          disabled={!isValidAmount}
          onClick={handleConfirm}
          className={`w-full py-3.5 rounded-full text-white text-base font-bold shadow-md transition-all ${
            isValidAmount
              ? 'bg-[#e60000] hover:bg-[#cc0000] active:scale-[0.98]'
              : 'bg-gray-300 cursor-not-allowed opacity-60'
          }`}
        >
          {isValidAmount
            ? `تأكيد إيداع ${numericAmount.toLocaleString()} ج.م`
            : 'أدخل مبلغ إيداع صالح'}
        </button>
      </div>
    </div>
  );
};
