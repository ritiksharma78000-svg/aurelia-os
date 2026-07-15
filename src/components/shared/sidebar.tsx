'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  const getRole = () => {
    if (pathname.includes('/dashboard/owner') || pathname.includes('/dashboard/ai-forecast') || pathname.includes('/dashboard/inventory')) return 'owner';
    if (pathname.includes('/dashboard/chef')) return 'chef';
    if (pathname.includes('/dashboard/waiter')) return 'waiter';
    if (pathname.includes('/dashboard/billing')) return 'cashier';
    return 'staff';
  };

  const role = getRole();

  const menuGroups = {
    owner: [
      { name: '📊 Dashboard Overview', path: '/dashboard/owner' },
      { name: '🏢 Franchise Outlets', path: '/dashboard/owner/branches' }, // 👈 नया लिंक सिंक हुआ
      { name: '🧠 AI Core Forecasting', path: '/dashboard/ai-forecast' }, // 👈 नया लिंक सिंक हुआ
      { name: '🪑 Table Control Matrix', path: '/dashboard/owner/tables' },
      { name: '📦 Raw Inventory Ledger', path: '/dashboard/inventory' },
    ],
    chef: [
      { name: '👨‍🍳 Kitchen KOT TV', path: '/dashboard/chef' },
    ],
    waiter: [
      { name: '📝 Order Catalog Panel', path: '/dashboard/waiter' },
    ],
    cashier: [
      { name: '🧾 Billing POS Counter', path: '/dashboard/billing' },
    ],
    staff: []
  };

  const currentLinks = menuGroups[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 sticky top-0 select-none shadow-sm z-50">
      <div>
        <div className="mb-6 px-2">
          <h1 className="text-2xl font-bold tracking-widest text-slate-900 font-serif">AURELIA</h1>
          <p className="text-[10px] tracking-widest text-slate-400 mt-1 uppercase font-mono border-b border-slate-100 pb-3">
            {role} enterprise shell
          </p>
        </div>

        <nav className="space-y-1">
          {currentLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10 scale-102'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-red-500 hover:bg-red-50/50 uppercase border border-transparent hover:border-red-100 transition-all"
        >
          Exit Platform
        </button>
      </div>
    </aside>
  );
}
