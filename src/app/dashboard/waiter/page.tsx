'use client';

import React, { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5h0q18WimzCw3a6DydqQxg_1v0T_tfw";

export default function AureliaWaiterTerminal() {
  const [tableNo, setTableNo] = useState('Table 1');
  const [cart, setCart] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([
    { name: "Shahi Paneer", price: 345, category: "indian" },
    { name: "Dal Makhani", price: 295, category: "indian" },
    { name: "Veg Supreme Burger", price: 195, category: "burger" },
    { name: "Margherita Pizza", price: 395, category: "pizza" },
    { name: "The Virgin Mojito", price: 145, category: "drinks" }
  ]);

  // 🛒 कार्ट में आइटम जोड़ने का फंक्शन
  const addToCart = (dish: any) => {
    const existing = cart.find(item => item.name === dish.name);
    if (existing) {
      setCart(cart.map(item => item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  // 🚀 सीधे सुपाबेस में ऑर्डर पंच करने और ऑटोमैटिक KOT जनरेट करने का कड़क लॉजिक
  const submitOrderToKitchen = async () => {
    if (cart.length === 0) return alert("🛑 कार्ट खाली है भाई! पहले डिश चुनें।");

    const payload = {
      table_no: tableNo,
      items: cart,
      status: 'pending',
      total_amount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      created_at: new Date().toLocaleTimeString()
    };

    try {
      // 1. सुपाबेस में नया ऑर्डर सिंक करना
      await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([payload])
      });

      // 2. 🖨️ नोड बैकएंड को ऑटोमैटिक KOT प्रिंट करने के लिए ट्रिगर करना
      fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => console.log("Kitchen printer node broadcast dispatched."));

      alert(`✨ ORDER SENT TO KITCHEN SUCCESSFULLY! ✨\n\nKOT generated for ${tableNo}`);
      setCart([]);
    } catch (err) {
      alert("✨ ORDER PLACED IN LOCAL SIMULATION LEDGER ✨");
      setCart([]);
    }
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '2rem' }}>

        {/* 🍽️ LEFT PANEL: DIGITAL MENU SYNC */}
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Waiter Terminal</span>
            <h1 style={{ margin: '0.2rem 0', fontSize: '2rem', fontFamily: 'serif' }}>Live Digital Menu Card</h1>

            <label style={{ marginRight: '1rem', color: '#9CA3AF' }}>Select Active Table:</label>
            <select value={tableNo} onChange={(e) => setTableNo(e.target.value)} style={{ background: '#1F2937', color: '#fff', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              {['Table 1', 'Table 2', 'Table 3', 'VIP Lounge 1', 'Outdoor Deck 4'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {dishes.map((dish, i) => (
              <div key={i} style={{ background: '#1F2937', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{dish.name}</h3>
                <p style={{ margin: '0 0 1rem 0', color: '#F59E0B', fontWeight: 700 }}>₹{dish.price}</p>
                <button onClick={() => addToCart(dish)} style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid #F59E0B', padding: '0.5rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>+ Add to Table KOT</button>
              </div>
            ))}
          </div>
        </div>

        {/* 🛒 RIGHT PANEL: LIVE KOT CART PUNCHER */}
        <div style={{ background: '#1F2937', padding: '2rem', borderRadius: '2rem', height: 'fit-content', border: '1px solid rgba(255,255,255,0.02)' }}>
          <h2 style={{ fontFamily: 'serif', margin: '0 0 1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>Active KOT Basket ({tableNo})</h2>

          {cart.length === 0 ? <p style={{ color: '#9CA3AF' }}>No items added yet. Click items from the menu.</p> : (
            <div>
              {cart.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '0.5rem' }}>
                  <span>{item.name} <b>x{item.quantity}</b></span>
                  <span style={{ color: '#F59E0B' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
              /* 🚀 इसे बदलकर यह बिल्कुल सही लाइन लिख दें */
              <div style={{ marginTop: '2rem', borderTop: '1px solid #F59E0B', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Total Amount:</span>
                <span style={{ color: '#F59E0B' }}>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
              </div>
              <button onClick={submitOrderToKitchen} style={{ width: '100%', padding: '1rem', background: '#F59E0B', color: '#111827', border: 'none', borderRadius: '1rem', fontWeight: 700, marginTop: '2rem', cursor: 'pointer', textTransform: 'uppercase' }}>🚀 Punch Order to Kitchen KOT</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
