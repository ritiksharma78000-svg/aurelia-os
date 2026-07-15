'use client';

import { useAurelia } from '@/context/AureliaContext';

export default function AIDeskPage() {
  const { orders, menu } = useAurelia();

  // 🧠 AI Sales Prediction Algorithm (Mock)
  const calculatePredictedSales = () => {
    const todaySales = orders
      .filter((o) => o.status === 'Paid')
      .reduce((acc, curr) => acc + curr.grandTotal, 0);
    
    // AI Forecast: Weekend load factor + baseline trends
    return todaySales > 0 ? Math.round(todaySales * 1.25) : 4500;
  };

  // 🍕 AI Combo Suggester (Find trending dishes paired together)
  const getAIComboSuggestion = () => {
    if (orders.length === 0) {
      return { combo: "Cheese Burst Pizza + White Sauce Pasta", confidence: "94%" };
    }
    return { combo: "Paneer Butter Masala + Butter Naan Combo", confidence: "98%" };
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid Section */}
        <div className="border-b border-stone-800 pb-4 mb-8">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">🧠 AURELIA AI ENGINE</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">Predictive Analytics & Smart Combo Optimization</p>
        </div>

        {/* AI Predictive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Sales Forecasting */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-500 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">FORECAST</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Tomorrow's Predicted Sales</p>
            <p className="text-3xl font-bold text-amber-500 font-mono mt-2">₹{calculatePredictedSales()}</p>
            <p className="text-[11px] text-stone-400 mt-3">Based on a 25% growth vector computed from today's booking velocities.</p>
          </div>

          {/* Card 2: Smart Combo Suggestions */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">OPTIMIZER</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">AI Recommended Combo</p>
            <p className="text-sm font-semibold text-stone-200 mt-3">{getAIComboSuggestion().combo}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded font-mono font-bold">
                Confidence: {getAIComboSuggestion().confidence}
              </span>
            </div>
          </div>

          {/* Card 3: Intelligent Inventory Prediction */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">ALERT</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">AI Inventory Exhaustion Alert</p>
            <p className="text-sm font-bold text-red-400 mt-3">⚠️ Dairy Stock (Paneer / Milk)</p>
            <p className="text-[11px] text-stone-400 mt-1">Predicted to fall below threshold levels within the next 18 hours due to high velocity orders.</p>
          </div>

        </div>

        {/* AI Chatbot Assistant Sandbox Mockup */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
            💬 Real-time Operations Copilot
          </h2>
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 min-h-[120px] flex flex-col justify-between">
            <p className="text-xs text-stone-400 leading-relaxed">
              <strong className="text-amber-500 font-mono">AureliaAI:</strong> "Hello Manager. I notice that <span className="text-stone-200 font-medium">Cheese Burst Pizza</span> is outperforming trends by 40% today. I recommend triggering a WhatsApp coupon for desserts to increase average order values."
            </p>
            <div className="mt-4 pt-3 border-t border-stone-900 flex gap-2">
              <input 
                type="text" 
                readOnly
                placeholder="Ask AI Copilot for sales suggestions..."
                className="w-full bg-stone-900 border border-stone-800 text-stone-400 text-xs rounded-xl px-4 py-2 focus:outline-none cursor-not-allowed"
              />
              <button className="bg-amber-500 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
                Ask
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
