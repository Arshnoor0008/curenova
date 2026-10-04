import React from 'react';
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
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ role }) => {
  const { user } = useAuth();
  const currentRole = role || user?.role || 'doctor';

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

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        {/* Role Portal Header Badge */}
        <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Current Portal
          </div>
          <div className="flex items-center gap-2 mt-1">
            {currentRole === 'doctor' && <Stethoscope className="w-4 h-4 text-sky-600" />}
            {currentRole === 'researcher' && <Microscope className="w-4 h-4 text-teal-600" />}
            {currentRole === 'patient' && <HeartHandshake className="w-4 h-4 text-emerald-600" />}
            <span className="text-sm font-bold text-slate-800 capitalize">
              {currentRole === 'doctor' ? 'Clinician' : currentRole === 'researcher' ? 'Researcher' : 'Patient'} Workspace
            </span>
          </div>
        </div>

        {/* Primary Role Links */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Role Navigation
          </div>
          <nav className="space-y-1">
            {activeNavList.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path.indexOf('?') === -1}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isActive
                      ? currentRole === 'researcher'
                        ? 'bg-teal-50 text-teal-900 border border-teal-200/80'
                        : currentRole === 'patient'
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80'
                        : 'bg-sky-50 text-sky-900 border border-sky-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0 text-slate-500" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Shared Biomedical Intelligence Tools */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Biomedical Intelligence
          </div>
          <nav className="space-y-1">
            {sharedNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0 text-slate-500" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Decision Support Compliance Indicator */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <BookmarkCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Evidence-Grounded AI</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          PubMed · openFDA · ChEMBL · Reactome · ClinicalTrials.gov
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
