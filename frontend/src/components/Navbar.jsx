import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  Layers,
  Search,
  Share2,
  Stethoscope,
  Microscope,
  HeartHandshake,
  User,
  LogOut,
  ChevronDown,
  Info,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleRoleChange = async (role) => {
    await switchRole(role);
    setRoleMenuOpen(false);
    navigate(`/${role}/dashboard`);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'doctor':
        return { label: 'Clinician / Doctor', bg: 'bg-sky-50 text-sky-700 border-sky-200', icon: Stethoscope };
      case 'researcher':
        return { label: 'Biomedical Researcher', bg: 'bg-teal-50 text-teal-700 border-teal-200', icon: Microscope };
      case 'patient':
        return { label: 'Patient & Consumer', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: HeartHandshake };
      default:
        return { label: 'Guest', bg: 'bg-slate-50 text-slate-700 border-slate-200', icon: User };
    }
  };

  const currentRoleInfo = user ? getRoleBadge(user.role) : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-teal-600 text-white shadow-sm shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Cure<span className="text-sky-600">Nova</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  AI Platform
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              to="/evidence"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/evidence')
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="h-4 w-4 text-slate-400" />
              Evidence
            </Link>

            <Link
              to="/knowledge-graph"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/knowledge-graph')
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Share2 className="h-4 w-4 text-slate-400" />
              Knowledge Graph
            </Link>

            {user?.role === 'doctor' && (
              <Link
                to="/doctor/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/doctor')
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Stethoscope className="h-4 w-4 text-sky-500" />
                Doctor Portal
              </Link>
            )}

            {user?.role === 'researcher' && (
              <Link
                to="/researcher/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/researcher')
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Microscope className="h-4 w-4 text-teal-500" />
                Researcher Portal
              </Link>
            )}

            {user?.role === 'patient' && (
              <Link
                to="/patient/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/patient')
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <HeartHandshake className="h-4 w-4 text-emerald-500" />
                Patient Portal
              </Link>
            )}

            <Link
              to="/about"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right Action: Demo Role Switcher & User Menu */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
              title="Instant role switch for hackathon evaluation"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline text-slate-500">Demo Role:</span>
              <span className="font-semibold text-slate-900 capitalize">{user?.role || 'Switch Role'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Evaluation Persona
                  </p>
                </div>
                <button
                  onClick={() => handleRoleChange('doctor')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    user?.role === 'doctor' ? 'bg-sky-50 text-sky-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-md bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Doctor / Clinician</div>
                    <div className="text-[11px] text-slate-500">Medication safety, matrix & clinical evidence</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('researcher')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer mt-1 ${
                    user?.role === 'researcher' ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-md bg-teal-100 text-teal-700 shrink-0 mt-0.5">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Biomedical Researcher</div>
                    <div className="text-[11px] text-slate-500">Drug repurposing, targets & hypothesis ranking</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('patient')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer mt-1 ${
                    user?.role === 'patient' ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Patient / Consumer</div>
                    <div className="text-[11px] text-slate-500">Simplified safety & discussion talking points</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Profile & Auth Action */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={`/${user.role}/dashboard`}
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${currentRoleInfo?.bg}`}
              >
                {currentRoleInfo?.icon && <currentRoleInfo.icon className="w-3 h-3" />}
                <span>{user.name.split(',')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <Link
            to="/evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Biomedical Evidence
          </Link>
          <Link
            to="/knowledge-graph"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Knowledge Graph
          </Link>
          {user && (
            <Link
              to={`/${user.role}/dashboard`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-sky-600 capitalize"
            >
              My Dashboard ({user.role})
            </Link>
          )}
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            About CureNova
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
