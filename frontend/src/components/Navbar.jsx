import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  Search,
  Stethoscope,
  Microscope,
  HeartHandshake,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import CommandPalette from './ui/CommandPalette';
import Tooltip from './ui/Tooltip';
import Badge from './ui/Badge';

export const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleRoleChange = async (role) => {
    await switchRole(role);
    setAvatarDropdownOpen(false);
    navigate(`/${role}/dashboard`);
  };

  const getRoleMeta = (role) => {
    switch (role) {
      case 'doctor':
        return { label: 'Clinician (MD)', icon: Stethoscope, badge: 'critical' };
      case 'researcher':
        return { label: 'Researcher (PhD)', icon: Microscope, badge: 'info' };
      case 'patient':
        return { label: 'Patient / Caregiver', icon: HeartHandshake, badge: 'safe' };
      default:
        return { label: 'Clinical Guest', icon: User, badge: 'neutral' };
    }
  };

  const currentRoleMeta = user ? getRoleMeta(user.role) : null;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-card)]/95 backdrop-blur-md transition-colors duration-200">

        {/* Main Navbar */}
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex h-14 sm:h-16 items-center justify-between gap-4">
          {/* Brand Logo & Main Nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#0284c7] text-white shadow-sm shadow-[#0284c7]/20 group-hover:scale-105 transition-transform duration-150">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#059669] border border-white dark:border-[#070d19]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                  Cure<span className="text-[#0284c7] dark:text-[#38bdf8]">Nova</span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.2 rounded bg-[var(--color-surface-sunken)] text-[var(--color-brand-primary)] border border-[var(--color-border-subtle)]">
                  Med-AI
                </span>
              </div>
            </Link>


          </div>

          {/* Right Actions: Cmd+K Search trigger (logged-in only) + Avatar/Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cmd+K Quick Launcher — only visible when authenticated */}
            {user && (
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-sunken)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] rounded-lg transition-all cursor-pointer"
              title="Global quick navigation (Cmd+K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline font-normal">Search clinical items...</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>
            )}

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-lg border border-[var(--color-border-subtle)] transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#fbbf24]" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Unified Avatar Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer select-none"
                  aria-expanded={avatarDropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-brand-primary)] font-bold text-xs shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]">
                      {user.name.split(',')[0]}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] capitalize leading-tight">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0 hidden sm:block" />
                </button>

                {avatarDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-72 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] p-2 shadow-[var(--shadow-overlay)] z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    {/* User Identity Header */}
                    <div className="p-2.5 border-b border-[var(--color-border-subtle)] mb-1.5">
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                        {user.email}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                          Active Persona
                        </span>
                        <Badge variant="info" size="sm">
                          {user.role.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Organization & Account Info */}
                    {user.organization && (
                      <div className="p-2 mb-1 bg-[var(--color-surface-sunken)] rounded-xl border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-secondary)]">
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase block tracking-wider font-semibold">Affiliation</span>
                        <span className="font-medium text-[var(--color-text-primary)]">{user.organization}</span>
                      </div>
                    )}

                    {/* Divider & Signout */}
                    <div className="border-t border-[var(--color-border-subtle)] pt-1 space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarDropdownOpen(false);
                          toggleTheme();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                          <span>Color Mode</span>
                        </div>
                        <span className="text-[11px] font-medium capitalize text-[var(--color-text-muted)]">
                          {theme}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAvatarDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-[#dc2626] dark:text-[#f87171] hover:bg-[var(--color-status-critical-bg)] cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
};

export default Navbar;
