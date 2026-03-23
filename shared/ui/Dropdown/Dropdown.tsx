import { cn } from "@/shared/utils";
import { DropdownMenu } from "radix-ui";

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
      className={cn("cursor-pointer focus:outline-none", className)}
    >
      {children}
    </DropdownMenu.RadioItem>
  );
}

function DropdownItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Item>) {
  return (
    <DropdownMenu.Item
      className={cn("cursor-pointer rounded px-2 py-1 text-sm", className)}
      {...props}
    />
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.RadioGroup = DropdownRadioGroup;
Dropdown.RadioItem = DropdownRadioItem;
Dropdown.Item = DropdownItem;

export { Dropdown };
