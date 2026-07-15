'use client';

import { useAureliaErp } from '@/context/AureliaErpContext'; // 👈 नए Supabase ERP इंजन को इम्पोर्ट किया

export default function ChefDashboard() {
  const { orders, updateOrderStatus } = useAureliaErp(); // 👈 नए useAureliaErp हुक का इस्तेमाल किया

  // 👨‍🍳 केवल वही एक्टिव टिकट्स फ़िल्टर करें जो किचन ऑपरेशन (KDS) के दायरे में हैं
  // यह आपके नए Supabase स्कीमा के स्टेटस के साथ 100% सिंक है
  const activeKOTs = orders.filter(
    (o) => o.status === 'pending' || o.status === 'accepted' || o.status === 'preparing' || o.status === 'ready'
  );

  // रीयल-टाइम सुपाबेस क्लाउड स्टेटस अपडेटर हैंडलर
  const handleChefStatusUpdate = async (orderId: string, nextStatus: string) => {
    try {
      updateOrderStatus(orderId, nextStatus);
    } catch (err) {
      console.error("Chef KDS Supabase cloud sync failure:", err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm min-h-[calc(100vh-3rem)]">

      {/* KDS Control Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-5 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">👨‍🍳 KITCHEN DISPLAY SYSTEM (KDS)</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">Price-Free Master Production Slip Queue • Cloud Synchronized</p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-600">
          Active KOT Tickets: <span className="text-orange-500 font-bold">{activeKOTs.length}</span>
        </div>
      </div>

      {/* KDS Tickets Grid Area */}
      {activeKOTs.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-mono text-xs bg-slate-50/40">
          Kitchen production queue is empty. Awaiting guest table tickets...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeKOTs.map((kot) => (
            <div key={kot.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all">
              <div>

                {/* Ticket ID & Table Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{kot.id}</span>
                    <h2 className="text-lg font-bold text-slate-800 mt-1 font-sans">Table Number: <span className="text-orange-500 font-mono">{kot.table_id}</span></h2>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-600">
                    {kot.status}
                  </span>
                </div>

                {/* Price-Free Production Items Breakdown */}
                <div className="space-y-2 bg-slate-50 p-4 border border-slate-200/60 rounded-xl font-mono text-xs mb-4 text-slate-700">
                  {/* Parse logic checking for stringified local fallback arrays */}
                  {(() => {
                    try {
                      const itemsArr = typeof kot.items === 'string' ? JSON.parse(kot.items) : kot.items;
                      return Array.isArray(itemsArr) ? itemsArr.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>• {item.name}</span>
                          <span className="font-extrabold text-orange-500 bg-orange-50 px-2 py-0.5 rounded text-[11px]">× {item.quantity}</span>
                        </div>
                      )) : null;
                    } catch (e) {
                      return <p className="text-red-400 text-[10px]">Data parsing context array node missing.</p>;
                    }
                  })()}
                </div>

                {/* Waiter/Customer Custom Notes */}
                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-3 rounded-xl border border-slate-200/40 mb-4">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Kitchen Instructions:</span>
                  <p className="text-slate-700 mt-0.5 font-sans italic">{kot.kitchen_notes || 'None Specified'}</p>
                </div>
              </div>

              {/* Workflow Pipeline Action Engine Buttons */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                {kot.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => handleChefStatusUpdate(kot.id, 'accepted')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Accept Ticket
                  </button>
                )}
                {kot.status === 'accepted' && (
                  <button
                    type="button"
                    onClick={() => handleChefStatusUpdate(kot.id, 'preparing')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Start Cooking
                  </button>
                )}
                {kot.status === 'preparing' && (
                  <button
                    type="button"
                    onClick={() => handleChefStatusUpdate(kot.id, 'ready')}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm animate-pulse"
                  >
                    🛎️ Signal Food Ready
                  </button>
                )}
                {kot.status === 'ready' && (
                  <div className="w-full bg-slate-50 border border-slate-200 text-center py-2.5 text-xs font-mono text-emerald-600 font-bold rounded-xl">
                    Awaiting Waiter Pickup Dispatch
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
