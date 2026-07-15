'use client';

export function useErpAudio() {
  const playAlert = (type: 'kot_received' | 'food_ready' | 'payment_settled') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'kot_received') {
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Low warning
        oscillator.type = 'sawtooth';
      } else if (type === 'food_ready') {
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch ring
        oscillator.type = 'sine';
      } else {
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime); // Success melody
        oscillator.type = 'triangle';
      }

      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      console.log('Audio contextual loop waiting for user handshake gesture.');
    }
  };

  return { playAlert };
}
