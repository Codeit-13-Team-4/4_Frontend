import { cn } from "@/shared/utils";
import { AlertDialog } from "radix-ui";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../Button/Button";

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
      className={cn("grid place-items-center gap-2 text-center", className)}
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
          "data-open:animate-modal-in data-closed:animate-modal-out fixed top-1/2 left-1/2 z-50 grid w-140 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-14 rounded-[40px] bg-[#1E293B] px-10 pt-12 pb-10 text-white outline-none",
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
  return <div className={cn("flex gap-2 md:gap-4", className)} {...props} />;
}

function AlertModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Title>) {
  return (
    <AlertDialog.Title
      className={cn("text-xl font-semibold sm:text-2xl", className)}
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
        "text-base text-balance text-gray-400 sm:text-lg md:text-pretty",
        className,
      )}
      {...props}
    />
  );
}

function AlertModalAction({
  className,
  variant = "primary",
  size = "lg",
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
  variant = "default",
  size = "lg",
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

function AlertModalClose({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Cancel>) {
  return (
    <AlertDialog.Cancel {...props} asChild>
      <Button
        variant="ghost"
        className={cn(
          "ml-auto h-6 p-0 text-gray-400 hover:bg-gray-700 hover:text-white",
          className,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </Button>
    </AlertDialog.Cancel>
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
AlertModal.Close = AlertModalClose;

export { AlertModal };
