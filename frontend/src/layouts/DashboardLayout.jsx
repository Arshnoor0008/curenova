import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout = ({ role }) => {
  const { user } = useAuth();
  const currentRole = role || user?.role || 'doctor';

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar role={currentRole} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
