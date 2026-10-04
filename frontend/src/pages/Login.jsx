import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  ShieldCheck,
  AlertCircle,
  Lock,
  Mail,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Zap,
  Users,
  FlaskConical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';

const PROFESSION_TYPES = [
  {
    role: 'doctor',
    label: 'Clinician / Doctor',
    sublabel: 'MD · Hospital · Primary Care',
    demoName: 'Dr. Sarah Chen, MD, FACC',
    demoEmail: 'doctor@curenova.ai',
    icon: Stethoscope,
    accentColor: '#0271b0',
    accentBg: '#dbeeff',
    accentBorder: '#93cef4',
    darkAccent: '#38bdf8',
    features: [
      'Pairwise Drug Interaction Matrix',
      'Digital Twin Simulation',
      'Adverse Event Rails (FDA)',
      'Printable Clinical Dossiers',
    ],
    tagline: 'Polypharmacy & Medication Safety',
  },
  {
    role: 'researcher',
    label: 'Biomedical Researcher',
    sublabel: 'PhD · Academia · Pharma',
    demoName: 'Dr. Marcus Vance, PhD',
    demoEmail: 'researcher@curenova.ai',
    icon: FlaskConical,
    accentColor: '#0b8b7e',
    accentBg: '#ecfdf5',
    accentBorder: '#6ee7b7',
    darkAccent: '#2dd4bf',
    features: [
      'Drug Repurposing Scoring Engine',
      'Reactome Pathway Mapping',
      'ChEMBL Target Binding Profiles',
      'Clinical Trial Phase Registry',
    ],
    tagline: 'Drug Repurposing & Discovery',
  },
  {
    role: 'patient',
    label: 'Patient / Caregiver',
    sublabel: 'Consumer · Family · Carer',
    demoName: 'Eleanor Jenkins',
    demoEmail: 'patient@curenova.ai',
    icon: HeartHandshake,
    accentColor: '#047857',
    accentBg: '#f0fdf4',
    accentBorder: '#bbf7d0',
    darkAccent: '#34d399',
    features: [
      'Plain-Language Medication Guide',
      'Warning Symptoms Tracker',
      'Doctor Discussion Sheet',
      'Appointment Companion Print',
    ],
    tagline: 'Personal Medication Understanding',
  },
];

export const Login = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const selectedProfession = PROFESSION_TYPES.find((p) => p.role === selectedRole);

  const handleDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      const user = await loginAsDemo(role);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password, selectedRole);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch bg-[var(--color-surface-ground)]">

      {/* ── LEFT PANEL: Brand Identity ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col justify-between bg-gradient-to-br from-[#0b1e3d] via-[#0a2a40] to-[#063232] relative overflow-hidden p-10 xl:p-12">
        {/* Ambient glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0271b0]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#0b8b7e]/15 blur-3xl pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0271b0] text-white shadow-lg shadow-[#0271b0]/30">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">Cure<span className="text-[#38bdf8]">Nova</span></span>
            <span className="ml-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 border border-white/20 px-1.5 py-0.5 rounded">Med-AI</span>
          </div>
        </div>

        {/* Middle: Hero copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38bdf8]">AI Clinical Decision Support</span>
            <h2 className="mt-2 text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
              Evidence-Grounded<br />Medication Intelligence
            </h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
              Connects PubMed, ChEMBL, openFDA, and Reactome into one transparent AI reasoning chain — no black-box prescribing.
            </p>
          </div>

          {/* Engine features */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/70">
              <Cpu className="w-4 h-4 text-[#38bdf8]" />
              LangGraph Multi-Agent Core
            </div>
            <div className="space-y-2">
              {[
                { icon: CheckCircle2, text: 'PubMed + openFDA evidence retrieval' },
                { icon: CheckCircle2, text: 'Pairwise interaction matrix analysis' },
                { icon: CheckCircle2, text: 'Digital Twin medication simulation' },
                { icon: CheckCircle2, text: 'ChEMBL drug repurposing scoring' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[12px] text-white/70">
                  <Icon className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'PubMed', color: '#38bdf8' },
              { label: 'ChEMBL', color: '#2dd4bf' },
              { label: 'openFDA', color: '#fbbf24' },
              { label: 'Reactome', color: '#818cf8' },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Regulatory notice */}
        <div className="relative z-10 pt-6 border-t border-white/10 text-[11px] text-white/40 space-y-1">
          <div className="flex items-center gap-1.5 text-white/60 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
            Non-Prescribing Mode · Role-Based Access Control
          </div>
          <p>CureNova outputs require independent verification by licensed clinicians.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-14 overflow-y-auto">
        <div className="w-full max-w-lg space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0271b0] text-white">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-[var(--color-text-primary)]">Cure<span className="text-[#0271b0]">Nova</span></span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Select your profession
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
              Choose your role to access a tailored clinical workspace.
            </p>
          </div>

          {/* ── PROFESSION TYPE CARDS ── */}
          <div className="grid grid-cols-1 gap-3">
            {PROFESSION_TYPES.map((prof) => {
              const Icon = prof.icon;
              const isSelected = selectedRole === prof.role;
              return (
                <button
                  key={prof.role}
                  type="button"
                  onClick={() => { setSelectedRole(prof.role); setShowEmailForm(false); }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 group ${
                    isSelected
                      ? 'border-[var(--color-border-focus)] bg-[var(--color-brand-surface)] shadow-md'
                      : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] hover:shadow-sm'
                  }`}
                  style={isSelected ? { borderColor: prof.accentColor, backgroundColor: prof.accentBg } : {}}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="mt-0.5 flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: isSelected ? prof.accentColor : 'var(--color-surface-sunken)', color: isSelected ? '#fff' : prof.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-bold text-sm text-[var(--color-text-primary)]">{prof.label}</p>
                          <p className="text-[11px] text-[var(--color-text-muted)] font-mono">{prof.sublabel}</p>
                        </div>
                        {isSelected && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{ color: prof.accentColor, borderColor: prof.accentBorder, backgroundColor: 'white' }}
                          >
                            Selected
                          </span>
                        )}
                      </div>

                      {/* Features — show when selected */}
                      {isSelected && (
                        <div className="mt-3 grid grid-cols-2 gap-1.5">
                          {prof.features.map((f) => (
                            <div key={f} className="flex items-center gap-1.5 text-[11px]" style={{ color: prof.accentColor }}>
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span className="leading-tight">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── DEMO LOGIN BUTTON (primary CTA) ── */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleDemoLogin(selectedRole)}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: selectedProfession?.accentColor }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Signing In…
                </span>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Continue as {selectedProfession?.label}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[var(--color-text-muted)]">
              Demo account · No sign-up required ·{' '}
              <span style={{ color: selectedProfession?.accentColor }} className="font-semibold">{selectedProfession?.demoEmail}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-[var(--color-border-subtle)]" />
            <span className="mx-3 text-[11px] uppercase font-mono font-semibold text-[var(--color-text-muted)]">
              Or sign in with email
            </span>
            <div className="flex-1 border-t border-[var(--color-border-subtle)]" />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
              <span>{error}</span>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector inside form */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
                Profession Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PROFESSION_TYPES.map((prof) => {
                  const Icon = prof.icon;
                  const isActive = selectedRole === prof.role;
                  return (
                    <button
                      key={prof.role}
                      type="button"
                      onClick={() => setSelectedRole(prof.role)}
                      className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border-2 text-xs font-semibold transition-all"
                      style={
                        isActive
                          ? { borderColor: prof.accentColor, backgroundColor: prof.accentBg, color: prof.accentColor }
                          : { borderColor: 'var(--color-border-subtle)', backgroundColor: 'var(--color-surface-card)', color: 'var(--color-text-muted)' }
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span className="leading-tight text-center text-[10px]">{prof.label.split(' / ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`e.g. ${selectedProfession?.demoEmail}`}
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--color-text-secondary)]">
                <input type="checkbox" className="rounded accent-[#0271b0]" defaultChecked />
                <span>Remember session</span>
              </label>
              <Link to="/forgot-password" className="font-semibold hover:underline" style={{ color: selectedProfession?.accentColor }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: selectedProfession?.accentColor }}
            >
              {loading ? 'Signing In…' : 'Sign In to Workspace'}
            </button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-muted)]">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: selectedProfession?.accentColor }}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
