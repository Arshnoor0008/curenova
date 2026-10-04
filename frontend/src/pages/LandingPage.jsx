import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ShieldAlert,
  Search,
  Share2,
  Stethoscope,
  Microscope,
  HeartHandshake,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  ChevronRight,
  BookOpen,
  Pill,
  GitFork,
  Target,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export const LandingPage = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  // Interactive Live Model in the Hero
  const [activeHeroModel, setActiveHeroModel] = useState('alzheimers');

  const heroModels = {
    alzheimers: {
      tag: 'Translational Repurposing Candidate',
      disease: "Alzheimer's Disease / Tau Hyperphosphorylation",
      drug: 'Metformin Hydrochloride (RxCUI 6809)',
      target: 'AMPK (PRKAA1) & GSK-3β Dual Modulation',
      pathway: 'Cerebral Glucose Metabolism & Autophagic Clearance',
      evidence: 'Lancet Healthy Longevity (PMID 33188177) · 24% Lower Dementia Hazard',
      ranking: '92.4 / 100',
      confidence: 'High Confidence',
      status: 'Potential Repurposing Candidate',
      statusType: 'safe',
      hazard: false
    },
    cardiology: {
      tag: 'Polypharmacy Synergism Hazard',
      disease: 'Atrial Fibrillation & Ischemic Prophylaxis',
      drug: 'Aspirin (100mg) + Warfarin Sodium (5mg)',
      target: 'Platelet COX-1 + Hepatic VKORC1 Co-Inhibition',
      pathway: 'Secondary Hemostasis & Platelet Thromboxane Suppression',
      evidence: 'CHEST 2024 Guidelines & openFDA Surveillance (ROR 3.84 for Major Bleed)',
      ranking: '75.0 / 100 Risk Score',
      confidence: 'Verified Hazard',
      status: 'Critical Co-Prescription Alert',
      statusType: 'critical',
      hazard: true
    },
    parkinsons: {
      tag: 'Translational Repurposing Candidate',
      disease: "Parkinson's Disease / Dopaminergic Neurodegeneration",
      drug: 'Exenatide (GLP-1 Receptor Agonist)',
      target: 'Neuronal GLP-1R & Mitochondrial PINK1/Parkin Cascade',
      pathway: 'Akt/CREB Neuroprotective Survival Signaling',
      evidence: 'The Lancet (PMID 28781036) Phase II RCT · NCT04232969 Phase III Ongoing',
      ranking: '90.1 / 100',
      confidence: 'High Confidence',
      status: 'Clinical Trial Phase III',
      statusType: 'info',
      hazard: false
    }
  };

  const currentHeroData = heroModels[activeHeroModel];

  const handleRoleQuickStart = async (role) => {
    await switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-ground)] text-[var(--color-text-primary)] transition-colors duration-200">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-white/10 bg-gradient-to-br from-[#0b1e3d] via-[#0a2d4a] to-[#073d3d] dark:from-[#070d19] dark:via-[#0c1628] dark:to-[#050912]">
        {/* Ambient glow orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#0271b0]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#0b8b7e]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#1d4ed8]/15 blur-3xl pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
                <span className="font-semibold text-white">CureNova AI</span>
                <span className="text-white/40">|</span>
                <span className="text-white/70">Biomedical Medication Intelligence Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Turn Biomedical Evidence Into{' '}
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] bg-clip-text text-transparent">
                  Actionable Intelligence.
                </span>
              </h1>

              <p className="max-w-[60ch] text-base sm:text-lg text-white/70 leading-relaxed font-normal">
                CureNova links fragmented biomedical publications, pharmacological databases, and multi-agent AI reasoning to help clinicians evaluate complex polypharmacy regimens and researchers identify viable therapeutic repurposing candidates with transparent evidence grounding.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleRoleQuickStart('doctor')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0271b0] font-semibold text-sm shadow-lg hover:bg-white/90 transition-all duration-150 active:scale-95"
                >
                  <Stethoscope className="w-4 h-4" />
                  Launch Clinician Workspace
                </button>

                <button
                  onClick={() => navigate('/evidence')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-150"
                >
                  <Search className="w-4 h-4" />
                  Explore Evidence Sources
                </button>
              </div>

              {/* Regulatory Notice Banner */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white/80 flex items-start gap-2.5 max-w-xl">
                <ShieldAlert className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-white">Clinical Decision Support Prototype:</strong> Not a prescribing engine. All outputs require independent verification by licensed physicians.
                </span>
              </div>
            </div>

            {/* Right Hero Visual: Connected Live Evidence Chain */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] p-5 sm:p-6 shadow-[var(--shadow-raised)] space-y-4">
                {/* Simulator Switcher Header */}
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                      Live Evidence Chain
                    </span>
                  </div>
                  <Badge variant={currentHeroData.hazard ? 'critical' : 'safe'} size="sm" dot>
                    {currentHeroData.confidence}
                  </Badge>
                </div>

                {/* Model Selector Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[var(--color-surface-sunken)] rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveHeroModel('alzheimers')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'alzheimers'
                        ? 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border-subtle)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    Metformin / AD
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroModel('cardiology')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'cardiology'
                        ? 'bg-[var(--color-surface-card)] text-[#dc2626] shadow-2xs border border-[var(--color-border-subtle)] font-bold'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    Warfarin + ASA
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroModel('parkinsons')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'parkinsons'
                        ? 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border-subtle)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    Exenatide / PD
                  </button>
                </div>

                {/* Visual Biological Chain: Consistent Neutral Cards + Left Accent Bar */}
                <div className="space-y-2 pt-1 transition-opacity duration-200">
                  {[
                    {
                      label: 'Therapeutic Candidate / Regimen',
                      val: currentHeroData.drug,
                      accent: 'border-l-[#0284c7]',
                      icon: Pill,
                      iconColor: 'text-[#0284c7]',
                      badge: 'Drug'
                    },
                    {
                      label: 'Biological Target & Action',
                      val: currentHeroData.target,
                      accent: 'border-l-[#0d9488]',
                      icon: Target,
                      iconColor: 'text-[#0d9488]',
                      badge: 'Target'
                    },
                    {
                      label: 'Cellular Pathway Concurrence',
                      val: currentHeroData.pathway,
                      accent: 'border-l-[#6366f1]',
                      icon: GitFork,
                      iconColor: 'text-[#6366f1]',
                      badge: 'Pathway'
                    },
                    {
                      label: 'Target Condition & Indication',
                      val: currentHeroData.disease,
                      accent: currentHeroData.hazard ? 'border-l-[#dc2626]' : 'border-l-[#d97706]',
                      icon: Activity,
                      iconColor: currentHeroData.hazard ? 'text-[#dc2626]' : 'text-[#d97706]',
                      badge: 'Indication'
                    },
                    {
                      label: 'Peer-Reviewed Source Citation',
                      val: currentHeroData.evidence,
                      accent: 'border-l-[#2563eb]',
                      icon: BookOpen,
                      iconColor: 'text-[#2563eb]',
                      badge: 'Literature'
                    },
                  ].map((node, idx, arr) => {
                    const NodeIcon = node.icon;
                    return (
                      <div key={idx} className="relative">
                        <div
                          className={`p-2.5 rounded-lg border border-[var(--color-border-subtle)] border-l-4 ${node.accent} bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] flex items-center justify-between text-xs transition-colors shadow-2xs`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <NodeIcon className={`w-4 h-4 shrink-0 ${node.iconColor}`} />
                            <div className="min-w-0">
                              <span className="text-[10px] uppercase font-mono font-semibold text-[var(--color-text-muted)] block">
                                {node.label}
                              </span>
                              <div className="font-semibold text-[var(--color-text-primary)] text-xs truncate">
                                {node.val}
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] shrink-0">
                            {node.badge}
                          </span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="h-1.5 w-0.5 bg-[var(--color-border-strong)] mx-auto my-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Outcome Assessment Card */}
                <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)] font-semibold block">
                      Clinical Assessment
                    </span>
                    <Badge variant={currentHeroData.statusType} size="md" dot>
                      {currentHeroData.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)] font-semibold block">
                      Evidence Score
                    </span>
                    <span className="text-sm font-bold tabular text-[var(--color-text-primary)]">
                      {currentHeroData.ranking}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST ROW: EVIDENCE DATABASE MARKS */}
      <section className="py-5 bg-[#0b1e3d] border-b border-white/10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <span className="text-white/50 font-mono font-semibold uppercase tracking-wider text-[11px]">
              Grounded In Peer-Reviewed Repositories:
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium text-white/60">
              <span className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" /> PubMed (36M+ Citations)
              </span>
              <span className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#fbbf24]" /> openFDA FAERS
              </span>
              <span className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf]" /> EMBL-EBI ChEMBL
              </span>
              <span className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#818cf8]" /> Reactome Pathways
              </span>
              <span className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#34d399]" /> ClinicalTrials.gov
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW CURENOVA WORKS (3 STEPS) */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-[var(--color-surface-ground)] border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Architecture & Method
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              How CureNova Works
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
              LangGraph orchestrates four specialized agents to ensure clinical queries are retrieved from trusted literature, connected across biological hierarchies, and rigorously validated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card elevation="raised" className="p-6 space-y-4 border-t-4 border-t-[#0271b0]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0271b0] flex items-center justify-center font-mono font-bold text-sm text-white shadow-md">
                  01
                </div>
                <Search className="w-5 h-5 text-[#0271b0]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Evidence Aggregation & Ingestion
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Normalizes heterogeneous biomedical entities across PubMed citations, ChEMBL target binding affinities, openFDA adverse event incidence, and Reactome cellular pathways into a unified schema.
              </p>
            </Card>

            <Card elevation="raised" className="p-6 space-y-4 border-t-4 border-t-[#0b8b7e]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0b8b7e] flex items-center justify-center font-mono font-bold text-sm text-white shadow-md">
                  02
                </div>
                <Cpu className="w-5 h-5 text-[#0b8b7e]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Multi-Agent Reasoning & Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Specialized retrieval, reasoning, and safety agents evaluate multi-relational graphs: Drug ↔ Target ↔ Pathway ↔ Disease. Computes quantitative risk scores and repurposing congruence metrics.
              </p>
            </Card>

            <Card elevation="raised" className="p-6 space-y-4 border-t-4 border-t-[#047857]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#047857] flex items-center justify-center font-mono font-bold text-sm text-white shadow-md">
                  03
                </div>
                <ShieldCheck className="w-5 h-5 text-[#047857]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Explainable Clinical Delivery
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Delivers structured, role-adapted dossiers with transparent citations (PMID, RxCUI), Digital Twin before/after simulations, and appointment discussion sheets under non-prescribing guardrails.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: CAPABILITY SHOWCASE (TWIN PILLARS) */}
      <section className="py-16 sm:py-20 border-b border-white/10 bg-gradient-to-br from-[#0f1f3d] via-[#0a2a40] to-[#0d2d2d] dark:from-[#070d19] dark:via-[#0c1628] dark:to-[#050912]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Dual Intelligence Engines
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1: Drug Repurposing */}
            <div className="p-7 space-y-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0b8b7e]/25 border border-[#0b8b7e]/40 text-[#2dd4bf]">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Drug Repurposing Engine</h3>
                  <span className="text-xs text-[#2dd4bf] font-medium">For Translational Scientists &amp; Clinical Researchers</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Connect target diseases to clinically approved compounds through target binding profiles, pathway concurrence, and published clinical trials to accelerate translational discovery.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-[#0b8b7e]/30 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-white">
                  <span>Candidate: Metformin in Alzheimer's Disease</span>
                  <span className="font-mono tabular text-[#2dd4bf]">Score: 92.4 / 100</span>
                </div>
                <p className="text-white/60">
                  Activates AMPK, regulates GSK-3β tau hyperphosphorylation, and enhances cerebral glucose uptake.
                </p>
                <div className="text-[11px] text-white/40 font-mono">
                  Grounding: 48 PubMed publications · 2 Active Phase II/III Clinical Trials
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickStart('researcher')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b8b7e] text-white font-semibold text-sm hover:bg-[#0d9488] transition-all duration-150"
              >
                Open Drug Repurposing Portal <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pillar 2: Polypharmacy / Medication Safety */}
            <div className="p-7 space-y-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/30 text-[#f87171]">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Polypharmacy &amp; Medication Safety</h3>
                  <span className="text-xs text-[#f87171] font-medium">For Clinicians, Hospital Pharmacy &amp; Caregivers</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Simulate multi-drug combinations with pairwise pharmacokinetic matrices, higher-order synergistic alerts (e.g. Triple Whammy), and Patient Medication Digital Twin "what-if" testing.
              </p>

              <div className="p-4 rounded-xl bg-[#dc2626]/10 border border-[#dc2626]/25 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-white">
                  <span>Regimen: Aspirin + Warfarin + Metformin</span>
                  <span className="font-mono tabular text-[#f87171]">High Risk (75/100)</span>
                </div>
                <p className="text-white/60">
                  Dual antihemostatic synergism multiplying gastrointestinal mucosal bleeding hazard (openFDA ROR 3.84).
                </p>
                <div className="text-[11px] text-white/40 font-mono">
                  Feature: Digital Twin scenario simulator tests risk delta before regimen updates
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickStart('doctor')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-sm hover:bg-[#b91c1c] transition-all duration-150"
              >
                Open Medication Safety Portal <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THREE TARGET PERSONAS (STRICTLY NO ADMIN) */}
      <section className="py-16 sm:py-20 bg-[var(--color-surface-ground)] border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Target Stakeholders
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Three Dedicated User Experiences
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Identical evidence grounding, dynamically adapted to each clinical role's operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor */}
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between border-t-4 border-t-[#0271b0]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#0271b0] text-white flex items-center justify-center shadow-md">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Clinician / Doctor</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Pairwise interaction matrices, organ clearance adjustments (eGFR, hepatic), adverse event overlap rails, and printable clinical PDF dossiers.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full mt-4"
                onClick={() => handleRoleQuickStart('doctor')}
              >
                Launch Clinician View
              </Button>
            </Card>

            {/* Researcher */}
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between border-t-4 border-t-[#0b8b7e]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#0b8b7e] text-white flex items-center justify-center shadow-md">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Biomedical Researcher</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Target-disease congruence, Reactome biological pathways, literature evidence breakdown bars, and clinical trial phase registries.
                </p>
              </div>
              <Button
                variant="secondary"
                size="md"
                className="w-full mt-4"
                onClick={() => handleRoleQuickStart('researcher')}
              >
                Launch Researcher View
              </Button>
            </Card>

            {/* Patient */}
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between border-t-4 border-t-[#047857]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#047857] text-white flex items-center justify-center shadow-md">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Patient &amp; Caregiver</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Plain-language medication schedules, warning symptoms in human terms, questions to ask the doctor, and printable appointment companion sheets.
                </p>
              </div>
              <Button
                variant="secondary"
                size="md"
                className="w-full mt-4"
                onClick={() => handleRoleQuickStart('patient')}
              >
                Launch Patient View
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: PERSISTENT REGULATORY ADVISORY */}
      <section className="py-12 bg-[var(--color-surface-card)] border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SafetyDisclaimer variant="banner" />
        </div>
      </section>

      {/* SECTION 6: ENTERPRISE FOOTER */}
      <footer className="py-12 bg-[#0b132b] text-slate-400 text-xs border-t border-[#1c2541]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0284c7] text-white">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-200">CureNova</span>
            <span className="text-slate-500">|</span>
            <span>Biomedical Medication Intelligence</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/evidence" className="hover:text-slate-200 transition-colors">
              Evidence Explorer
            </Link>
            <Link to="/knowledge-graph" className="hover:text-slate-200 transition-colors">
              Knowledge Graph
            </Link>
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              About Platform
            </Link>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            © {new Date().getFullYear()} CureNova Platform · Non-Prescribing Med-AI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
