
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { useAdminAuth } from '../contexts/AdminAuthContext';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  // If not logged in and not loading, redirect to admin login
  if (!isAuthenticated && !isLoading && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      <div className="pt-20 flex-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
