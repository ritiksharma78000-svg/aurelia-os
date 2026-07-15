'use client';

import { useState } from 'react';

export default function SpinWin() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);

  const rewards = ['Free Dessert 🍰', '10% OFF 🎫', 'Free Cold Drink 🥤', 'Try Again 🔄', 'Free Starter 🍟', '5% OFF 🎟️'];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrize(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      setPrize(rewards[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl text-center shadow-xl select-none max-w-sm mx-auto relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <h3 className="text-lg font-serif font-light text-amber-500 tracking-wider mb-2">💎 AURELIA REWARDS</h3>
      <p className="text-xs text-stone-400 mb-6">Spin the luxury wheel to unlock your dining gifts</p>

      <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center border-4 border-amber-500/30 rounded-full bg-stone-950">
        <div className={`text-4xl transition-all duration-[2000ms] ${isSpinning ? 'animate-spin' : ''}`}>
          🎯
        </div>
      </div>

      {prize && (
        <div className="mb-4 p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs rounded-xl animate-bounce">
          You Won: {prize}
        </div>
      )}

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-stone-800 text-stone-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
      >
        {isSpinning ? 'Spinning Luck...' : '🎰 Spin & Win Now'}
      </button>
    </div>
  );
}
