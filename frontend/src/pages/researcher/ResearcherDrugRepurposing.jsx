import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Microscope,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Share2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';
import { repurposingService } from '../../services/api';
import AnalysisProgress from '../../components/AnalysisProgress';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';
import ReportModal from '../../components/ReportModal';

export const ResearcherDrugRepurposing = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState(location.state?.prefilledQuery || "Alzheimer's disease");
  const [minEvidence, setMinEvidence] = useState('all');
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const exampleQueries = [
    "Alzheimer's disease",
    "Parkinson's disease",
    "Glioblastoma Multiforme",
    "Diabetic Nephropathy / Type 2 Diabetes"
  ];

  const handleRunAnalysis = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError('Please provide a research disease or target query.');
      return;
    }
    setError('');
    setExecuting(true);
    setResult(null);

    try {
      const response = await repurposingService.analyze(searchQuery, minEvidence);
      // Wait for multi-agent animation
      setTimeout(() => {
        setExecuting(false);
        setResult(response);
        if (response.candidates?.length > 0) {
          setSelectedCandidate(response.candidates[0]);
        }
      }, 2600);
    } catch (err) {
      setExecuting(false);
      setError(err.message || 'Repurposing analysis failed.');
    }
  };

  useEffect(() => {
    if (location.state?.prefilledQuery) {
      handleRunAnalysis(location.state.prefilledQuery);
    }
  }, [location.state?.prefilledQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-700">
              <Microscope className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Drug Repurposing Discovery Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate existing small molecules against novel biological targets with multi-source evidence grounding
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Query Formulation Input Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter disease (e.g. Alzheimer's disease), target protein, or query..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-600 focus:outline-hidden transition-all"
            />
          </div>

          <button
            onClick={() => handleRunAnalysis(query)}
            disabled={executing}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{executing ? 'Analyzing Evidence...' : 'Initiate Discovery'}</span>
          </button>
        </div>

        {/* Quick Example Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold">Curated Examples:</span>
          {exampleQueries.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(ex);
                handleRunAnalysis(ex);
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 text-slate-700 transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Analysis Execution Progress */}
      {executing && (
        <div className="py-8">
          <AnalysisProgress
            title="LangGraph Repurposing Pipeline Active"
            subtitle="Harmonizing PubMed, ChEMBL Bioactivities, Reactome Pathways, and ClinicalTrials.gov"
          />
        </div>
      )}

      {/* Results View */}
      {!executing && result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50/50 to-sky-50/50 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                Target Condition Resolved
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">{result.disease_detected}</h2>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">{result.summary}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setReportModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-700" />
                <span>Download Report (PDF)</span>
              </button>
              <Link
                to="/knowledge-graph"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Knowledge Graph</span>
              </Link>
            </div>
          </div>

          {/* Candidate Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Ranked Candidate List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1">
                <span>Ranked Potential Repurposing Candidates ({result.candidates?.length || 0})</span>
                <span className="text-[11px] text-slate-400">Ordered by CureNova Evidence Ranking</span>
              </div>

              {result.candidates?.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedCandidate?.id === cand.id
                      ? 'border-teal-600 bg-teal-50/20 shadow-md ring-2 ring-teal-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{cand.drug_name}</h3>
                      <span className="text-xs text-slate-400 font-medium">({cand.original_indication})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        Score: {cand.curenova_ranking}/100
                      </span>
                      <RiskBadge severity={cand.evidence_strength} size="sm" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{cand.mechanism}</p>

                  {/* Badges for targets & pathways */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="text-slate-400 font-semibold mr-1">Biological Targets:</span>
                    {cand.targets?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-teal-700 uppercase tracking-wider text-[10px]">
                      {cand.status_label}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      Inspect Biological Rationale <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Candidate Deep Dive Inspector */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
                {selectedCandidate ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                          {selectedCandidate.status_label}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 mt-1">
                          {selectedCandidate.drug_name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          CureNova Ranking
                        </span>
                        <span className="text-2xl font-extrabold text-teal-700 font-mono">
                          {selectedCandidate.curenova_ranking}
                        </span>
                      </div>
                    </div>

                    {/* Why Ranked Section */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Why Ranked as Candidate?
                      </span>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        {selectedCandidate.why_ranked?.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-teal-50/40 border border-teal-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supporting Publications */}
                    {selectedCandidate.supporting_papers?.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                          Supporting Peer-Reviewed Literature:
                        </span>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {selectedCandidate.supporting_papers.map((p, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800">
                                <span>{p.journal} ({p.year})</span>
                                {p.pmid && (
                                  <a
                                    href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 hover:underline flex items-center gap-1 font-mono text-[10px]"
                                  >
                                    PMID: {p.pmid} <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium">{p.title}</p>
                              <p className="text-[10px] text-slate-400 italic">{p.citation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Trials Table */}
                    {selectedCandidate.clinical_trials?.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                          Clinical Trial Precedents (ClinicalTrials.gov):
                        </span>
                        <div className="space-y-1.5 text-xs">
                          {selectedCandidate.clinical_trials.map((trial, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-0.5">
                              <div className="flex justify-between font-semibold text-[11px] text-slate-800">
                                <span className="font-mono text-teal-700">{trial.nct_id}</span>
                                <span className="text-slate-500">{trial.phase}</span>
                              </div>
                              <p className="text-[11px] text-slate-600">{trial.title}</p>
                              <div className="text-[10px] text-slate-400">
                                Status: <strong>{trial.status}</strong> · Enrollment: {trial.enrollment || 'N/A'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Safety Signals & Limitations */}
                    <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-950 space-y-1.5">
                      <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-800">
                        Safety Signals & Limitations:
                      </span>
                      {selectedCandidate.safety_signals?.map((s, idx) => (
                        <div key={idx} className="text-[11px]">• {s}</div>
                      ))}
                      {selectedCandidate.limitations?.map((l, idx) => (
                        <div key={idx} className="text-[11px] text-amber-800">• {l}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs">Select any candidate from the left to view biological mechanisms, clinical trials, and citations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {result && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          reportType="researcher"
          data={result}
        />
      )}
    </div>
  );
};

export default ResearcherDrugRepurposing;
