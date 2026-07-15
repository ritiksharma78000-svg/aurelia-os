'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ErpMenuItem, ErpOrder, ErpTable, ErpInventoryItem, ErpEmployee, ErpFeedback, BranchNode } from '@/types/erp';
import { useErpAudio } from '@/hooks/useErpAudio';
import { supabase } from '@/utils/supabase';

interface ErpContextType {
  menu: ErpMenuItem[];
  orders: ErpOrder[];
  tables: ErpTable[];
  inventory: ErpInventoryItem[];
  staff: ErpEmployee[];
  feedbacks: ErpFeedback[];
  branches: BranchNode[];
  cloudSyncStatus: 'Synced' | 'Offline_Buffer' | 'Syncing';
  createNewOrder: (tableId: string, items: any[], notes: { kitchen: string, customer: string }, custName?: string, custPhone?: string) => void;
  updateOrderStatus: (orderId: string, status: any) => void;
  settleInvoice: (orderId: string, paymentMethod: any, discount: number, serviceCharge: number) => void;
  transferTable: (fromTableId: string, toTableId: string) => void;
  submitFeedback: (orderId: string, rating: number, comments: string) => void;
  triggerManualCloudSync: () => void;
}

const ErpContext = createContext<ErpContextType | undefined>(undefined);

export function AureliaErpProvider({ children }: { children: React.ReactNode }) {
  const { playAlert } = useErpAudio();
  const [orders, setOrders] = useState<ErpOrder[]>([]);
  const [feedbacks, setFeedbacks] = useState<ErpFeedback[]>([]);
  const [menu, setMenu] = useState<ErpMenuItem[]>([]);
  const [tables, setTables] = useState<ErpTable[]>([]);
  const [inventory, setInventory] = useState<ErpInventoryItem[]>([]);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'Synced' | 'Offline_Buffer' | 'Syncing'>('Synced');

  const [branches] = useState<BranchNode[]>([
    { id: 'b-del', name: 'Aurelia Elite', city: 'Delhi Connaught Place', status: 'Online', todayRevenue: 84500, activeOrders: 8, managerName: 'Vikram Malhotra' },
    { id: 'b-mum', name: 'Aurelia Lounge', city: 'Mumbai Colaba', status: 'Online', todayRevenue: 124300, activeOrders: 14, managerName: 'Rahul Singhania' },
    { id: 'b-blr', name: 'Aurelia Bistro', city: 'Bangalore Indiranagar', status: 'Online', todayRevenue: 62000, activeOrders: 5, managerName: 'Ananya Hegde' }
  ]);

  const [staff] = useState<ErpEmployee[]>([
    { id: 'e1', name: 'Rohan Malhotra', role: 'Chef', attendance: 'Present', salary: 45000, performanceScore: 4.8 },
    { id: 'e2', name: 'Karan Joshi', role: 'Waiter', attendance: 'Present', salary: 20000, performanceScore: 4.5 },
    { id: 'e3', name: 'Sneha Roy', role: 'Cashier', attendance: 'Present', salary: 24000, performanceScore: 4.9 }
  ]);

  // ☁️ सुरक्षित नेटवर्क फ़ॉलबैक और रीयल-टाइम सुपाबेस डेटा फ़ेच करने का लाइव हुक
  const fetchCloudData = async () => {
    try {
      const { data: menuData } = await supabase.from('erp_menu').select('*');
      if (menuData && menuData.length > 0) {
        setMenu(menuData);
      } else {
        setMenu([
          { id: 'm1', name: 'Paneer Butter Masala', price: 280, category: 'Indian Main', is_veg: true, is_available: true, prep_time: 15, description: 'Rich paneer cuts in traditional amber cream gravy' },
          { id: 'm2', name: 'Gourmet Chicken Burger', price: 220, category: 'Fast Food', is_veg: false, is_available: true, prep_time: 10, description: 'Flame grilled chicken patty with artisanal mustard cheese' },
          { id: 'm3', name: 'Butter Naan Basket', price: 60, category: 'Indian Bread', is_veg: true, is_available: true, prep_time: 5, description: 'Clay oven charcoal roasted flatbread layered with premium butter' },
          { id: 'm4', name: 'Chilled Mocktail Tonic', price: 140, category: 'Beverage', is_veg: true, is_available: true, prep_time: 3, description: 'Fresh lime carbonated zesty brew mixed with organic mint extracts' }
        ]);
      }

      const { data: tablesData } = await supabase.from('erp_tables').select('*');
      if (tablesData && tablesData.length > 0) {
        setTables(tablesData);
      } else {
        setTables([
          { id: '1', number: '1', status: 'Available', capacity: 4 },
          { id: '2', number: '2', status: 'Occupied', capacity: 2, guest_count: 2 },
          { id: '3', number: '3', status: 'Reserved', capacity: 6 },
          { id: '4', number: '4', status: 'Cleaning', capacity: 4, cleaning_timer: 5 },
          { id: '5', number: '5', status: 'Available', capacity: 4 }
        ]);
      }

      const { data: ordersData } = await supabase.from('erp_orders').select('*');
      if (ordersData) setOrders(ordersData);

      const { data: invData } = await supabase.from('erp_inventory').select('*');
      if (invData && invData.length > 0) {
        setInventory(invData);
      } else {
        setInventory([
          { id: 'i1', name: 'Artisanal Burger Buns', stock: 140, unit: 'pcs', min_threshold: 30, expiry_date: '2026-07-20', vendor_name: 'Baker Corporate Co.' },
          { id: 'i2', name: 'Premium Butter Blocks', stock: 4, unit: 'kg', min_threshold: 8, expiry_date: '2026-08-15', vendor_name: 'Amul Dairy Hub' },
          { id: 'i3', name: 'Cottage Cheese (Paneer)', stock: 22, unit: 'kg', min_threshold: 10, expiry_date: '2026-07-18', vendor_name: 'Fresh Dairy Corp' }
        ]);
      }
    } catch (netErr) {
      console.log("Supabase pipeline warming up, buffering network handshake...");
    }
  };

  useEffect(() => {
    fetchCloudData();
    const interval = setInterval(fetchCloudData, 3000);
    return () => clearInterval(interval);
  }, []);
  const createNewOrder = async (tableId: string, items: any[], notes: any, custName?: string, custPhone?: string) => {
    const subtotal = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const service = Math.round(subtotal * 0.02);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      table_id: tableId,
      branch_id: 'b-del',
      items: JSON.stringify(items),
      status: 'pending',
      kitchen_notes: notes.kitchen,
      customer_notes: notes.customer,
      customer_name: custName || 'Walk-in Guest',
      customer_phone: custPhone || 'N/A',
      subtotal,
      discount: 0,
      service_charge: service,
      gst_amount: gst,
      grand_total: subtotal + gst + service,
      is_paid: false,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      await supabase.from('erp_orders').insert([newOrder]);
      await supabase.from('erp_tables').update({ status: 'Occupied', guest_count: 2 }).eq('id', tableId);
    } catch (e) {
      console.error(e);
    }

    playAlert('kot_received');
    fetchCloudData();
  };

  const updateOrderStatus = async (orderId: string, status: any) => {
    try {
      await supabase.from('erp_orders').update({ status }).eq('id', orderId);
    } catch (e) {
      console.error(e);
    }
    if (status === 'ready') playAlert('food_ready');
    fetchCloudData();
  };

  const settleInvoice = async (orderId: string, paymentMethod: any, discount: number, serviceCharge: number) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const net = targetOrder.subtotal - discount + serviceCharge;
    const gst = Math.round(net * 0.05);

    try {
      await supabase.from('erp_orders').update({
        status: 'completed',
        is_paid: true,
        payment_method: paymentMethod,
        discount,
        gst_amount: gst,
        grand_total: net + gst
      }).eq('id', orderId);

      await supabase.from('erp_tables').update({ status: 'Cleaning', cleaning_timer: 5 }).eq('id', targetOrder.table_id);
    } catch (e) {
      console.error(e);
    }

    playAlert('payment_settled');
    fetchCloudData();
  };

  const transferTable = async (fromTableId: string, toTableId: string) => {
    try {
      await supabase.from('erp_orders').update({ table_id: toTableId }).eq('table_id', fromTableId).eq('is_paid', false);
      await supabase.from('erp_tables').update({ status: 'Available', guest_count: null }).eq('id', fromTableId);
      await supabase.from('erp_tables').update({ status: 'Occupied', guest_count: 2 }).eq('id', toTableId);
    } catch (e) {
      console.error(e);
    }
    fetchCloudData();
  };

  const submitFeedback = (orderId: string, rating: number, comments: string) => {
    const feedback: ErpFeedback = {
      id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId,
      rating,
      comments,
      createdAt: new Date().toLocaleDateString()
    };
    setFeedbacks(prev => [...prev, feedback]);
  };

  const triggerManualCloudSync = () => {
    setCloudSyncStatus('Syncing');
    setTimeout(() => {
      setCloudSyncStatus('Synced');
    }, 1000);
  };

  return (
    <ErpContext.Provider value={{
      menu, orders, tables, inventory, staff, feedbacks, branches, cloudSyncStatus,
      createNewOrder, updateOrderStatus, settleInvoice, transferTable, submitFeedback, triggerManualCloudSync
    }}>
      {children}
    </ErpContext.Provider>
  );
}

export function useAureliaErp() {
  const context = useContext(ErpContext);
  if (!context) throw new Error('useAureliaErp must be used within an AureliaErpProvider');
  return context;
}
