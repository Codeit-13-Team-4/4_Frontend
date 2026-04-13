"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type ComponentProps, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { login } from "@/features/auth/api/login";
import { getMe } from "@/features/auth/api/getMe";
import { logout } from "@/features/auth/api/logout";
import {
  buildLoginPath,
  getSafeRedirectPath,
} from "@/features/auth/lib/authRedirect";
import { authKeys } from "@/features/auth/model/auth.queryKey";
import { checkEmail } from "@/features/auth/signup/api/checkEmail";
import { completeSignupProfile } from "@/features/auth/signup/api/completeSignupProfile";
import {
  signup,
  socialSignup as submitSocialSignup,
} from "@/features/auth/signup/api/signup";
import {
  isReloadNavigation,
  isValidEmail,
  isValidExternalLink,
} from "@/features/auth/signup/lib/signupFormUtils";
import { getDuplicateEmailErrorMessage } from "@/features/auth/signup/lib/signupError";
import {
  getSignupDefaultValues,
  type SignupAccountMode,
  type SignupFormValues,
  type SignupStep,
  type SocialSignupContext,
} from "@/features/auth/signup/model/signupForm";

interface UseSignupFormFlowOptions {
  socialSignup?: SocialSignupContext;
}

export function useSignupFormFlow({ socialSignup }: UseSignupFormFlowOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const redirectPath = getSafeRedirectPath(searchParams.get("redirect"));
  const accountMode: SignupAccountMode = socialSignup ? "social" : "local";

  const [currentStep, setCurrentStep] = useState<SignupStep>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<SignupFormValues>({
    shouldUnregister: false,
    defaultValues: getSignupDefaultValues({
      socialSignup,
    }),
  });

  const selectedJobLabel = methods.watch("jobLabel");

  useEffect(() => {
    if (!isReloadNavigation()) return;
    router.replace(buildLoginPath(redirectPath));
  }, [redirectPath, router]);

  const moveStep = (step: SignupStep) => {
    setCurrentStep(step);
    setIsComplete(false);
    setSubmitError(null);
  };

  const openComplete = () => {
    setIsComplete(true);
    setSubmitError(null);
  };

  const getNormalizedValues = () => {
    const values = methods.getValues();

    return {
      ...values,
      nickname: values.nickname.trim(),
      email: values.email.trim(),
      bio: values.bio.trim(),
      externalLink: values.externalLink.trim(),
    };
  };

  const getValidatedJobLabel = () => {
    const { jobLabel } = methods.getValues();

    if (jobLabel) {
      methods.clearErrors("jobLabel");
      return jobLabel;
    }

    methods.setError("jobLabel", {
      type: "manual",
      message: "직군을 선택해주세요.",
    });
    return null;
  };

  const validateStep1 = () => {
    return getValidatedJobLabel() !== null;
  };

  const setDuplicateEmailError = (message: string) => {
    methods.setError("email", {
      type: "manual",
      message,
    });
  };

  const validateStep2Fields = () => {
    const values = getNormalizedValues();
    let isValid = true;

    methods.clearErrors(["nickname", "email", "password", "passwordConfirm"]);

    if (!values.nickname) {
      methods.setError("nickname", {
        type: "manual",
        message: "닉네임을 입력해주세요.",
      });
      isValid = false;
    }

    if (!values.email) {
      methods.setError("email", {
        type: "manual",
        message: "이메일을 입력해주세요.",
      });
      isValid = false;
    } else if (values.email.includes(" ") || !isValidEmail(values.email)) {
      methods.setError("email", {
        type: "manual",
        message: "이메일 형식이 올바르지 않습니다.",
      });
      isValid = false;
    }

    if (accountMode === "local") {
      if (!values.password) {
        methods.setError("password", {
          type: "manual",
          message: "비밀번호를 입력해주세요.",
        });
        isValid = false;
      }

      if (!values.passwordConfirm) {
        methods.setError("passwordConfirm", {
          type: "manual",
          message: "비밀번호 확인을 입력해주세요.",
        });
        isValid = false;
      } else if (values.password !== values.passwordConfirm) {
        methods.setError("passwordConfirm", {
          type: "manual",
          message: "비밀번호가 일치하지 않습니다.",
        });
        isValid = false;
      }
    }

    return isValid;
  };

  const validateEmailDuplication = async () => {
    if (accountMode === "social") return true;

    const { email } = getNormalizedValues();

    setIsCheckingEmail(true);
    setSubmitError(null);

    try {
      const result = await checkEmail(email);

      if (result.available === false) {
        setDuplicateEmailError(result.message || "이미 가입된 이메일입니다.");
        return false;
      }

      return true;
    } catch (error) {
      methods.setError("email", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "이미 사용 중인 이메일입니다.",
      });
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const validateStep2 = async () => {
    const isFieldValid = validateStep2Fields();
    if (!isFieldValid) return false;

    return validateEmailDuplication();
  };

  const submitSignup = async () => {
    const values = getNormalizedValues();
    const jobLabel = getValidatedJobLabel();

    if (!jobLabel) {
      moveStep(1);
      return;
    }

    if (values.externalLink && !isValidExternalLink(values.externalLink)) {
      methods.setError("externalLink", {
        type: "manual",
        message: "올바른 URL 형식을 입력해주세요.",
      });
      return;
    }

    methods.clearErrors("externalLink");

    const isAccountStepValid = await validateStep2();
    if (!isAccountStepValid) {
      moveStep(2);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (accountMode === "social" && socialSignup) {
        await submitSocialSignup({
          type: socialSignup.type,
          token: socialSignup.token,
          email: values.email,
          nickname: values.nickname,
          jobLabel,
        });
      } else {
        await signup({
          email: values.email,
          nickname: values.nickname,
          password: values.password,
          jobLabel,
        });
      }

      const hasAdditionalProfileData =
        values.bio.length > 0 ||
        values.skills.length > 0 ||
        values.externalLink.length > 0;

      if (accountMode === "local" && hasAdditionalProfileData) {
        await login({
          email: values.email,
          password: values.password,
        });
      }

      if (hasAdditionalProfileData) {
        await completeSignupProfile({
          nickname: values.nickname,
          jobLabel,
          bio: values.bio,
          skills: values.skills,
          externalLink: values.externalLink,
        });
      }

      try {
        await logout();
      } catch {}

      await queryClient.resetQueries({ queryKey: authKeys.me() });
      await queryClient.fetchQuery({
        queryKey: authKeys.me(),
        queryFn: getMe,
      });

      openComplete();
    } catch (error) {
      const duplicateEmailMessage = getDuplicateEmailErrorMessage(error);

      if (duplicateEmailMessage) {
        setDuplicateEmailError(duplicateEmailMessage);
        moveStep(2);
        return;
      }

      setSubmitError(
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      moveStep(2);
      return;
    }

    if (currentStep === 2) {
      const isValid = await validateStep2();
      if (!isValid) return;
      moveStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 3) {
      moveStep(2);
      return;
    }

    if (currentStep === 2) {
      moveStep(1);
    }
  };

  const handleSkip = async () => {
    methods.setValue("bio", "");
    methods.setValue("skills", []);
    methods.setValue("externalLink", "");
    await submitSignup();
  };

  const handleStepSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    void handleNext();
  };

  const handleCompleteStart = () => {
    router.replace(buildLoginPath(redirectPath));
  };

  const isStep1NextDisabled = useMemo(
    () => currentStep === 1 && !selectedJobLabel,
    [currentStep, selectedJobLabel],
  );

  return {
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
  };
}
