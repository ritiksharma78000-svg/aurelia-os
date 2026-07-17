'use client';

import React, { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AureliaTableStationMatrix() {
  const [activeQrUrl, setActiveQrUrl] = useState<string | null>(null);
  const [activeStation, setActiveStation] = useState<string>('');

  // 🏛️ आपके 5 मुख्य स्टेशन्स का लाइव स्टेटिक डेटाबेस
  const stations = [
    { id: '1', name: 'Station 1', status: 'AVAILABLE', capacity: '4 Guests', info: 'Ready to map fresh QR walk-in checkouts.', qrId: 'QR-001' },
    { id: '2', name: 'Station 2', status: 'OCCUPIED', capacity: '2 Guests', info: 'Guests Dined: 2 • Assigned: Karan Joshi', qrId: 'QR-002' },
    { id: '3', name: 'Station 3', status: 'OCCUPIED', capacity: '6 Guests', info: 'Guests Dined: 2 • Assigned: Karan Joshi', qrId: 'QR-003' },
    { id: '4', name: 'Station 4', status: 'AVAILABLE', capacity: '4 Guests', info: 'Ready to map fresh QR walk-in checkouts.', qrId: 'QR-004' },
    { id: '5', name: 'Station 5', status: 'OCCUPIED', capacity: '4 Guests', info: 'Guests Dined: 2 • Assigned: Karan Joshi', qrId: 'QR-005' },
  ];

  // 🎯 QR जेनरेटर ट्रिगर इंजन (QuickChart API Sync - यह कभी ब्लैंक नहीं हो सकता)
  const handlePrintQr = (stationId: string, stationName: string) => {
    // आपके प्रोजेक्ट के असली [tableId] फोल्डर पाथ /order/ के साथ सिंक करना
    const targetUrl = `https://vercel.app{stationId}`;

    // 🚀 वैश्विक स्तर पर सबसे स्थिर QR इंजन जो ब्राउज़र सुरक्षा में कभी नहीं अटकता
    const secureQrUrl = `https://quickchart.io{encodeURIComponent(targetUrl)}&size=200&margin=1`;

    setActiveQrUrl(secureQrUrl);
    setActiveStation(stationName);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>

      {/* LEFT SIDE NAVIGATION BAR */}
      <div style={{ width: '260px', background: '#0B0F19', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem', boxSizing: 'border-box' }}>
        <div style={{ color: '#FFF', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", letterSpacing: '0.15rem', fontSize: '1.4rem' }}>AURELIA</h2>
          <span style={{ fontSize: '0.65rem', color: '#F59E0B', letterSpacing: '0.1rem' }}>OWNER ENTERPRISE SHELL</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#9CA3AF', fontSize: '0.85rem' }}>
          <div style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem' }}><i className="fa-solid fa-chart-pie" style={{ marginRight: '0.7rem' }}></i> DASHBOARD OVERVIEW</div>
          <div style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem' }}><i className="fa-solid fa-shop" style={{ marginRight: '0.7rem' }}></i> FRANCHISE OUTLETS</div>
          <div style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem' }}><i className="fa-solid fa-brain" style={{ marginRight: '0.7rem' }}></i> AI CORE FORECASTING</div>
          <div style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem', background: '#F59E0B', color: '#0B0F19', fontWeight: 700 }}><i className="fa-solid fa-table-cells" style={{ marginRight: '0.7rem' }}></i> TABLE CONTROL MATRIX</div>
          <div style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem' }}><i className="fa-solid fa-boxes-stacked" style={{ marginRight: '0.7rem' }}></i> RAW INVENTORY LEDGER</div>
        </div>
      </div>

      {/* MAIN OPERATIONS WORKSPACE */}
      <div style={{ flex: 1, padding: '3rem', boxSizing: 'border-box', position: 'relative' }}>

        {/* PANEL CONTROL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#0B0F19', margin: '0 0 0.3rem 0' }}>📂 TABLE STATION CONTROL MATRIX</h1>
            <p style={{ color: '#64748B', fontSize: '0.75rem', margin: 0, letterSpacing: '0.05rem', fontWeight: 600 }}>SAAS FLOOR GRID, CLEANING TIMERS & WAITER ALLOCATION</p>
          </div>
          <button style={{ background: '#F59E0B', color: '#FFF', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fa-solid fa-shuffle"></i> TRANSFER / MERGE TABLE
          </button>
        </div>

        {/* GRAPHIC GRID FOR STATIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {stations.map((st) => (
            <div key={st.id} style={{ background: '#FFF', borderRadius: '1rem', padding: '1.8rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0B0F19', fontWeight: 700 }}>{st.name}</h3>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '0.3rem', background: st.status === 'AVAILABLE' ? '#E6F4EA' : '#FCE8E6', color: st.status === 'AVAILABLE' ? '#137333' : '#C5221F' }}>
                  {st.status}
                </span>
              </div>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.75rem', color: '#64748B' }}>Capacity: {st.capacity}</p>

              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#475569', minHeight: '50px', marginBottom: '1.5rem', border: '1px solid #F1F5F9' }}>
                {st.info}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>{st.qrId}</span>
                <button
                  onClick={() => handlePrintQr(st.id, st.name)}
                  style={{ background: 'none', border: 'none', color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <i className="fa-solid fa-print"></i> PRINT QR CARD
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔮 DYNAMIC MODAL POPUP: LUXURY PRINT-READY QR COMPONENT */}
        {activeQrUrl && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 15, 25, 0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#0B0F19', border: '2px solid #F59E0B', borderRadius: '2.5rem', padding: '3rem', width: '360px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(245,158,11,0.25)', position: 'relative' }}>

              <button
                onClick={() => setActiveQrUrl(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#9CA3AF', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <h2 style={{ fontFamily: "'Playfair Display', serif", margin: '0 0 0.3rem 0', color: '#FFF', fontSize: '1.8rem', letterSpacing: '0.2rem' }}>AURELIA</h2>
              <span style={{ fontSize: '0.7rem', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.15rem', display: 'block', marginBottom: '2rem', fontWeight: 700 }}>{activeStation} Digital Menu</span>

              {/* 🏆 STABLE IMAGE RENDERING CORE */}
              <div style={{ background: '#FFF', padding: '1.5rem', borderRadius: '1.5rem', display: 'inline-block', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', marginBottom: '2rem' }}>
                <img
                  src={activeQrUrl}
                  alt="Aurelia Dynamic QR Matrix"
                  style={{ width: '200px', height: '200px', display: 'block', borderRadius: '0.5rem' }}
                />
              </div>

              <span style={{ color: '#9CA3AF', fontSize: '0.8rem', display: 'block', marginBottom: '2rem', letterSpacing: '0.05rem' }}>
                Scan code to launch 7-Star fine dine basket layer.
              </span>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => window.print()} style={{ flex: 1, padding: '0.8rem', background: '#F59E0B', color: '#0B0F19', border: 'none', borderRadius: '0.8rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05rem' }}>
                  <i className="fa-solid fa-print" style={{ marginRight: '0.4rem' }}></i> Print Card
                </button>
                <button onClick={() => setActiveQrUrl(null)} style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.8rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  Dismiss
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
