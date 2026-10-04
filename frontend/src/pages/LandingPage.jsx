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
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-ground)]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-medium shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[#0284c7] animate-pulse" />
                <span className="font-semibold text-[var(--color-text-primary)]">CureNova AI</span>
                <span className="text-[var(--color-border-strong)]">|</span>
                <span className="text-[var(--color-text-muted)]">Biomedical Medication Intelligence Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]">
                Turn Biomedical Evidence Into{' '}
                <span className="bg-gradient-to-r from-[#0284c7] via-[#0d9488] to-[#059669] bg-clip-text text-transparent">
                  Actionable Intelligence.
                </span>
              </h1>

              <p className="max-w-[60ch] text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-normal">
                CureNova links fragmented biomedical publications, pharmacological databases, and multi-agent AI reasoning to help clinicians evaluate complex polypharmacy regimens and researchers identify viable therapeutic repurposing candidates with transparent evidence grounding.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Stethoscope}
                  onClick={() => handleRoleQuickStart('doctor')}
                >
                  Launch Clinician Workspace
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={Search}
                  onClick={() => navigate('/evidence')}
                >
                  Explore Evidence Sources
                </Button>
              </div>

              {/* Regulatory Notice Banner */}
              <div className="p-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] border-l-4 border-l-[var(--color-status-warning)] text-xs text-[var(--color-text-secondary)] flex items-start gap-2.5 max-w-xl shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-[var(--color-status-warning)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Clinical Decision Support Prototype:</strong> Not a prescribing engine. All outputs require independent verification by licensed physicians.
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

      {/* TRUST ROW: MONOCHROME DATABASE MARKS */}
      <section className="py-6 bg-[var(--color-surface-card)] border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <span className="text-[var(--color-text-muted)] font-mono font-semibold uppercase tracking-wider text-[11px]">
              Grounded In Peer-Reviewed Repositories:
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors">
                <Database className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> PubMed (36M+ Citations)
              </span>
              <span className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors">
                <Database className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> openFDA FAERS
              </span>
              <span className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors">
                <Database className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> EMBL-EBI ChEMBL
              </span>
              <span className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors">
                <Database className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> Reactome Pathways
              </span>
              <span className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors">
                <Database className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> ClinicalTrials.gov
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
            <Card elevation="raised" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] flex items-center justify-center font-mono font-bold text-sm text-[var(--color-brand-primary)]">
                  01
                </div>
                <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Evidence Aggregation & Ingestion
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Normalizes heterogeneous biomedical entities across PubMed citations, ChEMBL target binding affinities, openFDA adverse event incidence, and Reactome cellular pathways into a unified schema.
              </p>
            </Card>

            <Card elevation="raised" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] flex items-center justify-center font-mono font-bold text-sm text-[#0d9488]">
                  02
                </div>
                <Cpu className="w-5 h-5 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Multi-Agent Reasoning & Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Specialized retrieval, reasoning, and safety agents evaluate multi-relational graphs: Drug ↔ Target ↔ Pathway ↔ Disease. Computes quantitative risk scores and repurposing congruence metrics.
              </p>
            </Card>

            <Card elevation="raised" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] flex items-center justify-center font-mono font-bold text-sm text-[#059669]">
                  03
                </div>
                <ShieldCheck className="w-5 h-5 text-[var(--color-text-muted)]" />
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
      <section className="py-16 sm:py-20 bg-[var(--color-surface-card)] border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Dual Intelligence Engines
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1: Drug Repurposing */}
            <Card elevation="raised" className="p-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488]">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Drug Repurposing Engine</h3>
                  <span className="text-xs text-[#0d9488] font-medium">For Translational Scientists & Clinical Researchers</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Connect target diseases to clinically approved compounds through target binding profiles, pathway concurrence, and published clinical trials to accelerate translational discovery.
              </p>

              <div className="p-4 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[var(--color-text-primary)]">
                  <span>Candidate: Metformin in Alzheimer's Disease</span>
                  <span className="font-mono tabular text-[#0d9488]">Score: 92.4 / 100</span>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  Activates AMPK, regulates GSK-3β tau hyperphosphorylation, and enhances cerebral glucose uptake.
                </p>
                <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  Grounding: 48 PubMed publications · 2 Active Phase II/III Clinical Trials
                </div>
              </div>

              <Button
                variant="secondary"
                size="md"
                className="w-full"
                icon={ChevronRight}
                iconPosition="right"
                onClick={() => handleRoleQuickStart('researcher')}
              >
                Open Drug Repurposing Portal
              </Button>
            </Card>

            {/* Pillar 2: Polypharmacy / Medication Safety */}
            <Card elevation="raised" className="p-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7]">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Polypharmacy & Medication Safety</h3>
                  <span className="text-xs text-[#0284c7] font-medium">For Clinicians, Hospital Pharmacy & Caregivers</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Simulate multi-drug combinations with pairwise pharmacokinetic matrices, higher-order synergistic alerts (e.g. Triple Whammy), and Patient Medication Digital Twin "what-if" testing.
              </p>

              <div className="p-4 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[var(--color-text-primary)]">
                  <span>Regimen: Aspirin + Warfarin + Metformin</span>
                  <span className="font-mono tabular text-[#dc2626]">High Risk (75/100)</span>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  Dual antihemostatic synergism multiplying gastrointestinal mucosal bleeding hazard (openFDA ROR 3.84).
                </p>
                <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  Feature: Digital Twin scenario simulator tests risk delta before regimen updates
                </div>
              </div>

              <Button
                variant="secondary"
                size="md"
                className="w-full"
                icon={ChevronRight}
                iconPosition="right"
                onClick={() => handleRoleQuickStart('doctor')}
              >
                Open Medication Safety Portal
              </Button>
            </Card>
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
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7] flex items-center justify-center">
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
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0d9488] flex items-center justify-center">
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
            <Card elevation="raised" className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#059669] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Patient & Caregiver</h3>
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
