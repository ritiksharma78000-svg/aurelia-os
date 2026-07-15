'use client';

import React from 'react';
import { ErpOrder } from '@/types/erp';

interface InvoiceEngineProps {
  order: ErpOrder;
  type: 'KOT' | 'CustomerBill';
}

export default function InvoiceEngine({ order, type }: InvoiceEngineProps) {
  if (type === 'KOT') {
    return (
      <div className="w-[80mm] p-4 bg-white text-stone-900 border border-stone-200 font-mono text-xs shadow-inner rounded-xl">
        <div className="text-center border-b border-dashed border-stone-400 pb-2 mb-2">
          <h2 className="text-sm font-bold tracking-wider">AURELIA OS KITCHEN</h2>
          <p className="text-[10px]">Production Token Slip</p>
        </div>
        <div className="space-y-1 mb-2">
          <p>Token ID: <span className="font-bold">{order.id}</span></p>
          <p>Station Table: <span className="font-bold text-sm">Table {order.tableId}</span></p>
          <p>Time: {order.createdAt}</p>
        </div>
        <div className="border-b border-dashed border-stone-400 pb-2 mb-2">
          <p className="text-[10px] font-bold text-stone-500 mb-1">ITEMS COLLECTION:</p>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between font-bold text-sm py-0.5">
              <span>• {item.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="text-xs bg-stone-100 p-2 rounded">
          <span className="text-[9px] text-stone-500 block font-bold">WAITING CHEF NOTES:</span>
          <p className="italic font-sans">{order.kitchenNotes || 'None'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80mm] p-4 bg-white text-stone-900 border border-stone-200 font-mono text-xs shadow-inner rounded-xl">
      <div className="text-center border-b border-dashed border-stone-400 pb-2 mb-3">
        <h2 className="text-base font-bold tracking-widest font-serif text-stone-950">AURELIA</h2>
        <p className="text-[10px] tracking-wider text-stone-500">Luxury Restaurant Group</p>
        <p className="text-[9px] text-stone-400 mt-0.5">GSTIN: 09AAAAA1111A1Z1</p>
      </div>
      <div className="space-y-1 mb-3 border-b border-dashed border-stone-200 pb-2 text-[11px]">
        <div className="flex justify-between"><span>Bill Number:</span><span className="font-bold">{order.id}</span></div>
        <div className="flex justify-between"><span>Dining Table:</span><span className="font-bold">Table {order.tableId}</span></div>
        <div className="flex justify-between"><span>Guest:</span><span>{order.customerName}</span></div>
        <div className="flex justify-between"><span>Timestamp:</span><span>{order.createdAt}</span></div>
      </div>
      <div className="border-b border-dashed border-stone-400 pb-2 mb-3 space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold text-stone-400 mb-1">
          <span>ITEM DESCRIPTION</span><span>TOTAL</span>
        </div>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-stone-800 text-[11px]">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1 text-right text-[11px] border-b border-dashed border-stone-300 pb-2 mb-2">
        <div className="flex justify-between text-stone-500"><span>Subtotal amount:</span><span>₹{order.subtotal}</span></div>
        <div className="flex justify-between text-red-500"><span>Loyalty Discount:</span><span>-₹{order.discount}</span></div>
        <div className="flex justify-between text-stone-500"><span>Service Charge (2%):</span><span>₹{order.serviceCharge}</span></div>
        <div className="flex justify-between text-stone-500"><span>Taxes (5% GST):</span><span>₹{order.gstAmount}</span></div>
      </div>
      <div className="flex justify-between items-center text-sm font-bold text-stone-950 border-b border-stone-950 pb-2 mb-3">
        <span>GRAND TOTAL:</span>
        <span className="text-base font-sans">₹{order.grandTotal}</span>
      </div>
      <div className="text-center space-y-2">
        <p className="text-[10px] font-sans tracking-wide text-stone-500">Payment Status: <span className="font-mono text-emerald-600 font-bold uppercase">{order.paymentMethod || 'Paid'}</span></p>
        <div className="w-24 h-24 bg-stone-100 mx-auto rounded-lg flex items-center justify-center text-[10px] border text-stone-400 font-sans">
          [UPI Scan QR]
        </div>
        <p className="text-[10px] italic font-sans text-stone-500 mt-2">Thank you for dining with us!</p>
      </div>
    </div>
  );
}
