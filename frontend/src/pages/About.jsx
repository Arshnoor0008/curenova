import React from 'react';
import {
  Activity,
  ShieldCheck,
  Search,
  Share2,
  Database,
  Cpu,
  Sparkles,
  Layers,
  HeartHandshake,
  Stethoscope,
  Microscope,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-teal-600 text-white shadow-md shadow-sky-600/20">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            About CureNova
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            "AI-Powered Medication Intelligence for Safer, Evidence-Grounded Healthcare"
          </p>
        </div>

        <SafetyDisclaimer variant="banner" />

        {/* Vision & Core Differentiator */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900">The Core Value Proposition</h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            CureNova is NOT simply an AI search tool, nor does it attempt to invent new medical claims out of thin air.
            Instead, CureNova addresses the fundamental breakdown in modern healthcare:
            <strong className="text-slate-900"> information fragmentation</strong>.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Vital evidence is scattered across PubMed literature, ChEMBL assay logs, Reactome biochemical pathways,
            ClinicalTrials.gov registries, and openFDA post-marketing pharmacovigilance reports. CureNova's multi-agent
            engine acts as the connective intelligence layer:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-center text-xs">
            {[
              { label: 'RETRIEVE', desc: 'Collect relevant evidence' },
              { label: 'CONNECT', desc: 'Link drugs, targets, pathways & disease' },
              { label: 'ANALYZE', desc: 'Identify meaningful interaction patterns' },
              { label: 'RANK', desc: 'Prioritize evidence & candidates' },
              { label: 'VALIDATE', desc: 'Check safety, conflicts & uncertainty' },
              { label: 'EXPLAIN', desc: 'Synthesize actionable human insights' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <span className="font-bold text-sky-700 font-mono block">{item.label}</span>
                <span className="text-[11px] text-slate-500 leading-tight block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Specialization Architecture */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Multi-Agent LangGraph Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Search className="w-4 h-4 text-sky-600" />
                <span>Retrieval Agent</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Queries structured biomedical datasets, vector embeddings, and the knowledge graph. Attaches formal citation
                metadata (PMID, NCT, ATC, RxNorm). Strictly factual; does not make clinical inferences.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-teal-600" />
                <span>Reasoning Agent</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects biological chains (Drug → Target → Pathway → Disease), computes the CureNova Evidence Ranking,
                and summarizes mechanisms. Only reasons from retrieved evidence; never invents facts.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Safety Agent</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detects interaction signals, contraindications, adverse-event overlap, and patient-context vulnerabilities.
                Safety validation has absolute priority over recommendation.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Recommendation Agent</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthesizes research and clinical discussion recommendations (never medical prescriptions). Tailors presentation
                for Clinicians, Researchers, or Patients.
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Boundaries: What CureNova Is and Is Not */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Ethical AI Guardrails & Regulatory Boundaries</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-2">
              <h4 className="font-bold text-rose-900 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> What CureNova Is NOT:
              </h4>
              <ul className="space-y-1.5 text-rose-950">
                <li>• Not a clinical diagnosis engine</li>
                <li>• Not an automated prescription or dose-ordering tool</li>
                <li>• Not a replacement for licensed medical judgment</li>
                <li>• Not an advisor instructing patients to start or stop therapy</li>
                <li>• Not claiming discovery of an approved medical treatment</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What CureNova IS:
              </h4>
              <ul className="space-y-1.5 text-emerald-950">
                <li>• An evidence-aggregation & relationship analysis platform</li>
                <li>• A clinical decision-support prototype for doctors</li>
                <li>• A hypothesis-generation research assistant for scientists</li>
                <li>• A plain-language safety awareness tool for patients</li>
                <li>• Fully explainable with verifiable citations and limitations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
