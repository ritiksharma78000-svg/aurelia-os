'use client';

import React from 'react';
import { AureliaErpProvider } from '@/context/AureliaErpContext';

// 🚀 यह लेआउट क्यआर मेनू के सभी डायनेमिक रूट्स को सुपाबेस ईआरपी प्रोवाइडर से ढक देता है
export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <AureliaErpProvider>
      {children}
    </AureliaErpProvider>
  );
}
