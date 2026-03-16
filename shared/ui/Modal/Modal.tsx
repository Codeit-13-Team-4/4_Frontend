"use client";

import { createPortal } from "react-dom";
import {
  ReactNode,
  useEffect,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
} from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
  children?: ReactNode;
}

interface ModalSectionProps extends PropsWithChildren {
  className?: string;
}

function ModalHeader({ children, className }: ModalSectionProps) {
  return <div className={`mb-6 ${className ?? ""}`}>{children}</div>;
}
function ModalTitle({ children, className }: ModalSectionProps) {
  return (
    <h2
      className={`text-center text-xl font-semibold text-black dark:text-white ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

function ModalBody({ children, className }: ModalSectionProps) {
  return (
    <div className={`mt-2 text-black dark:text-white ${className ?? ""}`}>
      {children}
    </div>
  );
}

function ModalFooter({ children, className }: ModalSectionProps) {
  return (
    <div
      className={`mt-8 flex items-center justify-end gap-2 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function ModalCloseButton({ onClose, className }: ModalProps) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <button
      type="button"
      aria-label="모달 닫기"
      onClick={handleCloseClick}
      className={`absolute top-4 right-4 text-2xl font-semibold text-black dark:text-white ${className ?? ""}`}
    >
      ×
    </button>
  );
}

interface ModalCompoundComponent {
  (props: ModalProps): ReactElement | null;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

const Modal = (({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={handlePanelClick}
        className={`relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl dark:bg-black ${className ?? ""}`}
      >
        {showCloseButton ? (
          <ModalCloseButton isOpen={isOpen} onClose={onClose} />
        ) : null}
        {children}
      </div>
    </div>,
    document.body,
  );
}) as ModalCompoundComponent;

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
