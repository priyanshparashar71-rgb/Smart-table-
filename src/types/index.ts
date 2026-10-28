export type ScreenType = 
  | 'tables-qr'
  | 'kitchen-kds'
  | 'menu-management'
  | 'waiter-calls'
  | 'dashboard-overview'
  | 'customer-reviews'
  | 'settings';

export interface TableItem {
  id: string; // 'T01', 'T02', etc.
  seats: number;
  label?: string; // '8 Seats - Large Family'
  zone: 'Main Dining' | 'Patio Terrace' | 'Bar Lounge';
  locationDetail: string; // 'Middle Bay', 'Window Nook', etc.
  status: 'active' | 'inactive';
  occupancyState: 'occupied' | 'waiter-call' | 'ready' | 'bill-requested' | 'open' | 'reserved' | 'live-session';
  stateLabel: string; // 'Occupied (Order #ST-1040)', 'Waiter Assistance Requested (2m ago)', etc.
  url: string; // '/rustic-olive?table=T05'
  guestCount?: number;
  devicesCount?: number;
  activeOrderNumber?: string;
  callAlert?: string;
  hasCallAlert?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Wood-fired Pizza' | 'Gourmet Burgers' | 'Artisanal Beverages' | 'Desserts';
  price: number;
  dietary: 'vegetarian' | 'non-veg';
  isChefChoice?: boolean;
  description: string;
  allergens: string[];
  signaturePairing?: string;
  inStock: boolean;
  stockNote?: string; // 'Depleted Kitchen Stock', 'Flagged by Expediter'
  soldThisWeek: number;
  image: string;
  fileDetails?: string;
}

export interface OrderItemEntry {
  id: string;
  count: number;
  name: string;
  dietary: 'vegetarian' | 'non-veg';
  spec?: string;
  mod?: string;
  allergyNotice?: string;
  subtext?: string;
  plated?: boolean;
}

export interface KitchenTicketData {
  id: string; // 'ST-1042'
  tableId: string; // 'T05'
  tableSeats?: number;
  orderSource: string; // 'QR Self-Order', 'Guest QR App', 'Server Elena (QR Pay)', 'Pass Window 02'
  status: 'overdue' | 'in_cook' | 'just_in' | 'ready' | 'delivered';
  timeLabel: string; // '16M OVERDUE', '8M IN COOK', '1M · JUST IN', 'READY 3M AGO'
  stationTag: string; // 'Grill • Fryer', 'Pizza Oven • Sauté', 'Pass Window 02'
  specialInstruction?: string;
  bannerImage?: string;
  items: OrderItemEntry[];
}

export interface WaiterCallItem {
  id: string;
  tableId: string;
  tableName: string;
  zone: string;
  type: 'water' | 'bill' | 'server' | 'cutlery';
  requestedAt: string;
  status: 'pending' | 'acknowledged' | 'resolved';
  serverAssigned?: string;
}
