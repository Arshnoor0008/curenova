import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout = ({ role }) => {
  const { user } = useAuth();
  const currentRole = role || user?.role || 'doctor';

  return (
    <div className="flex min-h-[calc(100vh-4.25rem)] bg-[var(--color-surface-ground)] text-[var(--color-text-primary)] transition-colors duration-200">
      <Sidebar role={currentRole} />
      <main className="flex-1 min-w-0 w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
