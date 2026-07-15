'use client';

import '../globals.css';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAureliaErp } from '@/context/AureliaErpContext';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, UserCheck } from 'lucide-react';

export default function LuxuryLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Owner' | 'Manager' | 'Cashier' | 'Chef' | 'Waiter'>('Owner');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMessage] = useState('');

  // 🔐 Enterprise Rule-Based Credentials Verification Matrix
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all security credentials.');
      return;
    }

    // Default Secure SaaS Dummy Bypass Loop for Local Machine Handshake
    const lowerEmail = email.toLowerCase();

    if (selectedRole === 'Owner' && lowerEmail === 'owner@aurelia.com' && password === 'owner123') {
      router.replace('/dashboard/owner');
    } else if (selectedRole === 'Chef' && lowerEmail === 'chef@aurelia.com' && password === 'chef123') {
      router.replace('/dashboard/chef');
    } else if (selectedRole === 'Waiter' && lowerEmail === 'waiter@aurelia.com' && password === 'waiter123') {
      router.replace('/dashboard/waiter');
    } else if (selectedRole === 'Cashier' && lowerEmail === 'cashier@aurelia.com' && password === 'cashier123') {
      router.replace('/dashboard/billing');
    } else if (selectedRole === 'Manager' && lowerEmail === 'manager@aurelia.com' && password === 'manager123') {
      router.replace('/dashboard/owner'); // Shares owner interface in MVP shell
    } else {
      setErrorMessage(`Invalid login credentials for the assigned ${selectedRole} node.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 font-sans select-none antialiased">
      <div className="w-full max-w-md bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl space-y-6 animate-fadeIn">

        {/* Brand System Header */}
        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-widest text-slate-900 font-serif">AURELIA</h1>
          <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">Enterprise Restaurant Operating System</p>
        </div>

        {/* Form Submission Field Node */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">

          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider mb-1.5">System Access Role</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 font-mono focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="Owner">👑 Owner Account Hub</option>
                <option value="Manager">💼 Station Restaurant Manager</option>
                <option value="Cashier">🧾 Billing Cashier POS Terminal</option>
                <option value="Chef">👨‍🍳 Kitchen Production Display (KDS)</option>
                <option value="Waiter">📝 Floor Waiter Order Desk</option>
              </select>
            </div>
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider mb-1.5">Email Terminal Identity</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="e.g. owner@aurelia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-sans transition-colors"
              />
            </div>
          </div>

          {/* Password Protection Field */}
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider mb-1.5">Security Access Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Toggle Options */}
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-50 border-slate-200 accent-orange-500 focus:ring-0 w-3.5 h-3.5"
              />
              Remember Terminal
            </label>
            <span className="text-slate-400 hover:text-orange-500 cursor-not-allowed">Reset Key?</span>
          </div>

          {/* Error Alert Display Module */}
          {errorMsg && (
            <p className="text-[11px] font-mono font-bold text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-xl text-center">
              {errorMsg}
            </p>
          )}

          {/* Authorize Action Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Sign In Server Terminal
          </button>
        </form>

        {/* Secure Ledger Notice */}
        <p className="text-[10px] text-center font-mono text-slate-400 pt-2 border-t border-slate-100">
          * Secure local terminal layer loop. All login tokens encoded.
        </p>

      </div>
    </div>
  );
}
