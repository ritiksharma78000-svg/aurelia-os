'use client';

import { useState } from 'react';
import { useAurelia } from '@/context/AureliaContext';
import { Order } from '@/types';

export default function CashierDashboard() {
  const { orders, updateOrderStatus } = useAurelia();
  const [filterTable, setFilterTable] = useState<string>('');

  const billingOrders = orders.filter((order) => {
    const matchesTable = filterTable ? order.tableNumber === filterTable : true;
    return matchesTable && order.status !== 'completed';
  });

  const totalSales = orders
    .filter((order) => order.status === 'Paid' || order.status === 'completed')
    .reduce((acc, curr) => acc + curr.grandTotal, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-stone-800 pb-5">
          <div>
            <h1 className="text-3xl font-light tracking-wide text-amber-500 font-serif">AURELIA BILLING DESK</h1>
          </div>
          <div className="bg-stone-900 border border-stone-800 px-5 py-3 rounded-2xl flex gap-6 items-center">
            <div>
              <p className="text-[10px] text-stone-500 uppercase font-mono">Counter Collection</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">₹{totalSales}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 max-w-xs">
          <input
            type="text"
            value={filterTable}
            onChange={(e) => setFilterTable(e.target.value)}
            placeholder="Search Table Number..."
            className="w-full bg-stone-900 border border-stone-800 text-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
          />
        </div>

        {billingOrders.length === 0 ? (
          <div className="text-center py-20 bg-stone-900/40 border border-dashed border-stone-800 rounded-2xl">
            <h3 className="text-sm font-medium text-stone-500">No Active Bills to Display</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {billingOrders.map((order) => (
              <div key={order.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3 mb-4">
                  <h2 className="text-md font-bold text-stone-100">Table: {order.tableNumber}</h2>
                  <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-900">{order.status}</span>
                </div>
                <div className="space-y-2 mb-4 text-xs font-mono">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between"><span>{item.name} (x{item.quantity})</span><span>₹{item.price * item.quantity}</span></div>
                  ))}
                </div>
                <div className="border-t border-stone-800 pt-4 flex gap-2">
                  {order.status !== 'Paid' ? (
                    <button onClick={() => updateOrderStatus(order.id, 'Paid')} className="w-full bg-amber-500 text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase">Settle Bill</button>
                  ) : (
                    <button onClick={() => updateOrderStatus(order.id, 'completed')} className="w-full bg-emerald-600 text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase">Close Session</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
