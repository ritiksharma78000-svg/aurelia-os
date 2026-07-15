'use client';

import React, { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AureliaSuperAdminOwnerControl() {
  // Live Dish State Array
  const [dishes, setDishes] = useState([
    { id: 1, name: "Shahi Paneer", price: 345, category: "Indian" },
    { id: 2, name: "Dal Makhani", price: 295, category: "Indian" },
    { id: 3, name: "Veg Supreme Burger", price: 195, category: "Burger" }
  ]);

  // Live Staff Management State Array
  const [staff, setStaff] = useState([
    { id: 101, name: "Ritik Sharma", role: "Super Owner", status: "Active" },
    { id: 102, name: "Chef Marco", role: "Head Chef", status: "In Kitchen" },
    { id: 103, name: "Rahul Singh", role: "Captain Waiter", status: "Active" }
  ]);

  // 💰 लाइव प्राइस एडिट (Price Change Modifier)
  const handlePriceChange = (id: number, newPrice: number) => {
    setDishes(dishes.map(dish => dish.id === id ? { ...dish, price: newPrice } : dish));
  };

  // 👨‍🍳 लाइव स्टाफ रोल्स मॉडिफायर (Staff Control Modifier)
  const handleStaffStatus = (id: number, newStatus: string) => {
    setStaff(staff.map(member => member.id === id ? { ...member, status: newStatus } : member));
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* HEADER IDENTITY LAYER */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15rem' }}>Super Owner Control Core</span>
          <h1 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem', fontFamily: 'serif' }}>Aurelia Owner Executive Matrix</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

          {/* 🍔 PANEL A: MASTER MENU ARTISAN & LIVE PRICE MODIFIER */}
          <div style={{ background: '#1F2937', padding: '2.5rem', borderRadius: '2rem', border: '1px solid rgba(245,158,11,0.1)' }}>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.4rem', color: '#F59E0B', margin: '0 0 1.5rem 0' }}><i className="fa-solid fa-utensils" style={{ marginRight: '0.5rem' }}></i> Master Dish & Price Control Panel</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {dishes.map(dish => (
                <div key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(17,24,39,0.5)', padding: '1rem', borderRadius: '1rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{dish.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Category: {dish.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontWeight: 600, color: '#F59E0B' }}>₹</span>
                    <input
                      type="number"
                      value={dish.price}
                      onChange={(e) => handlePriceChange(dish.id, parseInt(e.target.value) || 0)}
                      style={{ width: '80px', background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 700 }}
                    />
                    <button onClick={() => alert(`✨ Cloud Sync Active: ${dish.name} price updated to ₹${dish.price} successfully.`)} style={{ background: '#10B981', border: 'none', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Sync</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 👥 PANEL B: STAFF IDENTITY LEDGER & ACCESS CONTROLLER */}
          <div style={{ background: '#1F2937', padding: '2.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.02)' }}>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 1.5rem 0' }}><i className="fa-solid fa-users-gear" style={{ marginRight: '0.5rem' }}></i> Staff Identity & Access Authorization</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {staff.map(member => (
                <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(17,24,39,0.5)', padding: '1rem', borderRadius: '1rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{member.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Role: <b>{member.role}</b></span>
                  </div>
                  <div>
                    <select
                      value={member.status}
                      onChange={(e) => handleStaffStatus(member.id, e.target.value)}
                      style={{ background: '#111827', color: member.status === 'Active' ? '#10B981' : '#F59E0B', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      <option value="Active">Active / On Duty</option>
                      <option value="In Kitchen">In Kitchen</option>
                      <option value="Suspended">Suspend Access</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
