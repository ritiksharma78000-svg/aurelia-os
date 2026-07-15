'use client';

import React from 'react';
import Sidebar from '@/components/shared/sidebar'; // 👈 आपकी रिपॉजिटरी का असली साइडबार कंपोनेंट
import '../globals.css'; // 🚀 यह जादुई लाइन आपके पुराने आलीशान ग्रिड कार्ड्स और टेलविंड डिज़ाइन को तुरंत वापस लाएगी!

export const dynamic = 'force-dynamic';

export default function AureliaAdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* 🎨 GLOBAL FONT & ICON PACK INSULATOR */}
      <link rel="stylesheet" href="https://cloudflare.com" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://googleapis.com');
        body { background-color: #111827 !important; margin:0; }
      `}} />

      {/* 🏛️ YOUR GENUINE SIDEBAR NAVIGATION EMBED */}
      <Sidebar />

      {/* 🔮 MAIN CONTENT DISPLAY LAYER (YOUR CARDS AND GRIDS WILL RENDER PROPERLY HERE) */}
      <main className="flex-1 p-8 max-w-[1240px] mx-auto w-full box-border">
        {children}
      </main>
    </div>
  );
}
