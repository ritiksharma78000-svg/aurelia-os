'use client';

import React from 'react';

export default function AureliaAdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#111827',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* 🎨 PREMIUM FONT & ICON PACK INJECTION MATRIX */}
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        
        /* 👑 CUSTOM LUXURY AD-HOC SCROLLBAR & NAVIGATION RULES */
        a { text-decoration: none; transition: 0.3s; color: #9CA3AF; font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05rem; }
        a:hover { color: #F59E0B !important; }
        .nav-active { color: #F59E0B !important; border-bottom: 2px solid #F59E0B; padding-bottom: 0.25rem; }
      `}} />

      {/* 🏛️ 7-STAR LUXURY TOP CONTROL NAVIGATION BAR */}
      <header style={{
        background: '#1F2937',
        borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#FFFFFF', margin: 0, letterSpacing: '0.15rem' }}>AURELIA ERP</h2>
          <span style={{ color: '#F59E0B', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1rem', fontWeight: 600 }}>Operational Core Matrix Live</span>
        </div>

        {/* DISPATCH CONTROL BUTTONS */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/dashboard/owner" className="nav-active"><i className="fa-solid fa-chart-pie" style={{ marginRight: '0.5rem' }}></i> Overview</a>
          <a href="/dashboard/kitchen"><i className="fa-solid fa-kitchen-set" style={{ marginRight: '0.5rem' }}></i> Kitchen Queue</a>
          <a href="/dashboard/cashier"><i className="fa-solid fa-file-invoice-dollar" style={{ marginRight: '0.5rem' }}></i> Billing Desk</a>
          <a href="/login" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '0.5rem 1.2rem', borderRadius: '5rem', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.75rem', fontWeight: 600 }}>
            <i className="fa-solid fa-power-off" style={{ marginRight: '0.4rem' }}></i> Exit Platform
          </a>
        </div>
      </header>

      {/* 🔮 MAIN ADMIN CONTENT CONTAINER INSULATOR */}
      <main style={{ padding: '3rem' }}>
        {children}
      </main>
    </div>
  );
}
