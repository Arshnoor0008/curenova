import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Plus,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { safetyService } from '../../services/api';
import AnalysisProgress from '../../components/AnalysisProgress';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';

export const PatientMedicationSafety = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState(['Aspirin', 'Warfarin', 'Metformin']);
  const [newMed, setNewMed] = useState('');
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState('');

  const commonMeds = ['Aspirin', 'Warfarin', 'Metformin', 'Omeprazole (Prilosec)', 'Lisinopril', 'Ibuprofen (Advil)', 'Atorvastatin (Lipitor)'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMed.trim()) return;
    if (!medications.includes(newMed.trim())) {
      setMedications([...medications, newMed.trim()]);
    }
    setNewMed('');
  };

  const handleAddPreset = (medName) => {
    const cleanName = medName.split('(')[0].trim();
    if (!medications.includes(cleanName)) {
      setMedications([...medications, cleanName]);
    }
  };

  const handleRemove = (idx) => {
    setMedications(medications.filter((_, i) => i !== idx));
  };

  const handleCheckSafety = async () => {
    if (medications.length === 0) {
      setError('Please enter at least one medicine to check.');
      return;
    }
    setError('');
    setExecuting(true);

    try {
      const response = await safetyService.analyze(medications, null, 'patient');
      setTimeout(() => {
        setExecuting(false);
        navigate('/patient/results', { state: { patientData: response } });
      }, 2400);
    } catch (err) {
      setExecuting(false);
      setError(err.message || 'Safety check failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Check Your Medicine Safety
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Type or select the medicines and supplements you take to learn how they interact safely.
        </p>
      </div>

      <SafetyDisclaimer variant="compact" />

      {executing && (
        <div className="py-8">
          <AnalysisProgress
            title="Checking Medicine Safety"
            subtitle="Reviewing known safety guidelines and preparing clear talking points for your doctor"
          />
        </div>
      )}

      {!executing && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          {/* Input Form */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              What medicines do you currently take?
            </label>
            <form onSubmit={handleAdd} className="flex gap-2">
              <input
                type="text"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                placeholder="Type a medicine name (for example: Aspirin, Warfarin, Metformin)..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>
          </div>

          {/* Quick Select Buttons */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 block">Click to quickly add common medicines:</span>
            <div className="flex flex-wrap gap-1.5">
              {commonMeds.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddPreset(m)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 text-xs transition-colors cursor-pointer"
                >
                  + {m}
                </button>
              ))}
            </div>
          </div>

          {/* Current List Pills */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Your Entered Medicines ({medications.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {medications.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-emerald-950 text-xs font-medium"
                >
                  <span>{m}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title={`Remove ${m}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-slate-500">
              Clear, easy-to-understand explanations. No medical jargon.
            </div>
            <button
              onClick={handleCheckSafety}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Check My Medicine Safety</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reassurance Callout */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong>Please note:</strong> This tool is meant to help you have informed conversations with your doctor.
          Never stop, start, or adjust your dose without talking to your doctor or pharmacist first.
        </div>
      </div>
    </div>
  );
};

export default PatientMedicationSafety;
