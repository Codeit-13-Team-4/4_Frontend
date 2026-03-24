import { cn } from "@/shared/utils";
import { DropdownMenu } from "radix-ui";
import { Separator } from "..";

function Dropdown({
  ...props
}: React.ComponentProps<typeof DropdownMenu.Root>) {
  return <DropdownMenu.Root {...props} />;
}

function DropdownTrigger({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Trigger>) {
  return (
    <DropdownMenu.Trigger
      asChild
      {...props}
      className="cursor-pointer focus:outline-none"
    >
      {children}
    </DropdownMenu.Trigger>
  );
}

function DropdownContent({
  className,
  sideOffset = 5,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn("rounded-md border bg-white p-1 shadow-md", className)}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenu.Portal>
  );
}
function DropdownRadioGroup({
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenu.RadioGroup>) {
  return (
    <DropdownMenu.RadioGroup {...props}>{children}</DropdownMenu.RadioGroup>
  );
}
function DropdownRadioItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.RadioItem>) {
  return (
    <DropdownMenu.RadioItem
      {...props}
      className={cn(
        "w-full cursor-pointer rounded px-2 py-1 focus:outline-none data-[state=checked]:bg-[#334155] data-[state=checked]:text-[#e2e8f0]",
        className,
      )}
    >
      {children}
    </DropdownMenu.RadioItem>
  );
}

function DropdownSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Separator>) {
  return <Separator className={cn("bg-[#334155]", className)} {...props} />;
}

function DropdownItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Item>) {
  return (
    <DropdownMenu.Item
      className={cn(
        "cursor-pointer rounded px-2 py-1 text-sm focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.RadioGroup = DropdownRadioGroup;
Dropdown.RadioItem = DropdownRadioItem;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export { Dropdown };
