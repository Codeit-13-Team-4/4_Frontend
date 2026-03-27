import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { buttonVariants, gradientButtonVariants } from "@/shared/ui";
import { type VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type GradientButtonVariant = VariantProps<
  typeof gradientButtonVariants
>["variant"];

type AlertModalButtonType =
  | { type: "default"; variant?: ButtonVariant }
  | { type: "gradient"; variant?: GradientButtonVariant };

export type AlertModalButton = {
  text?: string;
  button?: AlertModalButtonType;
};

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  positive?: AlertModalButton;
  negative?: AlertModalButton;
  showCompleteAnimation?: boolean;
  onPositive?: () => void;
  onNegative?: () => void;
};

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);
  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
