import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  ShieldAlert,
  AlertTriangle,
  Activity,
  Users,
  Cpu,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentAnalyses = [
    {
      id: 'ana-med-cardio01',
      patient: 'Patient #4089 (Age 72, CKD Stage 3)',
      regimen: ['Aspirin', 'Warfarin', 'Metformin'],
      risk: 'High Risk',
      riskScore: 75,
      alert: 'Dual antihemostatic synergism (Bleeding ROR 3.84)',
      date: 'Today, 14:20',
    },
    {
      id: 'ana-med-pci02',
      patient: 'Patient #3911 (Age 64, Post-PCI)',
      regimen: ['Clopidogrel', 'Omeprazole', 'Aspirin'],
      risk: 'High Risk',
      riskScore: 82,
      alert: 'CYP2C19 competitive bioactivation inhibition',
      date: 'Yesterday',
    },
    {
      id: 'ana-med-htn03',
      patient: 'Patient #5202 (Age 58, Hypertension)',
      regimen: ['Atorvastatin', 'Amlodipine'],
      risk: 'Low Risk',
      riskScore: 25,
      alert: 'Standard co-prescription, mild CYP3A4 interaction',
      date: 'Oct 02, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-sky-100 text-sky-700">
              <Stethoscope className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Clinician Medication Safety Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome, {user?.name || 'Dr. Sarah Chen'}. Evidence-grounded polypharmacy evaluation and decision support.
          </p>
        </div>

        <Link
          to="/doctor/medication-safety"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
        >
          <Activity className="w-4 h-4" />
          <span>New Polypharmacy Analysis</span>
        </Link>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Critical Regimen Alerts</span>
            <span className="p-1 rounded-md bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">2</div>
          <div className="text-[11px] text-rose-600 font-medium">Requires immediate clinical reconciliation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Evaluated Regimens</span>
            <span className="p-1 rounded-md bg-sky-50 text-sky-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">14</div>
          <div className="text-[11px] text-slate-500">Across cardiology & general internal medicine</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Digital Twin Simulations</span>
            <span className="p-1 rounded-md bg-teal-50 text-teal-600">
              <Cpu className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">8</div>
          <div className="text-[11px] text-teal-600 font-medium">75% risk mitigation scenarios identified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Evidence Citations Grounded</span>
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">100%</div>
          <div className="text-[11px] text-slate-500">Zero unsupported or fabricated AI assertions</div>
        </div>
      </div>

      {/* Main Grid: Active Alerts & Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patient Regimens Evaluated */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Medication Evaluations</h3>
              <p className="text-xs text-slate-500">Multimodal interaction screening and pharmacokinetic checks</p>
            </div>
            <Link
              to="/doctor/medication-safety"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              Analyze New <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAnalyses.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/doctor/results')}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-sky-50/20 hover:border-sky-200 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-800">{item.patient}</span>
                    <RiskBadge severity={item.risk} size="sm" />
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-1">
                    <span className="text-slate-400">Regimen:</span>
                    {item.regimen.map((m, idx) => (
                      <span key={idx} className="font-semibold text-slate-700">
                        {m}
                        {idx < item.regimen.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{item.alert}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center sm:flex-col sm:items-end justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                  <span className="text-xs font-bold text-sky-600 flex items-center gap-1 mt-1">
                    Open Clinical Dossier <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Digital Twin Showcase */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-teal-50/50 p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Medication Digital Twin</h4>
                <p className="text-xs text-slate-500">What-if clinical simulation</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Test how adding or discontinuing a therapy alters the patient's global interaction risk before writing
              orders.
            </p>

            <Link
              to="/doctor/medication-safety?tab=twin"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-sky-700 bg-white border border-sky-200 hover:bg-sky-50 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Launch Twin Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Clinical Guidelines Reference
            </h4>
            <div className="space-y-2 text-xs">
              <Link to="/evidence" className="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 border border-slate-100">
                <strong className="text-slate-900 block">ACCP Antithrombotic Guidelines</strong>
                <span className="text-slate-500 text-[11px]">Bleeding risk evaluation in dual therapy</span>
              </Link>
              <Link to="/evidence" className="block p-2 rounded-lg hover:bg-slate-50 text-slate-700 border border-slate-100">
                <strong className="text-slate-900 block">BMJ Triple Whammy Cohort Study</strong>
                <span className="text-slate-500 text-[11px]">ACEi + Diuretic + NSAID acute renal failure</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
