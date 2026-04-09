import { cn } from "@/shared/utils";
import { Dialog } from "radix-ui";
import { Button, ScrollArea } from "@/shared/ui";
import { XIcon } from "@/shared/icons";

function Modal({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="dialog" {...props} />;
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}

function ModalPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal {...props} />;
}

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "data-open:animate-overlay-in data-closed:animate-overlay-out fixed inset-0 isolate z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function ModalClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close {...props} />;
}

function ModalCloseIcon({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return (
    <Dialog.Close asChild>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "ml-auto h-6 w-6 p-0 text-gray-400 hover:bg-gray-700 hover:text-white",
          className,
        )}
        {...props}
      >
        <XIcon width={16} height={16} className="text-gray-200" />
      </Button>
    </Dialog.Close>
  );
}

function ModalContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <ModalPortal>
      <ModalOverlay />
      <Dialog.Content
        className={cn(
          "data-open:animate-modal-in data-closed:animate-modal-out fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-hidden rounded-[40px] bg-gray-800 p-12 text-gray-400 shadow-xl duration-100 outline-none sm:max-w-136",
          className,
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        {...props}
      >
        {children}
      </Dialog.Content>
    </ModalPortal>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

function ModalBody({
  className,
  children,
  scrollbarClassName,
}: React.ComponentProps<"div"> & { scrollbarClassName?: string }) {
  return (
    <ScrollArea
      className="max-h-[50vh]"
      type="always"
      scrollbarClassName={scrollbarClassName}
    >
      <div
        data-slot="dialog-body"
        className={cn("flex flex-col gap-6", className)}
      >
        {children}
      </div>
    </ScrollArea>
  );
}

function ModalFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-row gap-4", className)} {...props}>
      {children}
    </div>
  );
}

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn(
        "text-base font-medium text-gray-50 sm:text-2xl sm:font-semibold",
        className,
      )}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn(
        "text-base font-medium text-gray-400 sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

Modal.Trigger = ModalTrigger;
Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Close = ModalClose;
Modal.CloseIcon = ModalCloseIcon;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
