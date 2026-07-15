'use client';

import React from 'react';
import Sidebar from '@/components/shared/sidebar';
import { AureliaErpProvider } from '@/context/AureliaErpContext'; // 👈 नया ERP प्रोवाइडर इम्पोर्ट किया

export default function UnifiedErpDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // 👈 यहाँ पूरे डैशबोर्ड के बच्चों को नए ERP इंजन से रैप कर दिया गया है
    <AureliaErpProvider>
      <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        {/* Dynamic Navigation Sidebar */}
        <Sidebar />

        {/* Main Operating Workspace Grid Shell */}
        <main className="flex-1 min-w-0 h-screen overflow-y-auto bg-slate-100/40 relative p-6">
          <div className="relative z-10 w-full min-h-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AureliaErpProvider>
  );
}
