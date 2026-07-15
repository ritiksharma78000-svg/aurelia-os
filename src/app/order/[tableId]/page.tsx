'use client';

import { useState, use } from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { Search, ShoppingBag, Utensils, ShieldCheck } from 'lucide-react';

interface CustomerQRMenuProps {
  params: any; // 👈 प्रॉमिस को हटाकर 'any' किया ताकि सर्वर-साइड क्रैश तुरंत रुक जाए
}

function CustomerQRMenuContent({ tableId }: { tableId: string }) {
  const { menu, createNewOrder, orders, submitFeedback } = useAureliaErp();
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [activeCategory, setActiveFilter] = useState<string>('All');
  const [vegOnly, setVegFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [comment, setComment] = useState<string>('');
  const [feedbackDone, setFeedbackDone] = useState<boolean>(false);

  // लाइव सुपाबेस सिंक डेटा मैपिंग
  const currentLiveOrder = orders.find(o => o.table_id === tableId && !o.is_paid);
  const paidInvoice = orders.find(o => o.table_id === tableId && o.is_paid && o.status === 'completed');

  const addToCart = (dish: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) return prev.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
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

  // बिलिंग कम्पलीट होने के बाद: फीडबैक स्क्रीन
  if (paidInvoice && !feedbackDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100 text-center space-y-5">
          <div className="w-16 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto text-xl">💳</div>
          <h2 className="text-xl font-bold font-serif text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-500">Your transaction has been processed securely. Please rate your experience.</p>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <textarea
              placeholder="Tell us about the taste, service, or cleanliness..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-orange-500"
              rows={3}
            />
            <button
              type="button"
              onClick={() => { submitFeedback(paidInvoice.id, 5, comment); setFeedbackDone(true); }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider transition-all"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  // लाइव शेफ प्रोडक्शन ट्रैकिंग स्क्रीन
  if (currentLiveOrder) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-sm w-full border border-slate-100 text-center space-y-6">
          <div className="text-4xl animate-pulse">🔥</div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Order Sent to Chef!</h2>
            <p className="text-xs text-slate-400 mt-1">Table {tableId} • Token: <span className="font-mono font-bold">{currentLiveOrder.id}</span></p>
          </div>
          <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-2xl text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Preparation Status</span>
              <span className="bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded border border-orange-200 uppercase text-[10px]">
                {currentLiveOrder.status}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">Please relax. Our waiters will serve your hot fresh meal at your station soon!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 max-w-md mx-auto relative border-x border-slate-200 shadow-2xl">

      {/* Dynamic Brand Welcome Header */}
      <div className="bg-white p-5 border-b border-slate-100 sticky top-0 z-40 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-widest text-slate-900 font-serif">AURELIA</h1>
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mt-0.5">Digital Self Order • Station Table {tableId}</p>
          </div>
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-100 text-orange-600 px-3 py-1 rounded-xl text-[10px] font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> CLOUD SECURE
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search gourmets, burgers, tonics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Cuisines filter switch row */}
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-slate-500 font-medium font-sans flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-orange-500" /> Cuisines Filter
          </span>
          <button
            type="button"
            onClick={() => setVegFilter(!vegOnly)}
            className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border transition-all ${vegOnly ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
          >
            🥬 Pure Veg Only
          </button>
        </div>
      </div>

      {/* Category Horizontal Swipe Bar */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-slate-100/60 scrollbar-none">
        {['All', 'Indian Main', 'Fast Food', 'Beverage'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap border transition-all ${activeCategory === cat
              ? 'bg-orange-500 text-white border-orange-400 font-bold shadow-md'
              : 'bg-white border-slate-200 text-slate-500'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Catalog Mapping Grid */}
      <div className="p-4 space-y-3">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400 font-mono">No dishes match your active filter matrix.</div>
        ) : (
          filteredMenu.map((dish) => (
            <div key={dish.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex justify-between items-center shadow-sm relative overflow-hidden group">
              <div className="space-y-1.5 pr-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 border flex items-center justify-center p-0.5 rounded-[3px] ${dish.is_veg ? 'border-emerald-500' : 'border-red-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dish.is_veg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-800 font-sans">{dish.name}</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">{dish.description}</p>
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-sm font-bold text-orange-500 font-mono">₹{dish.price}</p>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">⏱️ {dish.prep_time} mins</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(dish)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1"
              >
                Add +
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sticky Bottom Floating Checkout Cart Widget */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200/80 p-4 backdrop-blur-md z-50 shadow-2xl max-w-md mx-auto">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center border border-orange-100">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Tray basket</p>
                <p className="text-base font-bold text-slate-900 font-sans">₹{cartTotal} <span className="text-[10px] text-slate-400 font-normal font-mono">({cart.reduce((a, c) => a + c.quantity, 0)} items)</span></p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-500/10"
            >
              Confirm & Place Order
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// 👈 Next.js 15+ के लिए बिल्कुल सटीक टाइप डेफ़िनेशन स्ट्रक्चर
export default function DynamicQRWrapper({ params }: { params: Promise<{ tableId: string }> }) {
  const resolvedParams = use(params);
  return (
    <div className="bg-slate-50 min-h-screen">
      <CustomerQRMenuContent tableId={resolvedParams.tableId} />
    </div>
  );
}
