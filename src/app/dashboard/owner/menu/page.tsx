'use client';

import React, { useState, useEffect } from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { supabase } from '@/utils/supabase';
import { PlusCircle, Search, Sliders, Save, Trash2, Check, XCircle } from 'lucide-react';

export default function MenuManagementConsole() {
  const { menu } = useAureliaErp();
  const [localMenu, setLocalMenu] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // New Item Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Indian Main');
  const [isVeg, setIsVeg] = useState(true);
  const [prepTime, setPrepTime] = useState('15');
  const [description, setDescription] = useState('');
  const [formMsg, setFormMsg] = useState('');

  useEffect(() => {
    if (menu) setLocalMenu(menu);
  }, [menu]);

  // 🚀 सुपाबेस क्लाउड डेटाबेस के कंस्ट्रेंट के साथ 100% सिंक किया गया नया इन्सर्ट लॉजिक
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg('');

    if (!name || !price) {
      setFormMsg('Please fill item name and base pricing rates.');
      return;
    }

    // 👈 यहाँ ऑब्जेक्ट की चाबियों को सीधे SQL कॉलम के नामों (अंडरस्कोर फॉर्मेट) से सिंक कर दिया गया है
    const newItem = {
      id: `m-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // यूनीक आईडी कंस्ट्रेंट के लिए टाइमस्टैम्प जोड़ा
      name: name,
      price: Number(price),
      category: category,
      is_veg: Boolean(isVeg), // 👈 isVeg को बदलकर is_veg किया
      is_available: true,     // 👈 isAvailable को बदलकर is_available किया
      prep_time: Number(prepTime), // 👈 prepTime को बदलकर prep_time किया
      description: description || 'Artisanal culinary preparation.'
    };

    const { error } = await supabase.from('erp_menu').insert([newItem]);

    if (!error) {
      setFormMsg('🎉 Item successfully injected into Supabase Cloud Menu!');
      setName('');
      setPrice('');
      setDescription('');
    } else {
      console.error('Supabase Core Error Object Logs:', error);
      setFormMsg(`Cloud Write Error: ${error.message}`);
    }
  };

  // 💰 2. कीमत को सीधे ग्रिड से कम/ज्यादा करके क्लाउड पर अपडेट करने की लॉजिक
  const handleUpdatePrice = async (itemId: string, newPrice: number) => {
    if (newPrice < 0) return;
    const { error } = await supabase.from('erp_menu').update({ price: newPrice }).eq('id', itemId);
    if (!error) {
      setLocalMenu(prev => prev.map(item => item.id === itemId ? { ...item, price: newPrice } : item));
    }
  };

  // 🥬 3. व्यंजन की उपलब्धता (Toggle Stock Availability) लाइव स्विच करना
  const handleToggleAvailability = async (itemId: string, currentStatus: boolean) => {
    const { error } = await supabase.from('erp_menu').update({ is_available: !currentStatus }).eq('id', itemId);
    if (!error) {
      setLocalMenu(prev => prev.map(item => item.id === itemId ? { ...item, is_available: !currentStatus } : item));
    }
  };

  const filteredItems = localMenu.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="space-y-6 select-none animate-fadeIn">

      {/* Module Title Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">🍽️ PREMIUM CATALOG MENU ENGINE</h1>
        <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Cloud Additions, Real-Time Rate Adjusters & Availability Toggles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side Column: Add New Gourmet Item Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-fit">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-4 font-mono flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-orange-500" /> Inject New Gourmet Item
          </h2>

          <form onSubmit={handleAddItem} className="space-y-4 text-xs font-mono text-slate-600">
            <div>
              <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Dish Item Name</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cheese Burst Calzone"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-sans text-slate-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Base Price (₹)</label>
                <input
                  type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                  placeholder="299"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-orange-600 font-bold focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Prep Time (Mins)</label>
                <input
                  type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Menu Category</label>
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none text-slate-700"
                >
                  <option value="Indian Main">Indian Main</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Indian Bread">Indian Bread</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Dietary Nature</label>
                <select
                  value={isVeg ? 'true' : 'false'} onChange={(e) => setIsVeg(e.target.value === 'true')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none text-slate-700"
                >
                  <option value="true">🥬 Pure Veg</option>
                  <option value="false">🥩 Non-Veg</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-bold uppercase text-[10px] text-slate-400">Menu Recipe Description</label>
              <textarea
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of dish ingredients..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-sans text-slate-700 focus:outline-none focus:border-orange-500"
              />
            </div>

            {formMsg && (
              <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center font-bold text-[10px] tracking-wide text-slate-800">
                {formMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl uppercase tracking-wider shadow-md shadow-orange-500/10 transition-colors"
            >
              Push Item to Cloud
            </button>
          </form>
        </div>

        {/* Right Side Column: Live Menu Cards with Rate Adjusters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text" placeholder="Live filter menu cards items..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Cards Loop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all hover:border-slate-300 ${!item.is_available ? 'border-slate-200 bg-slate-50/50 opacity-70' : 'border-slate-100'
                  }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <h4 className="font-bold text-slate-800 text-sm font-sans">{item.name}</h4>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase">{item.category} • {item.id}</p>
                    </div>

                    {/* Toggle Button availability */}
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(item.id, item.is_available)}
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase transition-colors ${item.is_available
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-red-50 text-red-600 border-red-200'
                        }`}
                    >
                      {item.is_available ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>

                  {/* 💰 🔢 Price Adjuster Interface Section */}
                  <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Live Rate Controller:</span>
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleUpdatePrice(item.id, item.price - 10)}
                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 rounded text-sm transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number" value={item.price}
                        onChange={(e) => handleUpdatePrice(item.id, parseInt(e.target.value) || 0)}
                        className="w-14 text-center font-bold text-orange-500 bg-transparent border-none text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdatePrice(item.id, item.price + 10)}
                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 rounded text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans italic mt-3 line-clamp-1 border-t border-slate-50 pt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
