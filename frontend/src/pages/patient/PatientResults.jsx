import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldAlert,
  AlertCircle,
  Printer,
  ChevronLeft,
  CheckCircle2,
  FileText,
  PhoneCall,
  HelpCircle
} from 'lucide-react';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';

export const PatientResults = () => {
  const location = useLocation();

  const data = location.state?.patientData || {
    analysis_id: 'ana-patient-01',
    overall_risk_score: 75,
    overall_risk_category: 'Important Safety Consideration',
    summary_headline: 'A potential medication interaction was noted that should be reviewed with your doctor.',
    normalized_drugs: [
      { canonical_name: 'Aspirin' },
      { canonical_name: 'Warfarin' },
      { canonical_name: 'Metformin' }
    ],
    patient_friendly_summary: [
      {
        medications_involved: 'Aspirin and Warfarin',
        severity_badge: 'High Risk',
        what_was_detected: 'A potential interaction was detected between Aspirin and Warfarin.',
        why_it_matters: 'Both of these medicines make it harder for your blood to clot. Taking them together significantly increases your risk of bleeding or bruising, such as nosebleeds or stomach bleeding.',
        recommended_action: 'Do NOT stop taking your medicine on your own. Discuss this combination with your doctor or pharmacist at your next appointment.'
      }
    ],
    patient_questions_for_doctor: [
      'Are both of these blood-thinning medicines still needed for my heart condition?',
      'Are there any specific symptoms or warning signs (like unusual bruising or dark stools) I should watch for?',
      'Do I need regular blood tests (like INR or kidney checks) to keep this combination safe?'
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/patient/medication-safety"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Back to Medicine Check"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Your Medicine Safety Summary
            </h1>
            <p className="text-xs text-slate-500">
              Personalized, plain-language information to take to your healthcare provider
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4 text-emerald-600" />
          <span>Print Doctor Discussion Sheet</span>
        </button>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Main Alert Banner */}
      <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/70 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {data.overall_risk_category}
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-amber-950">
          {data.summary_headline}
        </h2>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          This combination may have a potential interaction. Please discuss this with your healthcare professional
          at your next visit. Do not stop, start, or change your doses without speaking to your doctor first.
        </p>
      </div>

      {/* Simplified Interaction Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          What Was Detected:
        </h3>

        {data.patient_friendly_summary?.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                {item.medications_involved}
              </span>
              <RiskBadge severity={item.severity_badge} size="sm" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Why It Matters:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.why_it_matters}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">
                What You Should Do:
              </span>
              <p className="font-medium text-slate-900">{item.recommended_action}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Questions for Doctor */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            Questions to Ask Your Doctor or Pharmacist
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          You can print or show this screen to your doctor to start the conversation:
        </p>
        <div className="space-y-2 pt-1 text-xs">
          {data.patient_questions_for_doctor?.map((q, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-emerald-600 font-mono">{i + 1}.</span>
              <span className="text-slate-800 font-medium leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Guidance */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-xs space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-rose-600" />
          When to Seek Immediate Medical Help
        </h4>
        <p className="text-slate-600 leading-relaxed">
          If you experience persistent bleeding that does not stop after 10 minutes, dark coffee-ground vomiting, black
          tarry stools, or severe sudden dizziness, seek emergency medical care immediately.
        </p>
      </div>
    </div>
  );
};

export default PatientResults;
