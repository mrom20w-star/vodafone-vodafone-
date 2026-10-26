import React, { useState } from 'react';
import {
  Bell,
  Search,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  ArrowLeftRight,
  Eye,
  EyeOff,
  Plus,
  Tv,
  Film,
  Music,
  User,
  Home as HomeIcon,
  Tag,
  ShoppingCart,
  Menu,
  FileText,
  Radio,
  CreditCard,
  Droplets,
  Zap,
  Sparkles,
  Flame,
} from 'lucide-react';
import { VodafoneLogo, VodafoneCashIcon, VodafoneCashBadge } from './VodafoneIcons';

interface HomeScreenProps {
  balance?: number | string;
  onStartTransfer: () => void;
  onStartDeposit: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  balance = 'unlimited',
  onStartTransfer,
  onStartDeposit,
}) => {
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'offers' | 'profile' | 'shop' | 'more'>('home');
  const [showCashModal, setShowCashModal] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const displayBalance =
    balance === 'unlimited' || balance === undefined || typeof balance === 'string'
      ? (lang === 'ar' ? 'غير محدود' : 'Unlimited')
      : `${(balance as number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م`;


  return (
    <div className="flex flex-col h-full w-full bg-[#f4f5f7] text-gray-900 overflow-y-auto no-scrollbar pb-24 select-none relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Header Bar matching Ana Vodafone Video */}
      <div className="shrink-0 bg-white px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-gray-100 shadow-xs">
        {/* Left: Vodafone Red Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#e60000] flex items-center justify-center p-1.5 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="white">
              <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.9 79.2 18.4 64.1 12.8C64.5 14.2 64.7 15.7 64.7 17.2C64.7 29.6 54.6 39.7 42.2 39.7C38.4 39.7 34.8 38.7 31.7 37.1C30.9 41.1 30.5 45.3 30.5 49.6C30.5 63.2 41.5 74.2 55.1 74.2C68.7 74.2 79.7 63.2 79.7 49.6C79.7 27.7 62.2 10 50 10Z" />
            </svg>
          </div>
          <span className="text-base font-extrabold text-gray-900 tracking-tight">vodafone</span>
        </div>

        {/* Right: Language toggle, Notifications & Search */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="text-[11px] font-bold text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          <button
            type="button"
            className="relative p-1.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e60000] rounded-full ring-2 ring-white"></span>
          </button>

          <button
            type="button"
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="p-3.5 space-y-3.5">
        {/* Red Pill Plan Badge: "Flex 80" */}
        <div className="flex items-center">
          <div className="bg-[#e60000] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
            <FileText className="w-3.5 h-3.5" />
            <span>Flex 80</span>
          </div>
        </div>

        {/* Main Usage Card (Exact copy from video) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs relative overflow-hidden">
          {/* Top row: Usage title + Flex Arabic calligraphy logo */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-gray-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <rect x="3" y="12" width="4" height="8" rx="1" />
                  <rect x="10" y="8" width="4" height="12" rx="1" />
                  <rect x="17" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                {lang === 'ar' ? 'الاستهلاك' : 'Usage'}
              </h3>
            </div>

            {/* Red Arabic Calligraphy "فليكس" */}
            <div className="text-[#e60000] font-black text-2xl tracking-tighter leading-none px-1">
              فليكس
            </div>
          </div>

          {/* Subtext message */}
          <p className="text-xs text-gray-600 leading-relaxed font-medium mb-4 max-w-[85%]">
            {lang === 'ar'
              ? 'باقتك انتهت، جدد دلوقتي علشان تستمتع بفليكساتك.'
              : 'Your bundle has expired, Renew now to enjoy your Flexes.'}
          </p>

          {/* Buttons: Renew & Manage */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onStartTransfer}
              className="px-5 py-2 rounded-xl bg-[#e60000] text-white text-xs font-bold shadow-xs hover:bg-[#cc0000] active:scale-95 transition-all"
            >
              {lang === 'ar' ? 'تجديد' : 'Renew'}
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all"
            >
              {lang === 'ar' ? 'إدارة' : 'Manage'}
            </button>
          </div>

          {/* Pagination dots (1 red, 4 gray) */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
            <span className="w-2 h-2 rounded-full bg-[#e60000]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
          </div>
        </div>

        {/* 2x2 Grid Section 1: Recharge & Online Shop */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Recharge */}
          <div
            onClick={onStartDeposit}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex flex-col justify-between h-28 cursor-pointer hover:border-red-300 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-4 h-4 text-[#e60000]" />
                <span className="text-xs font-bold text-gray-900">
                  {lang === 'ar' ? 'شحن رصيد' : 'Recharge'}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-500 font-mono">
                EGP 0.0
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-[#e60000]">
              <span>{lang === 'ar' ? 'اشحن دلوقتي' : 'Explore'}</span>
              {lang === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Card 2: Online Shop */}
          <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex flex-col justify-between h-28 cursor-pointer hover:border-red-300 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-4 h-4 text-[#e60000]" />
                <span className="text-xs font-bold text-gray-900">
                  {lang === 'ar' ? 'المتجر الإلكتروني' : 'Online Shop'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-[#e60000]">
              <span>{lang === 'ar' ? 'تصفح العروض' : 'Explore'}</span>
              {lang === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>

        {/* 2x2 Grid Section 2: Vodafone Cash (Highlighted) & TV/Music */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 3: Vodafone Cash (Dark card matching video, triggers transfer!) */}
          <div
            onClick={onStartTransfer}
            className="relative overflow-hidden bg-[#1a1a1a] text-white rounded-2xl p-3.5 border border-neutral-800 shadow-md flex flex-col justify-between h-32 cursor-pointer hover:bg-neutral-900 active:scale-[0.98] transition-all group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-tight text-white group-hover:text-red-200 transition-colors">
                {lang === 'ar' ? 'فودافون كاش' : 'Vodafone Cash'}
              </span>
              <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center p-0.5">
                <VodafoneLogo className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Middle: Real balance & Transfer icon */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{lang === 'ar' ? 'تحويل الأموال' : 'Transfer Money'}</span>
              </div>
              <p className="text-[11px] font-medium text-gray-300 mt-0.5 font-mono">
                {showBalance ? displayBalance : '••••••••'}
              </p>
            </div>

            {/* Bottom link */}
            <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-white/10 pt-1.5">
              <span className="text-white font-bold group-hover:text-[#e60000] transition-colors">
                {lang === 'ar' ? 'ابدأ التحويل الآن' : 'Send Cash >'}
              </span>
              <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded">مفعل</span>
            </div>
          </div>

          {/* Card 4: TV & Music (Streaming logos) */}
          <div className="bg-[#1a1a1a] text-white rounded-2xl p-3.5 border border-neutral-800 shadow-md flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {lang === 'ar' ? 'تلفزيون وموسيقى' : 'TV & Music'}
              </span>
              <Tv className="w-4 h-4 text-amber-400" />
            </div>

            {/* Streaming Platform Badges */}
            <div className="grid grid-cols-2 gap-1.5 py-1">
              <div className="bg-neutral-800/90 rounded px-1.5 py-1 text-[9px] font-extrabold text-center text-red-400 border border-neutral-700">
                TOD
              </div>
              <div className="bg-neutral-800/90 rounded px-1.5 py-1 text-[9px] font-extrabold text-center text-amber-400 border border-neutral-700">
                SHAHID
              </div>
              <div className="bg-neutral-800/90 rounded px-1.5 py-1 text-[9px] font-extrabold text-center text-purple-400 border border-neutral-700">
                TWIST
              </div>
              <div className="bg-neutral-800/90 rounded px-1.5 py-1 text-[9px] font-extrabold text-center text-emerald-400 border border-neutral-700">
                WATCH IT
              </div>
            </div>

            <div className="text-[10px] text-gray-400 text-center">
              {lang === 'ar' ? 'اشتراكات حصرية' : 'Exclusive Bundles'}
            </div>
          </div>
        </div>

        {/* Last updated timestamp */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium py-1">
          <RefreshCw className="w-3 h-3 text-gray-400" />
          <span>Last updated: 03 Aug, 10:08 PM</span>
        </div>

        {/* Section: Vodafone Entertainment Banner */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-600 px-1">
            Vodafone Entertainment
          </h4>

          {/* Red Banner: "كول تون لكل مود" */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#d60000] via-[#e60000] to-[#b30000] text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full inline-block">
                  كول تون
                </span>
                <h3 className="text-base font-black tracking-tight">
                  كول تون لكل مود
                </h3>
                <p className="text-[11px] text-red-100 font-medium">
                  اختار اغنيتك المفضلة وخلّي صحابك يسمعوها
                </p>
              </div>

              {/* Callertone disc illustration */}
              <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white shadow-inner">
                <Music className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Vodafone Cash Action Drawer (for quick deposit or balance) */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e60000] flex items-center justify-center">
              <VodafoneCashIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">محفظة فودافون كاش</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-gray-500 font-mono">
                  {showBalance ? displayBalance : '••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartDeposit}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              إيداع +
            </button>
            <button
              type="button"
              onClick={onStartTransfer}
              className="px-3 py-1.5 rounded-xl bg-[#e60000] text-white text-xs font-bold shadow-xs hover:bg-[#cc0000] transition-colors"
            >
              تحويل
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation Bar matching Ana Vodafone Video */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 flex items-center justify-between z-30 max-w-lg mx-auto">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => setActiveBottomTab('home')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeBottomTab === 'home' ? 'text-[#e60000]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <HomeIcon className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Tab 2: Offers */}
        <button
          type="button"
          onClick={() => setActiveBottomTab('offers')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeBottomTab === 'offers' ? 'text-[#e60000]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span className="text-[10px] font-medium">Offers</span>
        </button>

        {/* Center Floating Profile Avatar Button (Elevated) */}
        <button
          type="button"
          onClick={() => setActiveBottomTab('profile')}
          className="relative -top-2 flex flex-col items-center group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 shadow-md flex items-center justify-center text-gray-400 group-hover:border-[#e60000] transition-colors">
            <User className="w-6 h-6 stroke-[1.8]" />
          </div>
        </button>

        {/* Tab 4: Shop */}
        <button
          type="button"
          onClick={() => setActiveBottomTab('shop')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeBottomTab === 'shop' ? 'text-[#e60000]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Shop</span>
        </button>

        {/* Tab 5: More */}
        <button
          type="button"
          onClick={() => setActiveBottomTab('more')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            activeBottomTab === 'more' ? 'text-[#e60000]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
};
