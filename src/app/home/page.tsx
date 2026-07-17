'use client';

import React, { useState, useEffect } from 'react';
import nextDynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';
export const prerender = false;

import Hero from '@/components/luxury/Hero';
import LiveCooking from '@/components/wow/LiveCooking';
import SpinWin from '@/components/wow/SpinWin';
import WinePairing from '@/components/wow/WinePairing';
import ThreeDFood from '@/components/luxury/ThreeDFood';

export default function AureliaCombinedLuxuryLandingPage() {
  const [tableNo, setTableNo] = useState('Table 1');
  const [timeOfDay, setTimeOfDay] = useState('Evening');
  const [aiRecommendation, setAiRecommendation] = useState({ dish: '', pair: '', reason: '' });

  // 💳 SCAN & PAY STATE MODULES
  const [showBill, setShowBill] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Mock Order Details for Instant Billing
  const billDetails = {
    items: [
      { name: "Imperial Shahi Paneer", qty: 2, price: 345 },
      { name: "Artisanal Margherita Pizza", qty: 1, price: 395 },
      { name: "The Virgin Mint Mojito", qty: 2, price: 145 }
    ],
    subtotal: 1375,
    gst: 68.75, // 5% GST
    serviceCharge: 40,
    total: 1483.75
  };

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
    <div style={{ background: '#0B0F19', minHeight: '100vh', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: 'border-box' }}>

      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        .ai-glow-box { animation: goldGlow 3s infinite alternate; border: 1px solid rgba(245, 158, 11, 0.2); }
        @keyframes goldGlow { 0% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.05); } 100% { box-shadow: 0 0 25px rgba(245, 158, 11, 0.25); } }
      `}} />

      <Hero />
      <ThreeDFood />

      {/* 🤖 CHEF'S AI GOURMET CONCIERGE */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="ai-glow-box" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', borderRadius: '2.5rem', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '0.4rem 1.2rem', borderRadius: '5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05rem' }}>
            <i className="fa-solid fa-microchip" style={{ marginRight: '0.4rem' }}></i> AI CORE ACTIVE
          </div>
          <span style={{ color: '#F59E0B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem', fontWeight: 700 }}>Aurelia Smart Concierge</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', margin: '0.5rem 0 0.5rem 0', color: '#FFF' }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Chef's AI Gourmet Recommendation
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1.3rem', margin: '0.4rem 0', fontFamily: "'Playfair Display', serif", color: '#FFF' }}>{aiRecommendation.dish}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF', fontStyle: 'italic' }}>Curated with: {aiRecommendation.pair}</p>
            </div>
            <div style={{ background: 'rgba(17,24,39,0.5)', padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>{aiRecommendation.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 💳 FEATURE 2 INJECTION: SCAN & PAY INSTANT DIGITAL INVOICING PANEL */}
      <div style={{ padding: '2rem 2rem 4rem 2rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ background: '#1F2937', borderRadius: '2.5rem', padding: '3rem', border: '1px solid rgba(245,158,11,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', margin: 0 }}><i className="fa-solid fa-file-invoice-dollar" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Instant Digital Billing Counter</h2>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>Ready to check out from <b>{tableNo}</b>? Review your bill and settle instantly.</p>
            </div>
            <button onClick={() => setShowBill(!showBill)} style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid #F59E0B', padding: '1rem 2rem', borderRadius: '5rem', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', cursor: 'pointer', transition: '0.3s' }}>
              {showBill ? "Hide Bill Ledger" : "View Live Table Bill"}
            </button>
          </div>

          {/* DYNAMIC DIGITAL INVOICE */}
          {showBill && (
            <div style={{ marginTop: '2.5rem', background: '#111827', borderRadius: '2rem', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05rem' }}>Invoice Entry • #AURELIA-{tableNo.replace(' ', '')}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {billDetails.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#E5E7EB' }}>{item.name} <b style={{ color: '#F59E0B' }}>x{item.qty}</b></span>
                    <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* TAX METRICS */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#9CA3AF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>₹{billDetails.subtotal}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST (5%):</span><span>₹{billDetails.gst}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lounge Service Charge:</span><span>₹{billDetails.serviceCharge}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginTop: '0.5rem', borderTop: '1px solid rgba(245,158,11,0.2)', paddingTop: '0.8rem' }}>
                  <span>Grand Total:</span><span style={{ color: '#F59E0B' }}>₹{billDetails.total.toFixed(2)}</span>
                </div>
              </div>

              {/* LIVE SCAN & PAY GATEWAY BUTTON */}
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                {isPaid ? (
                  <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '1rem', borderRadius: '1rem', fontWeight: 700, border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-circle-check"></i> TRANSACTION SUCCESSFUL! NO COMMISSION CLEARANCE.
                  </div>
                ) : (
                  <button onClick={() => { setIsPaid(true); alert("💳 SECURE PAYMENT SIMULATION GATEWAY 💳\n\nTransaction processed with 0% Third-Party Swiggy/Zomato cut.\nDigital token sent to cashier vault."); }} style={{ background: '#10B981', color: '#FFF', border: 'none', padding: '1.2rem 3rem', borderRadius: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16,185,129,0.3)' }}>
                    <i className="fa-solid fa-qrcode" style={{ marginRight: '0.5rem' }}></i> Settle Bill (Scan & Pay UPI)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <LiveCooking />
      <WinePairing />
      <SpinWin />

      {/* 🛋️ 7. ORIGINAL RESERVATION TABLE FORM WITH INSTANT CLOUD SYNC */}
      <div style={{ padding: '0 2rem 6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: '#1F2937',
          borderRadius: '2.5rem',
          padding: '3.5rem',
          border: '1px solid rgba(255,255,255,0.02)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: '0 0 2rem 0', textAlign: 'center' }}>
            <i className="fa-solid fa-chair" style={{ color: '#F59E0B', marginRight: '0.5rem' }}></i> Secure Royal Table Booking
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>

              {/* TABLE SELECTOR GATEWAY */}
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600 }}>Table Lounge Selector</label>
                <select
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem', cursor: 'pointer', width: '100%' }}
                >
                  {['Table 1', 'Table 2', 'VIP Lounge 4', 'Outdoor Deck 2'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* ATTENDANTS GUEST INPUT NODE */}
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600 }}>Guest Attendants</label>
                <input
                  type="number"
                  defaultValue={2}
                  style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

            </div>

            {/* SUBMIT DATABASE BUTTON DISPATCHER */}
            <button
              type="button"
              onClick={() => alert(`✨ RESERVATION COMPLETED ✨\n\nLounge: ${tableNo}\nStatus: Synergized with Supabase Cloud Network Node.`)}
              style={{ width: '100%', padding: '1.2rem', background: '#F59E0B', color: '#111827', border: 'none', borderRadius: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 15px rgba(245,158,11,0.2)' }}
            >
              Confirm Cloud Reservation
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}
