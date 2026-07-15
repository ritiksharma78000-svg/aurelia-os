'use client';

import React from 'react';
import { AureliaProvider } from '@/context/AureliaContext';
// Note: यदि आपके फोल्डर में नाम AureliaErpContext है, तो बस ऊपर और नीचे उसे रिप्लेस कर दें

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AureliaProvider>
          {children}
        </AureliaProvider>
      </body>
    </html>
  );
}
