'use client';

import { useState } from 'react';

export default function MarketingPanel() {
  const [campaignSent, setCampaignSent] = useState<string | null>(null);

  const handleLaunchCampaign = (type: string) => {
    setCampaignSent(type);
    alert(`Aurelia CRM Engine: Broadcast campaign successfully generated for ${type}!`);
    setTimeout(() => setCampaignSent(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="border-b border-stone-800 pb-4 mb-8">
          <h1 className="text-3xl font-light text-amber-500 font-serif tracking-wide">🎯 CRM MARKETING NODE</h1>
          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">Automated WhatsApp campaigns, festival coupons & referral maps</p>
        </div>

        {/* Marketing Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: WhatsApp Automation */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-base font-serif font-medium text-stone-200 mb-2">📱 WhatsApp Blast Engine</h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">Send a broadcast automated message to all historical customers with active rewards coupons.</p>
              <div className="bg-stone-950 border border-stone-800/60 p-3 rounded-xl font-mono text-[11px] text-stone-500">
                "Hey! Enjoy a Free Dessert with your next fast food dinner order tonight. Use code: AURELIA2026."
              </div>
            </div>
            <button 
              onClick={() => handleLaunchCampaign('WhatsApp Broadcast')}
              className="w-full mt-5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider transition-colors"
            >
              🚀 Launch WhatsApp Blast
            </button>
          </div>

          {/* Card 2: Festival Offers Generator */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-base font-serif font-medium text-stone-200 mb-2">🎈 Festival Coupon Matrix</h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">Inject flash discounts across your digital menu nodes for seasonal holidays automatically.</p>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono bg-stone-950 text-amber-500 border border-stone-800 px-2 py-1 rounded">CODE: FESTIVAL15</span>
                <span className="text-[10px] font-mono bg-stone-950 text-emerald-400 border border-stone-800 px-2 py-1 rounded">Discount: 15%</span>
              </div>
            </div>
            <button 
              onClick={() => handleLaunchCampaign('Festival Matrix')}
              className="w-full mt-5 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-bold py-2.5 rounded-xl uppercase tracking-wider transition-colors"
            >
              ⚡ Push Coupon Code
            </button>
          </div>

          {/* Card 3: Automated Birthday Wishes */}
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-base font-serif font-medium text-stone-200 mb-2">🎂 Birthday Mode Automated CRM</h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">Automatically trigger gift voucher tokens and reservation invites to active users on their birthdates.</p>
              <p className="text-[11px] font-mono text-stone-500">System scan interval: Every 24 hours</p>
            </div>
            <div className="bg-stone-950 border border-stone-800 text-center py-2.5 text-xs text-emerald-400 font-medium rounded-xl mt-4 font-mono">
              ✔ CRON Job Automation Active
            </div>
          </div>

        </div>

        {/* Global Feedback Banner Status */}
        {campaignSent && (
          <div className="mt-8 p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-200 font-mono text-center text-xs rounded-xl animate-pulse">
            ✨ Global Engine Status: Transmission loop completed for "{campaignSent}".
          </div>
        )}

      </div>
    </div>
  );
}
