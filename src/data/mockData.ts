
import { Item, IncomingTransaction, OutgoingTransaction } from "@/types";

export const mockItems: Item[] = [
  {
    id: "1",
    name: "Rice - Basmati 1kg",
    sku: "RICE001",
    category: "Groceries",
    description: "Premium Basmati Rice",
    costPrice: 45,
    sellingPrice: 60,
    quantity: 150,
    minStockLevel: 20,
    supplier: "ABC Distributors",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Cooking Oil - 1L",
    sku: "OIL001",
    category: "Groceries",
    description: "Refined Cooking Oil",
    costPrice: 120,
    sellingPrice: 150,
    quantity: 8,
    minStockLevel: 10,
    supplier: "XYZ Foods",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    name: "Milk - 500ml",
    sku: "MILK001",
    category: "Dairy",
    description: "Fresh Milk",
    costPrice: 25,
    sellingPrice: 32,
    quantity: 45,
    minStockLevel: 15,
    supplier: "Local Dairy",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "4",
    name: "Bread - White",
    sku: "BREAD001",
    category: "Bakery",
    description: "Fresh White Bread",
    costPrice: 18,
    sellingPrice: 25,
    quantity: 25,
    minStockLevel: 10,
    supplier: "City Bakery",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "5",
    name: "Sugar - 1kg",
    sku: "SUGAR001",
    category: "Groceries",
    description: "White Sugar",
    costPrice: 40,
    sellingPrice: 50,
    quantity: 75,
    minStockLevel: 20,
    supplier: "Sweet Suppliers",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-22"),
  },
];

export const mockIncomingTransactions: IncomingTransaction[] = [
  {
    id: "IN001",
    itemId: "1",
    itemName: "Rice - Basmati 1kg",
    quantity: 50,
    costPrice: 45,
    totalCost: 2250,
    supplier: "ABC Distributors",
    invoiceNumber: "INV-2024-001",
    receivedDate: new Date("2024-01-20"),
    notes: "Good quality batch",
  },
  {
    id: "IN002",
    itemId: "3",
    itemName: "Milk - 500ml",
    quantity: 30,
    costPrice: 25,
    totalCost: 750,
    supplier: "Local Dairy",
    invoiceNumber: "INV-2024-002",
    receivedDate: new Date("2024-01-19"),
  },
];

export const mockOutgoingTransactions: OutgoingTransaction[] = [
  {
    id: "OUT001",
    itemId: "1",
    itemName: "Rice - Basmati 1kg",
    quantity: 2,
    sellingPrice: 60,
    totalAmount: 120,
    customerName: "John Doe",
    saleDate: new Date(),
    paymentMethod: "cash",
  },
  {
    id: "OUT002",
    itemId: "3",
    itemName: "Milk - 500ml",
    quantity: 5,
    sellingPrice: 32,
    totalAmount: 160,
    customerName: "Jane Smith",
    saleDate: new Date(),
    paymentMethod: "card",
  },
];
