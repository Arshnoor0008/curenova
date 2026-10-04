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
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export const About = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0284c7] text-white shadow-md shadow-[#0284c7]/20">
          <Activity className="h-6 w-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
          About CureNova
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          AI-Powered Medication Intelligence for Safer, Evidence-Grounded Healthcare
        </p>
      </div>

      <SafetyDisclaimer variant="banner" />

      {/* Vision & Core Value Proposition */}
      <Card elevation="raised" className="p-8 space-y-5">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">The Core Value Proposition</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
          CureNova is NOT simply an AI search tool, nor does it attempt to invent medical claims out of thin air. Instead, CureNova addresses the fundamental breakdown in modern healthcare:
          <strong className="text-[var(--color-text-primary)]"> knowledge fragmentation</strong>.
        </p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
          Vital clinical evidence is scattered across PubMed publications, ChEMBL assay logs, Reactome biochemical pathways, ClinicalTrials.gov registries, and openFDA post-marketing pharmacovigilance reports. CureNova's multi-agent engine acts as the connective intelligence layer:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-center text-xs">
          {[
            { label: 'RETRIEVE', desc: 'Collect relevant peer-reviewed evidence' },
            { label: 'CONNECT', desc: 'Link drugs, targets, pathways & disease' },
            { label: 'ANALYZE', desc: 'Identify meaningful interaction patterns' },
            { label: 'RANK', desc: 'Prioritize evidence & candidates' },
            { label: 'VALIDATE', desc: 'Check safety, conflicts & uncertainty' },
            { label: 'EXPLAIN', desc: 'Synthesize actionable human insights' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] space-y-1"
            >
              <div className="font-mono font-bold text-[10px] text-[#0284c7]">{item.label}</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* The Two Intelligence Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card elevation="raised" className="p-6 space-y-4 border-l-4 border-l-[#0d9488]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--color-surface-sunken)] text-[#0d9488]">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">1. Drug Repurposing Discovery</h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            De novo drug development takes over a decade and billions of dollars. CureNova evaluates pharmacologically characterized small molecules against novel disease targets by aligning biological pathways and binding affinities.
          </p>
        </Card>

        <Card elevation="raised" className="p-6 space-y-4 border-l-4 border-l-[#0284c7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--color-surface-sunken)] text-[#0284c7]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">2. Polypharmacy Safety & Digital Twin</h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Over 40% of older adults take 5 or more medications concurrently. CureNova moves beyond binary alerts by explaining underlying pharmacokinetic mechanisms and allowing doctors to test "what-if" modifications via Digital Twin simulation.
          </p>
        </Card>
      </div>

      {/* Explicit Regulatory Guardrails */}
      <Card elevation="raised" className="p-6 space-y-4 border-l-4 border-l-[#d97706]">
        <h3 className="text-base font-bold text-[var(--color-text-primary)]">
          Clinical Boundaries & Responsible AI
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
          CureNova strictly operates as an evidence-grounded decision support prototype. It is NOT a diagnostic engine, NOT an automated prescriber, and NEVER replaces the specialized clinical judgment of licensed physicians, clinical pharmacologists, or pharmacists.
        </p>
      </Card>
    </div>
  );
};

export default About;
