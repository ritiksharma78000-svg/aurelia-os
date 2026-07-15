'use client';

import { useState } from 'react';
import { useAurelia } from '@/context/AureliaContext';

export default function AiMenu() {
  const { menu } = useAurelia();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // फ़िल्टर बटन की कॉन्फ़िगरेशन
  const filters = [
    { label: '✨ All Dishes', value: 'All' },
    { label: '🥬 Pure Veg', value: 'Veg' },
    { label: '🍗 Non Veg', value: 'NonVeg' },
    { label: '🌶️ Spicy Delight', value: 'Spicy' },
    { label: '🥗 Healthy Choice', value: 'Healthy' }
  ];

  // एआई प्रेडिक्टिव फ़िल्टरिंग लॉजिक
  const filteredMenu = menu.filter((dish) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Veg') return dish.name.toLowerCase().includes('paneer') || dish.name.toLowerCase().includes('dal') || dish.name.toLowerCase().includes('naan');
    if (activeFilter === 'NonVeg') return !dish.name.toLowerCase().includes('paneer') && !dish.name.toLowerCase().includes('dal') && !dish.name.toLowerCase().includes('naan') && !dish.name.toLowerCase().includes('burger');
    if (activeFilter === 'Spicy') return dish.isSpicy || dish.name.toLowerCase().includes('masala') || dish.name.toLowerCase().includes('burger');
    if (activeFilter === 'Healthy') return dish.isHealthy || dish.name.toLowerCase().includes('dal') || dish.name.toLowerCase().includes('pasta');
    return true;
  });

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl shadow-xl max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
          AI Menu Filter
        </span>
        <h2 className="text-xl font-serif text-stone-100 mt-2">Smart Predictive Curation</h2>
        <p className="text-xs text-stone-400 mt-1">Select your dietary mood and let our culinary AI instant-filter the menu</p>
      </div>

      {/* Dynamic Filter Row */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-xs font-medium font-mono border transition-all ${activeFilter === f.value
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold scale-102 shadow-lg shadow-amber-500/20'
                : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-400'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Filtered Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMenu.map((dish) => (
          <div key={dish.id} className="p-4 bg-stone-950/60 border border-stone-800/80 rounded-2xl flex justify-between items-center transition-all hover:border-stone-700">
            <div>
              <h3 className="text-sm font-medium text-stone-200">{dish.name}</h3>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{dish.description}</p>
              <p className="text-sm font-bold text-amber-500 font-mono mt-1.5">₹{dish.price}</p>
            </div>
            <span className="text-[10px] text-stone-500 font-mono bg-stone-900 border border-stone-800/60 px-2 py-1 rounded-lg">
              {dish.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
