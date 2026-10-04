import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-teal-600 text-white shadow-md shadow-sky-600/20">
            <Activity className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Reset Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your institutional email address to receive password reset instructions
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          {submitted ? (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Verification Link Dispatched</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists under <strong>{email}</strong>, a secure credential recovery link has been delivered.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Send Password Reset Email
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
