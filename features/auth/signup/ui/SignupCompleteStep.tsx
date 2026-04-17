"use client";

import { AlertModal, CompleteAnimation } from "@/shared/ui";

interface SignupCompleteStepProps {
  onStart: () => void;
}

export default function SignupCompleteStep({
  onStart,
}: SignupCompleteStepProps) {
  return (
    <AlertModal open>
      <AlertModal.Content>
        <AlertModal.Header className="gap-4">
          <CompleteAnimation className="size-10 md:size-15" />

          <div className="flex flex-col gap-3">
            <AlertModal.Title className="text-xl leading-tight font-semibold text-[#F8FAFC] md:text-2xl">
              데브업에 가입하신걸 환영합니다🎉
            </AlertModal.Title>
            <AlertModal.Description className="text-base text-[#94A3B8] md:text-lg">
              지금 바로 원하는 활동을 탐색해보세요
            </AlertModal.Description>
          </div>
        </AlertModal.Header>

        <AlertModal.Footer className="w-full justify-center">
          <AlertModal.Action asChild onClick={onStart}>
            <button
              type="button"
              className="bg-mint-500 flex w-full items-center justify-center rounded-[18px] px-4 py-2.5 text-sm font-semibold text-gray-50 transition-colors hover:bg-[#00c391] sm:max-w-120 md:px-7.5 md:py-4 md:text-lg"
            >
              시작하기
            </button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
