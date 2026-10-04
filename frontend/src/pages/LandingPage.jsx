import React from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

export const LandingPage = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleQuickStart = async (role) => {
    await switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 gradient-hero-bg border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                <span>AI-Powered Medication Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Turn Biomedical Evidence Into{' '}
                <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
                  Actionable Intelligence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                CureNova connects fragmented biomedical research, medication safety databases, and multi-agent AI reasoning to help
                clinicians, researchers, and patients understand complex medication interactions and candidate therapies.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleRoleQuickStart('doctor')}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore CureNova</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  See How It Works
                </a>
              </div>

              {/* Regulatory mini alert */}
              <div className="pt-2">
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Clinical decision support only. Never prescribe or alter medication without professional clinical consultation.</span>
                </p>
              </div>
            </div>

            {/* Right Hero Visual: Connected Biological Flow */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Connected Evidence Pipeline
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                    Active Multi-Agent Model
                  </span>
                </div>

                {/* Animated Biological Chain: Drug -> Target -> Pathway -> Disease -> Evidence -> Insight */}
                <div className="mt-5 space-y-3">
                  {[
                    { label: 'Drug Molecule', detail: 'Metformin Hydrochloride (A10BA02)', badge: 'Drug', color: 'bg-sky-50 border-sky-200 text-sky-900' },
                    { label: 'Biological Target', detail: 'AMPK (PRKAA1) & GSK-3β Modulation', badge: 'Target', color: 'bg-teal-50 border-teal-200 text-teal-900' },
                    { label: 'Reactome Pathway', detail: 'Cerebral Glucose & Insulin Homeostasis', badge: 'Pathway', color: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
                    { label: 'Clinical Disease', detail: "Alzheimer's Disease / Tauopathy", badge: 'Disease', color: 'bg-rose-50 border-rose-200 text-rose-900' },
                    { label: 'Published Evidence', detail: 'PubMed PMID 33188177 (Lancet Healthy Longev)', badge: 'Evidence', color: 'bg-amber-50 border-amber-200 text-amber-900' },
                    { label: 'Explainable Insight', detail: 'Potential Repurposing Candidate (Ranking: 92.4/100)', badge: 'Insight', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                  ].map((node, i, arr) => (
                    <div key={i} className="relative">
                      <div className={`p-3 rounded-xl border ${node.color} flex items-center justify-between text-xs`}>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-600">{node.label}</div>
                          <div className="font-semibold text-slate-800 text-xs sm:text-sm">{node.detail}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/80 border border-current">
                          {node.badge}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="h-2 w-0.5 bg-slate-200 mx-auto my-0.5"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MEDICATION INTELLIGENCE GAP */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Healthcare doesn't lack data. <br />
              <span className="text-sky-600">It lacks connected intelligence.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Vital biomedical knowledge remains locked in fragmented silos across papers, clinical trials, and adverse reporting systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Fragmented Biomedical Evidence</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Crucial insights are scattered across millions of PubMed articles, ChEMBL chemical assays, and openFDA safety logs,
                making comprehensive manual reconciliation virtually impossible during active care.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Untapped Potential of Existing Medicines</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                De novo drug discovery takes 12–15 years and billions of dollars. Thousands of existing, safety-profiled molecules
                hold repurposing potential for refractory neurodegenerative and oncologic diseases that remains overlooked.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Increasing Medication Complexity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 40% of older adults take five or more prescription medications. Standard alert systems trigger alert fatigue
                with noisy warnings instead of explainable, patient-contextualized pharmacokinetic reasoning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW CURENOVA WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">The Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              How CureNova Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A specialized multi-agent LangGraph pipeline orchestrated to retrieve, connect, validate, and explain biomedical intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Data Sources', icon: Database, desc: 'PubMed, ChEMBL, openFDA, Reactome, ClinicalTrials.gov' },
              { step: '02', title: 'Retrieval Agent', icon: Search, desc: 'Factual evidence harvesting with source metadata attachment' },
              { step: '03', title: 'Reasoning Agent', icon: Cpu, desc: 'Connecting Drug ↔ Target ↔ Pathway ↔ Disease relationships' },
              { step: '04', title: 'Safety Validation', icon: ShieldAlert, desc: 'Prioritized contraindication screening & adverse event overlap' },
              { step: '05', title: 'Explainable Intel', icon: Sparkles, desc: 'Role-specific clinical, research, or patient insights' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-2 relative"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
                  <span>STEP {p.step}</span>
                  <p.icon className="w-4 h-4 text-sky-600" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE CAPABILITIES */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Twin Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Two Core Intelligence Engines
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Capability 1: Drug Repurposing */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-100 text-teal-700">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Drug Repurposing Engine</h3>
                  <span className="text-xs text-teal-600 font-medium">For Translational Researchers & Scientists</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Accelerate therapeutic hypothesis generation by uncovering biological target congruence, Reactome pathway alignment,
                and clinical trial precedents for approved medications in new indications.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Transparent <strong>CureNova Evidence Ranking</strong> based on target affinity and clinical phase</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Automated biological mechanism synthesis with real PubMed citations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Strict labeling: <em>"Potential Repurposing Candidate"</em> (never claiming approved status)</span>
                </li>
              </ul>

              <button
                onClick={() => handleRoleQuickStart('researcher')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer pt-2"
              >
                <span>Launch Researcher Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Capability 2: Polypharmacy / Medication Safety */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-100 text-sky-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Polypharmacy & Medication Safety</h3>
                  <span className="text-xs text-sky-600 font-medium">For Doctors, Clinical Specialists & Patients</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Evaluate multi-drug combinations with RxNorm normalization, pairwise pharmacokinetic matrix calculation,
                higher-order triad detection (such as the Triple Whammy), and Digital Twin "what-if" scenario simulation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Pairwise Interaction Matrix and Adverse Event Overlap mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Patient context adjustments for renal eGFR, hepatic status, and geriatric age</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Patient Medication Digital Twin with delta risk quantification</span>
                </li>
              </ul>

              <button
                onClick={() => handleRoleQuickStart('doctor')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 cursor-pointer pt-2"
              >
                <span>Launch Clinician Safety Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHO IS CURENOVA FOR? (3 ROLES ONLY - NO ADMIN) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Three Distinct Personas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Tailored Intelligence for Every Stakeholder
            </h2>
            <p className="text-sm text-slate-600">
              The same underlying evidence supports each role, but the presentation and decision support dynamically adapt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Role 1: Doctor */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Doctor / Clinician</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detailed clinical decision support: severity ratings, pharmacokinetic mechanisms, adverse event frequencies,
                evidence citations, patient-context considerations, and printable clinical reports.
              </p>
              <button
                onClick={() => handleRoleQuickStart('doctor')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Launch Doctor View
              </button>
            </div>

            {/* Role 2: Researcher */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Biomedical Researcher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translational exploration: drug-disease target relationships, gene/pathway networks, supporting publications,
                clinical trial registries, and hypothesis ranking dossiers.
              </p>
              <button
                onClick={() => handleRoleQuickStart('researcher')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Launch Researcher View
              </button>
            </div>

            {/* Role 3: Patient */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Patient & Consumer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Medication awareness and safety talking points: clear, non-jargon explanations, warning signs, questions to discuss
                with doctors, and strict non-prescribing guardrails.
              </p>
              <button
                onClick={() => handleRoleQuickStart('patient')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
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
              <div key={item.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
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
            Experience the next era of evidence-grounded biomedical intelligence. Jump directly into any of the role workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleRoleQuickStart('doctor')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Demo Doctor Portal
            </button>
            <button
              onClick={() => handleRoleQuickStart('researcher')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Demo Researcher Portal
            </button>
            <button
              onClick={() => handleRoleQuickStart('patient')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md cursor-pointer"
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
