
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { mockItems, mockOutgoingTransactions } from "@/data/mockData";
import { useMemo } from "react";

const Dashboard = () => {
  const stats = useMemo(() => {
    const totalItems = mockItems.length;
    const lowStockItems = mockItems.filter(item => item.quantity <= item.minStockLevel).length;
    const totalValue = mockItems.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0);
    
    const today = new Date();
    const todaySales = mockOutgoingTransactions
      .filter(t => t.saleDate.toDateString() === today.toDateString())
      .reduce((sum, t) => sum + t.totalAmount, 0);

    return {
      totalItems,
      lowStockItems,
      totalValue,
      todaySales,
    };
  }, []);

  const lowStockItems = mockItems.filter(item => item.quantity <= item.minStockLevel);
  const recentTransactions = mockOutgoingTransactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your store management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalItems}</div>
            <p className="text-xs text-blue-600">Active products</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stats.lowStockItems}</div>
            <p className="text-xs text-amber-600">Items need restocking</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">₹{stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-green-600">Total stock value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Today's Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">₹{stats.todaySales.toLocaleString()}</div>
            <p className="text-xs text-purple-600">Sales today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.sku}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="mb-1">
                        {item.quantity} left
                      </Badge>
                      <p className="text-xs text-gray-500">Min: {item.minStockLevel}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">All items are well stocked! 🎉</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.itemName}</p>
                      <p className="text-sm text-gray-600">Qty: {transaction.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-700">₹{transaction.totalAmount}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.paymentMethod}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent sales</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
