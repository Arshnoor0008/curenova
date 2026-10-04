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
  Info
} from 'lucide-react';
import { evidenceService } from '../services/api';
import RiskBadge from '../components/RiskBadge';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

export const EvidenceExplorer = () => {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [evidenceType, setEvidenceType] = useState('all');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [availableSources, setAvailableSources] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  const fetchEvidence = async () => {
    setLoading(true);
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

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-sky-100 text-sky-700">
                <Search className="w-4 h-4" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Biomedical Evidence Explorer
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated, peer-reviewed literature and regulatory safety datasets (PubMed, ClinicalTrials.gov, openFDA, ChEMBL)
            </p>
          </div>
          <SafetyDisclaimer variant="compact" />
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by drug (e.g. Metformin), disease (e.g. Alzheimer's), or keyword..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Filter Records
            </button>
          </form>

          {/* Quick Select Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-semibold">Source:</span>
            </div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Sources</option>
              {availableSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-slate-500 ml-2">
              <Layers className="w-3.5 h-3.5" />
              <span className="font-semibold">Study Type:</span>
            </div>
            <select
              value={evidenceType}
              onChange={(e) => setEvidenceType(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Study Designs</option>
              {availableTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <span className="ml-auto text-xs text-slate-400 font-mono">
              Found {records.length} evidence artifact{records.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Results Grid & Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Evidence Cards */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                Retrieving biomedical records...
              </div>
            ) : records.length === 0 ? (
              <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                No matching evidence records found for the query. Try clearing filters.
              </div>
            ) : (
              records.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedRecord?.id === rec.id
                      ? 'border-sky-500 bg-sky-50/30 shadow-md ring-2 ring-sky-500/10'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {rec.source}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">· {rec.journal}</span>
                      <span className="text-xs text-slate-400 font-mono">({rec.year})</span>
                    </div>
                    <RiskBadge severity={rec.evidence_strength} size="sm" />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-sky-600 transition-colors">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {rec.abstract_snippet}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>
                        Drug: <strong className="text-slate-800">{rec.drug}</strong>
                      </span>
                      <span>·</span>
                      <span>
                        Target Disease: <strong className="text-slate-800">{rec.disease}</strong>
                      </span>
                    </div>
                    <span className="text-sky-600 font-medium flex items-center gap-1">
                      Inspect Artifact <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Side Inspector Drawer */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              {selectedRecord ? (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Evidence Details
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-sky-50 text-sky-700">
                      PMID: {selectedRecord.pmid || 'Clinical Record'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {selectedRecord.title}
                    </h4>
                    {selectedRecord.authors && (
                      <p className="text-xs text-slate-400 mt-1 italic">{selectedRecord.authors}</p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Source Database:</span>
                      <span className="font-semibold text-slate-800">{selectedRecord.source}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Study Design:</span>
                      <span className="font-semibold text-slate-800">{selectedRecord.evidence_type}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Biomedical Relevance:</span>
                      <span className="font-mono font-semibold text-sky-700">
                        {Math.round(selectedRecord.relevance_score * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-400">Publication Year:</span>
                      <span className="font-semibold text-slate-800">{selectedRecord.year}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Study Abstract / Finding Snippet:
                    </span>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-60 overflow-y-auto">
                      {selectedRecord.abstract_snippet}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-xs font-bold text-slate-700">Formal Citation:</span>
                    <p className="text-xs font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-words">
                      {selectedRecord.citation}
                    </p>
                  </div>

                  {selectedRecord.link && (
                    <a
                      href={selectedRecord.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open in External Repository ({selectedRecord.source})
                    </a>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">Select any record from the left to inspect detailed citations and extracts.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceExplorer;
