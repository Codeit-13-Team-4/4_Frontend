"use client";

import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { type DateRange } from "react-day-picker";
import { cn } from "@/shared/utils";
import { Calendar } from "@/shared/ui/Calendar/Calendar";
import { Button } from "@/shared/ui/Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/Popover/Popover";

const triggerBase =
  "flex h-12 w-full cursor-pointer items-center gap-2 rounded-xl border border-[#334155] bg-gray-800 px-3 text-base outline-none py-3";

interface DatePickerSingleProps {
  mode: "single";
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

interface DatePickerRangeProps {
  mode: "range";
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

function DatePicker(props: DatePickerProps) {
  if (props.mode === "single") {
    return <SingleDatePicker {...props} />;
  }
  return <RangeDatePicker {...props} />;
}

function SingleDatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  className,
}: DatePickerSingleProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn(triggerBase, className)}>
          <Image
            src="/common/icon/calendar.svg"
            alt="달력"
            width={16}
            height={16}
            className="shrink-0"
          />
          <span className="text-gray-50">
            {value ? format(value, "yyyy-MM-dd") : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function RangeDatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  className,
}: DatePickerRangeProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>(value);

  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(value);
    setOpen(next);
  };

  const handleReset = () => setDraft(undefined);

  const handleApply = () => {
    onChange?.(draft);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className={cn("flex items-end gap-6", className)}>
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-sm font-medium text-gray-400">시작일</span>
            <button className={triggerBase}>
              <Image
                src="/common/icon/calendar.svg"
                alt="달력"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span className="text-gray-50">
                {value?.from ? format(value.from, "yyyy-MM-dd") : placeholder}
              </span>
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-sm font-medium text-gray-400">종료일</span>
            <button className={triggerBase}>
              <Image
                src="/common/icon/calendar.svg"
                alt="달력"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span className="text-gray-50">
                {value?.to ? format(value.to, "yyyy-MM-dd") : placeholder}
              </span>
            </button>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-col overflow-hidden rounded-2xl">
          <Calendar
            mode="range"
            selected={draft}
            onSelect={setDraft}
            className="rounded-b-none"
          />
          <div className="flex gap-3 bg-gray-900 px-4 pb-4">
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleApply}
            >
              적용
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
