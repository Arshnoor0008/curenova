import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  FileText,
  Printer,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Stethoscope,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import InteractionMatrix from '../../components/InteractionMatrix';
import RiskBadge from '../../components/RiskBadge';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import ReportModal from '../../components/ReportModal';

export const DoctorResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Fallback demo data if navigated directly
  const data = location.state?.analysisData || {
    analysis_id: 'ana-med-cardio01',
    overall_risk_score: 75,
    overall_risk_category: 'High Risk',
    summary_headline: 'Significant Polypharmacy Safety Alerts (1 High-Risk Interaction Identified)',
    normalized_drugs: [
      { raw_input: 'Aspirin', canonical_name: 'Aspirin', rxcui: '1191', drug_class: 'Antiplatelet / NSAID', target: 'COX-1, COX-2' },
      { raw_input: 'Warfarin', canonical_name: 'Warfarin', rxcui: '11289', drug_class: 'Vitamin K Antagonist', target: 'VKORC1' },
      { raw_input: 'Metformin', canonical_name: 'Metformin', rxcui: '6809', drug_class: 'Biguanide Antidiabetic', target: 'AMPK' },
    ],
    pairwise_interactions: [
      {
        drug_a: 'Aspirin',
        drug_b: 'Warfarin',
        severity: 'High Risk',
        risk_level: 'severe',
        interaction_type: 'Pharmacodynamic Synergism',
        mechanism: 'Dual antihemostatic mechanism: Aspirin irreversibly inhibits platelet COX-1 (thromboxane A2 synthesis), while Warfarin impairs hepatic synthesis of coagulation factors II, VII, IX, and X. Concurrent administration exponentially elevates gastrointestinal mucosal and systemic major bleeding hazards without additive antithrombotic benefit in most chronic settings.',
        adverse_events: ['Major Gastrointestinal Bleeding', 'Intracranial Hemorrhage', 'Gastric Ulceration'],
        evidence_level: 'Strong Evidence',
        confidence_score: 0.96,
        citations: [
          {
            source: 'PubMed / CHEST Guidelines',
            pmid: '22315268',
            title: 'Antithrombotic therapy in atrial fibrillation: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: ACCP Guidelines',
            citation: 'You, J. J. et al. (2012) Chest, 141(2 Suppl):e531S-e575S.'
          },
          {
            source: 'openFDA Adverse Event Reporting System',
            fda_signal: 'Increased reporting ratio (ROR 3.84, 95% CI 3.61-4.08) for upper gastrointestinal hemorrhage',
            citation: 'openFDA Pharmacovigilance API Analytics (2024)'
          }
        ],
        doctor_guidance: 'Assess INR frequently; evaluate indication for dual therapy (e.g., mechanical prosthetic valve vs vascular stenting). Consider proton pump inhibitor gastroprotection if combination is strictly required by specialty protocol.',
        uncertainty: 'Low clinical uncertainty; well-established pharmacodynamic synergistic hazard across large prospective cohorts.'
      }
    ],
    higher_order_patterns: [],
    interaction_matrix: [
      { drug_row: 'Aspirin', drug_col: 'Aspirin', severity: 'None', has_interaction: false, summary: 'Self' },
      { drug_row: 'Aspirin', drug_col: 'Warfarin', severity: 'High Risk', has_interaction: true, summary: 'Dual antihemostatic synergism multiplying bleeding risk' },
      { drug_row: 'Aspirin', drug_col: 'Metformin', severity: 'None', has_interaction: false, summary: 'No direct pharmacokinetic conflict' },
      { drug_row: 'Warfarin', drug_col: 'Aspirin', severity: 'High Risk', has_interaction: true, summary: 'Dual antihemostatic synergism multiplying bleeding risk' },
      { drug_row: 'Warfarin', drug_col: 'Warfarin', severity: 'None', has_interaction: false, summary: 'Self' },
      { drug_row: 'Warfarin', drug_col: 'Metformin', severity: 'None', has_interaction: false, summary: 'No direct pharmacokinetic conflict' },
      { drug_row: 'Metformin', drug_col: 'Aspirin', severity: 'None', has_interaction: false, summary: 'No direct pharmacokinetic conflict' },
      { drug_row: 'Metformin', drug_col: 'Warfarin', severity: 'None', has_interaction: false, summary: 'No direct pharmacokinetic conflict' },
      { drug_row: 'Metformin', drug_col: 'Metformin', severity: 'None', has_interaction: false, summary: 'Self' },
    ],
    adverse_event_overlap: [
      { adverse_event: 'Major Gastrointestinal Bleeding', frequency_count: 1, contributing_pairs: ['Aspirin + Warfarin'], hazard_level: 'High' },
      { adverse_event: 'Gastric Ulceration', frequency_count: 1, contributing_pairs: ['Aspirin + Warfarin'], hazard_level: 'High' }
    ],
    clinician_discussion_points: [
      'Evaluate clinical indication for co-prescribing Aspirin and Warfarin. Assess INR frequently; evaluate indication for dual therapy.',
      'Check renal function (eGFR) periodically to ensure safety of Metformin and clearance reserve.'
    ],
    patient_context_considerations: [
      'Geriatric Patient (Age 72): Increased susceptibility to polypharmacy anticholinergic burden and bleeding events.',
      'Renal Impairment (eGFR 52 mL/min/1.73m²): Renally cleared drugs require surveillance.'
    ],
    human_review_required: true,
  };

  const drugNames = data.normalized_drugs?.map((d) => d.canonical_name) || [];

  return (
    <div className="space-y-6">
      {/* Top Bar with Navigation and Report Generator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/doctor/medication-safety"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Back to Input"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Clinical Medication Safety Assessment
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Analysis ID: {data.analysis_id} · Grounded in PubMed & openFDA Surveillance
            </p>
          </div>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Clinical Report (PDF)</span>
        </button>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Overview Banner: Risk Score & Summary */}
      <div
        className={`p-6 rounded-2xl border shadow-sm ${
          data.overall_risk_score >= 65
            ? 'border-rose-200 bg-rose-50/50'
            : data.overall_risk_score >= 35
            ? 'border-amber-200 bg-amber-50/50'
            : 'border-emerald-200 bg-emerald-50/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <RiskBadge severity={data.overall_risk_category} size="lg" />
              {data.human_review_required && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                  Human Review Recommended
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{data.summary_headline}</h2>
            <div className="text-xs text-slate-600 flex flex-wrap gap-2">
              <span>Evaluated Drugs:</span>
              <span className="font-semibold text-slate-800">{drugNames.join(', ')}</span>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Quantified Risk Score
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {data.overall_risk_score}
              <span className="text-sm font-normal text-slate-400"> / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interaction Heatmap & Overlap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interaction Matrix Heatmap & Citations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pairwise Interaction Matrix */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <InteractionMatrix drugs={drugNames} matrixCells={data.interaction_matrix || []} />
          </div>

          {/* Detailed Pairwise Citations & Pharmacokinetic Mechanism Cards */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Detailed Pharmacokinetic Evidence & Citations
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {data.pairwise_interactions?.length || 0} Flagged Pair(s)
              </span>
            </div>

            <div className="space-y-4">
              {data.pairwise_interactions?.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {item.drug_a} ↔ {item.drug_b}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">({item.interaction_type})</span>
                    </div>
                    <RiskBadge severity={item.severity} size="sm" />
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{item.mechanism}</p>

                  <div className="p-3 rounded-lg bg-sky-50/60 border border-sky-100 text-xs space-y-1">
                    <span className="font-bold text-sky-900 text-[11px] uppercase tracking-wider block">
                      Clinician Decision Guidance:
                    </span>
                    <p className="text-sky-950 font-medium">{item.doctor_guidance}</p>
                  </div>

                  {/* Supporting Literature / Regulatory Alerts */}
                  {item.citations?.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Grounded Sources & Citations:
                      </span>
                      {item.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="text-xs p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                          <div className="flex items-center justify-between font-semibold text-slate-800 text-[11px]">
                            <span>{cite.source}</span>
                            {cite.pmid && (
                              <a
                                href={`https://pubmed.ncbi.nlm.nih.gov/${cite.pmid}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 hover:underline flex items-center gap-1 font-mono text-[10px]"
                              >
                                PMID: {cite.pmid} <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600">{cite.title || cite.fda_signal}</p>
                          <p className="text-[10px] text-slate-400 italic">{cite.citation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.uncertainty && (
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Uncertainty: {item.uncertainty}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Discussion Points & Adverse Event Overlap */}
        <div className="lg:col-span-4 space-y-6">
          {/* Clinician Discussion Points */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <h4 className="text-sm font-bold text-slate-900">Suggested Discussion Points</h4>
            </div>
            <p className="text-xs text-slate-500">
              Evidence-based talking points for multidisciplinary clinical rounds and patient visits.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              {data.clinician_discussion_points?.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-sky-600 shrink-0 mt-0.5">•</span>
                  <span className="text-slate-700 leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Adverse Event Overlap */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Adverse Event Hazard Overlap</h4>
            <p className="text-xs text-slate-500">
              Multi-drug synergism elevating specific toxicity clusters.
            </p>
            <div className="space-y-2 text-xs">
              {data.adverse_event_overlap?.map((ae, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{ae.adverse_event}</span>
                    <span className="text-rose-600 font-mono text-[11px]">{ae.hazard_level}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Contributing: {ae.contributing_pairs?.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Context Considerations */}
          {data.patient_context_considerations?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Patient Context Considerations</h4>
              <div className="space-y-2 text-xs">
                {data.patient_context_considerations.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950 text-xs">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to Knowledge Graph */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Biomedical Knowledge Graph
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore the graphical interaction network linking these molecules to their targets and adverse signals.
            </p>
            <Link
              to="/knowledge-graph"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 pt-1"
            >
              <span>Inspect Network Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportType="doctor"
        data={data}
      />
    </div>
  );
};

export default DoctorResults;
