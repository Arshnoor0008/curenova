import React, { useState } from 'react';
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
  AlertCircle,
  Search,
  Filter,
  Pill,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const recentAnalyses = [
    {
      id: 'ana-med-cardio01',
      patient: 'Patient #4089 (Age 72, CKD Stage 3)',
      regimen: ['Aspirin', 'Warfarin', 'Metformin'],
      risk: 'High Risk',
      riskScore: 75,
      alert: 'Dual antihemostatic synergism (Bleeding ROR 3.84)',
      date: 'Today, 14:20',
      timestamp: '2026-10-04 14:20',
      severityLevel: 'High'
    },
    {
      id: 'ana-med-pci02',
      patient: 'Patient #3911 (Age 64, Post-PCI)',
      regimen: ['Clopidogrel', 'Omeprazole', 'Aspirin'],
      risk: 'High Risk',
      riskScore: 82,
      alert: 'CYP2C19 competitive bioactivation inhibition',
      date: 'Yesterday, 09:45',
      timestamp: '2026-10-03 09:45',
      severityLevel: 'High'
    },
    {
      id: 'ana-med-htn03',
      patient: 'Patient #5202 (Age 58, Hypertension)',
      regimen: ['Atorvastatin', 'Amlodipine'],
      risk: 'Low Risk',
      riskScore: 25,
      alert: 'Standard co-prescription, monitored CYP3A4 substrate',
      date: 'Oct 02, 2026',
      timestamp: '2026-10-02 11:15',
      severityLevel: 'Low'
    },
  ];

  const filteredAnalyses = recentAnalyses.filter((item) => {
    const matchesFilter =
      filterSeverity === 'All' ||
      (filterSeverity === 'High' && item.severityLevel === 'High') ||
      (filterSeverity === 'Moderate' && item.severityLevel === 'Moderate') ||
      (filterSeverity === 'Low' && item.severityLevel === 'Low');

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.patient.toLowerCase().includes(q) ||
      item.alert.toLowerCase().includes(q) ||
      item.regimen.some((drug) => drug.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* ── Colorful Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0c2e52 0%, #0284c7 55%, #0369a1 100%)',
        }}
      >
        {/* decorative orbs */}
        <div className="absolute top-[-30px] right-[-30px] w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[30%] w-36 h-36 rounded-full bg-[#38bdf8]/20 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Clinician Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Medication Safety Workspace
            </h1>
            <p className="text-sm text-white/65 max-w-[55ch]">
              Welcome, <strong className="text-white">{user?.name || 'Doctor'}</strong>. Evidence-grounded polypharmacy decision support with Digital Twin simulations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">2</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Critical Alerts</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">14</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Regimens Evaluated</div>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Activity}
              onClick={() => navigate('/doctor/medication-safety')}
              className="shrink-0 !bg-white !text-[#0284c7] hover:!bg-white/90 self-center"
            >
              New Analysis
            </Button>
          </div>
        </div>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Main Layout: Triage Table + Digital Twin Simulator Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Medication Evaluations Clinical Triage Table */}
        <div className="lg:col-span-8">
          <Card elevation="raised">
            <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Clinical Triage & Regimen Evaluations</CardTitle>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Real-time pharmacokinetic screening, pairwise matrices, and adverse event warnings
                </p>
              </div>

              {/* Triage Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface-sunken)] rounded-lg text-xs font-medium border border-[var(--color-border-subtle)]">
                {['All', 'High', 'Moderate', 'Low'].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setFilterSeverity(sev)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer font-semibold ${
                      filterSeverity === sev
                        ? 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] shadow-2xs'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {sev === 'All' ? 'All' : `${sev} Risk`}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Inline Search Bar */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter triage by patient ID, drug name, or alert mechanism..."
                  className="w-full text-xs bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)] pl-9 pr-4 py-2 rounded-lg border border-[var(--color-border-subtle)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
                />
              </div>

              {/* Triage List Table */}
              <div className="space-y-3">
                {filteredAnalyses.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[var(--color-text-muted)] border border-dashed border-[var(--color-border-subtle)] rounded-xl">
                    No evaluations match the active filter criteria.
                  </div>
                ) : (
                  filteredAnalyses.map((item) => {
                    const isHigh = item.severityLevel === 'High';
                    const isLow = item.severityLevel === 'Low';
                    const railColor = isHigh
                      ? 'border-l-[#dc2626]'
                      : isLow
                      ? 'border-l-[#059669]'
                      : 'border-l-[#d97706]';

                    return (
                      <div
                        key={item.id}
                        onClick={() => navigate('/doctor/results')}
                        className={`p-4 rounded-xl border border-[var(--color-border-subtle)] border-l-4 ${railColor} bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs`}
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-[var(--color-text-primary)]">
                              {item.patient}
                            </span>
                            <RiskBadge severity={item.risk} size="sm" />
                            <span className="text-[11px] font-mono tabular text-[var(--color-text-muted)]">
                              Score: {item.riskScore}/100
                            </span>
                          </div>

                          {/* Drug Chips */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span className="text-[11px] text-[var(--color-text-muted)] font-medium">Regimen:</span>
                            {item.regimen.map((med, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
                              >
                                <Pill className="w-3 h-3 text-[var(--color-text-muted)] shrink-0" />
                                {med}
                              </span>
                            ))}
                          </div>

                          {/* Alert Summary */}
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[#dc2626] dark:text-[#f87171]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{item.alert}</span>
                          </div>
                        </div>

                        {/* Timestamp & Action */}
                        <div className="text-right shrink-0 flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-[var(--color-border-subtle)] pt-2 sm:pt-0">
                          <span className="text-[11px] font-mono tabular text-[var(--color-text-muted)]">
                            {item.date}
                          </span>
                          <Button
                            variant="subtle"
                            size="sm"
                            icon={ArrowRight}
                            iconPosition="right"
                            className="mt-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/doctor/results');
                            }}
                          >
                            Open Dossier
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Rail: Digital Twin Scenario Simulator & Guidelines */}
        <div className="lg:col-span-4 space-y-4">
          <Card elevation="raised" className="p-5 space-y-4 border-l-4 border-l-[#0284c7]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Medication Digital Twin
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">"What-If" Pharmacokinetic Simulation</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Model candidate alterations before modifying real patient orders. Simulate how adding or discontinuing a therapy affects overall bleeding and toxicity risk.
            </p>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/doctor/medication-safety?tab=twin')}
            >
              Launch Twin Simulator
            </Button>
          </Card>

          <Card elevation="raised" className="p-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Clinical Guidelines Reference
            </h4>
            <div className="space-y-2 text-xs">
              <Link
                to="/evidence"
                className="block p-3 rounded-xl hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] transition-colors"
              >
                <strong className="text-[var(--color-text-primary)] block">ACCP Antithrombotic Guidelines</strong>
                <span className="text-[var(--color-text-muted)] text-[11px]">Bleeding risk evaluation in dual antihemostatic therapy</span>
              </Link>
              <Link
                to="/evidence"
                className="block p-3 rounded-xl hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] transition-colors"
              >
                <strong className="text-[var(--color-text-primary)] block">BMJ Triple Whammy Cohort Study</strong>
                <span className="text-[var(--color-text-muted)] text-[11px]">ACEi + Diuretic + NSAID acute renal failure incidence</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
