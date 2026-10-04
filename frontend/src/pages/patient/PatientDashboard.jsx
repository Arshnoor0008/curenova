import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Activity,
  Plus,
  ArrowRight,
  AlertCircle,
  FileText,
  Calendar,
  PhoneCall,
  CheckCircle2,
  Pill,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentMedications = [
    { name: 'Aspirin', purpose: 'Heart & blood circulation support', frequency: 'Once daily (morning)' },
    { name: 'Warfarin', purpose: 'Blood thinner to prevent clots', frequency: 'Once daily (evening with water)' },
    { name: 'Metformin', purpose: 'Blood sugar balance', frequency: 'Twice daily with meals' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ── Colorful Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #052e16 0%, #059669 55%, #0891b2 100%)',
        }}
      >
        <div className="absolute top-[-30px] right-[-30px] w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-10px] left-[35%] w-36 h-36 rounded-full bg-[#34d399]/20 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Patient Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              My Medication Guide
            </h1>
            <p className="text-sm text-white/65 max-w-[55ch]">
              Hello, <strong className="text-white">{user?.name || 'there'}</strong>! Here's a clear, safe guide to how your medications work together.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">3</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Active Meds</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black tabular-nums">1</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Alert to Review</div>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={ShieldCheck}
              onClick={() => navigate('/patient/medication-safety')}
              className="shrink-0 !bg-white !text-[#059669] hover:!bg-white/90 self-center"
            >
              Check My Medicines
            </Button>
          </div>
        </div>
      </div>

      <SafetyDisclaimer variant="compact" />

      {/* Gentle Advisory Callout: Zero alarming jargon, calm amber border */}
      <Card elevation="raised" className="p-5 border-l-4 border-l-[#d97706] bg-[var(--color-surface-card)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0" />
              <h3 className="font-bold text-sm sm:text-base text-[var(--color-text-primary)]">
                Topic for Your Next Doctor Visit: Aspirin + Warfarin
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Taking these two blood-thinning medicines together increases your chance of bruising or bleeding. Please do
              <strong className="text-[var(--color-text-primary)]"> not stop taking either medication on your own</strong>; instead, review them with your doctor at your next appointment.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/patient/results')}
            className="shrink-0 text-center"
          >
            View Doctor Talking Points
          </Button>
        </div>
      </Card>

      {/* My Medication Schedule */}
      <Card elevation="raised">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>My Active Medication Schedule</CardTitle>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Keep this list updated with all prescription medications and everyday supplements
            </p>
          </div>
          <Button
            variant="subtle"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/patient/medication-safety')}
          >
            Update List
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentMedications.map((med, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] space-y-2.5 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2">
                    <Pill className="w-4 h-4 text-[#059669]" />
                    {med.name}
                  </span>
                  <Badge variant="safe" size="sm">Active</Badge>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {med.purpose}
                </p>
                <div className="text-[11px] font-medium text-[var(--color-text-muted)] flex items-center gap-1.5 pt-2 border-t border-[var(--color-border-subtle)]">
                  <Clock className="w-3.5 h-3.5 text-[#059669]" />
                  <span>{med.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Companion Sheet Card */}
      <Card elevation="flat" className="p-6 border-l-4 border-l-[#059669] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#059669]" />
            <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
              Printable Doctor Discussion Sheet
            </h4>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/patient/results')}
          >
            Open Appointment Companion
          </Button>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          Prepare for your next clinic visit with a simple, printable sheet containing the exact questions to ask your physician about your medications.
        </p>
      </Card>
    </div>
  );
};

export default PatientDashboard;
