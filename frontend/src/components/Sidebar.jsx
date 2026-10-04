import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Search,
  Share2,
  Stethoscope,
  Microscope,
  HeartHandshake,
  Cpu,
  BookmarkCheck,
  Sliders,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Tooltip from './ui/Tooltip';
import Badge from './ui/Badge';

export const Sidebar = ({ role }) => {
  const { user, logout } = useAuth();
  const currentRole = role || user?.role || 'doctor';

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('curenova_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('curenova_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const doctorNav = [
    { name: 'Clinical Overview', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Medication Safety & Matrix', path: '/doctor/medication-safety', icon: ShieldCheck },
    { name: 'Active Patient Results', path: '/doctor/results', icon: FileText },
    { name: 'Digital Twin Simulation', path: '/doctor/medication-safety?tab=twin', icon: Cpu },
  ];

  const researcherNav = [
    { name: 'Research Overview', path: '/researcher/dashboard', icon: LayoutDashboard },
    { name: 'Drug Repurposing Engine', path: '/researcher/drug-repurposing', icon: Microscope },
    { name: 'Candidate Evidence', path: '/researcher/results', icon: FileText },
    { name: 'Hypothesis Ranking', path: '/researcher/drug-repurposing?tab=ranking', icon: Sliders },
  ];

  const patientNav = [
    { name: 'My Medication Home', path: '/patient/dashboard', icon: HeartHandshake },
    { name: 'Check My Medicines', path: '/patient/medication-safety', icon: ShieldCheck },
    { name: 'My Safety Results', path: '/patient/results', icon: FileText },
  ];

  const sharedNav = [
    { name: 'Evidence Explorer', path: '/evidence', icon: Search },
    { name: 'Knowledge Graph', path: '/knowledge-graph', icon: Share2 },
  ];

  const activeNavList =
    currentRole === 'researcher' ? researcherNav : currentRole === 'patient' ? patientNav : doctorNav;

  const getPortalInfo = () => {
    switch (currentRole) {
      case 'researcher':
        return { label: 'Researcher Workspace', icon: Microscope, color: 'text-[#0d9488]' };
      case 'patient':
        return { label: 'Patient Workspace', icon: HeartHandshake, color: 'text-[#059669]' };
      default:
        return { label: 'Clinician Workspace', icon: Stethoscope, color: 'text-[#0284c7]' };
    }
  };

  const portalInfo = getPortalInfo();
  const PortalIcon = portalInfo.icon;

  return (
    <aside
      className={`shrink-0 hidden md:flex flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] min-h-[calc(100vh-4.25rem)] transition-all duration-200 select-none z-20 ${
        collapsed ? 'w-18 p-2.5' : 'w-64 p-4'
      } justify-between`}
    >
      <div className="space-y-6">
        {/* Workspace Portal Header & Collapse Toggle */}
        <div className="flex items-center justify-between gap-2">
          {!collapsed ? (
            <div className="px-3 py-2 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] flex-1 min-w-0">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] truncate">
                Clinical Workspace
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <PortalIcon className={`w-4 h-4 shrink-0 ${portalInfo.color}`} />
                <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                  {portalInfo.label}
                </span>
              </div>
            </div>
          ) : (
            <Tooltip content={portalInfo.label} position="right">
              <div className="mx-auto p-2 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[var(--color-brand-primary)]">
                <PortalIcon className="w-5 h-5" />
              </div>
            </Tooltip>
          )}

          <button
            type="button"
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Role Navigation */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Clinical Workflows
            </div>
          )}
          <nav className="space-y-1">
            {activeNavList.map((item) => {
              const ItemIcon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path.indexOf('?') === -1}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-[var(--color-surface-hover)] text-[var(--color-brand-primary)] font-semibold border border-[var(--color-border-subtle)] shadow-2xs before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#0284c7] before:rounded-r'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                >
                  {collapsed ? (
                    <Tooltip content={item.name} position="right">
                      <ItemIcon className="w-4 h-4 shrink-0" />
                    </Tooltip>
                  ) : (
                    <>
                      <ItemIcon className="w-4 h-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors" />
                      <span className="truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Shared Biomedical Intelligence Tools */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Evidence Engines
            </div>
          )}
          <nav className="space-y-1">
            {sharedNav.map((item) => {
              const ItemIcon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-[var(--color-surface-hover)] text-[var(--color-brand-primary)] font-semibold border border-[var(--color-border-subtle)] shadow-2xs before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#0284c7] before:rounded-r'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                >
                  {collapsed ? (
                    <Tooltip content={item.name} position="right">
                      <ItemIcon className="w-4 h-4 shrink-0" />
                    </Tooltip>
                  ) : (
                    <>
                      <ItemIcon className="w-4 h-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors" />
                      <span className="truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User Card / Evidence Grounding Indicator */}
      <div className="space-y-3 pt-3 border-t border-[var(--color-border-subtle)]">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-muted)] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)]">
              <BookmarkCheck className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Evidence-Grounded AI</span>
            </div>
            <p className="text-[10px] leading-relaxed text-[var(--color-text-muted)]">
              PubMed · openFDA · ChEMBL · Reactome
            </p>
          </div>
        )}

        {/* User Card */}
        {user && (
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            {collapsed ? (
              <Tooltip content={`${user.name} (${user.role})`} position="right">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              </Tooltip>
            ) : (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] flex items-center justify-center font-bold text-xs shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                      {user.name.split(',')[0]}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] capitalize truncate">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1 text-[var(--color-text-muted)] hover:text-[#dc2626] rounded-md transition-colors cursor-pointer"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
