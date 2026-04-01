"use client";

import * as React from "react";
import Image from "next/image";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";
import { ko } from "date-fns/locale";
import { cn } from "@/shared/utils";

function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={ko}
      formatters={{
        formatCaption: (date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
      }}
      classNames={{
        root: cn(
          "bg-gray-900 text-gray-200 p-4 rounded-2xl w-fit max-w-full select-none relative",
          defaultClassNames.root,
          className,
        ),
        months: cn("flex flex-col", defaultClassNames.months),
        month_caption: cn(
          "flex items-center justify-center h-10 mb-2",
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          "text-base font-semibold text-gray-50",
          defaultClassNames.caption_label,
        ),
        nav: cn(
          "absolute inset-x-4 top-4 flex items-center justify-between h-10 pointer-events-none",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "pointer-events-auto flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-50 hover:bg-gray-700 transition-colors",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "pointer-events-auto flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-50 hover:bg-gray-700 transition-colors",
          defaultClassNames.button_next,
        ),
        chevron: "hidden",
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: defaultClassNames.weekdays,
        weekday: cn(
          "w-8 h-8 sm:w-10 sm:h-10 text-xs font-medium text-gray-400 text-center align-middle",
          defaultClassNames.weekday,
        ),
        weeks: defaultClassNames.weeks,
        week: defaultClassNames.week,
        day: cn(
          "w-8 h-8 sm:w-10 sm:h-10 p-0 relative text-center",
          defaultClassNames.day,
        ),
        range_start: cn(
          "before:absolute before:inset-y-0 before:right-0 before:left-1/2 before:bg-mint-500/10",
          defaultClassNames.range_start,
        ),
        range_end: cn(
          "before:absolute before:inset-y-0 before:left-0 before:right-1/2 before:bg-mint-500/10",
          defaultClassNames.range_end,
        ),
        range_middle: cn("bg-mint-500/10", defaultClassNames.range_middle),
        outside: defaultClassNames.outside,
        disabled: defaultClassNames.disabled,
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <Image
              src="/common/icon/arrow-left.svg"
              alt="이전"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/common/icon/arrow-right.svg"
              alt="다음"
              width={24}
              height={24}
            />
          ),
        DayButton: (dayButtonProps) => (
          <CalendarDayButton {...dayButtonProps} />
        ),
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      data-outside={modifiers.outside}
      data-disabled={modifiers.disabled}
      className={cn(
        // 기본
        "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-lg p-1.5 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700 sm:p-2.5",
        // 오늘
        "data-[today=true]:text-mint-700 data-[today=true]:font-bold",
        // single 선택
        "data-[selected-single=true]:bg-mint-500 data-[selected-single=true]:hover:bg-mint-700 data-[selected-single=true]:text-gray-50",
        // range start / end
        "data-[range-start=true]:bg-mint-500 data-[range-start=true]:hover:bg-mint-700 data-[range-start=true]:text-gray-50",
        "data-[range-end=true]:bg-mint-500 data-[range-end=true]:hover:bg-mint-700 data-[range-end=true]:text-gray-50",
        // range middle
        "data-[range-middle=true]:text-mint-500 data-[range-middle=true]:hover:bg-mint-500/20 data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent",
        // 외부 날짜
        "data-[outside=true]:text-gray-600",
        // 비활성
        "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-gray-600 data-[disabled=true]:hover:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar };
