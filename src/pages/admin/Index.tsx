
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Package, ShoppingBag, Users, Settings } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminIndex = () => {
  const { admin } = useAdminAuth();
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-5xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-medium">{admin?.username}</span>. Here's an overview of your store.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/inventory" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in">
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Package className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Inventory Management</h2>
                  <p className="text-gray-600">Manage products, stock levels, and pricing</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/orders" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <ShoppingBag className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Order Management</h2>
                  <p className="text-gray-600">View and process customer orders</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/customers" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Users className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Customer Management</h2>
                  <p className="text-gray-600">Manage customer information and communications</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/settings" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Settings className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">System Settings</h2>
                  <p className="text-gray-600">Configure website settings and preferences</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 bg-mosaic-green-light p-6 rounded-lg border border-mosaic-green animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Admin Panel Information</h3>
          <p className="mb-4">
            Welcome to the Mosaic Grove admin panel. From here you can manage your inventory, process orders,
            communicate with customers, and configure system settings. This is a restricted area intended for
            authorized personnel only.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;
