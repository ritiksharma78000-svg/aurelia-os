import React from 'react';
import { AureliaProvider } from '@/context/AureliaContext';
import { AureliaErpProvider } from '@/context/AureliaErpContext';

export const metadata = {
  title: 'Aurelia | Palatial 7-Star Dining International',
  description: 'Connected to RestaurantOS Cloud Network Secured.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 👑 दोनों प्रदाताओं को एक साथ सुरक्षित नेस्ट कर दिया गया है ताकि 0 Errors आएँ */}
        <AureliaProvider>
          <AureliaErpProvider>
            {children}
          </AureliaErpProvider>
        </AureliaProvider>
      </body>
    </html>
  );
}
