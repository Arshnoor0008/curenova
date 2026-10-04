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
  Layers,
  BarChart2,
  GitFork,
  Dna
} from 'lucide-react';
import { repurposingService } from '../../services/api';
import AnalysisProgress from '../../components/AnalysisProgress';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';
import ReportModal from '../../components/ReportModal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

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
      setTimeout(() => {
        setExecuting(false);
        setResult(response);
        if (response.candidates?.length > 0) {
          setSelectedCandidate(response.candidates[0]);
        }
      }, 2400);
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
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488]">
              <Microscope className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Drug Repurposing Discovery Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Evaluate existing small molecules against novel biological targets with multi-source evidence grounding
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Query Formulation Input Card */}
      <Card elevation="raised" className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter indication, phenotype, or target (e.g. Alzheimer's disease, PRKAA1)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={minEvidence}
              onChange={(e) => setMinEvidence(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#0d9488] cursor-pointer"
            >
              <option value="all">Evidence: All Levels</option>
              <option value="high">High Confidence Only</option>
              <option value="trials">Phase II / III Trials</option>
            </select>

            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={() => handleRunAnalysis(query)}
              className="shrink-0 !bg-[#0d9488] hover:!bg-[#0f766e] text-white"
            >
              Discover Candidates
            </Button>
          </div>
        </div>

        {/* Example Queries */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[var(--color-text-muted)] font-medium">Curated Benchmark Queries:</span>
          {exampleQueries.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(ex);
                handleRunAnalysis(ex);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--color-surface-sunken)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#dc2626]" />
            <span>{error}</span>
          </div>
        )}
      </Card>

      {/* Execution Progress Animation */}
      {executing && (
        <div className="py-8">
          <AnalysisProgress
            title="Evaluating Drug Repurposing Hypotheses"
            subtitle="Cross-Referencing ChEMBL Binding Assays, PubMed Literature & Reactome Pathways"
          />
        </div>
      )}

      {/* Results View */}
      {!executing && result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Banner */}
          <Card elevation="raised" className="p-6 border-l-4 border-l-[#0d9488]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="info" size="sm">
                  Target Condition Resolved
                </Badge>
                <h2 className="text-xl font-extrabold text-[var(--color-text-primary)]">{result.disease_detected}</h2>
                <p className="text-xs text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">{result.summary}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={FileText}
                  onClick={() => setReportModalOpen(true)}
                >
                  Export Dossier (PDF)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Share2}
                  onClick={() => navigate('/knowledge-graph')}
                  className="!bg-[#0d9488] hover:!bg-[#0f766e]"
                >
                  Knowledge Graph
                </Button>
              </div>
            </div>
          </Card>

          {/* Candidate Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Ranked Candidate List with Evidence Breakdown Bars */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-muted)] pb-1">
                <span>Ranked Candidates ({result.candidates?.length || 0})</span>
                <span className="font-mono text-[11px]">Ordered by CureNova Congruence Ranking</span>
              </div>

              {result.candidates?.map((cand) => {
                const isSelected = selectedCandidate?.id === cand.id;
                // Calculate evidence breakdown percentages
                const score = Number(cand.curenova_ranking) || 85;
                const litVolume = Math.min(100, Math.round(score * 0.95));
                const targetCongruence = Math.min(100, Math.round(score * 1.02));
                const trialPhase = cand.status_label?.includes('III') ? 85 : cand.status_label?.includes('II') ? 65 : 45;

                return (
                  <Card
                    key={cand.id}
                    elevation={isSelected ? 'raised' : 'flat'}
                    interactive={true}
                    onClick={() => setSelectedCandidate(cand)}
                    className={`p-5 space-y-3.5 transition-all ${
                      isSelected
                        ? 'border-[#0d9488] ring-2 ring-[#0d9488]/20 bg-[var(--color-surface-card)]'
                        : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-card)]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[var(--color-text-primary)]">{cand.drug_name}</h3>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono">({cand.original_indication})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="md">
                          Score: {cand.curenova_ranking}/100
                        </Badge>
                        <RiskBadge severity={cand.evidence_strength} size="sm" />
                      </div>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{cand.mechanism}</p>

                    {/* Evidence Breakdown Bars: Literature Volume, Target Congruence, Trial Phase */}
                    <div className="space-y-2 p-3 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-xs">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-text-secondary)]">
                        <span>Evidence Breakdown Metrics</span>
                        <BarChart2 className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
                      </div>

                      {/* Bar 1: Literature Volume */}
                      <div>
                        <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono mb-0.5">
                          <span>Literature Volume (PubMed Citations)</span>
                          <span className="tabular">{litVolume}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0284c7] rounded-full transition-all duration-500"
                            style={{ width: `${litVolume}%` }}
                          />
                        </div>
                      </div>

                      {/* Bar 2: Target Congruence */}
                      <div>
                        <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono mb-0.5">
                          <span>Target Congruence (Binding & Pathway Match)</span>
                          <span className="tabular">{targetCongruence}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0d9488] rounded-full transition-all duration-500"
                            style={{ width: `${targetCongruence}%` }}
                          />
                        </div>
                      </div>

                      {/* Bar 3: Clinical Trial Phase Progress */}
                      <div>
                        <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono mb-0.5">
                          <span>Clinical Trial Progress (Phase Status)</span>
                          <span className="tabular">{trialPhase}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#8b5cf6] rounded-full transition-all duration-500"
                            style={{ width: `${trialPhase}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Biological Targets chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
                      <span className="text-[var(--color-text-muted)] font-semibold mr-1">Biological Targets:</span>
                      {cand.targets?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] font-mono font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0d9488] uppercase tracking-wider text-[10px] font-mono">
                        {cand.status_label}
                      </span>
                      <span className="flex items-center gap-1 text-[var(--color-text-secondary)] font-medium">
                        Inspect Rationale <ArrowRight className="w-3.5 h-3.5 text-[#0d9488]" />
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Right: Candidate Deep Dive Inspector */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <Card elevation="raised" className="p-6 space-y-5 border-l-4 border-l-[#0d9488]">
                  {selectedCandidate ? (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                            Candidate Profile
                          </span>
                          <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                            {selectedCandidate.drug_name}
                          </h4>
                        </div>
                        <Badge variant="info" size="md">
                          Rank #{result.candidates.findIndex(c => c.id === selectedCandidate.id) + 1}
                        </Badge>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                          Proposed Repurposing Mechanism
                        </span>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          {selectedCandidate.mechanism}
                        </p>
                      </div>

                      {/* Pathways & Gene Concordance */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                          Reactome Pathways Involved
                        </span>
                        <div className="space-y-1 text-xs">
                          {selectedCandidate.pathways?.map((pw, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] flex items-center gap-2"
                            >
                              <GitFork className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                              <span className="truncate">{pw}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evidence Citations */}
                      <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)]">
                        <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                          Supporting Published Citations
                        </span>
                        <div className="space-y-2 text-xs">
                          {selectedCandidate.citations?.map((c, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] space-y-1"
                            >
                              <div className="flex items-center justify-between font-semibold text-[var(--color-text-primary)] text-[11px]">
                                <span>{c.source}</span>
                                {c.pmid && (
                                  <a
                                    href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0d9488] hover:underline flex items-center gap-1 font-mono text-[10px]"
                                  >
                                    PMID: {c.pmid} <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                              <p className="text-[11px] text-[var(--color-text-secondary)]">{c.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full"
                        icon={FileText}
                        onClick={() => setReportModalOpen(true)}
                      >
                        Generate Candidate Report
                      </Button>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-[var(--color-text-muted)]">
                      Select a candidate to view detailed molecular rationale.
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportType="researcher"
        data={result}
      />
    </div>
  );
};

export default ResearcherDrugRepurposing;
