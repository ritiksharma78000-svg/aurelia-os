'use client';

import React from 'react';
import Sidebar from '@/components/shared/sidebar'; // 👈 आपकी रिपॉजिटरी का असली साइडबार कंपोनेंट

export const dynamic = 'force-dynamic';

export default function AureliaAdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#111827', minHeight: '100vh', display: 'flex', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
      {/* 🎨 GLOBAL STYLE INJECTION FOR CORE MATRIX CARDS */}
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        body { background-color: #111827 !important; margin:0; }
        /* 👑 आपके पुराने ग्रिड कार्ड्स और साइडबार के एस्थेटिक्स को यहाँ लाइव बाइंड किया गया है */
        .dashboard-container { flex: 1; padding: 3rem; max-width: 1240px; margin: 0 auto; box-sizing: border-box; }
      `}} />

      {/* 🏛️ YOUR GENUINE SIDEBAR NAVIGATION EMBED */}
      <Sidebar />

      {/* 🔮 MAIN CONTENT DISPLAY LAYER (YOUR ACTUAL CARDS WILL RENDER HERE) */}
      <main className="dashboard-container">
        {children}
      </main>
    </div>
  );
}
