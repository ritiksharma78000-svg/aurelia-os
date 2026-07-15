'use client';

import { useState } from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { Receipt, CreditCard, Wallet, Smartphone, Percent, DollarSign, Printer } from 'lucide-react';

export default function AdvancedPOSBillingCounter() {
  const { orders, settleInvoice } = useAureliaErp();
  const [discountInput, setDiscountInput] = useState<Record<string, number>>({});
  const [selectedMethod, setSelectedMethod] = useState<Record<string, 'Cash' | 'Card' | 'UPI'>>({});

  // केवल वही आर्डर्स फ़िल्टर करें जो वेटर द्वारा कस्टमर को 'served' कर दिए गए हैं और बिलिंग के लिए तैयार हैं
  const billingQueue = orders.filter(o => o.status === 'served');

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm min-h-[calc(100vh-3rem)] space-y-6 animate-fadeIn select-none">

      {/* Module Header block */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">🧾 CENTRAL BILLING TERMINAL & POS</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Government Fiscal Taxes, Coupon Discounts & Dual Print Engines</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-600">
          Awaiting Checkout: <span className="text-orange-500 font-bold">{billingQueue.length} Tables</span>
        </div>
      </div>

      {/* Main Billing Cards Grid */}
      {billingQueue.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-mono text-xs bg-slate-50/40">
          POS Cash Drawer is idle. Orders marked as "Served" on waiter terminals will load here instantly.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {billingQueue.map((bill) => {
            const discount = discountInput[bill.id] || 0;
            const subtotal = bill.subtotal;
            const serviceCharge = bill.serviceCharge;
            const netTaxable = Math.max(0, subtotal - discount + serviceCharge);
            const calculatedGst = Math.round(netTaxable * 0.05);
            const absoluteGrandTotal = netTaxable + calculatedGst;
            const currentMethod = selectedMethod[bill.id] || 'UPI';

            return (
              <div key={bill.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all">
                <div>

                  {/* Card Invoice Header */}
                  <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold font-serif text-slate-900">Table {bill.tableId}</h2>
                      <span className="text-[10px] font-mono text-slate-400">{bill.id}</span>
                    </div>
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200 font-bold">
                      Awaiting Bill
                    </span>
                  </div>

                  {/* Financial Breakdown Items */}
                  <div className="space-y-1.5 font-mono text-xs text-slate-700 mb-4 bg-slate-50 p-3.5 border border-slate-200/60 rounded-xl">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Receipt Stream:</p>
                    {bill.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>• {item.name} (x{item.quantity})</span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}

                    <div className="border-t border-slate-200 mt-2.5 pt-2 text-[11px] text-slate-400 space-y-1">
                      <div className="flex justify-between"><span>Subtotal Amount:</span><span>₹{subtotal}</span></div>
                      <div className="flex justify-between text-red-500"><span>Coupon Discount:</span><span>-₹{discount}</span></div>
                      <div className="flex justify-between"><span>Service Charge (2%):</span><span>₹{serviceCharge}</span></div>
                      <div className="flex justify-between"><span>Taxes (5% GST):</span><span>₹{calculatedGst}</span></div>
                    </div>
                  </div>

                  {/* Operational Settings Form Panel */}
                  <div className="space-y-3 bg-slate-50/50 p-3 rounded-xl border border-slate-200 text-xs font-mono mb-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase mb-1 font-bold flex items-center gap-1">
                        <Percent className="w-3 h-3 text-orange-500" /> Apply Custom Discount (₹)
                      </label>
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscountInput({ ...discountInput, [bill.id]: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-orange-600 font-bold font-mono focus:outline-none focus:border-orange-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase mb-1 font-bold flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-blue-500" /> Payment Settlement Route
                      </label>
                      <select
                        value={currentMethod}
                        onChange={(e) => setSelectedMethod({ ...selectedMethod, [bill.id]: e.target.value as any })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none"
                      >
                        <option value="UPI">📱 Digital UPI/QR Code</option>
                        <option value="Card">💳 Card Swipe POS</option>
                        <option value="Cash">💵 Hard Cash Drawer</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bottom Total and Settlement Buttons */}
                <div className="border-t border-slate-100 pt-4 mt-auto space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium font-sans">Net Grand Payable Due:</span>
                    <span className="text-xl font-extrabold text-emerald-600 font-sans">₹{absoluteGrandTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => alert(`DUAL INVOICE PRINT ENGINE ACTIVE:\n\n1. KITCHEN PRODUCTION TICKET Printed (No prices, items only)\n2. CUSTOMER FISCAL RECEIPT Printed (Subtotal: ₹${subtotal}, GST: ₹${calculatedGst}, Grand Total: ₹${absoluteGrandTotal})\n\nPeripheral Thermal Printer Status: 58mm/80mm OK.`)}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl uppercase font-bold font-mono text-[11px] flex items-center justify-center gap-1 shadow-sm transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-400" /> Dual Print
                    </button>
                    <button
                      type="button"
                      onClick={() => { settleInvoice(bill.id, currentMethod, discount, serviceCharge); alert(`Bill successfully settled via ${currentMethod}! Table session cleared.`); }}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl uppercase font-extrabold tracking-wider shadow-sm transition-colors"
                    >
                      Settle Bill
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
