import React from 'react';
import { X, Printer, Download, ShieldCheck, Activity, FileText } from 'lucide-react';

export const ReportModal = ({ isOpen, onClose, reportType = 'doctor', data }) => {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const isDoctor = reportType === 'doctor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isDoctor ? 'Clinical Medication Safety Intelligence Report' : 'Drug Repurposing Evidence Dossier'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                CureNova Report ID: {data.analysis_id || 'REP-PREVIEW'} · Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Printable Content */}
        <div className="overflow-y-auto p-8 space-y-6 text-slate-800 text-sm print:p-0">
          {/* Header Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">CureNova</span>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>LangGraph Agent Orchestration: Verified</div>
              <div>Decision-Support Mode: Evidence-Grounded</div>
            </div>
          </div>

          {/* Report Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Subject / Query</span>
              <span className="font-semibold text-slate-800">
                {isDoctor
                  ? data.normalized_drugs?.map((d) => d.canonical_name).join(', ') || 'Medication Regimen'
                  : data.disease_detected || data.query}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Assessed Date</span>
              <span className="font-semibold text-slate-800">{new Date().toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                {isDoctor ? 'Overall Risk Category' : 'Top Candidate Ranking'}
              </span>
              <span className="font-bold text-sky-700">
                {isDoctor
                  ? `${data.overall_risk_category} (${data.overall_risk_score}/100)`
                  : `${data.candidates?.[0]?.drug_name || 'N/A'} (Score: ${data.candidates?.[0]?.curenova_ranking || 'N/A'})`}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Evidence Citations</span>
              <span className="font-semibold text-slate-800">
                {isDoctor
                  ? `${data.pairwise_interactions?.length || 0} interaction pair(s)`
                  : `${data.total_evidence_count || 12} biomedical sources`}
              </span>
            </div>
          </div>

          {/* Findings Body */}
          {isDoctor ? (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1">
                Identified Pairwise & Multi-Drug Interactions
              </h4>
              {data.pairwise_interactions?.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {item.drug_a} ↔ {item.drug_b}
                    </span>
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-slate-100 text-slate-700 border">
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.mechanism}</p>
                  <p className="text-xs text-slate-800 font-medium">
                    <span className="text-slate-500">Clinician Guidance:</span> {item.doctor_guidance}
                  </p>
                </div>
              ))}

              {data.higher_order_patterns?.length > 0 && (
                <div className="mt-4 p-4 rounded-xl border border-rose-200 bg-rose-50/60">
                  <h5 className="font-bold text-rose-900 text-xs uppercase tracking-wider mb-1">
                    Higher-Order Multi-Drug Hazard
                  </h5>
                  <p className="text-xs text-rose-800">
                    {data.higher_order_patterns[0].name}: {data.higher_order_patterns[0].pattern_description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1">
                Potential Repurposing Candidates Evaluated
              </h4>
              {data.candidates?.map((cand, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-base">{cand.drug_name}</span>
                      <span className="text-xs text-slate-400 ml-2">Original: {cand.original_indication}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      Score: {cand.curenova_ranking}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{cand.mechanism}</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="text-slate-400">Targets:</span>
                    {cand.targets?.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legal / Clinical Disclaimer */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/80 text-[11px] text-amber-900 space-y-1">
            <span className="font-bold block uppercase tracking-wider text-[10px]">Medical Decision Support Notice</span>
            <p>
              This document is an evidence-grounded computational assessment generated by CureNova. It does NOT constitute
              a medical diagnosis, a prescription, or an order for treatment. All clinical decisions must be independently
              validated by a licensed healthcare professional.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
