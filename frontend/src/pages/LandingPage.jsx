import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Microscope,
  Stethoscope,
  HeartHandshake,
  ArrowRight,
  Pill,
  Target,
  GitFork,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('alzheimers');

  const models = {
    alzheimers: {
      drug: 'Metformin (RxCUI 6809)',
      target: 'AMPK · GSK-3β Dual Modulation',
      pathway: 'Cerebral Glucose & Autophagic Clearance',
      disease: "Alzheimer's Disease",
      evidence: 'Lancet Healthy Longevity · 24% Lower Dementia Hazard',
      score: '92.4',
      label: 'Repurposing Candidate',
      color: '#059669',
      hazard: false,
    },
    cardiology: {
      drug: 'Aspirin 100mg + Warfarin 5mg',
      target: 'COX-1 + Hepatic VKORC1 Co-Inhibition',
      pathway: 'Hemostasis & Platelet Suppression',
      disease: 'Atrial Fibrillation',
      evidence: 'CHEST 2024 · openFDA ROR 3.84 Major Bleed',
      score: '75.0',
      label: 'Critical Hazard',
      color: '#dc2626',
      hazard: true,
    },
    parkinsons: {
      drug: 'Exenatide (GLP-1 Agonist)',
      target: 'Neuronal GLP-1R · PINK1/Parkin Cascade',
      pathway: 'Akt/CREB Neuroprotective Signaling',
      disease: "Parkinson's Disease",
      evidence: 'The Lancet Phase II · NCT04232969 Phase III',
      score: '90.1',
      label: 'Clinical Trial III',
      color: '#6366f1',
      hazard: false,
    },
  };

  const m = models[activeTab];
  const goTo = () => (user ? navigate(`/${user.role}/dashboard`) : navigate('/login'));

  const chain = [
    { label: 'Drug',       val: m.drug,     icon: Pill,     color: '#0284c7' },
    { label: 'Target',     val: m.target,   icon: Target,   color: '#0d9488' },
    { label: 'Pathway',    val: m.pathway,  icon: GitFork,  color: '#6366f1' },
    { label: 'Indication', val: m.disease,  icon: Activity, color: m.hazard ? '#dc2626' : '#d97706' },
    { label: 'Evidence',   val: m.evidence, icon: BookOpen, color: '#2563eb' },
  ];

  const roles = [
    { role: 'doctor',     icon: Stethoscope,   label: 'Clinician',   sub: 'Medication Safety & Polypharmacy',    color: '#0284c7' },
    { role: 'researcher', icon: Microscope,     label: 'Researcher',  sub: 'Drug Repurposing & Discovery',        color: '#0d9488' },
    { role: 'patient',    icon: HeartHandshake, label: 'Patient',     sub: 'Plain-Language Medication Guide',     color: '#059669' },
  ];

  const sources = [
    { c: '#0284c7', t: 'PubMed' },
    { c: '#d97706', t: 'openFDA' },
    { c: '#0d9488', t: 'ChEMBL' },
    { c: '#6366f1', t: 'Reactome' },
    { c: '#059669', t: 'ClinicalTrials' },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ background: 'var(--color-surface-ground)', color: 'var(--color-text-primary)' }}
    >

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* subtle tinted glow — adapts per theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-[120px] opacity-30"
            style={{ background: 'var(--color-brand-primary)' }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-20"
            style={{ background: 'var(--color-brand-secondary)' }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Copy ── */}
            <div className="space-y-8">
              {/* status pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border"
                style={{
                  borderColor: 'var(--color-border-subtle)',
                  background: 'var(--color-surface-card)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                CureNova · Biomedical AI Platform
              </div>

              {/* headline */}
              <div className="space-y-3">
                <h1
                  className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.06]"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Biomedical{' '}
                  <span
                    className="bg-clip-text text-transparent block"
                    style={{
                      backgroundImage: 'linear-gradient(120deg, var(--color-brand-primary), var(--color-brand-secondary))',
                    }}
                  >
                    Intelligence.
                  </span>
                </h1>
                <p
                  className="text-base leading-relaxed max-w-[44ch]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Multi-agent AI linking pharmacological databases and peer-reviewed literature to evaluate drug safety and repurposing candidates.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={goTo}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 text-white shadow-md"
                  style={{ background: 'var(--color-brand-primary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-brand-primary-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-brand-primary)')}
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border"
                  style={{
                    borderColor: 'var(--color-border-subtle)',
                    background: 'var(--color-surface-card)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-surface-card)')}
                >
                  Create Account
                </button>
              </div>

              {/* source chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {sources.map((s) => (
                  <span
                    key={s.t}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{
                      borderColor: 'var(--color-border-subtle)',
                      background: 'var(--color-surface-card)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.c }} />
                    {s.t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Evidence Card ── */}
            <div
              className="rounded-2xl border p-5 space-y-4 shadow-lg"
              style={{
                borderColor: 'var(--color-border-subtle)',
                background: 'var(--color-surface-card)',
                boxShadow: 'var(--shadow-raised)',
              }}
            >
              {/* card header */}
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Live Evidence Chain
                  </span>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    color: m.color,
                    borderColor: `${m.color}50`,
                    background: `${m.color}12`,
                  }}
                >
                  {m.label}
                </span>
              </div>

              {/* tabs */}
              <div
                className="grid grid-cols-3 gap-1 p-1 rounded-lg"
                style={{ background: 'var(--color-surface-sunken)' }}
              >
                {[
                  { key: 'alzheimers', label: 'Metformin/AD' },
                  { key: 'cardiology', label: 'Warfarin+ASA' },
                  { key: 'parkinsons', label: 'Exenatide/PD' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className="py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer truncate"
                    style={
                      activeTab === t.key
                        ? {
                            background: 'var(--color-surface-card)',
                            color: 'var(--color-text-primary)',
                            boxShadow: 'var(--shadow-base)',
                            border: '1px solid var(--color-border-subtle)',
                          }
                        : { color: 'var(--color-text-muted)', border: '1px solid transparent' }
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* chain nodes */}
              <div className="space-y-1">
                {chain.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div key={i}>
                      <div
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors"
                        style={{
                          borderColor: 'var(--color-border-subtle)',
                          background: 'var(--color-surface-card)',
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${node.color}15`, border: `1px solid ${node.color}35` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: node.color }} />
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {node.label}
                          </div>
                          <div
                            className="text-xs font-semibold truncate"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {node.val}
                          </div>
                        </div>
                      </div>
                      {i < chain.length - 1 && (
                        <div
                          className="w-px h-1.5 mx-3"
                          style={{ background: 'var(--color-border-subtle)' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* score footer */}
              <div
                className="flex items-center justify-between pt-2 border-t"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Evidence Score</span>
                <span className="text-xl font-black" style={{ color: m.color }}>
                  {m.score}
                  <span className="text-sm font-normal ml-0.5" style={{ color: 'var(--color-text-muted)' }}>/100</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ROLES ══════════════════ */}
      <section
        className="border-t py-20"
        style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-ground)' }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p
            className="text-center text-[11px] font-bold uppercase tracking-widest mb-10"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Three dedicated experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.role}
                  onClick={goTo}
                  className="text-left p-6 rounded-2xl border transition-all group"
                  style={{
                    borderColor: 'var(--color-border-subtle)',
                    background: 'var(--color-surface-card)',
                    boxShadow: 'var(--shadow-base)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface-hover)';
                    e.currentTarget.style.borderColor = r.color;
                    e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface-card)';
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-base)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${r.color}15`, border: `1px solid ${r.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: r.color }} />
                  </div>
                  <div
                    className="text-sm font-bold mb-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="text-xs mb-5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {r.sub}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: r.color }}>
                    Launch <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer
        className="border-t py-7"
        style={{
          borderColor: 'var(--color-border-subtle)',
          background: 'var(--color-surface-card)',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              CureNova
            </span>
            <span className="text-xs hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
              · Non-Prescribing Med-AI Prototype
            </span>
          </div>
          <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
