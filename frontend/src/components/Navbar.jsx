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
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2
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
        return { label: 'Clinician / Doctor', bg: 'bg-sky-50 text-sky-700 border-sky-200/80', icon: Stethoscope };
      case 'researcher':
        return { label: 'Biomedical Researcher', bg: 'bg-teal-50 text-teal-700 border-teal-200/80', icon: Microscope };
      case 'patient':
        return { label: 'Patient & Consumer', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', icon: HeartHandshake };
      default:
        return { label: 'Guest', bg: 'bg-slate-50 text-slate-700 border-slate-200', icon: User };
    }
  };

  const currentRoleInfo = user ? getRoleBadge(user.role) : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top micro system status bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-900 text-[11px] text-slate-300 font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LangGraph Multi-Agent Engine: Operational
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Data Grounding: PubMed · ChEMBL · openFDA · Reactome</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Decision Support Prototype (v1.0.0)</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-300" /> Non-Prescribing Mode Active
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-7">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-teal-700 text-white shadow-md shadow-sky-700/20 group-hover:scale-105 transition-all">
              <Activity className="h-5 w-5" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 border border-white"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Cure<span className="text-sky-600">Nova</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                  Med-AI
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <Link
              to="/evidence"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isActive('/evidence')
                  ? 'bg-sky-50 text-sky-700 border border-sky-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              Evidence Explorer
            </Link>

            <Link
              to="/knowledge-graph"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isActive('/knowledge-graph')
                  ? 'bg-sky-50 text-sky-700 border border-sky-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Share2 className="h-3.5 w-3.5 text-slate-400" />
              Knowledge Graph
            </Link>

            {user?.role === 'doctor' && (
              <Link
                to="/doctor/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/doctor')
                    ? 'bg-sky-50 text-sky-800 border border-sky-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5 text-sky-600" />
                Doctor Workspace
              </Link>
            )}

            {user?.role === 'researcher' && (
              <Link
                to="/researcher/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/researcher')
                    ? 'bg-teal-50 text-teal-800 border border-teal-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Microscope className="h-3.5 w-3.5 text-teal-600" />
                Researcher Workspace
              </Link>
            )}

            {user?.role === 'patient' && (
              <Link
                to="/patient/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/patient')
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
                Patient Workspace
              </Link>
            )}

            <Link
              to="/about"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Platform
            </Link>
          </nav>
        </div>

        {/* Right Actions: Persona Selector & Auth */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Instant role switch for evaluation"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 font-normal hidden sm:inline">Role:</span>
              <span className="capitalize font-bold text-slate-900">{user?.role || 'Select'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Evaluation Persona
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Instant 1-Click
                  </span>
                </div>

                <button
                  onClick={() => handleRoleChange('doctor')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    user?.role === 'doctor' ? 'bg-sky-50 text-sky-950 font-medium' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>Doctor / Clinician</span>
                      {user?.role === 'doctor' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Polypharmacy, Matrix & Digital Twin</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('researcher')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                    user?.role === 'researcher' ? 'bg-teal-50 text-teal-950 font-medium' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-700 shrink-0 mt-0.5">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>Biomedical Researcher</span>
                      {user?.role === 'researcher' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Drug Repurposing & Evidence Ranking</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('patient')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                    user?.role === 'patient' ? 'bg-emerald-50 text-emerald-950 font-medium' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>Patient / Consumer</span>
                      {user?.role === 'patient' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Simplified Safety & Doctor Discussion Guide</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Profile Pill & Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={`/${user.role}/dashboard`}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${currentRoleInfo?.bg}`}
              >
                {currentRoleInfo?.icon && <currentRoleInfo.icon className="w-3.5 h-3.5" />}
                <span>{user.name.split(',')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
            >
              Sign In
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3">
          <Link
            to="/evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            Evidence Explorer
          </Link>
          <Link
            to="/knowledge-graph"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            Knowledge Graph
          </Link>
          {user && (
            <Link
              to={`/${user.role}/dashboard`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-sky-600 capitalize"
            >
              My Workspace ({user.role})
            </Link>
          )}
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            About Platform
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
