"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { Check, XIcon } from "@/shared/icons";
import { Spinner } from "../Spinner/Spinner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <Check className="bg-mint-500 size-4 rounded-full p-0.5" />,
        error: <XIcon className="bg-error size-4 rounded-full p-0.5" />,
        loading: <Spinner className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-gray-900)",
          "--normal-text": "var(--color-gray-50)",
          "--normal-border": "var(--color-gray-600)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          title: "!font-semibold",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
