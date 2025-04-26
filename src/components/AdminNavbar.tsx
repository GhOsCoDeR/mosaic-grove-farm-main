
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const location = useLocation();

  // Check if current path matches the link
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname !== '/admin') return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="bg-mosaic-green-dark text-white py-4 px-6 shadow-md fixed w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xl font-bold font-serif">
              Mosaic Admin
            </Link>
            <nav className="hidden md:flex space-x-6 ml-10">
              <Link
                to="/admin"
                className={`transition-colors hover:text-white/80 ${
                  isActive('/admin') && location.pathname === '/admin'
                    ? 'border-b-2 border-white'
                    : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/inventory"
                className={`transition-colors hover:text-white/80 ${
                  isActive('/admin/inventory')
                    ? 'border-b-2 border-white'
                    : ''
                }`}
              >
                Inventory
              </Link>
              <Link
                to="/admin/orders"
                className={`transition-colors hover:text-white/80 ${
                  isActive('/admin/orders')
                    ? 'border-b-2 border-white'
                    : ''
                }`}
              >
                Orders
              </Link>
              <Link
                to="/admin/customers"
                className={`transition-colors hover:text-white/80 ${
                  isActive('/admin/customers')
                    ? 'border-b-2 border-white'
                    : ''
                }`}
              >
                Customers
              </Link>
              <Link
                to="/admin/settings"
                className={`transition-colors hover:text-white/80 ${
                  isActive('/admin/settings')
                    ? 'border-b-2 border-white'
                    : ''
                }`}
              >
                Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <User size={18} />
              <span>{admin?.username}</span>
              <span className="bg-white text-mosaic-green-dark text-xs px-2 py-0.5 rounded-full">
                {admin?.role === 'super-admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={logout}
            >
              <LogOut size={18} className="mr-1" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
