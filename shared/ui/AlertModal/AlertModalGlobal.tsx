"use client";

import { useAlertModal } from "@/shared/store/AlertModal";
import { CompleteAnimation } from "@/shared/ui/CompleteAnimation/CompleteAnimation";
import { GradientButton } from "@/shared/ui/GradientButton/GradientButton";
import { AlertModal } from "./AlertModal";

function AlertModalGlobal() {
  const store = useAlertModal();
  if (!store.isOpen) return null;

  const handleCancelClick = () => {
    if (store.onNegative) store.onNegative();
    store.actions.close();
  };

  const handleActionClick = () => {
    if (store.onPositive) store.onPositive();
    store.actions.close();
  };

  const negativeButton = store.negative?.button ?? {
    type: "default" as const,
    variant: "default" as const,
  };
  const positiveButton = store.positive?.button ?? {
    type: "default" as const,
    variant: "primary" as const,
  };

  return (
    <AlertModal open={store.isOpen}>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Close onClick={store.actions.close} />
          {(store.showCompleteAnimation ?? false) && (
            <CompleteAnimation className="mb-4 size-10 sm:size-12.5" />
          )}
          <AlertModal.Title>{store.title}</AlertModal.Title>
          <AlertModal.Description>{store.description}</AlertModal.Description>
        </AlertModal.Header>

        <AlertModal.Footer className="flex-col sm:flex-row">
          {negativeButton.type === "gradient" ? (
            <AlertModal.Cancel asChild onClick={handleCancelClick}>
              <GradientButton
                variant={negativeButton.variant}
                size="lg"
                className="w-full"
              >
                {store.negative?.text ?? "취소"}
              </GradientButton>
            </AlertModal.Cancel>
          ) : (
            <AlertModal.Cancel
              onClick={handleCancelClick}
              className="w-full"
              variant={negativeButton.variant}
            >
              {store.negative?.text ?? "취소"}
            </AlertModal.Cancel>
          )}
          {positiveButton.type === "gradient" ? (
            <AlertModal.Action asChild onClick={handleActionClick}>
              <GradientButton
                variant={positiveButton.variant}
                size="lg"
                className="w-full"
              >
                {store.positive?.text ?? "확인"}
              </GradientButton>
            </AlertModal.Action>
          ) : (
            <AlertModal.Action
              onClick={handleActionClick}
              className="w-full"
              variant={positiveButton.variant}
            >
              {store.positive?.text ?? "확인"}
            </AlertModal.Action>
          )}
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}

export { AlertModalGlobal };
