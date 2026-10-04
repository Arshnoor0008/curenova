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
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-50">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Enterprise Clinical Hero (Desktop) */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden dark-hero-gradient">
          <div className="space-y-6 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white font-bold shadow-md shadow-sky-500/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">CureNova</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Decision Support Portal
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-snug">
                Evidence-Grounded Medication Intelligence
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect biomedical research, validate medication safety, and simulate clinical scenarios without black-box prescribing hallucinations.
              </p>
            </div>

            {/* Architecture Highlights Pill Box */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white text-[11px] uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Multi-Agent LangGraph Core</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Retrieval & Reasoning from PubMed / openFDA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Interactive Knowledge Graph & Pairwise Matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Patient Medication Digital Twin Simulation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-400 space-y-1 relative z-10">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clinical Decision Support Architecture</span>
            </div>
            <p>Strict Non-Prescribing Guardrails · Role-Based Access Control</p>
          </div>
        </div>

        {/* Right Side: Quick Demo Evaluation & Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select one of the evaluation personas or enter credentials to continue.
            </p>
          </div>

          {/* 1-Click Evaluation Personas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Instant 1-Click Demo Evaluation</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Recommended
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('doctor')}
                className="p-3 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 hover:border-sky-300 text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-slate-900">Demo Doctor</div>
                <div className="text-[10px] text-slate-500">Dr. Sarah Chen, MD</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('researcher')}
                className="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-300 text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-slate-900">Demo Researcher</div>
                <div className="text-[10px] text-slate-500">Dr. Marcus Vance, PhD</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('patient')}
                className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-bold text-xs text-slate-900">Demo Patient</div>
                <div className="text-[10px] text-slate-500">Eleanor Jenkins</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
              Or Sign In With Account
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Portal</label>
              <div className="grid grid-cols-3 gap-2">
                {['doctor', 'researcher', 'patient'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 text-center rounded-xl border font-bold capitalize cursor-pointer transition-all ${
                      selectedRole === role
                        ? 'border-sky-600 bg-sky-50 text-sky-950 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@curenova.ai"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-sky-600 hover:underline font-semibold">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating with Token...' : 'Sign In to Workspace'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500">
            Need access?{' '}
            <Link to="/register" className="font-bold text-sky-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
