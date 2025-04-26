
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Search, Mail, Phone, ArrowDown, ArrowUp, Eye, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  address: string;
  createdAt: string;
  status: 'active' | 'inactive';
  notes?: string;
  orders?: {
    id: string;
    date: string;
    status: string;
    total: number;
  }[];
};

const Customers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 5,
      totalSpent: 245.87,
      lastOrder: '2025-04-15',
      address: '123 Main St, Anytown, CA 12345',
      createdAt: '2024-12-10',
      status: 'active',
      notes: 'Prefers organic products. Allergic to peanuts.',
      orders: [
        { id: 'ORD-001', date: '2025-04-15', status: 'delivered', total: 45.97 },
        { id: 'ORD-006', date: '2025-03-20', status: 'delivered', total: 78.45 },
        { id: 'ORD-012', date: '2025-02-05', status: 'delivered', total: 121.45 }
      ]
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      totalOrders: 2,
      totalSpent: 59.96,
      lastOrder: '2025-04-20',
      address: '456 Oak Ave, Othertown, NY 54321',
      createdAt: '2025-01-15',
      status: 'active',
      orders: [
        { id: 'ORD-002', date: '2025-04-20', status: 'processing', total: 29.98 },
        { id: 'ORD-009', date: '2025-03-05', status: 'delivered', total: 29.98 }
      ]
    },
    {
      id: 'CUST-003',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      totalOrders: 1,
      totalSpent: 19.99,
      lastOrder: '2025-04-22',
      address: '789 Pine St, Somewhere, TX 67890',
      createdAt: '2025-03-22',
      status: 'active',
      orders: [
        { id: 'ORD-003', date: '2025-04-22', status: 'shipped', total: 19.99 }
      ]
    },
    {
      id: 'CUST-004',
      name: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '+1 (555) 234-5678',
      totalOrders: 3,
      totalSpent: 155.90,
      lastOrder: '2025-04-23',
      address: '321 Elm St, Nowhere, FL 13579',
      createdAt: '2024-11-05',
      status: 'active',
      notes: 'Wholesale customer, prefers bulk orders.',
      orders: [
        { id: 'ORD-004', date: '2025-04-23', status: 'pending', total: 77.95 },
        { id: 'ORD-008', date: '2025-03-10', status: 'delivered', total: 45.97 },
        { id: 'ORD-015', date: '2025-01-25', status: 'delivered', total: 31.98 }
      ]
    },
    {
      id: 'CUST-005',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 (555) 876-5432',
      totalOrders: 1,
      totalSpent: 12.99,
      lastOrder: '2025-04-24',
      address: '654 Maple Dr, Anywhere, WA 24680',
      createdAt: '2025-04-20',
      status: 'inactive',
      notes: 'Cancelled order, requested account deactivation.',
      orders: [
        { id: 'ORD-005', date: '2025-04-24', status: 'cancelled', total: 12.99 }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Customer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [isViewCustomerOpen, setIsViewCustomerOpen] = useState(false);
  const [isContactCustomerOpen, setIsContactCustomerOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    )
    .sort((a, b) => {
      if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
        return sortDirection === 'asc' 
          ? (a[sortColumn] as string).localeCompare(b[sortColumn] as string) 
          : (b[sortColumn] as string).localeCompare(a[sortColumn] as string);
      } else {
        return sortDirection === 'asc' 
          ? Number(a[sortColumn]) - Number(b[sortColumn]) 
          : Number(b[sortColumn]) - Number(a[sortColumn]);
      }
    });

  const handleSort = (column: keyof Customer) => {
    setSortDirection(prevDirection => 
      sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortColumn(column);
  };

  const handleSendEmail = () => {
    if (!viewingCustomer) return;
    
    // In a real app, this would send an email through an API
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${viewingCustomer.name} (${viewingCustomer.email})`,
    });
    
    setEmailSubject('');
    setEmailBody('');
    setIsContactCustomerOpen(false);
  };

  const handleSendSMS = () => {
    if (!viewingCustomer) return;
    
    // In a real app, this would send an SMS through an API
    toast({
      title: "SMS Sent",
      description: `Text message has been sent to ${viewingCustomer.name} (${viewingCustomer.phone})`,
    });
    
    setSmsMessage('');
    setIsContactCustomerOpen(false);
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, notes } : customer
    ));
    
    toast({
      title: "Notes Updated",
      description: "Customer notes have been saved",
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Customer Management
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-mosaic-earth-light">
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('name')}
                    >
                      Customer
                      {sortColumn === 'name' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('email')}
                    >
                      Email
                      {sortColumn === 'email' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('totalOrders')}
                    >
                      Orders
                      {sortColumn === 'totalOrders' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('totalSpent')}
                    >
                      Total Spent
                      {sortColumn === 'totalSpent' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('lastOrder')}
                    >
                      Last Order
                      {sortColumn === 'lastOrder' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp size={14} className="ml-1" /> 
                          : <ArrowDown size={14} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mosaic-earth-light">
                {filteredCustomers.map((customer, index) => (
                  <tr 
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                      <a href={`mailto:${customer.email}`}>{customer.email}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                      <a href={`tel:${customer.phone}`}>{customer.phone}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.totalOrders}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${customer.totalSpent.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.lastOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors"
                          onClick={() => {
                            setViewingCustomer(customer);
                            setIsViewCustomerOpen(true);
                          }}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                          onClick={() => {
                            setViewingCustomer(customer);
                            setIsContactCustomerOpen(true);
                          }}
                        >
                          <MessageSquare size={16} className="mr-1" />
                          Contact
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No customers found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>

      <Dialog open={isViewCustomerOpen} onOpenChange={setIsViewCustomerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Viewing customer information for {viewingCustomer?.name}
            </DialogDescription>
          </DialogHeader>

          {viewingCustomer && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Customer ID:</span> {viewingCustomer.id}</p>
                    <p><span className="font-medium">Name:</span> {viewingCustomer.name}</p>
                    <p>
                      <span className="font-medium">Email:</span> 
                      <a href={`mailto:${viewingCustomer.email}`} className="text-blue-600 ml-1">
                        {viewingCustomer.email}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> 
                      <a href={`tel:${viewingCustomer.phone}`} className="text-blue-600 ml-1">
                        {viewingCustomer.phone}
                      </a>
                    </p>
                    <p><span className="font-medium">Address:</span> {viewingCustomer.address}</p>
                    <p><span className="font-medium">Customer since:</span> {viewingCustomer.createdAt}</p>
                    <p>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        viewingCustomer.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {viewingCustomer.status.charAt(0).toUpperCase() + viewingCustomer.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Purchase Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Total Orders:</span> {viewingCustomer.totalOrders}</p>
                    <p><span className="font-medium">Total Spent:</span> ${viewingCustomer.totalSpent.toFixed(2)}</p>
                    <p><span className="font-medium">Last Order:</span> {viewingCustomer.lastOrder}</p>
                  </div>

                  <h3 className="font-bold mb-2 mt-6">Notes</h3>
                  <div className="space-y-2">
                    <Textarea
                      defaultValue={viewingCustomer.notes || ''}
                      placeholder="Add notes about this customer"
                      className="h-24"
                      onBlur={(e) => handleUpdateNotes(viewingCustomer.id, e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Order History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {viewingCustomer.orders?.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm font-medium">{order.id}</td>
                          <td className="px-4 py-2 text-sm">{order.date}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'shipped' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : order.status === 'processing' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : order.status === 'pending' 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-right">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {(!viewingCustomer.orders || viewingCustomer.orders.length === 0) && (
                  <div className="py-4 text-center text-gray-500">
                    No order history available.
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewCustomerOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  variant="default" 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    setIsViewCustomerOpen(false);
                    setIsContactCustomerOpen(true);
                  }}
                >
                  Contact Customer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isContactCustomerOpen} onOpenChange={setIsContactCustomerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Customer</DialogTitle>
            <DialogDescription>
              Send a message to {viewingCustomer?.name} via email or SMS.
            </DialogDescription>
          </DialogHeader>

          {viewingCustomer && (
            <div className="mt-4">
              <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex items-center gap-2">
                    <Phone size={16} /> SMS
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="email-to">To</Label>
                    <Input id="email-to" value={viewingCustomer.email} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="email-subject">Subject</Label>
                    <Input 
                      id="email-subject" 
                      placeholder="Enter email subject" 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-body">Message</Label>
                    <Textarea 
                      id="email-body" 
                      placeholder="Enter your message" 
                      className="h-32"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsContactCustomerOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={handleSendEmail}
                      disabled={!emailSubject || !emailBody}
                    >
                      Send Email
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sms" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="sms-to">To</Label>
                    <Input id="sms-to" value={viewingCustomer.phone} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="sms-message">Message</Label>
                    <Textarea 
                      id="sms-message" 
                      placeholder="Enter your SMS message"
                      className="h-32"
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                    />
                    <div className="mt-2 text-right text-xs text-gray-500">
                      {smsMessage.length} / 160 characters
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsContactCustomerOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={handleSendSMS}
                      disabled={!smsMessage}
                    >
                      Send SMS
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Customers;
