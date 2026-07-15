'use client';

import { useState } from 'react';
import { useAurelia, AureliaProvider } from '@/context/AureliaContext'; // 👈 AureliaProvider इम्पोर्ट किया
import { MenuItem } from '@/types';
import SpinWin from '@/components/wow/SpinWin';
import AiMenu from '@/components/luxury/AiMenu';
import BuildMeal from '@/components/luxury/BuildMeal';


interface QRMenuProps {
  params: { number: string };
}

// 1. मुख्य इंटरफेस जो डेटा लोड करेगा
function QRMenuContent({ tableNum }: { tableNum: string }) {
  const { menu, createNewOrder } = useAurelia();
  const [cart, setCart] = useState<{ menuItem: MenuItem; quantity: number }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const addToCart = (item: MenuItem) => {
    if (!item.isAvailable) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleCustomerSubmitOrder = () => {
    if (cart.length === 0) return;

    const orderItems = cart.map((c) => ({
      menuItemId: c.menuItem.id,
      name: c.menuItem.name,
      quantity: c.quantity,
      price: c.menuItem.price,
      menuItem: { name: c.menuItem.name, price: c.menuItem.price },
    }));

    createNewOrder(tableNum, orderItems);
    setOrderPlaced(true);
    setCart([]);
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-md bg-stone-900 border border-stone-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-5xl animate-bounce">🔥</div>
          <h1 className="text-2xl font-serif text-amber-500">Order Sent to Kitchen!</h1>
          <p className="text-sm text-stone-400">Your items are being prepared by the Chef for <strong className="text-stone-200">Table {tableNum}</strong>.</p>

          <div className="border-t border-stone-800 pt-6">
            {!showGame ? (
              <button
                onClick={() => setShowGame(true)}
                className="bg-stone-950 hover:bg-stone-800 text-amber-500 border border-stone-800 text-xs font-mono font-bold py-3 px-6 rounded-xl uppercase tracking-wider"
              >
                🎰 Play Spin & Win While Waiting
              </button>
            ) : (
              <SpinWin />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-4 border-b border-stone-900">
          <h1 className="text-3xl text-amber-500 font-serif tracking-widest">AURELIA</h1>
          <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1 font-mono">
            Digital QR Menu • Table {tableNum}
          </p>
        </div>

        <div className="space-y-4">
          {/* AI Menu Filter Section */}
          <div className="my-6 space-y-6">
            <AiMenu />
            <BuildMeal />
          </div>

          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono">Explore Culinary Catalog</h2>
          {menu?.map((dish) => (
            <div key={dish.id} className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
              <div className="space-y-1 pr-4">
                <span className="text-[9px] font-mono px-2 py-0.5 bg-stone-800 text-amber-500 border border-stone-800 rounded">
                  {dish.category}
                </span>
                <h3 className="text-sm font-medium text-stone-100 mt-1">{dish.name}</h3>
                <p className="text-xs text-stone-400 line-clamp-1">{dish.description}</p>
                <p className="text-sm font-bold text-amber-500 font-mono">₹{dish.price}</p>
              </div>
              <button
                onClick={() => addToCart(dish)}
                className="bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                Add +
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-stone-900/95 border-t border-stone-800 backdrop-blur-md p-4 z-50 shadow-2xl">
            <div className="max-w-md mx-auto flex justify-between items-center gap-4">
              <div>
                <p className="text-[10px] uppercase text-stone-500 font-mono">Total Cart Amount</p>
                <p className="text-lg font-bold text-emerald-400 font-mono">₹{total}</p>
              </div>
              <button
                onClick={handleCustomerSubmitOrder}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10"
              >
                Confirm & Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. 👈 डिफ़ॉल्ट एक्सपोर्ट जो पूरे पेज को AureliaProvider में सुरक्षित रैप रखेगा
export default function QRMenuPage({ params }: QRMenuProps) {
  return (
    <AureliaProvider>
      <QRMenuContent tableNum={params.number} />
    </AureliaProvider>
  );
}
