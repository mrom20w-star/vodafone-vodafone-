import React, { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { PinScreen } from './components/PinScreen';
import { TransferInputScreen } from './components/TransferInputScreen';
import { TransferConfirmScreen } from './components/TransferConfirmScreen';
import { TransferSuccessScreen } from './components/TransferSuccessScreen';
import { DepositScreen } from './components/DepositScreen';
import { DepositSuccessScreen } from './components/DepositSuccessScreen';
import { LoadingModal } from './components/LoadingModal';
import { AppScreen } from './types';
import { unlockAudio, playCashRegisterSound } from './utils/audio';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('HOME');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('جاري التحميل');

  // Wallet State - Infinite / Unlimited Funds as requested by user
  const balance = 'unlimited';
  const senderPhone = '01087163221';
  const [recipientPhone, setRecipientPhone] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(200);
  const fee = 0;

  // Deposit State
  const [lastDepositAmount, setLastDepositAmount] = useState<number>(500);
  const [lastDepositMethod, setLastDepositMethod] = useState<string>('كارت بنكي (ميزة / فيزا)');

  // Auto transition from splash to home screen like in video
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1100);
    return () => clearTimeout(splashTimer);
  }, []);

  // Pre-unlock audio on any first click in window
  useEffect(() => {
    const handleFirstTouch = () => {
      unlockAudio();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const getMaskedName = (phone: string) => {
    if (phone === '01036985270') {
      return 'Amr B*** Y**** R*****';
    }
    return 'Mohamed A*** H**** M*****';
  };

  const transitionWithLoading = (nextScreen: AppScreen, delayMs = 450, msg = 'جاري التحميل') => {
    setLoadingMessage(msg);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen(nextScreen);
    }, delayMs);
  };

  const handleStartTransfer = () => {
    unlockAudio();
    transitionWithLoading('TRANSFER_INPUT', 400);
  };

  const handleStartDeposit = () => {
    unlockAudio();
    transitionWithLoading('DEPOSIT_INPUT', 400);
  };

  const handleConfirmDeposit = (amount: number, method: string) => {
    setLastDepositAmount(amount);
    setLastDepositMethod(method);
    transitionWithLoading('DEPOSIT_SUCCESS', 600, 'جاري إيداع المبلغ في المحفظة...');
  };

  const handleInputProceed = (phone: string, amount: number) => {
    unlockAudio();
    setRecipientPhone(phone);
    setTransferAmount(amount);
    transitionWithLoading('TRANSFER_CONFIRM', 450);
  };

  const handleConfirmProceed = () => {
    unlockAudio();
    transitionWithLoading('TRANSFER_PIN', 400);
  };

  const handleAuthorizePinComplete = (_pin: string) => {
    // Immediately play the user's custom audio file right when transfer finishes!
    unlockAudio();
    playCashRegisterSound();

    // Transition directly to success screen with "تم الدفع"
    transitionWithLoading('TRANSFER_SUCCESS', 500, 'جاري الدفع...');
  };

  const handleDone = () => {
    transitionWithLoading('HOME', 350);
  };

  return (
    <PhoneFrame>
      {/* Loading Modal */}
      <LoadingModal isOpen={isLoading} message={loadingMessage} />

      {/* Splash Screen */}
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {currentScreen === 'HOME' && (
            <HomeScreen
              balance={balance}
              onStartTransfer={handleStartTransfer}
              onStartDeposit={handleStartDeposit}
            />
          )}

          {currentScreen === 'DEPOSIT_INPUT' && (
            <DepositScreen
              currentBalance={balance}
              onBack={() => transitionWithLoading('HOME', 300)}
              onConfirmDeposit={handleConfirmDeposit}
            />
          )}

          {currentScreen === 'DEPOSIT_SUCCESS' && (
            <DepositSuccessScreen
              amount={lastDepositAmount}
              newBalance={balance}
              method={lastDepositMethod}
              onDone={handleDone}
              onGoToTransfer={handleStartTransfer}
            />
          )}

          {currentScreen === 'TRANSFER_INPUT' && (
            <TransferInputScreen
              defaultPhone={recipientPhone}
              defaultAmount={transferAmount}
              balance={balance}
              onBack={() => transitionWithLoading('HOME', 300)}
              onProceed={handleInputProceed}
            />
          )}

          {currentScreen === 'TRANSFER_CONFIRM' && (
            <TransferConfirmScreen
              senderPhone={senderPhone}
              recipientPhone={recipientPhone}
              recipientName={getMaskedName(recipientPhone)}
              amount={transferAmount}
              fee={fee}
              onBack={() => transitionWithLoading('TRANSFER_INPUT', 300)}
              onConfirm={handleConfirmProceed}
            />
          )}

          {currentScreen === 'TRANSFER_PIN' && (
            <PinScreen
              onComplete={handleAuthorizePinComplete}
              title="ادخل رقم المحفظة السري"
              onBack={() => transitionWithLoading('TRANSFER_CONFIRM', 300)}
            />
          )}

          {currentScreen === 'TRANSFER_SUCCESS' && (
            <TransferSuccessScreen
              senderPhone={senderPhone}
              recipientPhone={recipientPhone}
              recipientName={getMaskedName(recipientPhone)}
              amount={transferAmount}
              fee={fee}
              dateTime="14 سبتمبر 2026 07:18"
              referenceNumber="100510859841"
              onDone={handleDone}
            />
          )}
        </>
      )}
    </PhoneFrame>
  );
}
