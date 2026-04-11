import { AlertModal, Button } from "@/shared/ui";
import Link from "next/link";
import { ChallengesAlertModalProps } from "@/features/challenges/model";

export function ChallengesCreateCancelAlertModal({
  open,
  onOpenChange,
}: ChallengesAlertModalProps) {
  return (
    <AlertModal open={open} onOpenChange={onOpenChange}>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Title>작성을 중단하시겠어요?</AlertModal.Title>
          <AlertModal.Description>
            지금 나가면 작성 중인 신청 사유가 저장되지 않고 사라져요.
          </AlertModal.Description>
        </AlertModal.Header>

        <AlertModal.Footer className="flex-col sm:flex-row">
          <AlertModal.Cancel asChild>
            <Link href="/challenges" className="w-full">
              <Button className="w-full">나가기</Button>
            </Link>
          </AlertModal.Cancel>
          <AlertModal.Action asChild>
            <Button
              variant="primary"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              이어서 작성하기
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
