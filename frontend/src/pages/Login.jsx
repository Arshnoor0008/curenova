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
  Mail
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-teal-600 text-white shadow-md shadow-sky-600/20">
            <Activity className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign In to CureNova
          </h2>
          <p className="text-xs text-slate-500">
            Select your clinical or research persona to enter the decision-support platform
          </p>
        </div>

        {/* 1-Click Demo Evaluation Buttons */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Instant Demo Evaluation</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              No Password Needed
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleDemoLogin('doctor')}
              className="flex items-center justify-between p-2.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-50 text-sky-950 transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Demo Doctor</div>
                  <div className="text-[10px] text-slate-500">Dr. Sarah Chen, MD (Cardiovascular)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => handleDemoLogin('researcher')}
              className="flex items-center justify-between p-2.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-50 text-teal-950 transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Demo Researcher</div>
                  <div className="text-[10px] text-slate-500">Dr. Marcus Vance, PhD (Pharmacology)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => handleDemoLogin('patient')}
              className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 text-emerald-950 transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Demo Patient</div>
                  <div className="text-[10px] text-slate-500">Eleanor Jenkins (Medication Safety)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Traditional Form Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="text-xs text-center text-slate-400 font-semibold uppercase tracking-wider">
            Or Sign In With Account
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                {['doctor', 'researcher', 'patient'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 text-center rounded-lg border font-semibold capitalize cursor-pointer transition-all ${
                      selectedRole === role
                        ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@curenova.ai"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-sky-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-sky-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
