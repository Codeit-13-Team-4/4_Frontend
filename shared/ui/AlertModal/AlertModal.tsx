import { cn } from "@/shared/utils";
import { AlertDialog } from "radix-ui";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../Button/Button";

function AlertModal({
  ...props
}: React.ComponentProps<typeof AlertDialog.Root>) {
  return <AlertDialog.Root {...props} />;
}

function AlertModalTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialog.Trigger>) {
  return <AlertDialog.Trigger {...props} />;
}

function AlertModalPortal({
  ...props
}: React.ComponentProps<typeof AlertDialog.Portal>) {
  return <AlertDialog.Portal {...props} />;
}

function AlertModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Overlay>) {
  return (
    <AlertDialog.Overlay
      className={cn(
        "data-open:animate-overlay-in data-closed:animate-overlay-out fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function AlertModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid place-items-center gap-1.5 text-center", className)}
      {...props}
    />
  );
}

function AlertModalContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Content>) {
  return (
    <AlertModalPortal>
      <AlertModalOverlay />
      <AlertDialog.Content
        className={cn(
          "data-open:animate-modal-in data-closed:animate-modal-out fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-white p-4 outline-none",
          className,
        )}
        {...props}
      />
    </AlertModalPortal>
  );
}

function AlertModalFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "-mx-4 -mb-4 flex flex-col gap-2 rounded-b-xl p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Title>) {
  return (
    <AlertDialog.Title
      className={cn("text-base font-medium", className)}
      {...props}
    />
  );
}

function AlertModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Description>) {
  return (
    <AlertDialog.Description
      className={cn(
        "text-sm text-balance text-gray-500 md:text-pretty",
        className,
      )}
      {...props}
    />
  );
}

function AlertModalAction({
  className,
  variant = "default",
  size = "sm",
  ...props
}: React.ComponentProps<typeof AlertDialog.Action> &
  VariantProps<typeof buttonVariants>) {
  return (
    <AlertDialog.Action
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function AlertModalCancel({
  className,
  variant = "secondary",
  size = "sm",
  ...props
}: React.ComponentProps<typeof AlertDialog.Cancel> &
  VariantProps<typeof buttonVariants>) {
  return (
    <AlertDialog.Cancel
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

AlertModal.Trigger = AlertModalTrigger;
AlertModal.Portal = AlertModalPortal;
AlertModal.Overlay = AlertModalOverlay;
AlertModal.Content = AlertModalContent;
AlertModal.Header = AlertModalHeader;
AlertModal.Footer = AlertModalFooter;
AlertModal.Title = AlertModalTitle;
AlertModal.Description = AlertModalDescription;
AlertModal.Action = AlertModalAction;
AlertModal.Cancel = AlertModalCancel;

export { AlertModal };
