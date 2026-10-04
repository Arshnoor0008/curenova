import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Lock,
  Mail,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export const Login = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[var(--color-surface-ground)]">
      <div className="w-full max-w-5xl rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] shadow-[var(--shadow-overlay)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Enterprise Clinical Hero (Desktop) */}
        <div className="lg:col-span-5 bg-[#0b132b] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284c7] text-white font-bold shadow-md shadow-[#0284c7]/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CureNova</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Decision Support Portal
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-snug text-white">
                Evidence-Grounded Medication Intelligence
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect biomedical research, validate medication safety, and simulate clinical scenarios without black-box prescribing hallucinations.
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-xl bg-[#1c2541]/80 border border-[#334155] space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white text-[11px] uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
                <span>Multi-Agent LangGraph Core</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                  <span>Retrieval & Reasoning from PubMed / openFDA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                  <span>Interactive Knowledge Graph & Pairwise Matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                  <span>Patient Medication Digital Twin Simulation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="pt-6 border-t border-[#1c2541] text-[10px] text-slate-400 space-y-1 relative z-10">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Clinical Decision Support Architecture</span>
            </div>
            <p>Strict Non-Prescribing Guardrails · Role-Based Access Control</p>
          </div>
        </div>

        {/* Right Side: Quick Demo Evaluation & Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Select one of the evaluation personas or enter credentials to continue.
            </p>
          </div>

          {/* 1-Click Evaluation Personas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              <span>Instant 1-Click Demo Evaluation</span>
              <span className="text-[10px] text-[#059669] font-bold bg-[var(--color-status-safe-bg)] px-2 py-0.5 rounded border border-[var(--color-status-safe-border)]">
                Recommended
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('doctor')}
                className="p-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] hover:border-[#0284c7] hover:bg-[var(--color-surface-hover)] text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)]">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-[var(--color-text-primary)]">Clinician (MD)</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Dr. Sarah Lin, MD</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('researcher')}
                className="p-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] hover:border-[#0d9488] hover:bg-[var(--color-surface-hover)] text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-[var(--color-surface-card)] text-[#0d9488]">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-[var(--color-text-primary)]">Researcher (PhD)</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Dr. Marcus Vance</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('patient')}
                className="p-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] hover:border-[#059669] hover:bg-[var(--color-surface-hover)] text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-[var(--color-surface-card)] text-[#059669]">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-[var(--color-text-primary)]">Patient / Consumer</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Elena Rostova</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[var(--color-border-subtle)] w-full" />
            <span className="bg-[var(--color-surface-card)] px-3 text-[11px] font-mono text-[var(--color-text-muted)] uppercase">
              Or Sign In With Email
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. doctor@curenova.ai"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--color-text-secondary)]">
                <input type="checkbox" className="rounded accent-[#0284c7]" defaultChecked />
                <span>Remember session</span>
              </label>
              <Link to="/forgot-password" className="text-[#0284c7] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="text-center text-xs text-[var(--color-text-muted)]">
            Don't have an enterprise account?{' '}
            <Link to="/register" className="text-[#0284c7] hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
