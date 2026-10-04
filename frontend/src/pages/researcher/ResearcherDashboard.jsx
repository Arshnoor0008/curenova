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
  Database,
  GitFork
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { repurposingService } from '../../services/api';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

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
      {/* ── Colorful Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0a2e2b 0%, #0d9488 55%, #0891b2 100%)',
        }}
      >
        <div className="absolute top-[-30px] right-[-30px] w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[40%] w-40 h-40 rounded-full bg-[#2dd4bf]/20 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Microscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Researcher Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Translational Research Portal
            </h1>
            <p className="text-sm text-white/65 max-w-[55ch]">
              Welcome, <strong className="text-white">{user?.name || 'Researcher'}</strong>. Discover repurposing candidates through target-disease alignment and peer-reviewed evidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">4</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Disease Models</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">12</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Candidates Ranked</div>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={() => navigate('/researcher/drug-repurposing')}
              className="shrink-0 !bg-white !text-[#0d9488] hover:!bg-white/90 self-center"
            >
              New Query
            </Button>
          </div>
        </div>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Main Grid: Disease Models & Hypothesis Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curated Disease Models */}
        <div className="lg:col-span-8">
          <Card elevation="raised">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Curated Target Disease Models</CardTitle>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Pre-compiled biological targets, cellular pathways, and known small-molecule candidates
                </p>
              </div>
              <Button
                variant="subtle"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/researcher/drug-repurposing')}
              >
                Custom Search
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {diseases.map((d, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleLaunchDisease(d.name)}
                    className="p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:border-[#0d9488] hover:shadow-xs transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[#0d9488] transition-colors">
                          {d.name}
                        </h4>
                        <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                          {d.category || 'Pathology Model'}
                        </span>
                      </div>
                      <Badge variant="info" size="sm">
                        {d.total_candidates || 3} Candidates
                      </Badge>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {d.pathophysiology || 'Complex multifactorial disease with multiple druggable molecular targets.'}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)] text-xs text-[#0d9488] font-semibold">
                      <span>Explore Repurposing Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Rail: Intelligence Tools */}
        <div className="lg:col-span-4 space-y-4">
          <Card elevation="raised" className="p-5 space-y-4 border-l-4 border-l-[#0d9488]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Knowledge Graph Explorer
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">Multi-Relational Network Visualizer</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Explore interconnected nodes representing chemical compounds, protein targets, Reactome biological pathways, and clinical trial evidence.
            </p>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/knowledge-graph')}
            >
              Launch Knowledge Graph
            </Button>
          </Card>

          <Card elevation="raised" className="p-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Biomedical Evidence Sources
            </h4>
            <div className="space-y-2 text-xs">
              <Link
                to="/evidence"
                className="block p-3 rounded-xl hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] transition-colors"
              >
                <strong className="text-[var(--color-text-primary)] block">EMBL-EBI ChEMBL</strong>
                <span className="text-[var(--color-text-muted)] text-[11px]">2.4M+ bioactive molecules with binding assays</span>
              </Link>
              <Link
                to="/evidence"
                className="block p-3 rounded-xl hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] transition-colors"
              >
                <strong className="text-[var(--color-text-primary)] block">Reactome Pathway Database</strong>
                <span className="text-[var(--color-text-muted)] text-[11px]">Curated human biochemical reaction cascades</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
