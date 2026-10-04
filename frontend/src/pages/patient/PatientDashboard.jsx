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
      {/* Warm Patient Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#059669]">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              My Medication Guide
            </h1>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Hello, {user?.name || 'Eleanor'}. Clear, safe guidance on how your medications work together.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={ShieldCheck}
          onClick={() => navigate('/patient/medication-safety')}
          className="shrink-0 !bg-[#059669] hover:!bg-[#047857]"
        >
          Check My Medicines
        </Button>
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
