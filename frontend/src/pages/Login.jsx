import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Stethoscope,
  Microscope,
  HeartHandshake,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';

const ROLES = [
  {
    role: 'doctor',
    label: 'Clinician',
    icon: Stethoscope,
    accentColor: '#0284c7',
  },
  {
    role: 'researcher',
    label: 'Researcher',
    icon: Microscope,
    accentColor: '#0d9488',
  },
  {
    role: 'patient',
    label: 'Patient',
    icon: HeartHandshake,
    accentColor: '#10b981',
  },
];

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const activeRoleMeta = ROLES.find((r) => r.role === selectedRole) || ROLES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await login(email.trim(), password, selectedRole);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please verify your credentials or register an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[var(--color-surface-ground)]">
      <div className="w-full max-w-md bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border-subtle)] p-6 sm:p-8 shadow-[var(--shadow-card)] transition-colors">
        
        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20 mb-3">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Sign in to Cure<span className="text-[var(--color-brand-primary)]">Nova</span>
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Access your personalized medical intelligence workspace
          </p>
        </div>

        {/* Role Selector Segmented Tabs */}
        <div className="mb-5">
          <label className="block text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 text-center">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[var(--color-surface-sunken)] rounded-xl border border-[var(--color-border-subtle)]">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r.role);
                    setError('');
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] font-semibold shadow-sm border border-[var(--color-border-subtle)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: isSelected ? r.accentColor : 'inherit' }}
                  />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[var(--color-status-critical-bg)] border border-[var(--color-status-critical-border)] text-[var(--color-status-critical-text)] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@institution.org"
            icon={Mail}
            required
            autoFocus
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
            <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-text-secondary)] select-none">
              <input
                type="checkbox"
                className="rounded accent-[var(--color-brand-primary)] cursor-pointer"
                defaultChecked
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating…' : `Sign In as ${activeRoleMeta.label}`}
          </button>
        </form>

        {/* Register Footer */}
        <div className="text-center mt-6 pt-4 border-t border-[var(--color-border-subtle)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-[var(--color-brand-primary)] hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
