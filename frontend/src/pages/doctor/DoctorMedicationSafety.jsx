import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Activity,
  Cpu,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { safetyService } from '../../services/api';
import AnalysisProgress from '../../components/AnalysisProgress';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';

export const DoctorMedicationSafety = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'twin' ? 'twin' : 'standard';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [medications, setMedications] = useState(['Aspirin', 'Warfarin', 'Metformin']);
  const [newMedInput, setNewMedInput] = useState('');
  
  // Patient context
  const [age, setAge] = useState(72);
  const [egfr, setEgfr] = useState(52);
  const [hepatic, setHepatic] = useState('Normal');

  // Digital Twin specific states
  const [baselineMeds, setBaselineMeds] = useState(['Clopidogrel', 'Omeprazole', 'Aspirin']);
  const [addedMeds, setAddedMeds] = useState(['Pantoprazole']);
  const [removedMeds, setRemovedMeds] = useState(['Omeprazole']);
  const [twinInput, setTwinInput] = useState('');
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

  const handleAddMed = (e) => {
    e.preventDefault();
    if (!newMedInput.trim()) return;
    if (!medications.some((m) => m.toLowerCase() === newMedInput.trim().toLowerCase())) {
      setMedications([...medications, newMedInput.trim()]);
    }
    setNewMedInput('');
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
      // Wait for animation
      setTimeout(() => {
        setExecuting(false);
        navigate('/doctor/results', { state: { analysisData: response } });
      }, 2600);
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
      }, 2200);
    } catch (err) {
      setExecuting(false);
      setError(err.message || 'Simulation failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-sky-100 text-sky-700">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Medication Safety & Polypharmacy Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pairwise interaction matrix, higher-order hazard syndromes, and Patient Medication Digital Twin simulation
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('standard')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'standard'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Regimen Interaction Analysis</span>
        </button>
        <button
          onClick={() => setActiveTab('twin')}
          className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'twin'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Patient Medication Digital Twin ("What-If")</span>
        </button>
      </div>

      {/* Execution Progress Animation Overlay */}
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
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Current Medication Regimen</h3>
                  <p className="text-xs text-slate-500">
                    Add prescription, OTC, or active supplements to evaluate multi-drug risks
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {medications.length} drug{medications.length !== 1 ? 's' : ''} entered
                </span>
              </div>

              {/* Add Drug Form */}
              <form onSubmit={handleAddMed} className="flex gap-2">
                <input
                  type="text"
                  value={newMedInput}
                  onChange={(e) => setNewMedInput(e.target.value)}
                  placeholder="Type medication name (e.g. Clopidogrel, Omeprazole, Lisinopril)..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Drug</span>
                </button>
              </form>

              {/* Medication Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {medications.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium shadow-2xs animate-in fade-in"
                  >
                    <span>{med}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title={`Remove ${med}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Run Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Orchestrated with Retrieval, Reasoning & Safety Agents
                </span>
                <button
                  onClick={handleStartAnalysis}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Execute Medication Safety Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Presets Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Standard Clinical Test Cases (1-Click Load)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {samplePresets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-sky-50/40 hover:border-sky-300 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {preset.meds.join(' + ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Patient Context Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-600" />
                <h4 className="text-sm font-bold text-slate-900">Patient Clinical Context</h4>
              </div>
              <p className="text-xs text-slate-500">
                Contextual parameters adjust pharmacokinetics and organ clearance alert thresholds.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Patient Age:</span>
                    <span className="font-mono text-sky-700">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="95"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>18</span>
                    <span>65 (Geriatric threshold)</span>
                    <span>95</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Estimated GFR (eGFR):</span>
                    <span className="font-mono text-sky-700">{egfr} mL/min</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    value={egfr}
                    onChange={(e) => setEgfr(e.target.value)}
                    className="w-full accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>15 (Severe CKD)</span>
                    <span>60 (Renal alert)</span>
                    <span>120 (Normal)</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hepatic Function</label>
                  <select
                    value={hepatic}
                    onChange={(e) => setHepatic(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden"
                  >
                    <option value="Normal">Normal Hepatic Function</option>
                    <option value="Child-Pugh A">Child-Pugh A (Mild)</option>
                    <option value="Child-Pugh B">Child-Pugh B (Moderate)</option>
                  </select>
                </div>
              </div>

              {egfr < 60 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>Renal Impairment Flagged:</strong> Renally cleared agents will receive heightened surveillance.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Digital Twin "What-If" Simulation */}
      {!executing && activeTab === 'twin' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50/50 to-sky-50/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Patient Medication Digital Twin Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate proposed pharmacological adjustments before modifying actual patient regimens
                </p>
              </div>
            </div>

            {/* Baseline vs Proposed Regimens Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Baseline */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Baseline Patient Regimen</span>
                  <span className="text-[10px] text-slate-400 font-mono">{baselineMeds.length} drugs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baselineMeds.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  E.g., Current post-stent regimen: Clopidogrel + Omeprazole + Aspirin
                </div>
              </div>

              {/* Proposed Changes */}
              <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-3">
                <div className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                  2. Simulated Scenario Adjustments
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block mb-1">Add Candidate Drug(s):</span>
                    <div className="flex gap-1.5">
                      {addedMeds.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          + {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block mb-1">Discontinue Drug(s):</span>
                    <div className="flex gap-1.5">
                      {removedMeds.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                          - {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Decision Support Only: Compares Pharmacodynamic & Pharmacokinetic Delta
              </span>
              <button
                onClick={handleSimulateTwin}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>Simulate "What-If" Scenario</span>
              </button>
            </div>
          </div>

          {/* Simulation Result Presentation */}
          {twinSimResult && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Digital Twin Scenario Results</h4>
                  <p className="text-xs text-slate-500 font-mono">Simulation ID: {twinSimResult.simulation_id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score Delta</span>
                    <span
                      className={`text-lg font-extrabold ${
                        twinSimResult.risk_delta < 0
                          ? 'text-emerald-600'
                          : twinSimResult.risk_delta > 0
                          ? 'text-rose-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {twinSimResult.risk_change_label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-semibold text-slate-400">Baseline Regimen Score</span>
                  <div className="text-2xl font-bold text-slate-900">{twinSimResult.baseline_risk_score} / 100</div>
                  <p className="text-xs text-slate-500">
                    Meds: {twinSimResult.baseline_medications.join(', ')}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-1">
                  <span className="text-xs font-semibold text-teal-700">Simulated Scenario Score</span>
                  <div className="text-2xl font-bold text-teal-900">{twinSimResult.scenario_risk_score} / 100</div>
                  <p className="text-xs text-slate-500">
                    Meds: {twinSimResult.scenario_medications.join(', ')}
                  </p>
                </div>
              </div>

              {/* Assessment Message */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 leading-relaxed">
                <strong>Simulation Assessment:</strong> {twinSimResult.simulation_assessment}
              </div>

              {/* Resolved Interactions */}
              {twinSimResult.resolved_interactions?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Resolved Hazard Signals:
                  </span>
                  {twinSimResult.resolved_interactions.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 text-xs text-emerald-950 flex items-center justify-between"
                    >
                      <span>
                        Eliminated interaction between <strong>{p.drug_a}</strong> and <strong>{p.drug_b}</strong>.
                      </span>
                      <span className="font-semibold text-emerald-700">Conflict Mitigated</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Triggered New Interactions */}
              {twinSimResult.triggered_new_interactions?.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                    Triggered New Interaction Alerts:
                  </span>
                  {twinSimResult.triggered_new_interactions.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 text-xs text-rose-950 space-y-1"
                    >
                      <div className="flex justify-between font-bold">
                        <span>
                          {p.drug_a} + {p.drug_b}
                        </span>
                        <RiskBadge severity={p.severity} size="sm" />
                      </div>
                      <p className="text-[11px] text-rose-800">{p.mechanism}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-400">
                Notice: {twinSimResult.disclaimer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorMedicationSafety;
