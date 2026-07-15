'use client';

import { useState } from 'react';

export default function RestaurantSettings() {
  // रेस्टोरेंट इन्फो और टैक्स कॉन्फ़िगरेशन स्टेट्स
  const [restaurantName, setRestaurantName] = useState('Aurelia Fine Dining');
  const [cgst, setCgst] = useState(2.5);
  const [sgst, setSgst] = useState(2.5);
  const [isPrinterConnected, setIsPrinterConnected] = useState(true);
  const [activeTheme, setActiveTheme] = useState('Luxury Dark');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Aurelia OS: Tax parameters and terminal configurations saved successfully!');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="border-b border-stone-800 pb-4 mb-8">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">⚙️ SYSTEM & TAX CONFIGURATION</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">MVP Fiscal Taxes, Thermal Printers & Core Metadata Engines</p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">

          {/* Section 1: Taxes & Fiscal Parameters */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
              🧾 GST & Government Fiscal Taxes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-stone-400 uppercase font-mono mb-2 tracking-wider">Central GST (CGST %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cgst}
                  onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm font-mono text-amber-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 uppercase font-mono mb-2 tracking-wider">State GST (SGST %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={sgst}
                  onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm font-mono text-amber-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-3 font-mono">
              * Total calculated tax on served KOT checkouts will default to: <strong className="text-stone-400">{(cgst + sgst)}% GST</strong>
            </p>
          </div>

          {/* Section 2: Restaurant Metadata */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
              🏢 Restaurant Information
            </h2>
            <div>
              <label className="block text-[10px] text-stone-400 uppercase font-mono mb-2 tracking-wider">Brand Name (Appears on Invoice PDF)</label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm font-sans text-stone-200 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Section 3: Hardware Peripheral & Theme Setup */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
              🔌 Peripherals & Interface Styles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Thermal Printer Selector */}
              <div>
                <label className="block text-[10px] text-stone-400 uppercase font-mono mb-2 tracking-wider">Thermal Bill Printer Link</label>
                <button
                  type="button"
                  onClick={() => setIsPrinterConnected(!isPrinterConnected)}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold border text-center transition-all ${isPrinterConnected
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30'
                      : 'bg-red-950/40 text-red-400 border-red-900/30'
                    }`}
                >
                  {isPrinterConnected ? '✔ KOT PRINTER CONNECTED' : '❌ PRINTER DISCONNECTED'}
                </button>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-[10px] text-stone-400 uppercase font-mono mb-2 tracking-wider">Active Workspace Theme</label>
                <select
                  value={activeTheme}
                  onChange={(e) => setActiveTheme(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs font-mono text-stone-300 focus:outline-none"
                >
                  <option value="Luxury Dark">Luxury Dark Modern (Onyx & Amber)</option>
                  <option value="Classic Light">Classic Light Paper (Minimal White)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 uppercase text-xs"
          >
            💾 Commit & Save Settings
          </button>

        </form>
      </div>
    </div>
  );
}
