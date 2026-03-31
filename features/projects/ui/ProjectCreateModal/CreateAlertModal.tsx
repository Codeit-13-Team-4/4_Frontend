import { AlertModal, Button, CompleteAnimation } from "@/shared/ui";
import Link from "next/link";
import { ProjectAlertModalProps } from "@/features/projects/model";

export function CreateAlertModal({
  open,
  onOpenChange,
}: ProjectAlertModalProps) {
  return (
    <AlertModal open={open} onOpenChange={onOpenChange}>
      <AlertModal.Content>
        <div className="mt-2 flex items-center justify-center">
          <CompleteAnimation />
        </div>

        <AlertModal.Header>
          <AlertModal.Title>프로젝트 개설이 완료되었어요</AlertModal.Title>
          <AlertModal.Description>
            이제 멋진 멤버들과 함께 목표를 향해 달려볼까요?
          </AlertModal.Description>
        </AlertModal.Header>
        <AlertModal.Footer>
          <AlertModal.Cancel asChild>
            <Link href="/projects" className="min-w-58">
              <Button className="h-full w-full">계속 둘러보기</Button>
            </Link>
          </AlertModal.Cancel>
          <AlertModal.Action className="w-full">
            <Link href="/">지원 내역 확인</Link>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
