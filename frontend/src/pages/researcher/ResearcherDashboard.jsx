import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Microscope,
  Search,
  Share2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Activity,
  CheckCircle2,
  Layers,
  HelpCircle,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { repurposingService } from '../../services/api';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import RiskBadge from '../../components/RiskBadge';

export const ResearcherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repurposingService
      .getDiseases()
      .then((res) => setDiseases(res.diseases || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLaunchDisease = (name) => {
    navigate('/researcher/drug-repurposing', { state: { prefilledQuery: name } });
  };

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
              Translational Research Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome, {user?.name || 'Dr. Marcus Vance'}. AI-driven drug repurposing hypothesis exploration.
          </p>
        </div>

        <Link
          to="/researcher/drug-repurposing"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Repurposing Query</span>
        </Link>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Target Disease Models</span>
            <span className="p-1 rounded-md bg-teal-50 text-teal-600">
              <Database className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">4 Curated</div>
          <div className="text-[11px] text-teal-600 font-medium">Neurodegenerative, oncology & metabolic</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Ranked Candidates</span>
            <span className="p-1 rounded-md bg-sky-50 text-sky-600">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">12 Molecules</div>
          <div className="text-[11px] text-slate-500">Labeled as Potential Repurposing Candidates</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Clinical Trials Indexed</span>
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-600">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">8 Trials</div>
          <div className="text-[11px] text-indigo-600 font-medium">Phase II/III interventional studies</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Evidence Validation</span>
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">100%</div>
          <div className="text-[11px] text-slate-500">Peer-reviewed PubMed & ChEMBL citations</div>
        </div>
      </div>

      {/* Target Diseases Grid */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Curated Disease Repurposing Profiles</h3>
            <p className="text-xs text-slate-500">Select any target indication to initiate multi-agent evidence exploration</p>
          </div>
          <Link
            to="/researcher/drug-repurposing"
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            Custom Query <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diseases.map((d) => (
            <div
              key={d.id}
              onClick={() => handleLaunchDisease(d.name)}
              className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-teal-50/20 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                  MeSH: {d.mesh_id || 'D000544'}
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full">
                  {d.candidate_count} Repurposing Candidates
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {d.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {d.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-teal-700 font-semibold">
                <span>Evaluate Candidates & Mechanism</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explainable Hypothesis Generation Notice */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
        <h4 className="font-bold text-slate-800">CureNova Evidence Ranking Methodology</h4>
        <p className="text-slate-600 leading-relaxed">
          The CureNova Evidence Ranking computes a multi-factorial score (0–100) reflecting target binding affinity,
          biological pathway congruence, volume of peer-reviewed publications, and clinical trial progression. All
          outputs are strictly designated as <strong>"Potential Repurposing Candidates"</strong> to ensure ethical and
          scientific rigor.
        </p>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
