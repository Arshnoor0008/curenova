import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Activity,
  Cpu,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Pill,
  X,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';
import { safetyService } from '../../services/api';
import AnalysisProgress from '../../components/AnalysisProgress';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const DRUG_SUGGESTIONS = [
  'Aspirin',
  'Warfarin',
  'Metformin',
  'Clopidogrel',
  'Omeprazole',
  'Pantoprazole',
  'Lisinopril',
  'Spironolactone',
  'Ibuprofen',
  'Atorvastatin',
  'Amlodipine',
  'Sertraline',
  'Tramadol',
  'Dexamethasone'
];

export const DoctorMedicationSafety = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'twin' ? 'twin' : 'standard';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [medications, setMedications] = useState(['Aspirin', 'Warfarin', 'Metformin']);
  const [newMedInput, setNewMedInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Patient context
  const [age, setAge] = useState(72);
  const [egfr, setEgfr] = useState(52);
  const [hepatic, setHepatic] = useState('Normal');

  // Digital Twin specific states
  const [baselineMeds, setBaselineMeds] = useState(['Clopidogrel', 'Omeprazole', 'Aspirin']);
  const [addedMeds, setAddedMeds] = useState(['Pantoprazole']);
  const [removedMeds, setRemovedMeds] = useState(['Omeprazole']);
  const [twinSimResult, setTwinSimResult] = useState(null);

  // Execution states
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState('');

  const samplePresets = [
    {
      title: 'Cardiology Dual Therapy (High Bleeding)',
      meds: ['Aspirin', 'Warfarin', 'Metformin'],
      context: { age: 74, egfr: 55 },
    },
    {
      title: 'Post-PCI Stent (CYP2C19 Loss-of-Activation)',
      meds: ['Clopidogrel', 'Omeprazole', 'Aspirin'],
      context: { age: 62, egfr: 80 },
    },
    {
      title: 'Triple Whammy Acute Renal Syndrome',
      meds: ['Lisinopril', 'Spironolactone', 'Ibuprofen'],
      context: { age: 68, egfr: 45 },
    },
    {
      title: 'Neuro-Psych Serotonin Syndrome Triad',
      meds: ['Sertraline', 'Tramadol', 'Amlodipine'],
      context: { age: 55, egfr: 90 },
    },
  ];

  const handleAddMed = (drugName) => {
    const target = drugName || newMedInput;
    if (!target || !target.trim()) return;
    const clean = target.trim();
    if (!medications.some((m) => m.toLowerCase() === clean.toLowerCase())) {
      setMedications([...medications, clean]);
    }
    setNewMedInput('');
    setShowSuggestions(false);
  };

  const handleRemoveMed = (idx) => {
    setMedications(medications.filter((_, i) => i !== idx));
  };

  const handleApplyPreset = (preset) => {
    setMedications(preset.meds);
    if (preset.context) {
      setAge(preset.context.age);
      setEgfr(preset.context.egfr);
    }
  };

  const handleStartAnalysis = async () => {
    if (medications.length === 0) {
      setError('Please add at least one medication to analyze.');
      return;
    }
    setError('');
    setExecuting(true);

    try {
      const response = await safetyService.analyze(
        medications,
        { age: Number(age), egfr: Number(egfr), hepatic_status: hepatic },
        'doctor'
      );
      setTimeout(() => {
        setExecuting(false);
        navigate('/doctor/results', { state: { analysisData: response } });
      }, 2400);
    } catch (err) {
      setExecuting(false);
      setError(err.message || 'Analysis failed. Please check inputs.');
    }
  };

  const handleSimulateTwin = async () => {
    setError('');
    setExecuting(true);
    try {
      const sim = await safetyService.simulateTwin(
        baselineMeds,
        addedMeds,
        removedMeds,
        { age: Number(age), egfr: Number(egfr) }
      );
      setTimeout(() => {
        setExecuting(false);
        setTwinSimResult(sim);
      }, 2000);
    } catch (err) {
      setExecuting(false);
      setError(err.message || 'Simulation failed.');
    }
  };

  const filteredSuggestions = DRUG_SUGGESTIONS.filter(
    (s) =>
      s.toLowerCase().includes(newMedInput.toLowerCase()) &&
      !medications.some((m) => m.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7]">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Medication Safety & Polypharmacy Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Pairwise interaction matrix, higher-order hazard syndromes, and Patient Medication Digital Twin simulation
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)]">
        <button
          type="button"
          onClick={() => setActiveTab('standard')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'standard'
              ? 'border-[#0284c7] text-[#0284c7]'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Regimen Interaction Analysis</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('twin')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'twin'
              ? 'border-[#0d9488] text-[#0d9488]'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Patient Medication Digital Twin ("What-If")</span>
        </button>
      </div>

      {/* Execution Progress Animation */}
      {executing && (
        <div className="py-8">
          <AnalysisProgress
            title={activeTab === 'twin' ? 'Simulating Patient Medication Twin' : 'Running Polypharmacy Verification'}
            subtitle="Evaluating Pairwise Kinetics, Adverse Overlap, and Renal/Hepatic Clearance"
          />
        </div>
      )}

      {/* Tab 1: Standard Analysis */}
      {!executing && activeTab === 'standard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Medication List Input */}
          <div className="lg:col-span-8 space-y-6">
            <Card elevation="raised" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">Current Medication Regimen</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    Add prescription, OTC, or active supplements to evaluate multi-drug risks
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  <span className="font-mono tabular">{medications.length}</span> drugs entered
                </Badge>
              </div>

              {/* Add Drug Input with Autocomplete */}
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddMed();
                  }}
                  className="flex gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newMedInput}
                      onChange={(e) => {
                        setNewMedInput(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Type medication name (e.g. Clopidogrel, Omeprazole, Lisinopril)..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={Plus}
                  >
                    Add Drug
                  </Button>
                </form>

                {/* Autocomplete Dropdown */}
                {showSuggestions && newMedInput.trim() && filteredSuggestions.length > 0 && (
                  <div className="absolute left-0 right-24 mt-1 bg-[var(--color-surface-card)] border border-[var(--color-border-strong)] rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto divide-y divide-[var(--color-border-subtle)]">
                    {filteredSuggestions.map((s) => (
                      <div
                        key={s}
                        onClick={() => handleAddMed(s)}
                        className="px-3.5 py-2 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] cursor-pointer flex items-center gap-2"
                      >
                        <Pill className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Medication Pill Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {medications.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)] text-xs font-semibold shadow-2xs"
                  >
                    <Pill className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
                    <span>{med}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      className="text-[var(--color-text-muted)] hover:text-[#dc2626] transition-colors cursor-pointer ml-1"
                      title={`Remove ${med}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#dc2626]" />
                  <span>{error}</span>
                </div>
              )}

              {/* Run Analysis Button */}
              <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">
                  Orchestrated with Retrieval, Reasoning & Safety Agents
                </span>
                <Button
                  variant="primary"
                  size="md"
                  icon={Activity}
                  onClick={handleStartAnalysis}
                >
                  Execute Medication Safety Analysis
                </Button>
              </div>
            </Card>

            {/* Presets Card */}
            <Card elevation="flat" className="p-5 space-y-3">
              <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                Standard Clinical Test Cases (1-Click Load)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {samplePresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:border-[#0284c7] text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[#0284c7]">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] mt-1 font-mono">
                      {preset.meds.join(' + ')}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Patient Context Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <Card elevation="raised" className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0284c7]" />
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">Patient Clinical Context</h4>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Contextual parameters adjust pharmacokinetics and organ clearance alert thresholds.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-[var(--color-text-primary)] mb-1">
                    <span>Patient Age:</span>
                    <span className="font-mono tabular text-[#0284c7]">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="95"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full accent-[#0284c7]"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                    <span>18</span>
                    <span>65 (Geriatric)</span>
                    <span>95</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-[var(--color-text-primary)] mb-1">
                    <span>Estimated GFR (eGFR):</span>
                    <span className="font-mono tabular text-[#0284c7]">{egfr} mL/min</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    value={egfr}
                    onChange={(e) => setEgfr(e.target.value)}
                    className="w-full accent-[#0284c7]"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                    <span>15 (Severe CKD)</span>
                    <span>60 (Renal alert)</span>
                    <span>120 (Normal)</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                    Hepatic Function Status
                  </label>
                  <select
                    value={hepatic}
                    onChange={(e) => setHepatic(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  >
                    <option value="Normal">Normal Hepatic Function</option>
                    <option value="Child-Pugh A">Child-Pugh A (Mild)</option>
                    <option value="Child-Pugh B">Child-Pugh B (Moderate)</option>
                  </select>
                </div>
              </div>

              {egfr < 60 && (
                <div className="p-3 rounded-lg bg-[var(--color-status-warning-bg)] border border-[var(--color-status-warning-border)] text-[var(--color-status-warning-text)] text-xs">
                  <strong>Renal Impairment Flagged:</strong> Renally cleared agents will receive heightened clearance surveillance.
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Digital Twin "What-If" Simulation */}
      {!executing && activeTab === 'twin' && (
        <div className="space-y-6">
          <Card elevation="raised" className="p-6 space-y-5 border-l-4 border-l-[#0d9488]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Patient Medication Digital Twin Simulator
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Simulate proposed pharmacological adjustments before modifying actual patient regimens
                </p>
              </div>
            </div>

            {/* Baseline vs Proposed Regimens Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Baseline */}
              <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] space-y-3">
                <div className="text-xs font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider flex items-center justify-between">
                  <span>1. Baseline Regimen</span>
                  <span className="tabular">{baselineMeds.length} drugs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baselineMeds.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[var(--color-surface-card)] text-[var(--color-text-primary)] text-xs font-semibold border border-[var(--color-border-subtle)]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)]">
                  Current post-PCI regimen: Clopidogrel + Omeprazole + Aspirin
                </div>
              </div>

              {/* Proposed Changes */}
              <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] space-y-3">
                <div className="text-xs font-mono font-bold text-[#0d9488] uppercase tracking-wider">
                  2. Simulated Scenario Adjustments
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block mb-1">Add Candidate Therapy:</span>
                    <div className="flex gap-1.5">
                      {addedMeds.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[var(--color-status-safe-bg)] text-[var(--color-status-safe-text)] border border-[var(--color-status-safe-border)] font-bold">
                          + {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block mb-1">Discontinue Therapy:</span>
                    <div className="flex gap-1.5">
                      {removedMeds.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[var(--color-status-critical-bg)] text-[var(--color-status-critical-text)] border border-[var(--color-status-critical-border)] font-bold">
                          - {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[var(--color-text-muted)]">
                Decision Support Only: Compares Pharmacodynamic & Pharmacokinetic Delta
              </span>
              <Button
                variant="primary"
                size="md"
                icon={Cpu}
                onClick={handleSimulateTwin}
              >
                Simulate "What-If" Scenario
              </Button>
            </div>
          </Card>

          {/* Simulation Result Presentation */}
          {twinSimResult && (
            <Card elevation="raised" className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h4 className="text-base font-bold text-[var(--color-text-primary)]">Digital Twin Scenario Results</h4>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono">Simulation ID: {twinSimResult.simulation_id}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono font-bold text-[var(--color-text-muted)] block">
                    Risk Score Delta
                  </span>
                  <span
                    className={`text-lg font-bold tabular ${
                      twinSimResult.risk_delta < 0
                        ? 'text-[#059669]'
                        : twinSimResult.risk_delta > 0
                        ? 'text-[#dc2626]'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                  >
                    {twinSimResult.risk_change_label}
                  </span>
                </div>
              </div>

              {/* Comparison Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] space-y-1">
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Baseline Regimen Score</span>
                  <div className="text-2xl font-bold tabular text-[var(--color-text-primary)]">
                    {twinSimResult.baseline_risk_score} / 100
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Meds: {twinSimResult.baseline_medications.join(', ')}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] space-y-1">
                  <span className="text-xs font-semibold text-[#0d9488]">Simulated Scenario Score</span>
                  <div className="text-2xl font-bold tabular text-[var(--color-text-primary)]">
                    {twinSimResult.scenario_risk_score} / 100
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Meds: {twinSimResult.scenario_medications.join(', ')}
                  </p>
                </div>
              </div>

              {/* Assessment Message */}
              <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] text-xs text-[var(--color-text-primary)] leading-relaxed">
                <strong>Simulation Assessment:</strong> {twinSimResult.simulation_assessment}
              </div>

              {/* Resolved Interactions */}
              {twinSimResult.resolved_interactions?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#059669] uppercase tracking-wider block">
                    Resolved Hazard Signals:
                  </span>
                  {twinSimResult.resolved_interactions.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-[var(--color-status-safe-border)] bg-[var(--color-status-safe-bg)] text-xs text-[var(--color-status-safe-text)] flex items-center justify-between"
                    >
                      <span>
                        Eliminated interaction between <strong>{p.drug_a}</strong> and <strong>{p.drug_b}</strong>.
                      </span>
                      <span className="font-semibold text-[#059669]">Conflict Mitigated</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Triggered New Interactions */}
              {twinSimResult.triggered_new_interactions?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#dc2626] uppercase tracking-wider block">
                    Triggered New Interaction Alerts:
                  </span>
                  {twinSimResult.triggered_new_interactions.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-[var(--color-status-critical-border)] bg-[var(--color-status-critical-bg)] text-xs text-[var(--color-status-critical-text)] space-y-1"
                    >
                      <div className="flex justify-between font-bold">
                        <span>
                          {p.drug_a} + {p.drug_b}
                        </span>
                        <RiskBadge severity={p.severity} size="sm" />
                      </div>
                      <p className="text-[11px] leading-relaxed">{p.mechanism}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-[var(--color-text-muted)]">
                Notice: {twinSimResult.disclaimer}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorMedicationSafety;
