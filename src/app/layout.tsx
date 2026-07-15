import React from 'react';
import { AureliaProvider } from '@/context/AureliaContext'; // या आपके फोल्डर के अनुसार AureliaErpContext

export const metadata = {
  title: 'Aurelia | Palatial 7-Star Dining International',
  description: 'Connected to RestaurantOS Cloud Network Secured.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 👑 पूरे प्रोजेक्ट मैट्रिक्स को ग्लोबल कॉन्टेक्स्ट प्रदाता से सुरक्षित रैप किया गया है */}
        <AureliaProvider>
          {children}
        </AureliaProvider>
      </body>
    </html>
  );
}
