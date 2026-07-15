'use client';

import { useAurelia } from '@/context/AureliaContext';

export default function SalesReports() {
  const { orders } = useAurelia ? useAurelia() : { orders: [] };

  // 1. रियल-टाइम और मॉक मिक्स डेटाबेस कैलकुलेशन (MVP Metrics)
  const todayPaidOrders = orders.filter((o) => o.status === 'Paid');
  const todayLiveRevenue = todayPaidOrders.reduce((acc, curr) => acc + curr.grandTotal, 0);

  // MVP ऐतिहासिक डेटाबेस (Historical Reports Context)
  const reportStats = {
    dailySales: todayLiveRevenue > 0 ? todayLiveRevenue : 14250,
    weeklySales: 98400 + todayLiveRevenue,
    monthlySales: 412000 + todayLiveRevenue,
    bestSellingItems: [
      { name: 'Paneer Butter Masala', quantity: 42, revenue: 11760 },
      { name: 'Cheese Burst Pizza', quantity: 38, revenue: 13262 },
      { name: 'Butter Naan', quantity: 115, revenue: 5750 },
    ],
    peakHours: [
      { timeSlot: '01:00 PM - 03:00 PM', load: 'High (Lunch Rush)', orders: 24 },
      { timeSlot: '08:00 PM - 11:00 PM', load: 'Peak (Dinner Rush)', orders: 48 },
      { timeSlot: '04:00 PM - 06:00 PM', load: 'Low (Teatime)', orders: 8 }
    ]
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="border-b border-stone-800 pb-4">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">📈 SALES & ANALYTICS REPORTS</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">MVP Revenue Auditing, Best Selling Items & Peak Operational Hours</p>
        </div>

        {/* Sales Timeline Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-500 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">TODAY</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Daily Gross Sales</p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">₹{reportStats.dailySales}</p>
            <p className="text-[11px] text-stone-500 mt-2">Includes {todayPaidOrders.length} live cash counter checkouts today.</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">7 DAYS</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Weekly Consolidated Sales</p>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">₹{reportStats.weeklySales}</p>
            <p className="text-[11px] text-stone-500 mt-2">Rolling 7-day server ledger tracking state.</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-stone-800 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">30 DAYS</div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Monthly Cumulative Sales</p>
            <p className="text-2xl font-bold text-stone-200 font-mono mt-1">₹{reportStats.monthlySales}</p>
            <p className="text-[11px] text-stone-500 mt-2">Current fiscal month audit log.</p>
          </div>
        </div>

        {/* Lower Analysis Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Best Selling Items Terminal */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
              🔥 Best Selling Menu Items
            </h2>
            <div className="space-y-3">
              {reportStats.bestSellingItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-stone-950 p-4 rounded-xl border border-stone-800/60 font-mono text-xs">
                  <div>
                    <p className="text-stone-200 font-sans font-medium text-sm">{item.name}</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Total Sold: <strong className="text-stone-400">{item.quantity} units</strong></p>
                  </div>
                  <span className="text-amber-500 font-bold text-sm">₹{item.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours Tracker Node */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 border-b border-stone-800 pb-3 mb-4 font-mono">
              ⏱️ Peak Footfall & Active Hours
            </h2>
            <div className="space-y-3">
              {reportStats.peakHours.map((hour, idx) => (
                <div key={idx} className="flex justify-between items-center bg-stone-950 p-4 rounded-xl border border-stone-800/60 font-mono text-xs">
                  <div>
                    <p className="text-stone-200 font-sans font-medium">{hour.timeSlot}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Volume Density:
                      <span className={`ml-1 font-bold ${hour.load.includes('Peak') ? 'text-red-400' : hour.load.includes('High') ? 'text-amber-500' : 'text-stone-500'}`}>
                        {hour.load}
                      </span>
                    </p>
                  </div>
                  <span className="bg-stone-900 border border-stone-800 text-stone-400 text-xs px-2.5 py-1 rounded-lg">
                    {hour.orders} Orders
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
