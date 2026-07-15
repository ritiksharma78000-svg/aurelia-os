export type DishCategory = 'Indian Main' | 'Indian Bread' | 'Fast Food' | 'Beverage' | 'Dessert';
export type TableStatus = 'Available' | 'Occupied' | 'Reserved';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'Paid';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: DishCategory;
  isAvailable: boolean;
  description: string;
  isSpicy?: boolean;
  isHealthy?: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  notes?: string;
  totalAmount: number;
  discountAmount: number;
  gstAmount: number;
  grandTotal: number;
  createdAt: string;
  paymentMethod?: 'Cash' | 'Card' | 'UPI';
}

// 📦 Complete Inventory Data Schema
export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  minThreshold: number;
}

// 🪑 The Missing RestaurantTable Type Definition Block
export interface RestaurantTable {
  id: string;
  number: string;
  tableNumber: string;
  status: TableStatus;
  capacity: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Owner' | 'Chef' | 'Waiter' | 'Cashier';
  attendance: 'Present' | 'Absent';
  salary: number;
  phone: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  tableNumber: string;
  dateTime: string;
  status: 'Confirmed' | 'Cancelled' | 'Pending';
}
