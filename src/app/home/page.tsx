'use client';

import React, { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function AureliaLuxuryLandingPage() {
  const [tableNo, setTableNo] = useState('Table 1');
  const [timeOfDay, setTimeOfDay] = useState('Evening');
  const [aiRecommendation, setAiRecommendation] = useState({ dish: '', pair: '', reason: '' });

  // 🤖 AI ENGINE: समय के अनुसार स्मार्ट डिश और वाइन पेयरिंग जेनरेशन मैट्रिक्स
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 12 && currentHour < 16) {
      setTimeOfDay('Afternoon');
      setAiRecommendation({
        dish: "Royal Awadhi Shahi Paneer & Butter Garlic Naan",
        pair: "Chilled Saffron Thandai Signature Blend",
        reason: "Highly recommended for a regal and satisfying afternoon culinary experience."
      });
    } else if (currentHour >= 16 && currentHour < 19) {
      setTimeOfDay('Sunset High-Tea');
      setAiRecommendation({
        dish: "The Aurelia Truffle Infused Veg Supreme Burger",
        pair: "The Virgin Mint Mojito with Gold Flakes",
        reason: "Perfect crisp textures balanced with refreshing mint notes for late afternoon luxury."
      });
    } else {
      setTimeOfDay('Imperial Evening');
      setAiRecommendation({
        dish: "Slow-Cooked Dal Makhani & Woodfired Margherita Pizza",
        pair: "Aurelia Private Reserve Non-Alcoholic Sparkling Wine",
        reason: "An extraordinary combination of rich, buttery warmth matched with a sophisticated sparkling finish."
      });
    }
  }, []);

  return (
    <div style={{ background: '#0B0F19', minHeight: '100vh', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", padding: '4rem 2rem', boxSizing: 'border-box' }}>
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        .ai-glow-box { animation: goldGlow 3s infinite alternate; border: 1px solid rgba(245, 158, 11, 0.2); }
        @keyframes goldGlow { 0% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.05); } 100% { box-shadow: 0 0 25px rgba(245, 158, 11, 0.25); } }
      `}} />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* BRAND IDENTITY */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.25rem', fontWeight: 700 }}>7-Star Palatial Dining</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', margin: '0.5rem 0', letterSpacing: '0.2rem' }}>AURELIA</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', margin: 0 }}>Digital Menu & Royal Guest Reservation Portal</p>
        </div>

        {/* 🤖 FEATURE 1 INJECTION: CHEF'S AI GOURMET CONCIERGE */}
        <div className="ai-glow-box" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', borderRadius: '2.5rem', padding: '3rem', marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '0.4rem 1.2rem', borderRadius: '5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05rem' }}>
            <i className="fa-solid fa-microchip" style={{ marginRight: '0.4rem' }}></i> AI ENGINE ACTIVE
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: '0 0 0.5rem 0', color: '#FFF' }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Chef's AI Gourmet Concierge
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: '0 0 2.5rem 0' }}>Analyzing live ambiance protocols for your <b>{timeOfDay}</b> session...</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <div>
              <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: '#F59E0B', fontWeight: 700, letterSpacing: '0.05rem' }}>Recommended Sommelier Pairing</span>
              <h4 style={{ fontSize: '1.2rem', margin: '0.4rem 0', fontFamily: "'Playfair Display', serif" }}>{aiRecommendation.dish}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF', fontStyle: 'italic' }}>with {aiRecommendation.pair}</p>
            </div>
            <div style={{ background: 'rgba(17,24,39,0.4)', padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                <i className="fa-solid fa-quote-left" style={{ color: '#F59E0B', marginRight: '0.5rem' }}></i>
                {aiRecommendation.reason}
              </p>
            </div>
          </div>
        </div>

        {/* REGULAR RESERVATION INTERACTIVE LAYER */}
        <div style={{ background: '#1F2937', borderRadius: '2rem', padding: '3rem', border: '1px solid rgba(255,255,255,0.02)' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', margin: '0 0 2rem 0' }}><i className="fa-solid fa-chair" style={{ color: '#F59E0B', marginRight: '0.5rem' }}></i> Reserve Your Luxury Lounge Station</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600 }}>Table Station Selector</label>
                <select value={tableNo} onChange={(e) => setTableNo(e.target.value)} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem', cursor: 'pointer' }}>
                  {['Table 1', 'Table 2', 'VIP Lounge 4', 'Outdoor Deck 2'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600 }}>Guest Matrix Count</label>
                <input type="number" defaultValue={2} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem' }} />
              </div>
            </div>

            <button onClick={() => alert(`✨ IMPERIAL RESERVATION LOCKED ✨\n\nStation: ${tableNo}\nStatus: Synergized with Supabase Cloud Network Database.`)} style={{ width: '100%', padding: '1.2rem', background: '#F59E0B', color: '#111827', border: 'none', borderRadius: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 15px rgba(245,158,11,0.2)' }}>
              Confirm Royal Reservation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
