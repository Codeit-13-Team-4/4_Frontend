import React, { ReactNode, SetStateAction } from "react";

type ToastVariant = "default" | "success" | "error";

export interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
  duration?: number;
  icon?: React.ReactNode;
}

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  icon?: ReactNode;
}

type ToastFn = React.Dispatch<SetStateAction<ToastItem[]>> | null;

let setToastFn: ToastFn = null;
let id = 0;
const TOAST_DEFAULT_DURATION = 2000;

export const registerToast = (fn: ToastFn) => {
  setToastFn = fn;
};

export const unregisterToast = () => {
  setToastFn = null;
};
export const toast = (message: string, options: ToastOptions = {}) => {
  if (!setToastFn) return;

  const {
    variant = "default",
    duration = TOAST_DEFAULT_DURATION,
    icon,
  } = options;
  const toastId = ++id;

  const newToast: ToastItem = {
    id: toastId,
    message,
    variant,
    duration,
    icon,
  };

  setToastFn((prev) => [...prev, newToast]);

  const timer = setTimeout(() => {
    setToastFn?.((prev) => prev.filter((item) => item.id !== toastId));
  }, duration);
  return () => clearTimeout(timer);
};
