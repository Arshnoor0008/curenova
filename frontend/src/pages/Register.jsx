import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  ArrowRight,
  AlertCircle,
  Lock,
  Mail,
  User,
  Building,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register({
        name,
        email,
        password,
        role,
        organization,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-50">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Role Info Panel */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden dark-hero-gradient">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white font-bold shadow-md shadow-sky-500/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">CureNova</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Institutional Onboarding
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-snug">
                Join the Evidence-Grounded Healthcare Network
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your clinical practice, research laboratory, or personal health regimen to verifiable biomedical intelligence.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-sky-400" /> For Clinicians
                </span>
                <p className="text-slate-400 text-[11px]">
                  Polypharmacy matrices, adverse event overlap, and Digital Twin scenario modeling.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5 text-teal-400" /> For Researchers
                </span>
                <p className="text-slate-400 text-[11px]">
                  Target-disease congruence, Reactome pathway mapping, and CureNova Evidence Ranking.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> For Patients
                </span>
                <p className="text-slate-400 text-[11px]">
                  Plain-language interaction warnings and actionable doctor discussion points.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-400 relative z-10">
            Protected by Strict Non-Prescribing Guardrails · Multi-Source Verified
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Create Your CureNova Account
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your persona and complete institutional registration.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Role Cards (Strictly 3 roles - NO ADMIN) */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Select Your Role <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
                  { id: 'researcher', label: 'Researcher', icon: Microscope },
                  { id: 'patient', label: 'Patient', icon: HeartHandshake },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      role === r.id
                        ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold shadow-xs ring-1 ring-sky-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <r.icon className={`w-5 h-5 ${role === r.id ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="text-xs capitalize">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jordan Taylor, MD"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan.taylor@hospital.org"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution / Practice / Affiliation</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Academic Medical Center / Cancer Institute / Self"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-sky-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
