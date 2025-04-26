
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Order = {
  id: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  email?: string;
  phone?: string;
  address?: string;
  products?: {
    name: string;
    quantity: number;
    price: number;
    variation?: string;
    weight?: string;
  }[];
};

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-800' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
};

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      date: '2025-04-15',
      status: 'delivered',
      total: 45.97,
      items: 3,
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, CA 12345',
      products: [
        { name: 'Organic Cashews', quantity: 1, price: 12.99, variation: 'Plain', weight: '250g' },
        { name: 'Tiger Nut Flour', quantity: 2, price: 9.99, weight: '500g' },
        { name: 'Tiger Nut Milk', quantity: 1, price: 6.99, variation: 'Vanilla', weight: '1000ml' }
      ]
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      date: '2025-04-20',
      status: 'processing',
      total: 29.98,
      items: 2,
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Othertown, NY 54321',
      products: [
        { name: 'Tiger Nut Dessert', quantity: 2, price: 8.99, variation: 'Chocolate', weight: '300g' },
        { name: 'Organic Cashews', quantity: 1, price: 12.99, variation: 'Honey Roasted', weight: '500g' }
      ]
    },
    {
      id: 'ORD-003',
      customerName: 'Robert Johnson',
      date: '2025-04-22',
      status: 'shipped',
      total: 19.99,
      items: 1,
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine St, Somewhere, TX 67890',
      products: [
        { name: 'Tiger Nut Flour', quantity: 2, price: 9.99, weight: '250g' }
      ]
    },
    {
      id: 'ORD-004',
      customerName: 'Emily Wilson',
      date: '2025-04-23',
      status: 'pending',
      total: 77.95,
      items: 5,
      email: 'emily@example.com',
      phone: '+1 (555) 234-5678',
      address: '321 Elm St, Nowhere, FL 13579',
      products: [
        { name: 'Tiger Nut Milk', quantity: 3, price: 6.99, variation: 'Original', weight: '1000ml' },
        { name: 'Organic Cashews', quantity: 2, price: 12.99, variation: 'Salted', weight: '100g' },
        { name: 'Tiger Nut Dessert', quantity: 2, price: 8.99, variation: 'Strawberry', weight: '150g' }
      ]
    },
    {
      id: 'ORD-005',
      customerName: 'Michael Brown',
      date: '2025-04-24',
      status: 'cancelled',
      total: 12.99,
      items: 1,
      email: 'michael@example.com',
      phone: '+1 (555) 876-5432',
      address: '654 Maple Dr, Anywhere, WA 24680',
      products: [
        { name: 'Organic Cashews', quantity: 1, price: 12.99, variation: 'Plain', weight: '100g' }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);

  // Get unique statuses from orders
  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => 
      (order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())) && 
      (statusFilter === 'all' || order.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortColumn === 'customerName' || sortColumn === 'id') {
        return sortDirection === 'asc' 
          ? a[sortColumn].localeCompare(b[sortColumn]) 
          : b[sortColumn].localeCompare(a[sortColumn]);
      } else if (sortColumn === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc' 
          ? Number(a[sortColumn]) - Number(b[sortColumn]) 
          : Number(b[sortColumn]) - Number(a[sortColumn]);
      }
    });

  const handleSort = (column: keyof Order) => {
    setSortDirection(prevDirection => 
      sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortColumn(column);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Order Management
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-mosaic-earth-light">
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('id')}
                    >
                      Order ID
                      {sortColumn === 'id' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('customerName')}
                    >
                      Customer
                      {sortColumn === 'customerName' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('date')}
                    >
                      Date
                      {sortColumn === 'date' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('total')}
                    >
                      Total
                      {sortColumn === 'total' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('items')}
                    >
                      Items
                      {sortColumn === 'items' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mosaic-earth-light">
                {filteredOrders.map((order, index) => (
                  <tr 
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status].bg} ${statusColors[order.status].text}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors"
                          onClick={() => {
                            setViewingOrder(order);
                            setIsViewOrderOpen(true);
                          }}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        {order.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                          >
                            <Check size={16} className="mr-1" />
                            Process
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            <Check size={16} className="mr-1" />
                            Ship
                          </Button>
                        )}
                        {order.status === 'shipped' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            <Check size={16} className="mr-1" />
                            Deliver
                          </Button>
                        )}
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          >
                            <X size={16} className="mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No orders found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      </div>

      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Viewing order information for {viewingOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {viewingOrder && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {viewingOrder.customerName}</p>
                    <p><span className="font-medium">Email:</span> {viewingOrder.email}</p>
                    <p><span className="font-medium">Phone:</span> {viewingOrder.phone}</p>
                    <p><span className="font-medium">Address:</span> {viewingOrder.address}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Order ID:</span> {viewingOrder.id}</p>
                    <p><span className="font-medium">Date:</span> {viewingOrder.date}</p>
                    <p>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${statusColors[viewingOrder.status].bg} ${statusColors[viewingOrder.status].text}`}>
                        {viewingOrder.status.charAt(0).toUpperCase() + viewingOrder.status.slice(1)}
                      </span>
                    </p>
                    <p><span className="font-medium">Total:</span> ${viewingOrder.total.toFixed(2)}</p>
                    <p><span className="font-medium">Items:</span> {viewingOrder.items}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Variation</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingOrder.products?.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.variation || 'N/A'}</TableCell>
                        <TableCell>{product.weight}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={5} className="text-right font-bold">
                        Grand Total:
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ${viewingOrder.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewOrderOpen(false)}
                >
                  Close
                </Button>
                {viewingOrder.status === 'pending' && (
                  <Button 
                    variant="default" 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'processing');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Process Order
                  </Button>
                )}
                {viewingOrder.status === 'processing' && (
                  <Button 
                    variant="default" 
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'shipped');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Mark as Shipped
                  </Button>
                )}
                {viewingOrder.status === 'shipped' && (
                  <Button 
                    variant="default" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'delivered');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Mark as Delivered
                  </Button>
                )}
                {(viewingOrder.status === 'pending' || viewingOrder.status === 'processing') && (
                  <Button 
                    variant="default" 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'cancelled');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Orders;
