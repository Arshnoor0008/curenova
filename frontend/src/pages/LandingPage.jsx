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
  Sparkles,
  Layers,
  FileCheck,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Zap,
  Lock,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import RiskBadge from '../components/RiskBadge';

export const LandingPage = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  // Interactive Live Model in the Hero
  const [activeHeroModel, setActiveHeroModel] = useState('alzheimers');

  const heroModels = {
    alzheimers: {
      tag: 'Translational Repurposing Model',
      disease: "Alzheimer's Disease / Tauopathy",
      drug: 'Metformin Hydrochloride (RxCUI 6809)',
      target: 'AMPK (PRKAA1) & GSK3β Modulation',
      pathway: 'Cerebral Glucose & Autophagy Clearance',
      evidence: 'Lancet Healthy Longevity (PMID 33188177) · 24% Lower Dementia Hazard',
      ranking: '92.4 / 100',
      status: 'Potential Repurposing Candidate',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    cardiology: {
      tag: 'Polypharmacy Safety Synergism',
      disease: 'Atrial Fibrillation & Ischemic Prophylaxis',
      drug: 'Aspirin (100mg) + Warfarin Sodium (5mg)',
      target: 'Platelet COX-1 + VKORC1 Co-Inhibition',
      pathway: 'Platelet Aggregation & Coagulation Cascade',
      evidence: 'CHEST Guidelines & openFDA Surveillance (ROR 3.84 for Bleeding)',
      ranking: 'High Risk (Score: 75/100)',
      status: 'Critical Co-Prescription Alert',
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200'
    },
    parkinsons: {
      tag: 'Translational Repurposing Model',
      disease: "Parkinson's Disease / Dopaminergic Loss",
      drug: 'Exenatide (GLP-1 Receptor Agonist)',
      target: 'GLP1R & Neuronal Mitochondrial Quality Control',
      pathway: 'Akt/CREB Survival & PINK1 Activation',
      evidence: 'The Lancet (PMID 28781036) Phase II RCT · NCT04232969 Phase III',
      ranking: '90.1 / 100',
      status: 'Potential Repurposing Candidate',
      badgeColor: 'text-sky-700 bg-sky-50 border-sky-200'
    }
  };

  const currentHeroData = heroModels[activeHeroModel];

  const handleRoleQuickStart = async (role) => {
    await switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 hero-gradient border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200/80 text-sky-900 text-xs font-bold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-sky-600 animate-pulse"></span>
                <span>CureNova AI · Biomedical Medication Intelligence</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500 font-normal">v1.0 Decision Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                Turn Biomedical Evidence Into{' '}
                <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Actionable Intelligence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                CureNova connects fragmented biomedical research, medication safety databases, and multi-agent AI reasoning to help
                clinicians, researchers, and patients understand complex medication interactions and candidate therapies with verifiable,
                transparent evidence grounding.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={() => handleRoleQuickStart('doctor')}
                  className="flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>Explore Clinician Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  See How It Works
                </a>
              </div>

              {/* Safety notice micro-banner */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 max-w-xl">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Clinical Decision Support Only:</strong> Not a prescribing engine. All outputs require independent verification by licensed physicians.
                </span>
              </div>
            </div>

            {/* Right Hero Visual: Interactive Connected Pipeline */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl shadow-slate-200/80 space-y-4">
                {/* Simulator Switcher Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Live Evidence Chain
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Interactive
                  </span>
                </div>

                {/* Model Selector Buttons */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => setActiveHeroModel('alzheimers')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'alzheimers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Alzheimer's
                  </button>
                  <button
                    onClick={() => setActiveHeroModel('cardiology')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'cardiology' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Warfarin+Aspirin
                  </button>
                  <button
                    onClick={() => setActiveHeroModel('parkinsons')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeHeroModel === 'parkinsons' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Parkinson's
                  </button>
                </div>

                {/* Visual Biological Chain */}
                <div className="space-y-2.5 pt-1">
                  {[
                    { label: 'Therapeutic Candidate / Regimen', val: currentHeroData.drug, color: 'bg-sky-50 border-sky-200 text-sky-950', badge: 'Drug' },
                    { label: 'Biological Target & Action', val: currentHeroData.target, color: 'bg-teal-50 border-teal-200 text-teal-950', badge: 'Target' },
                    { label: 'Cellular Pathway Concurrence', val: currentHeroData.pathway, color: 'bg-indigo-50 border-indigo-200 text-indigo-950', badge: 'Pathway' },
                    { label: 'Target Condition & Indication', val: currentHeroData.disease, color: 'bg-rose-50 border-rose-200 text-rose-950', badge: 'Indication' },
                    { label: 'Peer-Reviewed Source Citation', val: currentHeroData.evidence, color: 'bg-amber-50 border-amber-200 text-amber-950', badge: 'Literature' },
                  ].map((item, idx, arr) => (
                    <div key={idx} className="relative">
                      <div className={`p-3 rounded-xl border ${item.color} flex items-center justify-between text-xs`}>
                        <div className="overflow-hidden pr-2">
                          <div className="text-[10px] uppercase font-bold text-slate-600">{item.label}</div>
                          <div className="font-bold text-slate-800 text-xs sm:text-sm truncate">{item.val}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/80 border border-current shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="h-2 w-0.5 bg-slate-200 mx-auto my-0.5"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Outcome Badge Card */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Status Assessment</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs inline-block mt-0.5 border ${currentHeroData.badgeColor}`}>
                      {currentHeroData.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Quantified Metric</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{currentHeroData.ranking}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BIOMEDICAL SOURCES STRIP */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider">
              Connected Biomedical Datasets:
            </span>
            <div className="flex flex-wrap items-center gap-6 text-slate-600 font-semibold">
              <span className="hover:text-sky-600 transition-colors">PubMed (NLM/NIH)</span>
              <span className="hover:text-sky-600 transition-colors">openFDA FAERS</span>
              <span className="hover:text-sky-600 transition-colors">EMBL-EBI ChEMBL</span>
              <span className="hover:text-sky-600 transition-colors">Reactome Pathway DB</span>
              <span className="hover:text-sky-600 transition-colors">ClinicalTrials.gov</span>
              <span className="hover:text-sky-600 transition-colors">RxNorm Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MEDICATION INTELLIGENCE GAP */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Healthcare doesn't lack data. <br />
              <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
                It lacks connected intelligence.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Biomedical discovery and patient safety fail not because evidence does not exist, but because knowledge remains trapped in silos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Fragmented Biomedical Evidence</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 35 million research publications exist across PubMed, alongside thousands of chemical assays and post-marketing
                adverse event reports. Clinicians and researchers cannot manually synthesize these connections during active decision-making.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Untapped Potential of Existing Medicines</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                De novo drug development requires 12–15 years and over $2.6 billion per approved molecule. Thousands of existing,
                pharmacologically profiled compounds hold life-saving repurposing potential for neurodegenerative diseases and rare cancers.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Increasing Medication Complexity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                More than 40% of older adults take 5 or more concurrent prescription medicines. Legacy electronic health records generate
                noisy, uncontextualized alert fatigue, failing to explain underlying pharmacokinetic mechanisms or provide digital twin simulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW CURENOVA WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">The Multi-Agent Engine</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              How CureNova Transforms Knowledge
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              LangGraph orchestrates four specialized agents to ensure every finding is retrieved, connected, validated, and explained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Data Ingestion', icon: Database, desc: 'Clean, normalize entities from PubMed, ChEMBL, openFDA & Reactome' },
              { step: '02', title: 'Retrieval Agent', icon: Search, desc: 'Harvests factual evidence records and attaches source metadata' },
              { step: '03', title: 'Reasoning Agent', icon: Cpu, desc: 'Maps biological chains: Drug ↔ Target ↔ Pathway ↔ Disease' },
              { step: '04', title: 'Safety Validation', icon: ShieldAlert, desc: 'Screen contraindications, triads & organ clearance factors' },
              { step: '05', title: 'Explainable AI', icon: Sparkles, desc: 'Tailors insights for Doctor, Researcher, or Patient personas' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-2 relative group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
                  <span>STEP {p.step}</span>
                  <p.icon className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE CAPABILITIES (TWIN PILLARS) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Dual Intelligence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Two Pillars of Medication Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1: Drug Repurposing */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-100 text-teal-700">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Drug Repurposing Engine</h3>
                  <span className="text-xs text-teal-600 font-medium">For Translational Scientists & Research Groups</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect target diseases to known therapeutic compounds through biological pathway alignment, target binding affinity,
                and clinical trial history.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Candidate: Metformin in Alzheimer's Disease</span>
                  <span className="text-teal-700 font-mono">Ranking: 92.4 / 100</span>
                </div>
                <p className="text-slate-500">
                  Mechanisms: Activates AMPK, regulates GSK-3β tau phosphorylation, and enhances cerebral glucose uptake.
                </p>
                <div className="text-[10px] text-teal-700 font-semibold pt-1">
                  ✓ Verified by 48 PubMed publications · 2 Active Phase II/III Clinical Trials
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickStart('researcher')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-colors shadow-xs cursor-pointer"
              >
                <span>Explore Drug Repurposing Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pillar 2: Polypharmacy / Medication Safety */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-100 text-sky-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Polypharmacy & Medication Safety</h3>
                  <span className="text-xs text-sky-600 font-medium">For Clinicians, Hospital Teams & Patients</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Simulate multi-drug combinations with pairwise pharmacokinetic matrices, higher-order syndrome alerts (e.g., the Triple Whammy),
                and Patient Medication Digital Twin "what-if" testing.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Regimen: Aspirin + Warfarin + Metformin</span>
                  <span className="text-rose-600 font-mono">High Risk (75/100)</span>
                </div>
                <p className="text-slate-500">
                  Dual antihemostatic synergism multiplying gastrointestinal mucosal bleeding hazard (openFDA ROR 3.84).
                </p>
                <div className="text-[10px] text-sky-700 font-semibold pt-1">
                  ✓ Includes Digital Twin scenario simulator to test risk delta before prescribing
                </div>
              </div>

              <button
                onClick={() => handleRoleQuickStart('doctor')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>Explore Clinician Safety Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THREE PERSONAS (NO ADMIN) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Stakeholders</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Three Dedicated User Experiences
            </h2>
            <p className="text-sm text-slate-600">
              The same underlying evidence supports each role, but the presentation dynamically adapts to their clinical or personal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Doctor */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Doctor / Clinician</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detailed clinical decision support: pairwise interaction matrices, organ clearance adjustments (eGFR, hepatic),
                adverse event overlap, and downloadable clinical PDF reports.
              </p>
              <button
                onClick={() => handleRoleQuickStart('doctor')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Launch Doctor View
              </button>
            </div>

            {/* Researcher */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Biomedical Researcher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translational candidate discovery: target-disease relationships, Reactome pathways, CureNova Evidence Ranking,
                clinical trial registries, and hypothesis ranking dossiers.
              </p>
              <button
                onClick={() => handleRoleQuickStart('researcher')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Launch Researcher View
              </button>
            </div>

            {/* Patient */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Patient & Consumer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Medication safety awareness: clear plain-language explanations, warning symptoms, questions to discuss with doctors,
                and strict non-prescribing guardrails.
              </p>
              <button
                onClick={() => handleRoleQuickStart('patient')}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Launch Patient View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVIDENCE & EXPLAINABILITY */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Explainable AI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Evidence Over Black-Box Claims
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every result produced by CureNova directly answers six key explainability questions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { num: '01', q: 'What was found?' },
              { num: '02', q: 'Why was it found?' },
              { num: '03', q: 'What evidence supports it?' },
              { num: '04', q: 'How strong is the evidence?' },
              { num: '05', q: 'What are the limitations?' },
              { num: '06', q: 'What safety concerns exist?' },
            ].map((item) => (
              <div key={item.num} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-600">{item.num}</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{item.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: SAFETY FIRST */}
      <section className="py-16 bg-amber-50/60 border-b border-amber-200/70">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SafetyDisclaimer variant="banner" />
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Evidence. Understand Relationships. Make Better-Informed Decisions.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience the next era of evidence-grounded biomedical intelligence. Jump directly into any of the three role workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => handleRoleQuickStart('doctor')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Demo Doctor Portal
            </button>
            <button
              onClick={() => handleRoleQuickStart('researcher')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Demo Researcher Portal
            </button>
            <button
              onClick={() => handleRoleQuickStart('patient')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Demo Patient Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
