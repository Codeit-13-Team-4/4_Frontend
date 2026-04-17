"use client";

import { cn } from "@/shared/utils";
import type { SignupStep } from "../model/signupForm";

const SIGNUP_STEPS: SignupStep[] = [1, 2, 3];

interface SignupStepIndicatorProps {
  currentStep: SignupStep;
}

export default function SignupStepIndicator({
  currentStep,
}: SignupStepIndicatorProps) {
  return (
    <ol className="mx-auto my-5 flex items-center justify-center">
      {SIGNUP_STEPS.map((step, index) => {
        const isCompleted = currentStep > step;
        const isCurrent = currentStep === step;

        return (
          <li key={step} className="flex items-center">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-base sm:size-10 sm:text-[20px]",
                isCompleted || isCurrent
                  ? "bg-[#00D7A0] text-[#F8FAFC]"
                  : "bg-[#1E293B] text-[#F8FAFC]",
              )}
            >
              {step}
            </span>

            {index < SIGNUP_STEPS.length - 1 ? (
              <span
                className={cn(
                  "h-px w-12 shrink-0 transition-colors sm:w-13.75",
                  currentStep > step ? "bg-[#00D7A0]" : "bg-[#334155]",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
