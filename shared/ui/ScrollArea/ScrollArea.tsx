import { cn } from "@/shared/utils";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

function ScrollArea({
  className,
  children,
  scrollbarClassName,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  scrollbarClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.Root className={cn("relative", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar className={scrollbarClassName} />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={cn(
        "flex h-full w-2 touch-none border border-transparent p-px transition-colors select-none",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-700" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
