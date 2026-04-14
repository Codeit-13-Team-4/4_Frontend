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
      <AlertModal.Content className="max-w-[560px] gap-14 rounded-[40px] px-10 py-12">
        <AlertModal.Header className="gap-4">
          <CompleteAnimation className="size-25" />

          <div className="flex flex-col gap-3">
            <AlertModal.Title className="text-[24px] leading-tight font-semibold text-[#F8FAFC]">
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
              className="flex h-[60px] w-full items-center justify-center rounded-[18px] bg-[#00D7A0] px-[30px] py-4 text-lg font-semibold text-[#F8FAFC] transition-colors hover:bg-[#00c391] sm:max-w-[480px]"
            >
              시작하기
            </button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
