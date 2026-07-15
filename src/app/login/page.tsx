'use client';

import React, { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AureliaLuxuryLoginGateway() {
  const [role, setRole] = useState('owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✨ TERMINAL DISPATCH SYNC ✨\n\nRole: ${role.toUpperCase()}\nStatus: Connecting to RestaurantOS Live Database Node...`);
  };

  return (
    <div style={{
      background: '#111827',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      {/* 🎨 GLOBAL FONT & ICON INJECTION MATRIX */}
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        input, select { outline: none; transition: 0.3s; }
        input:focus, select:focus { border-color: #F59E0B !important; box-shadow: 0 0 10px rgba(245, 158, 11, 0.2); }
      `}} />

      <div style={{
        background: '#1F2937',
        width: '100%',
        maxWidth: '450px',
        borderRadius: '2rem',
        padding: '3rem 2.5rem',
        border: '1px solid rgba(245, 158, 11, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* BRAND IDENTITY */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#FFFFFF', margin: '0 0 0.5rem 0', letterSpacing: '0.2rem' }}>AURELIA</h1>
          <p style={{ color: '#F59E0B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15rem', margin: 0, fontWeight: 600 }}>Enterprise Restaurant OS</p>
        </div>

        {/* SECURE TERMINAL LOGIN FORM */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* SYSTEM ROLE SELECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem' }}>
              <i className="fa-solid fa-user-shield" style={{ marginRight: '0.5rem' }}></i> System Access Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.9rem', color: '#FFFFFF', borderRadius: '0.75rem', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              <option value="owner" style={{ background: '#1F2937' }}>Owner Account Hub</option>
              <option value="chef" style={{ background: '#1F2937' }}>Executive Chef Terminal</option>
              <option value="cashier" style={{ background: '#1F2937' }}>Cashier Billing Counter</option>
              <option value="kitchen" style={{ background: '#1F2937' }}>Kitchen Order Display</option>
            </select>
          </div>

          {/* EMAIL IDENTITY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem' }}>
              <i className="fa-solid fa-envelope" style={{ marginRight: '0.5rem' }}></i> Email Identity Node
            </label>
            <input
              type="email"
              required
              placeholder="e.g. owner@aureliahotels.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.9rem', color: '#FFFFFF', borderRadius: '0.75rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* PASSWORD ACCESS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem' }}>
              <i className="fa-solid fa-lock" style={{ marginRight: '0.5rem' }}></i> Security Access Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.9rem', color: '#FFFFFF', borderRadius: '0.75rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* SIGN IN ACTION BUTTON */}
          <button
            type="submit"
            style={{
              background: '#F59E0B',
              color: '#111827',
              border: 'none',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08rem',
              cursor: 'pointer',
              marginTop: '1rem',
              boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.3)'
            }}
          >
            <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '0.5rem' }}></i> Sign In Server Terminal
          </button>
        </form>

        {/* FOOTER MATRIX META */}
        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.02rem' }}>
            * Secure local terminal layer loop. All login tokens encoded.
          </p>
        </div>
      </div>
    </div>
  );
}
