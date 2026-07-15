'use client';

import { useState, useEffect } from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { ErpMenuItem } from '@/types/erp';
import { ShoppingBag, Utensils, Bell, CheckCircle2 } from 'lucide-react';

interface CartItem {
  menuItem: ErpMenuItem;
  quantity: number;
}

export default function WaiterDashboard() {
  const { menu, tables, orders, createNewOrder, updateOrderStatus } = useAureliaErp();
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [kitchenNotes, setKitchenNotes] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const readyToPickupOrders = orders.filter((order) => order.status === 'ready');

  const addToCart = (dish: ErpMenuItem) => {
    if (dish.is_available === false) return;
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.menuItem.id === dish.id);
      if (existing) {
        return prevCart.map((c) => c.menuItem.id === dish.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prevCart, { menuItem: dish, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.menuItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prevCart.map((c) => c.menuItem.id === itemId ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prevCart.filter((c) => c.menuItem.id !== itemId);
    });
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = Math.round(subtotal * 0.02);
  const total = subtotal + gst + serviceCharge;

  const handlePlaceOrder = () => {
    if (!selectedTable || cart.length === 0) return;

    const orderItems = cart.map((c) => ({
      menuItemId: c.menuItem.id,
      name: c.menuItem.name,
      quantity: c.quantity,
      price: c.menuItem.price,
    }));

    createNewOrder(
      selectedTable,
      orderItems,
      { kitchen: kitchenNotes || 'None', customer: customerNotes || 'None' }
    );

    setSuccessMessage(`KOT successfully routed to Cloud for Table ${selectedTable}!`);
    setCart([]);
    setSelectedTable('');
    setKitchenNotes('');
    setCustomerNotes('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleServeOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'served');
  };
  return (
    <div className="bg-slate-50/50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 space-y-6 animate-fadeIn select-none">

      {/* Premium Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-serif flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-500" /> WAITER ORDER TERMINAL
          </h1>
          <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">Live KOT Transmissions & Cloud Shelf Monitoring</p>
        </div>
        {successMessage && (
          <div className="bg-emerald-50 text-emerald-600 text-xs font-mono font-bold px-4 py-2.5 rounded-xl border border-emerald-200/60 animate-pulse">
            ✨ {successMessage}
          </div>
        )}
      </div>

      {/* 🛎️ Live Kitchen Pickup Counter Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-md">
        <h2 className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 animate-bounce" /> Ready for Pickup Alerts
        </h2>

        {readyToPickupOrders.length === 0 ? (
          <p className="text-slate-400 font-mono text-xs py-2 italic">Awaiting kitchen pass signals. Food counter is currently clear.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readyToPickupOrders.map((readyOrder) => (
              <div key={readyOrder.id} className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl flex flex-col justify-between shadow-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      Table {readyOrder.table_id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{readyOrder.id}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleServeOrder(readyOrder.id)}
                  className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Serve to Table
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid Layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Area: Tables Matrix & Premium Menu Grid */}
        <div className="lg:col-span-2 space-y-6">

          {/* Table Selector Box */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider font-mono flex items-center gap-1.5">
              🪑 Floor Station Allocation
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {tables?.map((table) => (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => setSelectedTable(table.id)}
                  className={`p-3.5 rounded-xl border text-center transition-all font-mono text-xs ${selectedTable === table.id
                      ? 'bg-orange-500 text-white border-orange-400 font-bold shadow-lg shadow-orange-500/10 scale-102'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                >
                  Table {table.number}
                </button>
              ))}
            </div>
          </div>

          {/* Luxury Menu Catalog Cards */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider font-mono flex items-center gap-1.5">
              🍽️ Culinary Catalog Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menu?.map((dish) => (
                <div key={dish.id} className="p-4 rounded-2xl border bg-slate-50/40 border-slate-200/60 flex justify-between items-center transition-all hover:border-slate-300 hover:bg-white">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 border flex items-center justify-center p-0.5 rounded-[4px] ${dish.is_veg ? 'border-emerald-500' : 'border-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dish.is_veg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      </span>
                      <h3 className="font-bold text-xs text-slate-800 font-sans">{dish.name}</h3>
                    </div>
                    <p className="text-xs font-bold text-orange-500 font-mono">₹{dish.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(dish)}
                    className="bg-white hover:bg-orange-500 text-slate-700 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-slate-200 hover:border-orange-400 shadow-sm"
                  >
                    Add +
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Area: KOT Luxury Live Basket Sidebar */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl h-fit sticky top-6 shadow-sm space-y-5">
          <h2 className="text-xs font-extrabold uppercase text-slate-800 border-b border-slate-100 pb-3 font-mono flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-orange-500" /> KOT LIVE BASKET {selectedTable && `(Table ${selectedTable})`}
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400 font-mono text-xs border border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
              Basket empty. Select station units.
            </div>
          ) : (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between items-center bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl font-mono text-xs">
                  <div>
                    <h4 className="font-sans font-bold text-slate-800">{item.menuItem.name}</h4>
                    <p className="text-slate-400 mt-0.5">₹{item.menuItem.price} × {item.quantity}</p>
                  </div>
                  <div className="flex gap-2.5 bg-white px-2.5 py-1 border border-slate-200 rounded-xl font-bold text-slate-700 shadow-sm">
                    <button type="button" onClick={() => removeFromCart(item.menuItem.id)} className="text-slate-400 hover:text-slate-900">-</button>
                    <span className="w-4 text-center">{item.quantity}</span>
                    <button type="button" onClick={() => addToCart(item.menuItem)} className="text-slate-400 hover:text-slate-900">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERP Instruction Slips Notes */}
          {cart.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs font-mono">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">👨‍🍳 Kitchen Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, No onion..."
                  value={kitchenNotes}
                  onChange={(e) => setKitchenNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500 font-sans text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">👤 Customer Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Serve drinks first..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500 font-sans text-slate-700"
                />
              </div>
            </div>
          )}

          {/* Pricing Aggregations Summary */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex justify-between"><span>Subtotal:</span><span className="text-slate-700 font-bold">₹{subtotal}</span></div>
            <div className="flex justify-between"><span>Service Charge (2%):</span><span className="text-slate-700">₹{serviceCharge}</span></div>
            <div className="flex justify-between"><span>GST Taxes (5%):</span><span className="text-slate-700">₹{gst}</span></div>
            <div className="flex justify-between text-sm text-slate-900 border-t border-slate-100 pt-2.5 mt-2 font-bold font-sans">
              <span>Grand Total:</span><span className="text-orange-500 font-mono font-extrabold text-base">₹{total}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!selectedTable || cart.length === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/10 active:scale-98"
          >
            Send Order to Kitchen
          </button>
        </div>

      </div>
    </div>
  );
}
