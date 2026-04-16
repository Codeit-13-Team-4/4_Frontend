"use client";

import { FormProvider } from "react-hook-form";
import type { SignupFormProps } from "@/features/auth/signup/model/signupForm";
import { FieldError } from "@/shared/ui";
import { cn } from "@/shared/utils";
import SignupCompleteStep from "./SignupCompleteStep";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStepIndicator from "./SignupStepIndicator";
import { useSignupFormFlow } from "./useSignupFormFlow";

export default function SignupForm({ socialSignup }: SignupFormProps) {
  const {
    accountMode,
    currentStep,
    isComplete,
    isCheckingEmail,
    isSubmitting,
    isStep1NextDisabled,
    methods,
    submitError,
    handleCompleteStart,
    handlePrevious,
    handleSkip,
    handleStepSubmit,
    submitSignup,
  } = useSignupFormFlow({ socialSignup });

  return (
    <FormProvider {...methods}>
      <div
        className={cn(
          "m-4 flex w-full flex-col gap-8",
          isComplete ? "max-w-170" : "max-w-150 sm:max-w-142",
        )}
      >
        {!isComplete ? (
          <>
            <div className="flex justify-center">
              <SignupStepIndicator currentStep={currentStep} />
            </div>

            <form
              onSubmit={handleStepSubmit}
              className="flex min-h-155 flex-col gap-2 rounded-4xl bg-gray-800 px-6 py-8 md:min-h-170 md:rounded-[40px] md:px-10 md:py-12 lg:px-14"
            >
              {currentStep === 1 && <SignupStep1 />}

              {currentStep === 2 && (
                <SignupStep2
                  accountMode={accountMode}
                  socialSignup={socialSignup}
                />
              )}

              {currentStep === 3 && (
                <SignupStep3
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  onPrevious={handlePrevious}
                  onSkip={() => void handleSkip()}
                  onSubmit={() => void submitSignup()}
                />
              )}

              {currentStep < 3 && (
                <div className="mt-auto flex w-full flex-col gap-3 pt-6">
                  {submitError ? <FieldError>{submitError}</FieldError> : null}

                  <div
                    className={cn(
                      "flex w-full gap-3",
                      currentStep === 1 && "md:justify-end",
                    )}
                  >
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={isCheckingEmail}
                        className="flex h-15 w-full items-center justify-center rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] px-7.5 py-4 text-lg font-semibold text-[#58677D] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        이전
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={isCheckingEmail || isStep1NextDisabled}
                      className={cn(
                        "flex h-15 w-full items-center justify-center rounded-[18px] bg-[#00D7A0] px-7.5 py-4 text-lg font-semibold text-[#F8FAFC] transition-colors hover:bg-[#00c391] disabled:cursor-not-allowed disabled:opacity-50",
                        currentStep === 1 &&
                          "md:ml-auto md:w-[calc((100%-0.75rem)/2)]",
                        isStep1NextDisabled &&
                          "bg-[#334155] text-[#94A3B8] hover:bg-[#334155] disabled:opacity-100",
                      )}
                    >
                      {isCheckingEmail ? "확인 중..." : "다음"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        ) : (
          <SignupCompleteStep onStart={handleCompleteStart} />
        )}
      </div>
    </FormProvider>
  );
}
