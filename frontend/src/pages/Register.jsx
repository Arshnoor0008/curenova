import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  AlertCircle,
  Lock,
  Mail,
  User,
  Building,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

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
    <div className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[var(--color-surface-ground)]">
      <div className="w-full max-w-5xl rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] shadow-[var(--shadow-overlay)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Role Info Panel */}
        <div className="lg:col-span-5 bg-[#0b132b] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284c7] text-white font-bold shadow-md shadow-[#0284c7]/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CureNova</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Enterprise Access
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-snug text-white">
                Join the Biomedical Intelligence Platform
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gain access to multi-agent drug repurposing, pharmacokinetic interaction matrices, and patient digital twin simulations.
              </p>
            </div>

            {/* Role Options Descriptions */}
            <div className="space-y-3 pt-2">
              <div
                onClick={() => setRole('doctor')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  role === 'doctor'
                    ? 'border-[#0284c7] bg-[#1c2541] text-white'
                    : 'border-[#334155] bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Stethoscope className="w-4 h-4 text-[#38bdf8]" />
                  <span>Clinician / Hospital Physician</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Polypharmacy screening, interaction matrix & patient digital twin
                </p>
              </div>

              <div
                onClick={() => setRole('researcher')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  role === 'researcher'
                    ? 'border-[#0d9488] bg-[#1c2541] text-white'
                    : 'border-[#334155] bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Microscope className="w-4 h-4 text-[#2dd4bf]" />
                  <span>Biomedical Researcher</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Target alignment, Reactome pathway cascades & candidate ranking
                </p>
              </div>

              <div
                onClick={() => setRole('patient')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  role === 'patient'
                    ? 'border-[#059669] bg-[#1c2541] text-white'
                    : 'border-[#334155] bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <HeartHandshake className="w-4 h-4 text-[#34d399]" />
                  <span>Patient & Consumer</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Plain-language medication safety guide & appointment companion
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1c2541] text-[10px] text-slate-400 space-y-1 relative z-10">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Evidence-Grounded Architecture</span>
            </div>
            <p>Strict Non-Prescribing Guardrails · Human Clinical Oversight Required</p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Create Your Account
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Complete the registration details to access your specialized workspace.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name / Clinical Title"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Sarah Lin, MD"
              icon={User}
              required
            />

            <Input
              label="Work / Institutional Email"
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

            <Input
              label="Hospital / Institution / University"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Stanford Medical Center"
              icon={Building}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Register Workspace Account
              </Button>
            </div>
          </form>

          <div className="text-center text-xs text-[var(--color-text-muted)]">
            Already have an enterprise account?{' '}
            <Link to="/login" className="text-[#0284c7] hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
