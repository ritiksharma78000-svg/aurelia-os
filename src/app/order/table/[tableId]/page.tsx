'use client';

import { useState } from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { Search, ShoppingBag, Utensils, ShieldCheck, Flame, CheckCircle, Sparkles } from 'lucide-react';

interface PageProps {
  params: { tableId: string };
}

function MainMenuContent({ tableId }: { tableId: string }) {
  const { menu, createNewOrder, orders, submitFeedback } = useAureliaErp();
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [activeCategory, setActiveFilter] = useState<string>('All');
  const [vegOnly, setVegFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [feedbackDone, setFeedbackDone] = useState<boolean>(false);

  // लाइव सुपाबेस क्लाउड डेटा सिंक चेकर
  const currentLiveOrder = orders.find(o => o.table_id === tableId && !o.is_paid);
  const paidInvoice = orders.find(o => o.table_id === tableId && o.is_paid && o.status === 'completed');

  const addToCart = (dish: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) return prev.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) => item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter((item) => item.id !== itemId);
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    createNewOrder(
      tableId,
      cart.map(c => ({ menuItemId: c.id, name: c.name, quantity: c.quantity, price: c.price })),
      { kitchen: 'QR Order via Table Customer', customer: 'None' }
    );
    setCart([]);
  };

  const filteredMenu = menu.filter((dish) => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesVeg = !vegOnly || dish.is_veg;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // 💳 लक्ज़री पेमेंट सक्सेस और फीडबैक स्क्रीन
  if (paidInvoice && !feedbackDone) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 antialiased">
        <div className="bg-slate-800 border border-slate-700/60 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 text-2xl">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-white tracking-wide">Payment Successful!</h2>
            <p className="text-xs text-slate-400">Your session invoice has been cleared securely via cash drawer settlement.</p>
          </div>
          <div className="border-t border-slate-700/60 pt-4 space-y-3">
            <textarea
              placeholder="How was the gourmet taste? Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600 font-sans"
              rows={3}
            />
            <button
              type="button"
              onClick={() => { submitFeedback(paidInvoice.id, 5, comment); setFeedbackDone(true); }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider font-mono shadow-md shadow-orange-500/10 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔥 लाइव शेफ प्रोडक्शन ट्रैकिंग स्क्रीन
  if (currentLiveOrder) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 antialiased">
        <div className="bg-slate-800 border border-slate-700/60 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mx-auto border border-orange-500/20 animate-pulse">
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white font-sans tracking-wide">Order Dispatched to Kitchen!</h2>
            <p className="text-xs text-slate-400">Table Station {tableId} • Token: <span className="font-mono text-orange-400 font-bold">{currentLiveOrder.id}</span></p>
          </div>
          <div className="bg-slate-900/60 border border-slate-700 p-4 rounded-xl text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Cloud Sync Status</span>
              <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
                {currentLiveOrder.status}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic font-sans">Our culinary chefs are preparing your gourmet recipe right now!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-32 max-w-md mx-auto relative border-x border-slate-800 shadow-2xl select-none antialiased">

      {/* Luxury Sticky Brand Header */}
      <div className="bg-slate-850 border-b border-slate-800 p-5 sticky top-0 z-40 space-y-4 backdrop-blur-md bg-slate-900/90">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold tracking-widest text-white font-serif">AURELIA</h1>
            <p className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mt-0.5">Digital Order Console • Table {tableId}</p>
          </div>
          <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-xl text-[10px] font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> CLOUD SECURE
          </div>
        </div>

        {/* Premium Styled Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search gourmets, burgers, tonics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors font-sans placeholder:text-slate-600 shadow-inner"
          />
        </div>

        {/* Veg Toggle Row */}
        <div className="flex justify-between items-center pt-1 border-t border-slate-800/40">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-orange-500" /> Culinary Filters
          </span>
          <button
            type="button"
            onClick={() => setVegFilter(!vegOnly)}
            className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border transition-all ${vegOnly ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700/60'
              }`}
          >
            🥬 Pure Veg Only
          </button>
        </div>
      </div>

      {/* Category Tabs Swipe Slider */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-slate-950/40 scrollbar-none border-b border-slate-800/30">
        {['All', 'Indian Main', 'Fast Food', 'Beverage'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono whitespace-nowrap border transition-all ${activeCategory === cat
                ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/10'
                : 'bg-slate-800 border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Luxury Menu Cards Mapping Grid */}
      <div className="p-4 space-y-3">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500 font-mono italic bg-slate-850/20 rounded-2xl border border-dashed border-slate-800">
            No dishes match your active filter matrix.
          </div>
        ) : (
          filteredMenu.map((dish) => (
            <div key={dish.id} className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl flex justify-between items-center shadow-sm relative overflow-hidden transition-all hover:border-slate-700 hover:bg-slate-800/80">
              <div className="space-y-1.5 pr-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 border flex items-center justify-center p-0.5 rounded-[4px] ${dish.is_veg ? 'border-emerald-500' : 'border-red-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dish.is_veg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 font-sans tracking-wide">{dish.name}</h3>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-normal line-clamp-2">{dish.description}</p>
                <div className="flex items-center gap-4 pt-0.5">
                  <p className="text-sm font-extrabold text-orange-500 font-mono">₹{dish.price}</p>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">⏱️ {dish.prep_time} mins</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(dish)}
                className="bg-white hover:bg-orange-500 text-slate-900 hover:text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md border border-slate-200/10 flex items-center gap-1 active:scale-95"
              >
                Add +
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sticky Bottom Premium Floating Checkout Cart Basket */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 border-t border-slate-700 p-4 backdrop-blur-md z-50 shadow-2xl max-w-md mx-auto">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center border border-orange-500/20 shadow-inner">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-mono text-slate-500 tracking-wider font-bold">Selected Tray</p>
                <p className="text-base font-extrabold text-white font-sans tracking-tight">
                  ₹{cartTotal} <span className="text-[10px] text-orange-400 font-bold font-mono">({cart.reduce((a, c) => a + c.quantity, 0)} Units)</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-500/10 transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> Confirm Order
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function OrderPage({ params }: PageProps) {
  return <MainMenuContent tableId={params.tableId} />;
}
