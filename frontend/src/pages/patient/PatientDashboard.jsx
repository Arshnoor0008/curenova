import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Activity,
  Plus,
  ArrowRight,
  AlertCircle,
  FileText,
  Calendar,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';

export const PatientDashboard = () => {
  const { user } = useAuth();

  const currentMedications = [
    { name: 'Aspirin', purpose: 'Heart & blood circulation support', frequency: 'Once daily' },
    { name: 'Warfarin', purpose: 'Blood thinner to prevent clots', frequency: 'Once daily (evening)' },
    { name: 'Metformin', purpose: 'Blood sugar balance', frequency: 'Twice daily with meals' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
              <HeartHandshake className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Medication Safety Guide
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hello, {user?.name || 'Eleanor'}. Clear, safe information about how your medications work together.
          </p>
        </div>

        <Link
          to="/patient/medication-safety"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Check My Medication Safety</span>
        </Link>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Safety Alert Callout for Patient */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <h3 className="font-bold text-sm text-amber-900">
              Important: Discuss Aspirin + Warfarin With Your Doctor
            </h3>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Taking these two blood-thinning medicines together increases the chance of bleeding or bruising. Please do
            <strong> not stop taking any medication on your own</strong>; instead, review this with your doctor at your
            next appointment.
          </p>
        </div>
        <Link
          to="/patient/results"
          className="px-4 py-2 text-xs font-bold text-amber-900 bg-white border border-amber-300 rounded-xl hover:bg-amber-100 transition-colors shadow-2xs shrink-0 text-center"
        >
          View Doctor Talking Points
        </Link>
      </div>

      {/* My Medication List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">My Registered Medications</h3>
            <p className="text-xs text-slate-500">Keep this list up to date with all prescriptions and supplements</p>
          </div>
          <Link
            to="/patient/medication-safety"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Update List <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentMedications.map((med, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2 hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-600">{med.purpose}</p>
              <div className="text-[11px] text-slate-400 font-medium">Routine: {med.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Safety Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            When Should I Call My Doctor?
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>If you notice unexplained nosebleeds, bleeding gums, or unusually dark or black stools.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>Before starting any new over-the-counter medicine (like Advil, Motrin, or cold remedies).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>If you feel sudden dizziness, weakness, or unusual fatigue.</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            Questions to Ask at Your Next Appointment
          </h4>
          <div className="space-y-2 text-xs text-slate-700">
            <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              "Are all my current medicines still necessary, or can any doses be adjusted?"
            </p>
            <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              "Do I need any routine lab tests (such as kidney or blood checks) while on these medicines?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
