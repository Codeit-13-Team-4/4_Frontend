"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn/cn";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  className?: string;
}

interface ModalSectionProps extends PropsWithChildren {
  className?: string;
}

function ModalOverlay({ className }: ModalSectionProps) {
  return (
    <Dialog.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
    />
  );
}

function ModalTitle({ children, className }: ModalSectionProps) {
  return (
    <Dialog.Title
      className={cn(
        "text-2xl font-semibold text-black dark:text-white",
        className,
      )}
    >
      {children}
    </Dialog.Title>
  );
}

function ModalDescription({ children, className }: ModalSectionProps) {
  return (
    <Dialog.Description
      className={cn("mt-2 text-sm text-gray-500 dark:text-gray-400", className)}
    >
      {children}
    </Dialog.Description>
  );
}

function ModalBody({ children, className }: ModalSectionProps) {
  return <div className={cn("mt-6", className)}>{children}</div>;
}

function ModalCloseBtn({ className }: ModalSectionProps) {
  return (
    <Dialog.Close asChild>
      <button
        type="button"
        aria-label="모달 닫기"
        className={cn(
          "absolute top-5 right-10 text-2xl text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200",
          className,
        )}
      >
        ×
      </button>
    </Dialog.Close>
  );
}

function ModalContent({ children, className, showCloseButton }: ModalProps) {
  return (
    <Dialog.Content
      className={cn(
        "fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-xl outline-none dark:bg-black",
        className,
      )}
    >
      {showCloseButton ? <ModalCloseBtn /> : null}
      {children}
    </Dialog.Content>
  );
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>{children}</Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Body = ModalBody;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.CloseBtn = ModalCloseBtn;

export default Modal;
