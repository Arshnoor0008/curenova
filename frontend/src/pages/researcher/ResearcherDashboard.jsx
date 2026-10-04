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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488]">
              <Microscope className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Translational Research Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Welcome, {user?.name || 'Dr. Marcus Vance, PhD'}. Evidence-grounded drug repurposing and target alignment.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Sparkles}
          onClick={() => navigate('/researcher/drug-repurposing')}
          className="shrink-0 !bg-[#0d9488] hover:!bg-[#0f766e]"
        >
          New Repurposing Query
        </Button>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Curated Disease Models"
          value="4 Models"
          subtitle="Neurodegenerative, oncology & metabolic"
          icon={Database}
        />

        <StatCard
          title="Ranked Candidates"
          value="12 Compounds"
          change="+4 Novel"
          changeType="positive"
          subtitle="Scored via CureNova target alignment"
          icon={Layers}
        />

        <StatCard
          title="Clinical Trials Indexed"
          value="8 Trials"
          subtitle="Phase II & III interventional registries"
          icon={Activity}
        />

        <StatCard
          title="Literature Grounding"
          value="100%"
          subtitle="Verified by PubMed & ChEMBL assays"
          badgeText="Verified"
          icon={CheckCircle2}
        />
      </div>

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
