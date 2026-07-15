'use client';

import React from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { Package, AlertTriangle, Calendar, Truck, PlusCircle } from 'lucide-react';

export default function AdvancedInventoryDashboard() {
  const { inventory } = useAureliaErp();

  // Dynamic calculations for CRM Procurement
  const totalStockItems = inventory.length;
  const criticalAlertsCount = inventory.filter(item => item.stock <= item.minThreshold).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm min-h-[calc(100vh-3rem)] space-y-6 animate-fadeIn select-none">

      {/* Module Header block */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">📦 RAW INGREDIENT INVENTORY LEDGER</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Auto Deduction Logic, Shelf Life Expiry & Vendor Tracking</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Launching Purchase Order (PO) entry wizard for external vendor billing...')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm shadow-orange-500/10"
        >
          <PlusCircle className="w-4 h-4" /> Add Purchase Entry
        </button>
      </div>

      {/* Analytics Summary Micro-Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-center justify-between font-mono text-xs">
          <div>
            <p className="text-slate-400 uppercase tracking-wider text-[10px]">Tracked Stock SKU Count</p>
            <p className="text-xl font-bold text-slate-800 font-sans mt-0.5">{totalStockItems} Active Ingredients</p>
          </div>
          <Package className="w-5 h-5 text-slate-400" />
        </div>

        <div className={`border p-4 rounded-xl flex items-center justify-between font-mono text-xs transition-all ${criticalAlertsCount > 0 ? 'bg-red-50/50 border-red-200 animate-pulse' : 'bg-slate-50 border-slate-200/60'
          }`}>
          <div>
            <p className="text-slate-400 uppercase tracking-wider text-[10px]">Critical Low Stock Triggers</p>
            <p className={`text-xl font-bold font-sans mt-0.5 ${criticalAlertsCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>
              {criticalAlertsCount} Alarms Restock Active
            </p>
          </div>
          <AlertTriangle className={`w-5 h-5 ${criticalAlertsCount > 0 ? 'text-red-500' : 'text-slate-400'}`} />
        </div>
      </div>

      {/* Main Grid Inventory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {inventory.map((item) => {
          const isLowStock = item.stock <= item.minThreshold;

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:border-slate-300 ${isLowStock ? 'border-red-200 shadow-sm shadow-red-500/5' : 'border-slate-100'
                }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{item.id}</span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1.5 font-sans">{item.name}</h3>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${isLowStock
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                    {isLowStock ? '⚠️ Low Stock' : 'Stable'}
                  </span>
                </div>

                {/* Big Stock Metric */}
                <div className="py-1">
                  <p className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
                    {item.stock} <span className="text-xs text-slate-400 font-sans font-normal lowercase">{item.unit}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Threshold Safe Margin: {item.minThreshold} {item.unit}</p>
                </div>

                {/* Expiry and Vendor Meta logs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Expiry: <span className="text-slate-700 font-medium">{item.expiryDate}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-400" /> Vendor: <span className="text-slate-700 font-medium font-sans truncate">{item.vendorName}</span>
                  </p>
                </div>
              </div>

              {/* Action Node Link */}
              <div className="border-t border-slate-100 pt-3 mt-5 text-right">
                <button
                  type="button"
                  onClick={() => alert(`Supplier procurement automated dispatch generated for ${item.name}`)}
                  className="text-orange-500 hover:text-orange-600 font-mono text-[11px] font-bold uppercase transition-colors"
                >
                  ⚡ Order Refill Stock →
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
