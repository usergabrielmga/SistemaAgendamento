"use client";

import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Serviço" },
  { id: 2, label: "Data" },
  { id: 3, label: "Horário" },
  { id: 4, label: "Seus dados" },
];

export default function BookingStepper({
  currentStep,
}: BookingStepperProps) {
  return (
    <div className="flex w-full items-center py-6 sm:py-8">
      {steps.map((step, index) => {
        const completed = step.id < currentStep;
        const active = step.id === currentStep;

        return (
          <div
            key={step.id}
            className="flex min-w-0 flex-1 items-center"
          >
            {completed ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-white">
                <Check size={16} strokeWidth={3} />
              </div>
            ) : (
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  active
                    ? "bg-[#3A1C12] text-white"
                    : "bg-[#EDE0D4] text-[#7A6155]"
                }`}
              >
                {step.id}
              </div>
            )}

            <span
              className={`ml-2 hidden whitespace-nowrap text-sm sm:block ${
                active
                  ? "text-[#3A1C12]"
                  : "text-[#7A6155]"
              }`}
            >
              {step.label}
            </span>

            {index !== steps.length - 1 && (
              <div className="mx-2 h-px flex-1 bg-[#EDE0D4]" />
            )}
          </div>
        );
      })}
    </div>
  );
}