
export interface Item {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  minStockLevel: number;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncomingTransaction {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  costPrice: number;
  totalCost: number;
  supplier?: string;
  invoiceNumber?: string;
  receivedDate: Date;
  notes?: string;
}

export interface OutgoingTransaction {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
  customerName?: string;
  saleDate: Date;
  paymentMethod: 'cash' | 'card' | 'credit';
  notes?: string;
}

export interface DashboardStats {
  totalItems: number;
  lowStockItems: number;
  totalValue: number;
  todaySales: number;
  weekSales: number;
  monthSales: number;
}
