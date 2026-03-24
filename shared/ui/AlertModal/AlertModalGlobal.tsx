"use client";

import { useAlertModal } from "@/shared/store/AlertModal";
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

  return (
    <AlertModal open={store.isOpen}>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Close onClick={handleCancelClick} />
          <AlertModal.Title>{store.title}</AlertModal.Title>
          <AlertModal.Description>{store.description}</AlertModal.Description>
        </AlertModal.Header>

        <AlertModal.Footer>
          <AlertModal.Cancel onClick={handleCancelClick} className="w-full">
            {store.calcelText ?? "취소"}
          </AlertModal.Cancel>
          <AlertModal.Action onClick={handleActionClick} className="w-full">
            {store.confirmText ?? "확인"}
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal>
  );
}

export { AlertModalGlobal };
