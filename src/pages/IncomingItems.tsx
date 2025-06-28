
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Calendar } from "lucide-react";
import { mockItems, mockIncomingTransactions } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const IncomingItems = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    quantity: "",
    costPrice: "",
    supplier: "",
    invoiceNumber: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemId || !formData.quantity || !formData.costPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Adding incoming item:", formData);
    
    toast({
      title: "Success",
      description: "Item successfully added to inventory!",
    });

    // Reset form
    setFormData({
      itemId: "",
      quantity: "",
      costPrice: "",
      supplier: "",
      invoiceNumber: "",
      notes: "",
    });
    setShowAddForm(false);
  };

  const selectedItem = mockItems.find(item => item.id === formData.itemId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incoming Items</h1>
          <p className="text-gray-600">Add new stock to your inventory</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Incoming Item
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Add New Incoming Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item">Select Item *</Label>
                  <Select value={formData.itemId} onValueChange={(value) => handleInputChange("itemId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.sku})
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
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costPrice">Cost Price per Unit *</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => handleInputChange("costPrice", e.target.value)}
                    placeholder="₹0.00"
                  />
                  {selectedItem && (
                    <p className="text-sm text-gray-500">
                      Current cost price: ₹{selectedItem.costPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange("supplier", e.target.value)}
                    placeholder="Supplier name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    placeholder="INV-2024-001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              {/* Summary */}
              {formData.itemId && formData.quantity && formData.costPrice && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Transaction Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Item:</span>
                      <p className="font-medium">{selectedItem?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <p className="font-medium">{formData.quantity} units</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Unit Cost:</span>
                      <p className="font-medium">₹{formData.costPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Cost:</span>
                      <p className="font-bold text-lg text-green-600">
                        ₹{(parseFloat(formData.quantity) * parseFloat(formData.costPrice) || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add to Inventory
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Incoming Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Recent Incoming Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIncomingTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{transaction.itemName}</h4>
                    <Badge variant="outline">{transaction.id}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block font-medium">Quantity</span>
                      {transaction.quantity} units
                    </div>
                    <div>
                      <span className="block font-medium">Cost Price</span>
                      ₹{transaction.costPrice}
                    </div>
                    <div>
                      <span className="block font-medium">Supplier</span>
                      {transaction.supplier || "N/A"}
                    </div>
                    <div>
                      <span className="block font-medium">Date</span>
                      {transaction.receivedDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-green-600">₹{transaction.totalCost}</p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomingItems;
