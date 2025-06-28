
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { mockItems, mockOutgoingTransactions } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const OutgoingItems = () => {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    quantity: "",
    sellingPrice: "",
    customerName: "",
    paymentMethod: "cash" as "cash" | "card" | "credit",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemId || !formData.quantity || !formData.sellingPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedItem = mockItems.find(item => item.id === formData.itemId);
    const requestedQuantity = parseInt(formData.quantity);

    if (selectedItem && requestedQuantity > selectedItem.quantity) {
      toast({
        title: "Error",
        description: `Not enough stock! Available: ${selectedItem.quantity}`,
        variant: "destructive",
      });
      return;
    }

    console.log("Processing sale:", formData);
    
    toast({
      title: "Success",
      description: "Sale completed successfully!",
    });

    // Reset form
    setFormData({
      itemId: "",
      quantity: "",
      sellingPrice: "",
      customerName: "",
      paymentMethod: "cash",
      notes: "",
    });
    setShowSaleForm(false);
  };

  const selectedItem = mockItems.find(item => item.id === formData.itemId);
  const totalAmount = formData.quantity && formData.sellingPrice 
    ? parseFloat(formData.quantity) * parseFloat(formData.sellingPrice)
    : 0;

  const paymentMethods = [
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "card", label: "Card", icon: "💳" },
    { value: "credit", label: "Credit", icon: "📝" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Outgoing Items</h1>
          <p className="text-gray-600">Process sales and track outgoing inventory</p>
        </div>
        <Button 
          onClick={() => setShowSaleForm(!showSaleForm)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      {/* Sale Form */}
      {showSaleForm && (
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              Process New Sale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item">Select Item *</Label>
                  <Select value={formData.itemId} onValueChange={(value) => handleInputChange("itemId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an item to sell" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockItems.filter(item => item.quantity > 0).map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.quantity} available) - ₹{item.sellingPrice}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedItem?.quantity || 999}
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="Enter quantity"
                  />
                  {selectedItem && (
                    <p className="text-sm text-gray-500">
                      Available: {selectedItem.quantity} units
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Selling Price per Unit *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                    placeholder="₹0.00"
                  />
                  {selectedItem && (
                    <p className="text-sm text-gray-500">
                      Suggested price: ₹{selectedItem.sellingPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Customer name (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.icon} {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Sale notes or special instructions..."
                  rows={3}
                />
              </div>

              {/* Sale Summary */}
              {formData.itemId && formData.quantity && formData.sellingPrice && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-3">Sale Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Item:</span>
                      <p className="font-medium">{selectedItem?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <p className="font-medium">{formData.quantity} units</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Unit Price:</span>
                      <p className="font-medium">₹{formData.sellingPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment:</span>
                      <p className="font-medium capitalize">{formData.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    {selectedItem && (
                      <div className="text-sm text-gray-600 mt-2">
                        <p>Cost per unit: ₹{selectedItem.costPrice}</p>
                        <p>Profit per unit: ₹{(parseFloat(formData.sellingPrice || "0") - selectedItem.costPrice).toFixed(2)}</p>
                        <p className="font-semibold text-green-600">
                          Total profit: ₹{((parseFloat(formData.sellingPrice || "0") - selectedItem.costPrice) * parseFloat(formData.quantity || "0")).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Complete Sale
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowSaleForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOutgoingTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{transaction.itemName}</h4>
                    <Badge variant="outline">{transaction.id}</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {transaction.paymentMethod}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block font-medium">Quantity</span>
                      {transaction.quantity} units
                    </div>
                    <div>
                      <span className="block font-medium">Unit Price</span>
                      ₹{transaction.sellingPrice}
                    </div>
                    <div>
                      <span className="block font-medium">Customer</span>
                      {transaction.customerName || "Walk-in"}
                    </div>
                    <div>
                      <span className="block font-medium">Date</span>
                      {transaction.saleDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-green-600">₹{transaction.totalAmount}</p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Today's Sales Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{mockOutgoingTransactions.length}</p>
              <p className="text-sm text-gray-600">Total Sales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {mockOutgoingTransactions.reduce((sum, t) => sum + t.quantity, 0)}
              </p>
              <p className="text-sm text-gray-600">Items Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                ₹{mockOutgoingTransactions.reduce((sum, t) => sum + t.totalAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutgoingItems;
