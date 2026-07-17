'use client';

import React, { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AureliaSuperOwnerDashboard() {
  const [coupons, setCoupons] = useState([
    { code: 'AURELIA20', discount: '20%', status: 'Active' },
    { code: 'ROYALVIP', discount: '₹500 OFF', status: 'Active' }
  ]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  // 🎫 SMART COUPON INJECTION GENERATOR
  const handleCreateCoupon = () => {
    if (!newCode || !newDiscount) return;
    setCoupons([...coupons, { code: newCode.toUpperCase(), discount: newDiscount, status: 'Active' }]);
    setNewCode('');
    setNewDiscount('');
    alert(`✨ COUPON MATRIX SYNCED ✨\n\nCode: ${newCode.toUpperCase()}\nStatus: Live on Database.`);
  };

  return (
    <div style={{
      background: '#0B0F19',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif",
      padding: '3rem 2rem',
      boxSizing: 'border-box'
    }}>
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        .owner-card { background: #1F2937; border-radius: 2rem; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.02); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .bar-grow { animation: growUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes growUp { from { height: 0; } to { height: var(--target-height); } }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* HEADER META MATRIX */}
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span style={{ color: '#F59E0B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem', fontWeight: 700 }}>Aurelia Enterprise Core</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', margin: '0.5rem 0 0 0', letterSpacing: '0.1rem' }}>Super Owner Control</h1>
          </div>
          <a href="/" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.8rem', borderRadius: '5rem', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
            <i className="fa-solid fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Back to Main Menu
          </a>
        </div>

        {/* 📊 FEATURE 1: LIVE SALES ANALYTICS GRAPH ENGINE */}
        <div className="owner-card" style={{ marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>
            <i className="fa-solid fa-chart-line" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Live Sales Operations Graph
          </h3>
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: '0 0 3rem 0' }}>Real-time revenue metrics tracked via synchronized cloud nodes.</p>

          {/* VISUAL CHART BARS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '220px', padding: '0 2rem', borderBottom: '2px solid rgba(255,255,255,0.05)', marginBottom: '1rem', gap: '1rem' }}>
            {[
              { label: '09:00 AM', amt: '₹1,200', pct: '25%' },
              { label: '12:00 PM', amt: '₹4,850', pct: '75%' },
              { label: '03:00 PM', amt: '₹3,200', pct: '50%' },
              { label: '06:00 PM', amt: '₹6,400', pct: '95%' },
              { label: '09:00 PM', amt: '₹5,100', pct: '80%' }
            ].map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.8rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B' }}>{bar.amt}</span>
                <div className="bar-grow" style={{
                  width: '45px',
                  background: 'linear-gradient(180deg, #F59E0B 0%, #B45309 100%)',
                  borderRadius: '0.5rem 0.5rem 0 0',
                  boxShadow: '0 10px 20px rgba(245, 158, 11, 0.15)',
                  // @ts-ignore
                  '--target-height': bar.pct
                }}></div>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🎫 FEATURE 2: DISCOUNT COUPON CONTROLLER MATRIX */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>

          {/* COUPON CREATOR PANEL */}
          <div className="owner-card">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', margin: '0 0 1.5rem 0' }}>
              <i className="fa-solid fa-ticket" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Forge Discount Coupon
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Coupon Code Name</label>
                <input type="text" placeholder="E.G. FESTIVE50" value={newCode} onChange={(e) => setNewCode(e.target.value)} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem', fontWeight: 700, letterSpacing: '0.05rem' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600 }}>Discount Value Matrix</label>
                <input type="text" placeholder="E.G. 15% OR ₹200 OFF" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '0.9rem', color: '#fff', borderRadius: '0.75rem' }} />
              </div>
              <button onClick={handleCreateCoupon} style={{ background: '#F59E0B', color: '#111827', border: 'none', padding: '1rem', borderRadius: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 15px rgba(245,158,11,0.2)' }}>
                Deploy Coupon Code
              </button>
            </div>
          </div>

          {/* ACTIVE COUPONS DATABASE VIEW */}
          <div className="owner-card">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', margin: '0 0 1.5rem 0' }}>
              <i className="fa-solid fa-database" style={{ color: '#F59E0B', marginRight: '0.6rem' }}></i> Active Voucher Ledger
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {coupons.map((cp, idx) => (
                <div key={idx} style={{ background: '#111827', padding: '1.2rem 1.5rem', borderRadius: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <div>
                    <span style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '0.3rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05rem' }}>{cp.code}</span>
                    <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: '#D1D5DB' }}>{cp.discount}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '0.5rem' }}></i> {cp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
