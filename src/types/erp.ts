export type UserRole = 'Owner' | 'Manager' | 'Cashier' | 'Chef' | 'Waiter' | 'Customer';
export type TableState = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning' | 'Disabled';
export type ErpKotStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled' | 'Paid';
export type PaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Split';

export interface BranchNode {
  id: string;
  name: string;
  city: string;
  status: 'Online' | 'Offline';
  todayRevenue: number;
  activeOrders: number;
  managerName: string;
}

export interface ErpMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  is_veg: boolean;
  is_available: boolean;
  prep_time: number;
  description: string;
}

export interface ErpOrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ErpOrder {
  id: string;
  table_id: string;
  branch_id?: string;
  items: any;
  status: ErpKotStatus;
  customer_name?: string;
  customer_phone?: string;
  kitchen_notes?: string;
  customer_notes?: string;
  subtotal: number;
  discount: number;
  service_charge: number;
  gst_amount: number;
  grand_total: number;
  payment_method?: PaymentMethod;
  is_paid: boolean;
  created_at: string;
}

export interface ErpTable {
  id: string;
  number: string;
  status: TableState;
  capacity: number;
  assigned_waiter?: string;
  guest_count?: number;
  cleaning_timer?: number;
}

export interface ErpInventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  min_threshold: number;
  expiry_date: string;
  vendor_name: string;
}

export interface ErpEmployee {
  id: string;
  name: string;
  role: UserRole;
  attendance: 'Present' | 'Absent';
  salary: number;
  performanceScore: number;
}

// 👈 यह छूटा हुआ इंटरफ़ेस यहाँ पक्के तौर पर जोड़ दिया गया है
export interface ErpFeedback {
  id: string;
  orderId: string;
  rating: number;
  comments: string;
  createdAt: string;
}
