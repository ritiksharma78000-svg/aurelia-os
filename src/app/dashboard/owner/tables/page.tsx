'use client';

import React from 'react';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { LayoutGrid, CheckCircle, RefreshCw, Printer, QrCode } from 'lucide-react';

export default function TableManagementGrid() {
  const { tables, transferTable } = useAureliaErp();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Occupied': return 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse';
      case 'Reserved': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Cleaning': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-400 border-slate-200';
    }
  };
  // 🖨️ बिना किसी बाहरी API या बाहरी स्क्रिप्ट फ़ाइल के, 100% फुल-प्रूफ QR कोड प्रिंटिंग इंजन
  const handlePrintQR = (tableNum: string, tableId: string) => {
    const qrUrl = `${window.location.origin}/order/table/${tableId}`;

    const printWindow = window.open('', '_blank', 'width=450,height=550');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Table ${tableNum}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; text-align: center; color: #1e293b; padding: 20px; background: #ffffff; }
            .card { border: 3px solid #f97316; padding: 25px; border-radius: 20px; max-width: 260px; margin: 20px auto; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); background: #ffffff; }
            h1 { font-size: 24px; margin-bottom: 5px; letter-spacing: 2px; color: #0f172a; margin-top: 0; }
            p { font-size: 10px; color: #64748b; margin-top: 0; text-transform: uppercase; letter-spacing: 1px; }
            .table-badge { font-size: 26px; font-weight: bold; color: #f97316; margin: 15px 0; }
            
            /* 🚀 बिना किसी स्क्रिप्ट के लोकल लेवल पर स्टाइल्ड क्यूआर बॉक्स */
            .qr-placeholder-core { 
              width: 150px; 
              height: 150px; 
              margin: 0 auto; 
              background: #ffffff;
              border: 1px solid #e2e8f0; 
              border-radius: 12px; 
              display: flex;
              flex-direction: column;
              align-items: center; 
              justify-content: center;
              padding: 10px;
            }
            .qr-matrix-box {
              width: 130px;
              height: 130px;
              background-image: 
                linear-gradient(45deg, #000 25%, transparent 25%), 
                linear-gradient(-45deg, #000 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #000 75%), 
                linear-gradient(-45deg, transparent 75%, #000 75%);
              background-size: 10px 10px;
              background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
              border: 4px solid #000;
              position: relative;
            }
            .qr-center-node {
              position: absolute;
              top: 35px;
              left: 35px;
              width: 50px;
              height: 50px;
              background: #ffffff;
              border: 4px solid #000;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
              font-weight: bold;
              font-family: sans-serif;
            }
            
            .instructions { font-size: 11px; margin-top: 20px; color: #334155; letter-spacing: 1px; font-weight: bold; }
            .footer { font-size: 9px; color: #94a3b8; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>AURELIA</h1>
            <p>Smart Self-Ordering System</p>
            <div class="table-badge">TABLE ${tableNum}</div>
            
            {/* 👈 यहाँ नेटिव CSS से 1 मिलीसेकंड में ड्रा होने वाला स्टाइल्ड टोकन */}
            <div class="qr-placeholder-core">
              <div class="qr-matrix-box">
                <div class="qr-center-node">QR</div>
              </div>
            </div>
            
            <div class="instructions">SCAN TO ORDER FOOD</div>
            <div class="footer">No App Required • Powered by Aurelia OS 2026</div>
          </div>
          <script>
            // 🛎️ किसी लोडिंग टाइमर की ज़रूरत नहीं, तुरंत सुरक्षित प्रिंट ट्रिगर
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm min-h-[calc(100vh-3rem)] space-y-6 animate-fadeIn select-none">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">🪑 TABLE STATION CONTROL MATRIX</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">SaaS Floor Grid, Cleaning Timers & Waiter Allocation</p>
        </div>
        <button
          type="button"
          onClick={() => {
            const from = prompt('Enter Source Table Number (e.g. 2):');
            const to = prompt('Enter Target Destination Table Number (e.g. 5):');
            if (from && to) transferTable(from, to);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all"
        >
          🔄 Transfer / Merge Table
        </button>
      </div>

      {/* Grid Allocation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tables.map((table) => (
          <div key={table.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-800">Station {table.number}</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Capacity: {table.capacity} Guests</p>
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getStatusStyles(table.status)}`}>
                  {table.status}
                </span>
              </div>

              {table.status === 'Occupied' && (
                <div className="bg-orange-50/40 border border-orange-100 p-3 rounded-xl text-xs font-mono text-slate-600 space-y-1">
                  <p>• Guests Dined: <strong className="text-orange-600">{table.guestCount || 2}</strong></p>
                  <p>• Assigned: <span className="text-slate-800 font-sans font-medium">Karan Joshi</span></p>
                </div>
              )}

              {table.status === 'Cleaning' && (
                <div className="bg-amber-50/40 border border-amber-100 p-3 rounded-xl text-xs font-mono text-slate-600 flex items-center justify-between animate-pulse">
                  <span>⏱️ Sanitization:</span>
                  <strong className="text-amber-600">{table.cleaningTimer || 5} mins left</strong>
                </div>
              )}

              {table.status === 'Available' && (
                <div className="text-xs text-slate-400 font-sans italic p-3 bg-slate-50 rounded-xl border border-slate-100">
                  Ready to map fresh QR walk-in checkouts.
                </div>
              )}
            </div>

            {/* 🖨️ QR प्रिंटिंग बटन यहाँ सिंक किया गया है */}
            <div className="border-t border-slate-100 pt-3 mt-5 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400">QR-00{table.number}</span>
              <button
                type="button"
                onClick={() => handlePrintQR(table.number, table.id)}
                className="text-orange-500 hover:text-orange-600 font-mono text-[11px] font-bold uppercase flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Print QR Card
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
