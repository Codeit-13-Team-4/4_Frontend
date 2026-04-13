import { AlertModal, Button } from "@/shared/ui";
import Link from "next/link";
import { ProjectAlertModalProps } from "@/features/projects/model";
import { CompleteAnimation } from "@/shared/ui/CompleteAnimation/CompleteAnimation";

export function CreateAlertModal({
  open,
  onOpenChange,
  id,
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
            <Button className="h-full w-full" asChild>
              <Link href="/projects" className="min-w-58" replace>
                계속 둘러보기
              </Link>
            </Button>
          </AlertModal.Cancel>
          <AlertModal.Action asChild className="w-full">
            <Button variant="primary" className="h-full w-full" asChild>
              <Link href={`/projects/${id}`} replace>
                개설한 프로젝트 확인
              </Link>
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}
