'use client';

import React from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import {
  Building2,
  CloudLightning,
  CloudCheck,
  MapPin,
  User,
  TrendingUp,
  Layers,
  RefreshCw
} from 'lucide-react';

export default function MultiBranchCommandCenter() {
  const { branches, cloudSyncStatus, triggerManualCloudSync } = useAureliaErp();

  // 📈 Calculate Franchise Cross-Platform Statistics
  const totalBranchesCount = branches.length;
  const onlineBranchesCount = branches.filter(b => b.status === 'Online').length;
  const globalFranchiseRevenue = branches.reduce((acc, curr) => acc + curr.todayRevenue, 0);

  return (
    <div className="space-y-6 select-none animate-fadeIn">

      {/* Dynamic Cloud Synchronization Header Node */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">🏢 FRANCHISE ENTERPRISE CORE HUB</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Multi-Branch Outlets Tracker & Cross-Region Sync Engine</p>
        </div>

        {/* Sync Trigger Action Engine */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${cloudSyncStatus === 'Synced' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
              cloudSyncStatus === 'Syncing' ? 'bg-blue-50 text-blue-600 border-blue-200 animate-pulse' :
                'bg-amber-50 text-amber-600 border-amber-200 animate-bounce'
            }`}>
            {cloudSyncStatus === 'Synced' && <CloudCheck className="w-4 h-4" />}
            {cloudSyncStatus === 'Syncing' && <RefreshCw className="w-4 h-4 animate-spin" />}
            {cloudSyncStatus === 'Offline_Buffer' && <CloudLightning className="w-4 h-4" />}
            {cloudSyncStatus.replace('_', ' ')}
          </div>

          <button
            type="button"
            onClick={triggerManualCloudSync}
            disabled={cloudSyncStatus === 'Syncing'}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm shadow-orange-500/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cloudSyncStatus === 'Syncing' ? 'animate-spin' : ''}`} />
            Push Cloud Sync
          </button>
        </div>
      </div>

      {/* 📊 Global HQ Cross-Outlet Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Total Franchise Revenue Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Global Franchise Revenue</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">₹{globalFranchiseRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-600 font-mono">Combined multi-region gross ledger logs</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center border border-orange-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Active Corporate Nodes Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Operational Nodes</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">{onlineBranchesCount}/{totalBranchesCount} Live</p>
            <p className="text-[10px] text-amber-600 font-mono">1 beach club cluster running offline buffer</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center border border-blue-100">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Global Traffic Load Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">Global Active Tables</p>
            <p className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
              {branches.reduce((a, c) => a + c.activeOrders, 0)} Tables Dined
            </p>
            <p className="text-[10px] text-slate-500 font-mono">Total ongoing active cross-terminal KOTs</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 🗺️ Regional Outlets Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {branches.map((branch) => {
          const isOnline = branch.status === 'Online';

          return (
            <div
              key={branch.id}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all hover:border-slate-300 ${!isOnline ? 'border-amber-200 bg-amber-50/10' : 'border-slate-100'
                }`}
            >
              <div className="space-y-4">

                {/* Branch Primary Identity Meta */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 uppercase">{branch.id}</span>
                    <h3 className="font-bold text-slate-800 text-base font-sans mt-1">{branch.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {branch.city}
                    </p>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${isOnline
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse'
                    }`}>
                    {branch.status}
                  </span>
                </div>

                {/* Regional Revenue and Traffic stats split grid */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200/50 p-4 rounded-xl font-mono text-xs text-slate-500">
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 tracking-wider">Today's Revenue</p>
                    <p className="text-lg font-bold text-slate-900 font-sans mt-0.5">
                      {isOnline ? `₹${branch.todayRevenue.toLocaleString('en-IN')}` : '₹0 (Buffered)'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 tracking-wider">Active Orders</p>
                    <p className="text-lg font-bold text-slate-900 font-sans mt-0.5">{branch.activeOrders} KOTs</p>
                  </div>
                </div>

                {/* On-site Operations Manager Label */}
                <p className="text-xs text-slate-400 flex items-center gap-1.5 font-sans pt-1">
                  <User className="w-4 h-4 text-slate-400" /> Station Manager: <span className="text-slate-700 font-medium font-sans">{branch.managerName}</span>
                </p>

              </div>

              {/* Action Interventions Footer Terminal block */}
              <div className="border-t border-slate-100 pt-4 mt-6 text-right">
                <button
                  type="button"
                  onClick={() => alert(`Launching remote shell matrix audit into ${branch.name} endpoint parameters logs...`)}
                  className="text-orange-500 hover:text-orange-600 font-mono text-[11px] font-bold uppercase transition-colors"
                >
                  Remote System Terminal →
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
