import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Circle, ShieldAlert, Cpu } from 'lucide-react';

export const AnalysisProgress = ({
  steps = [],
  title = "Analyzing Biomedical Intelligence Pipeline",
  subtitle = "Orchestrating Retrieval, Reasoning, and Safety Agents via LangGraph",
  onComplete,
  isExecuting = true
}) => {
  const defaultSteps = [
    { id: 'step-1', label: 'Query Normalization & Entity Resolution', duration: 400 },
    { id: 'step-2', label: 'Retrieving Biomedical Evidence (PubMed, ClinicalTrials.gov, ChEMBL)', duration: 600 },
    { id: 'step-3', label: 'Connecting Biological Targets, Genes & Reactome Pathways', duration: 700 },
    { id: 'step-4', label: 'Safety Agent Cross-Validation & Adverse-Event Signal Analysis', duration: 500 },
    { id: 'step-5', label: 'Evidence Ranking & Explainable Decision Synthesis', duration: 400 }
  ];

  const activeSteps = steps.length > 0 ? steps : defaultSteps;
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    if (!isExecuting) {
      setCurrentStepIdx(activeSteps.length);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current <= activeSteps.length) {
        setCurrentStepIdx(current);
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 550);

    return () => clearInterval(interval);
  }, [isExecuting, activeSteps.length]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-sky-100 bg-white p-6 shadow-xl shadow-sky-900/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3.5 mt-5">
        {activeSteps.map((step, idx) => {
          const isDone = idx < currentStepIdx;
          const isCurrent = idx === currentStepIdx;
          const isPending = idx > currentStepIdx;

          return (
            <div
              key={step.id || idx}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-sky-50/80 border border-sky-200 text-sky-950 font-medium scale-[1.01]'
                  : isDone
                  ? 'bg-slate-50/80 border border-slate-100 text-slate-700'
                  : 'text-slate-400 border border-transparent opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-sky-600 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-xs sm:text-sm">{step.label}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                {isDone ? 'Completed' : isCurrent ? 'Processing...' : 'Queued'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>LangGraph Multi-Agent Orchestration</span>
        <span className="font-mono">
          {Math.min(currentStepIdx, activeSteps.length)} / {activeSteps.length} Agents Verified
        </span>
      </div>
    </div>
  );
};

export default AnalysisProgress;
