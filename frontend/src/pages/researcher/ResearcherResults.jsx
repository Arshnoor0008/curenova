import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Microscope,
  FileText,
  ChevronLeft,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';
import ReportModal from '../../components/ReportModal';

export const ResearcherResults = () => {
  const location = useLocation();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Fallback demo data if accessed directly
  const data = location.state?.candidateData || {
    drug_name: 'Metformin',
    original_indication: 'Type 2 Diabetes Mellitus',
    disease: "Alzheimer's Disease",
    status_label: 'Potential Repurposing Candidate',
    curenova_ranking: 92.4,
    evidence_strength: 'Strong Evidence',
    confidence_score: 0.88,
    mechanism: 'AMPK activation improves neuronal metabolic resilience, reduces tau hyperphosphorylation via GSK3β inhibition, and suppresses microglial neuroinflammation.',
    targets: ['AMPK (PRKAA1)', 'GSK3B', 'mTORC1'],
    pathways: ['Neuronal glucose utilization', 'Tau hyperphosphorylation regulation', 'Autophagy clearance'],
    supporting_papers: [
      {
        pmid: '33188177',
        title: 'Metformin treatment is associated with reduced dementia incidence in large electronic health records cohort',
        journal: 'Lancet Healthy Longev',
        year: 2021,
        citation: 'Shi, Q. et al. (2021) Lancet Healthy Longev, 2(11):e712-e722.'
      },
      {
        pmid: '35447192',
        title: 'Effects of Metformin on cerebral glucose metabolism in mild cognitive impairment: Phase II biomarker analysis',
        journal: 'JAMA Neurology',
        year: 2022,
        citation: 'Koenig, A. M. et al. (2022) JAMA Neurol, 79(6):592-602.'
      }
    ],
    clinical_trials: [
      {
        nct_id: 'NCT04098666',
        title: 'Metformin in Preventing Cognitive Decline in Older Adults (MAP4AD)',
        phase: 'Phase II/III',
        status: 'Active, Recruiting',
        enrollment: 370
      }
    ],
    safety_signals: [
      'Monitor renal function (eGFR < 30 mL/min contraindicated)',
      'Long-term use may reduce Vitamin B12 absorption in elderly cohorts'
    ],
    limitations: [
      'Clinical benefit in non-diabetic cognitive cohorts requires Phase III confirmation',
      'Blood-brain barrier transport kinetics remain under investigation'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/researcher/drug-repurposing"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Back to Discovery"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Candidate Repurposing Dossier: {data.drug_name}
            </h1>
            <p className="text-xs text-slate-500">
              Target Condition: {data.disease || "Alzheimer's Disease"} · Label: {data.status_label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-teal-700" />
            <span>Export Dossier (PDF)</span>
          </button>
          <Link
            to="/knowledge-graph"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Open in Knowledge Graph</span>
          </Link>
        </div>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Dossier Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {data.status_label}
              </span>
              <RiskBadge severity={data.evidence_strength} size="sm" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">{data.drug_name}</h2>
            <p className="text-xs text-slate-500">Original Indication: {data.original_indication}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              CureNova Ranking
            </span>
            <span className="text-3xl font-extrabold text-teal-700 font-mono">
              {data.curenova_ranking}
              <span className="text-sm font-normal text-slate-400"> / 100</span>
            </span>
          </div>
        </div>

        {/* Biological Mechanism */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Biological Mechanism & Target Engagement
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200">
            {data.mechanism}
          </p>
        </div>

        {/* Targets & Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Validated Target Proteins</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.targets?.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-mono font-semibold border border-teal-100">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reactome Pathways Involved</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.pathways?.map((p, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-medium border border-sky-100">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Supporting Literature Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Supporting Publications (PubMed / ChEMBL)
          </h3>
          <div className="space-y-2">
            {data.supporting_papers?.map((paper, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-800">{paper.title}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{paper.citation}</div>
                </div>
                {paper.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 font-mono text-xs text-teal-700 font-bold hover:underline"
                  >
                    PMID: {paper.pmid} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Trials Table */}
        {data.clinical_trials?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Clinical Trial Precedents (ClinicalTrials.gov)
            </h3>
            <div className="space-y-2">
              {data.clinical_trials.map((trial, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="font-mono text-teal-700">{trial.nct_id}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">{trial.phase}</span>
                    </div>
                    <div className="text-slate-600 text-xs mt-0.5">{trial.title}</div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 shrink-0">{trial.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Signals */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-950 space-y-1.5">
          <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-800">
            Preclinical & Regulatory Safety Signals:
          </span>
          {data.safety_signals?.map((s, i) => (
            <div key={i}>• {s}</div>
          ))}
          {data.limitations?.map((l, i) => (
            <div key={i} className="text-amber-800">• {l}</div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportType="researcher"
        data={{
          analysis_id: 'DOSSIER-EXP',
          disease_detected: data.disease || "Alzheimer's Disease",
          candidates: [data],
          total_evidence_count: 12
        }}
      />
    </div>
  );
};

export default ResearcherResults;
