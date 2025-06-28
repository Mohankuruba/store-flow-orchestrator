
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, Edit, AlertTriangle, Filter } from "lucide-react";
import { mockItems } from "@/data/mockData";
import { Link } from "react-router-dom";

const AvailableItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = [...new Set(mockItems.map(item => item.category))];
    return unique.sort();
  }, []);

  const filteredItems = useMemo(() => {
    return mockItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesStock = stockFilter === "all" || 
                          (stockFilter === "low" && item.quantity <= item.minStockLevel) ||
                          (stockFilter === "normal" && item.quantity > item.minStockLevel);
      
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, categoryFilter, stockFilter]);

  const getStockStatus = (item: any) => {
    if (item.quantity <= item.minStockLevel) {
      return { status: "low", color: "destructive" };
    } else if (item.quantity <= item.minStockLevel * 2) {
      return { status: "medium", color: "secondary" };
    } else {
      return { status: "good", color: "default" };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Available Items</h1>
        <p className="text-gray-600">Manage your current inventory</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Items</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Level</label>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="normal">Normal Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const stockStatus = getStockStatus(item);
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{item.sku}</p>
                  </div>
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  {item.quantity <= item.minStockLevel && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Low Stock
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity</span>
                    <p className="font-semibold text-lg">{item.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Min Level</span>
                    <p className="font-medium">{item.minStockLevel}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost Price</span>
                    <p className="font-medium">₹{item.costPrice}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Selling Price</span>
                    <p className="font-medium text-green-600">₹{item.sellingPrice}</p>
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-500">
                    <p>Supplier: {item.supplier || "N/A"}</p>
                    <p>Updated: {item.updatedAt.toLocaleDateString()}</p>
                  </div>
                  <Link to={`/edit/${item.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Stock Value:</span>
                    <span className="font-bold">₹{(item.quantity * item.costPrice).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{filteredItems.length}</p>
              <p className="text-sm text-gray-600">Items Shown</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filteredItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Units</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                ₹{filteredItems.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {filteredItems.filter(item => item.quantity <= item.minStockLevel).length}
              </p>
              <p className="text-sm text-gray-600">Low Stock Items</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailableItems;
