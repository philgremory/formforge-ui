import { ReactNode } from "react";

interface Step {
  id: string;
  title: string;
  icon?: string;
}

interface StepWizardProps {
  steps: Step[];
  currentStep: number;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  nextLabel?: string;
  submitLabel?: string;
  primaryColor?: string;
  loading?: boolean;
}

export function StepWizard({
  steps,
  currentStep,
  children,
  onNext,
  onBack,
  onSubmit,
  nextLabel = "Continue",
  submitLabel = "Confirm Booking",
  primaryColor = "#6366f1",
  loading = false,
}: StepWizardProps) {
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8 px-2">
        {steps.map((step, idx) => {
          const done = idx < currentStep;
          const active = idx === currentStep;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  style={
                    done || active
                      ? { backgroundColor: primaryColor, borderColor: primaryColor }
                      : {}
                  }
                  className={`
                    w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
                    ${done || active ? "text-white shadow-md" : "border-gray-200 text-gray-400 bg-white"}
                  `}
                >
                  {done ? "✓" : step.icon || idx + 1}
                </div>
                <span
                  style={active ? { color: primaryColor } : {}}
                  className={`text-xs mt-1 font-medium hidden sm:block
                    ${active ? "" : done ? "text-gray-500" : "text-gray-300"}`}
                >
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  style={done ? { backgroundColor: primaryColor } : {}}
                  className={`flex-1 h-0.5 mx-2 transition-all ${done ? "" : "bg-gray-100"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="min-h-[300px]">{children}</div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {currentStep > 0 && (
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
          >
            ← Back
          </button>
        )}
        <button
          onClick={isLast ? onSubmit : onNext}
          disabled={loading}
          style={{ backgroundColor: primaryColor }}
          className="flex-1 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition shadow-md disabled:opacity-60"
        >
          {loading ? "⏳ Please wait..." : isLast ? submitLabel : `${nextLabel} →`}
        </button>
      </div>
    </div>
  );
}
