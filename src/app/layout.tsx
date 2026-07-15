import React from 'react';
import { AureliaErpProvider } from '@/context/AureliaErpContext'; // 🚀 आपके असली ERP कॉन्टेक्स्ट का सही पाथ और नाम

export const metadata = {
  title: 'Aurelia | Palatial 7-Star Dining International',
  description: 'Connected to RestaurantOS Cloud Network Secured.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 👑 पूरे प्रोजेक्ट को असली AureliaErpProvider चक्रव्यूह से रैप किया गया है */}
        <AureliaErpProvider>
          {children}
        </AureliaErpProvider>
      </body>
    </html>
  );
}
