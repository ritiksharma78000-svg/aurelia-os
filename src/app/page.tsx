'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AureliaMasterControlHub() {
  const router = useRouter();

  // 🌐 MASTER ROUTING VECTOR MATRIX
  const controlModules = [
    { title: "Super Owner Control", desc: "Change Prices, Edit Dishes, Manage Staff Access", icon: "fa-crown", path: "/dashboard/owner", color: "#F59E0B" },
    { title: "Waiter Menu Terminal", desc: "Take Table Orders, Live Digital Menu, Punch KOT", icon: "fa-mobile-screen-button", path: "/dashboard/waiter", color: "#3B82F6" },
    { title: "Chef Kitchen Queue", desc: "View Active KOT Tickets, Dispatch Prepared Food", icon: "fa-kitchen-set", path: "/dashboard/kitchen", color: "#10B981" },
    { title: "Cashier Billing Counter", desc: "Track Live Revenue, Total Vault, Settled Invoices", icon: "fa-file-invoice-dollar", path: "/dashboard/cashier", color: "#EC4899" },
    { title: "Secure Staff Login", desc: "Central Staff Authentication Gateway Layer", icon: "fa-user-shield", path: "/login", color: "#8B5CF6" },
    { title: "Global ERP Settings", desc: "Configure KOT Printer IP, System Logs, Database", icon: "fa-gears", path: "/dashboard/settings", color: "#6B7280" }
  ];

  return (
    <div style={{
      background: '#0B0F19',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif",
      padding: '4rem 2rem',
      boxSizing: 'border-box'
    }}>
      {/* 🎨 LUXURY CSS INTEGRATION */}
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        .control-card { transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.03); cursor: pointer; }
        .control-card:hover { transform: translateY(-5px); border-color: #F59E0B !important; box-shadow: 0 15px 30px rgba(245, 158, 11, 0.1); }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* BRAND CENTRIC COMMAND HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', margin: '0 0 0.5rem 0', letterSpacing: '0.3rem' }}>AURELIA INTERNATIONAL</h1>
          <p style={{ color: '#F59E0B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', margin: 0, fontWeight: 700 }}>
            <i className="fa-solid fa-circle-dot" style={{ marginRight: '0.5rem', animation: 'pulse 2s infinite', color: '#10B981' }}></i> Global Hotel Operations Main Command Center
          </p>
        </div>

        {/* 🎛️ MASTER GRID SYSTEMS CONTROLLER */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {controlModules.map((module, index) => (
            <div
              key={index}
              className="control-card"
              onClick={() => router.push(module.path)}
              style={{
                background: '#1F2937',
                borderRadius: '2rem',
                padding: '2.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'start'
              }}
            >
              {/* DYNAMIC MODULE ICON */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '1.2rem',
                borderRadius: '1.2rem',
                color: module.color,
                fontSize: '1.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={`fa-solid ${module.icon}`}></i>
              </div>

              {/* TEXT DISPATCH */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#FFF' }}>
                  {module.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF', lineHeight: '1.5' }}>
                  {module.desc}
                </p>
                <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', fontWeight: 700, color: module.color, textTransform: 'uppercase', letterSpacing: '0.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Launch Terminal <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CLOUD LEDGER FOOTER META */}
        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#4B5563', fontSize: '0.75rem', letterSpacing: '0.05rem' }}>
          AURELIA RESTAURANTOS • SECURED HARDWARE NETWORK ID: LOCK-7001 • LIVE CLOUD CORES ACTIVE
        </div>

      </div>
    </div>
  );
}
