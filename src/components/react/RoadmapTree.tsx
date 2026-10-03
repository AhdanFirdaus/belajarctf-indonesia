import React, { useState, useEffect } from 'react';
import { Check, ExternalLink, RotateCcw, Sparkles } from 'lucide-react';
import { roadmapSteps } from '../../data/roadmap';
import { playRetroClick, playSuccessChime } from '../../utils/sound';

const STORAGE_KEY = 'ctf_roadmap_completed_steps_v1';

export const RoadmapTree: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load completed steps from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change with audio feedback
  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const isCompleted = prev.includes(stepId);
      const next = isCompleted
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId];

      if (!isCompleted) {
        playSuccessChime();
      } else {
        playRetroClick();
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      return next;
    });
  };

  const handleReset = () => {
    playRetroClick();
    if (window.confirm('Reset seluruh progres rute belajar CTF?')) {
      setCompletedSteps([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const totalSteps = roadmapSteps.length;
  const completedCount = completedSteps.length;
  const percentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-36">
      {/* Tracker & Progress Bar Card */}
      <div className="border border-neutral-800 bg-[#121212] p-5 md:p-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-400 mb-1">
              <span>PROGRES JALUR BELAJAR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-pixel text-white">
              {completedCount} DARI {totalSteps} TAHAPAN SELESAI ({percentage}%)
            </h2>
          </div>

          {completedCount > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto border border-neutral-800 bg-[#0a0a0a] px-3 py-1.5 text-xs font-mono uppercase text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Progres</span>
            </button>
          )}
        </div>

        {/* Progress Bar Line */}
        <div className="w-full h-2 bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Chained Timeline Steps */}
      <div className="relative flex flex-col items-center">
        {roadmapSteps.map((step, index) => {
          const isDone = isLoaded && completedSteps.includes(step.id);
          const isLast = index === roadmapSteps.length - 1;

          return (
            <div key={step.id} className="w-full relative flex flex-col items-center">
              {/* Step Node Box with Micro-Wiggle */}
              <div
                className={`w-full border p-6 md:p-8 transition-all duration-200 animate-subtle-wiggle ${
                  isDone
                    ? 'border-white bg-[#141414] shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                    : 'border-neutral-800 bg-[#101010] hover:border-neutral-500'
                }`}
              >
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="border border-neutral-700 bg-[#0a0a0a] px-2.5 py-0.5 text-xs font-mono text-white font-bold">
                      TAHAP 0{step.stepNumber}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {step.phase}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-mono uppercase px-2 py-0.5 border ${
                      step.level === 'PEMULA'
                        ? 'border-neutral-700 text-neutral-300 bg-[#0a0a0a]'
                        : step.level === 'MENENGAH'
                        ? 'border-white text-black bg-white font-semibold'
                        : 'border-neutral-500 text-white bg-[#1a1a1a]'
                    }`}
                  >
                    {step.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-pixel text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Task Checklist inside Box */}
                <div className="border-t border-neutral-900 pt-4 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    TARGET PENCAPAIAN:
                  </div>
                  <ul className="space-y-2">
                    {step.tasks.map((task, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-neutral-600 mt-1.5 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800/80">
                  {/* Interactive Completion Toggle */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                      isDone
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#0a0a0a] text-neutral-300 border-neutral-700 hover:border-white hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center ${
                        isDone ? 'border-black bg-black text-white' : 'border-neutral-500 bg-transparent'
                      }`}
                    >
                      {isDone && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span>{isDone ? 'Tahapan Selesai ✓' : 'Tandai Selesai'}</span>
                  </button>

                  {/* Resource Action Button */}
                  <a
                    href={step.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playRetroClick}
                    className="inline-flex items-center justify-center gap-2 border border-neutral-800 bg-[#0a0a0a] px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-white hover:text-white transition-colors"
                  >
                    <span>{step.actionText}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Chained Connector Line between Nodes */}
              {!isLast && (
                <div className="w-full flex flex-col items-center my-2">
                  <div
                    className={`w-0.5 h-10 transition-colors duration-300 ${
                      isDone ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'border-l-2 border-dashed border-neutral-700'
                    }`}
                  />
                  <div
                    className={`w-2.5 h-2.5 border transition-all duration-300 ${
                      isDone ? 'bg-white border-white' : 'bg-[#0a0a0a] border-neutral-700'
                    }`}
                  />
                  <div
                    className={`w-0.5 h-10 transition-colors duration-300 ${
                      isDone ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'border-l-2 border-dashed border-neutral-700'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
