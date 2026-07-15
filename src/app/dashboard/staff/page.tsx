'use client';

import { useState } from 'react';

// MVP स्टाफ डेटाबेस (हार्डकोडेड इनिशियल स्टेट)
const INITIAL_EMPLOYEES = [
  { id: 'emp1', name: 'Rohan Sharma', role: 'Chef', attendance: 'Present', salary: 35000, phone: '+91 98765 43210' },
  { id: 'emp2', name: 'Amit Verma', role: 'Waiter', attendance: 'Present', salary: 18000, phone: '+91 98765 43211' },
  { id: 'emp3', name: 'Pooja Singh', role: 'Cashier', attendance: 'Present', salary: 22000, phone: '+91 98765 43212' },
  { id: 'emp4', name: 'Vikram Malhotra', role: 'Chef', attendance: 'Absent', salary: 32000, phone: '+91 98765 43213' },
  { id: 'emp5', name: 'Rahul Yadav', role: 'Waiter', attendance: 'Present', salary: 18000, phone: '+91 98765 43214' }
];

export default function StaffManagement() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // लाइव अटेंडेंस टॉगल करने का हैंडलर
  const toggleAttendance = (id: string) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id
        ? { ...emp, attendance: emp.attendance === 'Present' ? 'Absent' : 'Present' }
        : emp
    ));
  };

  // कुल सैलरी बजट कैलकुलेट करना
  const totalSalaryBudget = employees.reduce((acc, curr) => acc + curr.salary, 0);
  const presentCount = employees.filter(e => e.attendance === 'Present').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="border-b border-stone-800 pb-4 mb-8">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">👨‍🍳 STAFF MANAGEMENT SYSTEM</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">MVP Employee Rosters, Attendance & Salary Tracker</p>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Total Roster Workforce</p>
            <p className="text-2xl font-bold text-stone-200 font-mono mt-1">{employees.length} Employees</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Active Today (Attendance)</p>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">{presentCount} Present</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow-lg">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Monthly Salary Outflow</p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">₹{totalSalaryBudget}</p>
          </div>
        </div>

        {/* Employee Roster Table Layout */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-stone-800 bg-stone-900/50 flex justify-between items-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-300 font-mono">Master Staff Directory</h2>
            <button
              onClick={() => alert('Launching Add New Employee onboarding wizard...')}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider"
            >
              + Onboard Staff
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead>
                <tr className="bg-stone-950 border-b border-stone-800 text-stone-500 uppercase text-[10px] tracking-wider">
                  <th className="p-4">Employee ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Monthly Salary</th>
                  <th className="p-4 text-center">Live Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-stone-950/40 transition-colors">
                    <td className="p-4 text-stone-500">{emp.id}</td>
                    <td className="p-4 font-sans font-medium text-stone-200 text-sm">{emp.name}</td>
                    <td className="p-4">
                      <span className="bg-stone-950 border border-stone-800 text-amber-500 px-2 py-1 rounded-md text-[11px]">
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-4 text-stone-400">{emp.phone}</td>
                    <td className="p-4 text-stone-200 font-bold">₹{emp.salary}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAttendance(emp.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase border transition-all ${emp.attendance === 'Present'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30'
                            : 'bg-red-950/40 text-red-400 border-red-900/30'
                          }`}
                      >
                        {emp.attendance === 'Present' ? '✔ Present' : '❌ Absent'}
                      </button>
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
