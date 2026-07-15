'use client';

import { useState } from 'react';

// MVP रिजर्वेशन डेटाबेस (हार्डकोडेड इनिशियल स्टेट)
const INITIAL_BOOKINGS = [
  { id: 'RES-401', name: 'Kabir Malhotra', phone: '+91 99887 76655', table: 'T-1', area: 'Rooftop', dateTime: '2026-07-15 08:30 PM', status: 'Confirmed' },
  { id: 'RES-402', name: 'Ananya Iyer', phone: '+91 88776 65544', table: 'C-2', area: 'Couple Table', dateTime: '2026-07-15 09:00 PM', status: 'Pending' },
  { id: 'RES-403', name: 'Gaurav Mehta', phone: '+91 77665 54433', table: 'F-4', area: 'Family Cabin', dateTime: '2026-07-16 01:30 PM', status: 'Confirmed' },
  { id: 'RES-404', name: 'Sanya Kapoor', phone: '+91 66554 43322', table: 'O-3', area: 'Outdoor', dateTime: '2026-07-16 07:00 PM', status: 'Cancelled' }
];

export default function ReservationDashboard() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // बुकिंग स्टेटस अपडेट करने का हैंडलर
  const updateStatus = (id: string, newStatus: 'Confirmed' | 'Cancelled') => {
    setBookings(prev => prev.map(res =>
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  const activeReservations = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingReservations = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="border-b border-stone-800 pb-4 mb-8">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">📅 GUEST BOOKINGS & RESERVATIONS</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">MVP Floor Seating Slots & Dynamic Allocation</p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Total Guest Requests</p>
            <p className="text-2xl font-bold text-stone-200 font-mono mt-1">{bookings.length} Bookings</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Confirmed Seats</p>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">{activeReservations} Active</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Awaiting Review</p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">{pendingReservations} Pending</p>
          </div>
        </div>

        {/* Reservations Desk Table Layout */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-stone-800 bg-stone-900/50 flex justify-between items-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 font-mono">Live Reservation Logs</h2>
            <button
              onClick={() => alert('Launching Manual Table Reservation Form Wizard...')}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider"
            >
              + Reserve Table
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead>
                <tr className="bg-stone-950 border-b border-stone-800 text-stone-500 uppercase text-[10px] tracking-wider">
                  <th className="p-4">Reservation ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Table / Area</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-center">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {bookings.map((res) => (
                  <tr key={res.id} className="hover:bg-stone-950/40 transition-colors">
                    <td className="p-4 text-stone-500">{res.id}</td>
                    <td className="p-4 font-sans font-medium text-stone-200 text-sm">{res.name}</td>
                    <td className="p-4 text-stone-400">{res.phone}</td>
                    <td className="p-4">
                      <span className="text-amber-500 font-bold">{res.table}</span>
                      <span className="text-stone-500 text-[11px] ml-1">({res.area})</span>
                    </td>
                    <td className="p-4 text-stone-300">{res.dateTime}</td>
                    <td className="p-4">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${res.status === 'Confirmed' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-900/40' :
                          res.status === 'Pending' ? 'bg-amber-950/60 text-amber-400 border-amber-900/40 animate-pulse' :
                            'bg-red-950/60 text-red-400 border-red-900/40'
                        }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {res.status === 'Pending' ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => updateStatus(res.id, 'Confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-stone-100 font-bold text-[10px] px-2.5 py-1 rounded-lg uppercase transition-all"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(res.id, 'Cancelled')}
                            className="bg-red-950 border border-red-900 text-red-400 font-bold text-[10px] px-2.5 py-1 rounded-lg uppercase transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-600 text-[11px]">No pending actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
