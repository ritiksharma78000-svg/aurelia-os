'use client';

import React from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Users,
  Layers,
  AlertTriangle,
  Utensils
} from 'lucide-react';

export default function OwnerDashboard() {
  const { orders, tables, inventory } = useAureliaErp();

  // 📈 रियल-टाइम स्टेट के आधार पर बिजनेस एनालिटिक्स कैलकुलेशन
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'Paid' || o.isPaid);
  const todaySales = completedOrders.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(todaySales / totalOrdersCount) : 0;

  // लाइव किचन कतार स्ट्रीम
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const servedCount = orders.filter(o => o.status === 'served').length;

  // टेबल स्थिति मैट्रिक्स
  const occupiedTables = tables.filter(t => t.status === 'Occupied').length;
  const availableTables = tables.filter(t => t.status === 'Available').length;

  // इन्वेंट्री आंकड़े
  const lowStockAlerts = inventory.filter(i => i.stock <= i.minThreshold).length;

  const sampleBestSellers = [
    { name: 'Paneer Butter Masala', orders: 42, growth: '+12%', amount: '₹11,760' },
    { name: 'Gourmet Chicken Burger', orders: 35, growth: '+8%', amount: '₹7,700' },
    { name: 'Butter Naan Basket', orders: 110, growth: '+18%', amount: '₹6,600' }
  ];

  return (
    <div className="space-y-6 select-none animate-fadeIn">

      {/* वेलकम और लाइव सर्वर हेडर */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">AURELIA RESTAURANT ERP</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Strategic Overview & Financial Control Node</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Server System Operational Live
        </div>
      </div>

      {/* 📊 वित्तीय और ट्रैफ़िक कार्ड्स */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Gross Sales Today</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">₹{todaySales.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" /> +14.2% vs yesterday
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center border border-orange-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Total Booked KOTs</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">{totalOrdersCount} Orders</p>
            <p className="text-[10px] text-slate-500 font-mono">Dynamic guest sessions logged</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center border border-blue-100">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Avg Order Value (AOV)</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">₹{avgOrderValue}</p>
            <p className="text-[10px] text-slate-500 font-mono">Average customer spending ticket</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Table Station Matrix</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">{occupiedTables}/{tables.length} Active</p>
            <p className="text-[10px] text-emerald-600 font-medium font-mono">{availableTables} Tables vacant</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center border border-emerald-100">
            <Users className="w-5 h-5" />
          </div>
        </div>

      </div>
      {/* 👨‍🍳 लाइव किचन कतार और संचालन ट्रैकिंग ब्लॉक */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mb-1" />
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Pending</p>
          <p className="text-xl font-bold text-slate-800 font-mono mt-0.5">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mb-1" />
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Preparing</p>
          <p className="text-xl font-bold text-slate-800 font-mono mt-0.5">{preparingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mb-1 animate-pulse" />
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Ready</p>
          <p className="text-xl font-bold text-slate-800 font-mono mt-0.5">{readyCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block mb-1" />
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Served</p>
          <p className="text-xl font-bold text-slate-800 font-mono mt-0.5">{servedCount}</p>
        </div>
        <div className={`p-4 rounded-xl border text-center shadow-sm ${lowStockAlerts > 0 ? 'bg-red-50/50 border-red-200' : 'bg-white border-slate-100'}`}>
          <AlertTriangle className={`w-4 h-4 mx-auto mb-1 ${lowStockAlerts > 0 ? 'text-red-500 animate-bounce' : 'text-slate-400'}`} />
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Stock Alerts</p>
          <p className={`text-xl font-bold font-mono mt-0.5 ${lowStockAlerts > 0 ? 'text-red-600' : 'text-slate-800'}`}>{lowStockAlerts} items low</p>
        </div>
      </div>

      {/* 📈 बेस्ट सेलिंग और लाइव गतिविधि लॉग */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-4 font-mono flex items-center gap-2">
            <Utensils className="w-4 h-4 text-orange-500" /> Best Selling Items
          </h3>
          <div className="space-y-3">
            {sampleBestSellers.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs font-mono">
                <div>
                  <p className="font-sans font-semibold text-slate-800 text-sm">{item.name}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">Volume sold: <strong className="text-slate-600">{item.orders} checkouts</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 font-bold">{item.amount}</p>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{item.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-4 font-mono flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" /> Recent Operations Ledger Logs
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-14 text-slate-400 font-mono text-xs border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
              No real-time business activities logged in the active database.
            </div>
          ) : (
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {orders.map((o) => (
                <div key={o.id} className="flex justify-between items-center bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl font-mono text-xs hover:border-slate-300 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-slate-800 text-sm">Table {o.tableId} Transaction</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border bg-slate-200 text-slate-600 border-slate-300">
                        {o.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Token ID: {o.id} • Active Timestamp: {o.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900 font-bold text-sm">₹{o.grandTotal}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wide">Method: {o.paymentMethod || 'Unpaid'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
