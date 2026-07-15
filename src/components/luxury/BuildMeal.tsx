'use client';

import { useState } from 'react';

export default function BuildMeal() {
  const [step, setStep] = useState<number>(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const stepsData = [
    { step: 1, type: 'burger', title: '🍔 Choose Your Core Burger', options: ['Classic Crunch Veg Burger', 'Gourmet Cheese Burger', 'Spicy Lava Burger'] },
    { step: 2, type: 'fries', title: '🍟 Select Premium Fries Sides', options: ['Salted Classic Fries', 'Peri Peri Volcano Fries', 'Loaded Cheese Fries'] },
    { step: 3, type: 'drink', title: '🥤 Pick Your Refreshing Drink', options: ['Chilled Virgin Mojito', 'Premium Cold Coffee', 'Aerated Soft Drink'] },
    { step: 4, type: 'dessert', title: '🍰 Select Luxury Dessert Fine', options: ['Warm Lava Cake', 'Saffron Rasmalai', 'Chocolate Brownie Fudge'] }
  ];

  const currentStepData = stepsData.find(s => s.step === step);

  const handleSelectOption = (option: string) => {
    if (!currentStepData) return;
    setSelections({ ...selections, [currentStepData.type]: option });

    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5); // फनल कम्प्लीट, सीधे चेकआउट नोट
    }
  };

  const handleReset = () => {
    setSelections({});
    setStep(1);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl shadow-xl max-w-md mx-auto select-none">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-500 font-mono mb-4 text-center">
        🛠️ Custom Meal Builder
      </h2>

      {step <= 4 && currentStepData ? (
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] text-stone-500 font-mono uppercase tracking-widest border-b border-stone-800 pb-2 mb-2">
            <span>Progress Build</span>
            <span>Step {step} of 4</span>
          </div>
          <h3 className="text-sm font-medium text-stone-200">{currentStepData.title}</h3>

          <div className="space-y-2 pt-2">
            {currentStepData.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 text-xs px-4 py-3 rounded-xl transition-all font-mono"
              >
                🎯 {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 py-4">
          <div className="text-4xl">👑</div>
          <h3 className="text-base font-serif text-emerald-400">Custom Combo Ready!</h3>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-left text-xs font-mono space-y-2 text-stone-400">
            <div><span className="text-stone-600">Main:</span> {selections.burger}</div>
            <div><span className="text-stone-600">Sides:</span> {selections.fries}</div>
            <div><span className="text-stone-600">Drink:</span> {selections.drink}</div>
            <div><span className="text-stone-600">Sweet:</span> {selections.dessert}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleReset} className="w-1/3 bg-stone-950 border border-stone-800 text-stone-400 text-xs py-2.5 rounded-xl font-mono">
              Reset
            </button>
            <button onClick={() => alert('Custom Meal Added to Global Checkout Cart!')} className="w-2/3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs py-2.5 rounded-xl uppercase tracking-wider">
              Add Combo to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
