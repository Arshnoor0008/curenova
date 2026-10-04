import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  FileText,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Info,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { evidenceService } from '../services/api';
import RiskBadge from '../components/RiskBadge';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Skeleton, { SkeletonCard } from '../components/ui/Skeleton';

export const EvidenceExplorer = () => {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [evidenceType, setEvidenceType] = useState('all');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [availableSources, setAvailableSources] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  const fetchEvidence = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await evidenceService.search({
        q: query,
        source: source !== 'all' ? source : undefined,
        evidence_type: evidenceType !== 'all' ? evidenceType : undefined,
      });
      setRecords(res.results || []);
      setAvailableSources(res.available_sources || []);
      setAvailableTypes(res.available_evidence_types || []);
    } catch (err) {
      console.error('Failed to load evidence', err);
      setError('Unable to reach evidence repository. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [source, evidenceType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvidence();
  };

  const handleClearFilters = () => {
    setQuery('');
    setSource('all');
    setEvidenceType('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7]">
              <Search className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Biomedical Evidence Explorer
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Curated, peer-reviewed literature and regulatory safety datasets (PubMed, ClinicalTrials.gov, openFDA, ChEMBL)
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Search & Filter Bar */}
      <Card elevation="raised" className="p-5 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by drug (e.g. Metformin), disease (e.g. Alzheimer's), or PMID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Search}
          >
            Search Evidence
          </Button>
        </form>

        {/* Quick Select Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] font-medium">
            <Filter className="w-3.5 h-3.5" /> Sources:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['all', 'PubMed', 'openFDA', 'ClinicalTrials.gov', 'ChEMBL'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSource(s)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  source === s
                    ? 'bg-[#0284c7] text-white shadow-2xs'
                    : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)]'
                }`}
              >
                {s === 'all' ? 'All Sources' : s}
              </button>
            ))}
          </div>

          <span className="text-[var(--color-border-strong)] hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] font-medium">
            Type:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['all', 'Literature', 'SafetySignal', 'ClinicalTrial', 'Pathway'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setEvidenceType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  evidenceType === t
                    ? 'bg-[#0d9488] text-white shadow-2xs'
                    : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)]'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Evidence Results Grid + Shimmer Skeletons + Empty & Error States */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <Card elevation="flat" className="p-8 text-center space-y-3 border-dashed">
          <AlertTriangle className="w-8 h-8 text-[#dc2626] mx-auto" />
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Evidence Retrieval Error</h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-md mx-auto">{error}</p>
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchEvidence}>
            Retry Search
          </Button>
        </Card>
      ) : records.length === 0 ? (
        <Card elevation="flat" className="p-12 text-center space-y-3 border-dashed">
          <BookOpen className="w-8 h-8 text-[var(--color-border-strong)] mx-auto" />
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No Evidence Records Found</h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-md mx-auto">
            No peer-reviewed papers or regulatory signals matched your search criteria. Try broadening your query or resetting filters.
          </p>
          <Button variant="subtle" size="sm" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((rec) => (
            <Card
              key={rec.id}
              elevation="raised"
              className="p-5 flex flex-col justify-between space-y-3 hover:border-[var(--color-border-focus)] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="info" size="sm">
                    {rec.source}
                  </Badge>
                  {rec.evidence_level && (
                    <RiskBadge severity={rec.evidence_level} size="sm" />
                  )}
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-snug line-clamp-2">
                  {rec.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                  {rec.summary || rec.findings}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                  {rec.pmid ? `PMID: ${rec.pmid}` : rec.nct_id ? rec.nct_id : 'openFDA FAERS'}
                </span>

                {rec.url && (
                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand-primary)] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <span>View Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvidenceExplorer;
