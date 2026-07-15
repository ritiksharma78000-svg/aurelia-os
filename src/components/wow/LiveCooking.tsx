'use client';

interface LiveCookingProps {
  currentStage: 'dough' | 'cheese' | 'baking' | 'packing' | 'delivery';
}

export default function LiveCooking({ currentStage }: LiveCookingProps) {
  const stages = [
    { key: 'dough', label: 'Dough Preparing', icon: '🔥' },
    { key: 'cheese', label: 'Cheese Added', icon: '🧀' },
    { key: 'baking', label: 'Baking Food', icon: '🍕' },
    { key: 'packing', label: 'Packing Order', icon: '👨‍🍳' },
    { key: 'delivery', label: 'Out for Delivery', icon: '🚴' },
  ];

  const getActiveIndex = () => stages.findIndex(s => s.key === currentStage);

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl shadow-xl w-full max-w-2xl mx-auto">
      <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-6 font-mono">🍕 Live Preparation Pulse</h3>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
        {stages.map((stage, idx) => {
          const isPassed = idx <= getActiveIndex();
          const isCurrent = stage.key === currentStage;

          return (
            <div key={stage.key} className="flex flex-col items-center text-center relative z-10 flex-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border transition-all ${
                isCurrent ? 'bg-amber-500 text-stone-950 border-amber-400 scale-110 shadow-lg shadow-amber-500/20' : 
                isPassed ? 'bg-stone-950 text-amber-500 border-amber-500/40' : 'bg-stone-950 text-stone-600 border-stone-800'
              }`}>
                {stage.icon}
              </div>
              <p className={`text-[11px] mt-2 font-medium tracking-wide ${isCurrent ? 'text-amber-500 font-bold' : isPassed ? 'text-stone-300' : 'text-stone-600'}`}>
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
