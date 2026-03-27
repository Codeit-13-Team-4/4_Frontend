"use client";

import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, type ComponentProps } from "react";

const textAreaWrapperVariants = cva(
  "flex flex-col rounded-xl bg-gray-900 overflow-hidden",
  {
    variants: {
      size: {
        sm: "w-[311px] h-[120px]",
        lg: "w-[456px] h-[120px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

interface TextAreaProps
  extends
    ComponentProps<"textarea">,
    VariantProps<typeof textAreaWrapperVariants> {
  wrapperClassName?: string;
}

function TextArea({
  className,
  wrapperClassName,
  size,
  maxLength,
  onChange,
  value,
  defaultValue,
  disabled,
  ...props
}: TextAreaProps) {
  const [count, setCount] = useState(() => {
    if (value !== undefined) return String(value).length;
    if (defaultValue !== undefined) return String(defaultValue).length;
    return 0;
  });

  return (
    <div className={cn(textAreaWrapperVariants({ size }), wrapperClassName)}>
      <textarea
        {...props}
        disabled={disabled}
        className={cn(
          "scrollbar-hide w-full flex-1 resize-none overflow-y-auto bg-transparent px-3 pt-3 text-white outline-none placeholder:text-gray-400 disabled:placeholder:text-gray-700",
          className,
        )}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          setCount(e.target.value.length);
          onChange?.(e);
        }}
      />
      {maxLength !== undefined && (
        <TextAreaCount
          count={count}
          maxLength={maxLength}
          disabled={disabled}
          size={size}
        />
      )}
    </div>
  );
}

interface TextAreaCountProps {
  count: number;
  maxLength: number;
  disabled?: boolean;
  size?: VariantProps<typeof textAreaWrapperVariants>["size"];
}

function TextAreaCount({
  count,
  maxLength,
  disabled,
  size,
}: TextAreaCountProps) {
  return (
    <div
      className={cn(
        "px-3 pb-3 text-right",
        size === "sm" ? "text-xs" : "text-sm",
        disabled ? "text-gray-700" : "text-gray-400",
      )}
    >
      {count}/{maxLength}
    </div>
  );
}

export { TextArea };
