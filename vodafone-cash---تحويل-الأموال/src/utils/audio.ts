/**
 * Audio playback helper for Vodafone Cash
 * Uses the exact user-uploaded audio file: /assets/aistudio/file_6c92a2ac.mp3
 */

let userAudio: HTMLAudioElement | null = null;

export function getSuccessAudio(): HTMLAudioElement {
  if (!userAudio && typeof window !== 'undefined') {
    userAudio = new Audio('/assets/aistudio/file_6c92a2ac.mp3');
    userAudio.preload = 'auto';
  }
  return userAudio!;
}

export function unlockAudio() {
  try {
    const audio = getSuccessAudio();
    if (audio) {
      // Warm up audio buffer on first interaction so it plays without browser autoplay block
      audio.load();
    }
  } catch {
    // Ignore error
  }
}

export function playKeypadTick() {
  // Gentle tactile click for buttons
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Ignore
  }
}

export function playCashRegisterSound() {
  try {
    const audio = getSuccessAudio();
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1.0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if blocked
          const secondaryAudio = new Audio('/assets/aistudio/file_6c92a2ac.mp3');
          secondaryAudio.play().catch(() => {});
        });
      }
    }
  } catch {
    // Ignore error
  }
}
