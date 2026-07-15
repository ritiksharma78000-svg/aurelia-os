'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Order, RestaurantTable, InventoryItem } from '@/types';

const INITIAL_MENU: MenuItem[] = [
  { id: 'i1', name: 'Paneer Butter Masala', price: 280, category: 'Indian Main', isAvailable: true, description: 'Rich gravy cottage cheese' },
  { id: 'i2', name: 'Dal Makhani', price: 240, category: 'Indian Main', isAvailable: true, description: 'Slow cooked black lentils' },
  { id: 'i3', name: 'Butter Naan', price: 50, category: 'Indian Bread', isAvailable: true, description: 'Traditional clay oven flatbread' },
  { id: 'f1', name: 'Cheese Burst Pizza', price: 349, category: 'Fast Food', isAvailable: true, description: 'Loaded with mozzarella cheese' },
  { id: 'f2', name: 'Crispy Veg Burger', price: 120, category: 'Fast Food', isAvailable: true, description: 'Spicy patty with lettuce' },
  { id: 'f3', name: 'White Sauce Pasta', price: 220, category: 'Fast Food', isAvailable: true, description: 'Penne tossed in cheesy sauce' },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv1', name: 'Burger Buns', stock: 120, unit: 'pcs', minThreshold: 20 },
  { id: 'inv2', name: 'Pizza Dough Base', stock: 85, unit: 'pcs', minThreshold: 15 },
  { id: 'inv3', name: 'Dairy Stock Block', stock: 45, unit: 'kg', minThreshold: 10 },
  { id: 'inv4', name: 'Beverage Cans', stock: 200, unit: 'pcs', minThreshold: 40 },
];

interface AureliaContextType {
  menu: MenuItem[];
  orders: Order[];
  tables: RestaurantTable[];
  inventory: InventoryItem[];
  updateMenuAvailability: (id: string, available: boolean) => void;
  createNewOrder: (tableNumber: string, items: any[], notes?: string) => void;
  updateOrderStatus: (orderId: string, status: any) => void;
  settleInvoicePayment: (orderId: string, paymentMethod: 'Cash' | 'Card' | 'UPI', discount: number) => void;
}

const AureliaContext = createContext<AureliaContextType | undefined>(undefined);

export function AureliaProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [tables] = useState<RestaurantTable[]>([
    { id: 't1', number: '1', tableNumber: '1', status: 'Available', capacity: 4 },
    { id: 't2', number: '2', tableNumber: '2', status: 'Available', capacity: 2 },
    { id: 't3', number: '3', tableNumber: '3', status: 'Available', capacity: 6 },
    { id: 't4', number: '4', tableNumber: '4', status: 'Available', capacity: 4 },
    { id: 't5', number: '5', tableNumber: '5', status: 'Available', capacity: 4 },
  ]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("ERP Background poll communication block:", e);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  const updateMenuAvailability = (id: string, available: boolean) => {
    setMenu(prev => prev.map(item => item.id === id ? { ...item, isAvailable: available } : item));
  };

  // 📦 Automated Inventory Deduction Routine based on items ordered
  const deductInventoryStock = (orderedItems: any[]) => {
    setInventory(prevInv => {
      return prevInv.map(invItem => {
        let totalDeduction = 0;
        orderedItems.forEach(item => {
          const lowerName = item.name.toLowerCase();
          if (lowerName.includes('burger') && invItem.name === 'Burger Buns') totalDeduction += item.quantity;
          if (lowerName.includes('pizza') && invItem.name === 'Pizza Dough Base') totalDeduction += item.quantity;
          if ((lowerName.includes('paneer') || lowerName.includes('pasta')) && invItem.name === 'Dairy Stock Block') totalDeduction += item.quantity;
          if ((lowerName.includes('coke') || lowerName.includes('drink')) && invItem.name === 'Beverage Cans') totalDeduction += item.quantity;
        });
        return { ...invItem, stock: Math.max(0, invItem.stock - totalDeduction) };
      });
    });
  };

  const createNewOrder = async (tableNumber: string, rawItems: any[], notes: string = 'None') => {
    const itemsMapped = rawItems.map((item: any) => ({
      menuItemId: item.menuItemId || item.id || '',
      name: item.name,
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    }));

    const total = itemsMapped.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const gst = Math.round(total * 0.05);

    const freshOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber,
      items: itemsMapped,
      status: 'pending',
      notes,
      totalAmount: total,
      discountAmount: 0,
      gstAmount: gst,
      grandTotal: total + gst,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Deduct stock instantly upon successful generation
    deductInventoryStock(itemsMapped);

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CREATE', order: freshOrder }),
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrderStatus = async (orderId: string, status: any) => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE_STATUS', orderId, status }),
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const settleInvoicePayment = async (orderId: string, paymentMethod: 'Cash' | 'Card' | 'UPI', discount: number) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const netAmount = targetOrder.totalAmount - discount;
    const finalGst = Math.round(netAmount * 0.05);
    const finalTotal = netAmount + finalGst;

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SETTLE_BILL',
          orderId,
          status: 'Paid',
          paymentMethod,
          discountAmount: discount,
          gstAmount: finalGst,
          grandTotal: finalTotal
        }),
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AureliaContext.Provider value={{
      menu, orders, tables, inventory, updateMenuAvailability, createNewOrder, updateOrderStatus, settleInvoicePayment
    }}>
      {children}
    </AureliaContext.Provider>
  );
}

export function useAurelia() {
  const context = useContext(AureliaContext);
  if (!context) throw new Error('useAurelia must be used within an AureliaProvider');
  return context;
}
