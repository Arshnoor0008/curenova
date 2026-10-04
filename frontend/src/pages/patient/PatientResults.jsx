import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  AlertCircle,
  Printer,
  ChevronLeft,
  CheckCircle2,
  FileText,
  HelpCircle,
  Pill,
  CheckSquare
} from 'lucide-react';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export const PatientResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.patientData;

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <Card className="p-8 border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)]">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            No Medication Check Selected
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
            You reached this page without running an active medication safety review. Enter your medications to view plain-language safety insights and discussion questions for your doctor.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/patient/medication-safety')}
            >
              Start Medication Safety Check
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            to="/patient/medication-safety"
            className="p-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] transition-colors cursor-pointer"
            title="Back to Medicine Check"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Your Medicine Safety Summary
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              Personalized, plain-language guidance to bring to your appointment
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Printer}
          onClick={handlePrint}
          className="shrink-0 !bg-[#059669] hover:!bg-[#047857]"
        >
          Print Doctor Discussion Sheet
        </Button>
      </div>

      <SafetyDisclaimer variant="compact" className="print:hidden" />

      {/* Printable Appointment Companion Container */}
      <div className="space-y-6 print:space-y-4">
        {/* Printable Header (Visible on print) */}
        <div className="hidden print:block border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Doctor Visit Discussion Companion</h2>
              <p className="text-xs text-slate-500">Prepared for: Eleanor · Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span>CureNova Patient Medicine Intelligence</span>
            </div>
          </div>
        </div>

        {/* Calm Advisory Notice: Soft amber border, zero harsh red */}
        <Card elevation="raised" className="p-6 border-l-4 border-l-[#d97706] space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)] border border-[var(--color-status-warning-border)]">
              {data.overall_risk_category}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            {data.summary_headline}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            This combination may have a potential interaction. Please discuss this with your healthcare professional at your next visit. Do not stop, start, or change your doses without speaking to your doctor first.
          </p>
        </Card>

        {/* Simplified Interaction Cards in Plain Human Language */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">
            What You Need to Know
          </h3>

          {data.patient_friendly_summary?.map((item, idx) => (
            <Card key={idx} elevation="raised" className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
                <span className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#059669]" />
                  {item.medications_involved}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)] border border-[var(--color-status-warning-border)]">
                  Review at Next Visit
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                    What was detected:
                  </h4>
                  <p className="text-[var(--color-text-primary)] leading-relaxed">
                    {item.what_was_detected}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                    Why it matters to your health:
                  </h4>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {item.why_it_matters}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] space-y-1">
                  <h4 className="font-bold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    Recommended step for you:
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {item.recommended_action}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Doctor Discussion Sheet Questions to Ask */}
        <Card elevation="raised" className="p-6 space-y-4 border-l-4 border-l-[#059669]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#059669]" />
            <CardTitle>Questions to Ask Your Doctor or Pharmacist</CardTitle>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
            Bring this list to your appointment. Check off questions as you discuss them together.
          </p>

          <div className="space-y-3 pt-2">
            {data.patient_questions_for_doctor?.map((question, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                <div className="w-5 h-5 rounded border-2 border-[var(--color-border-strong)] bg-[var(--color-surface-card)] flex items-center justify-center shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
                  {question}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span>Always consult your licensed healthcare professional.</span>
            <Button
              variant="subtle"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
              className="print:hidden"
            >
              Print This Sheet
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientResults;
