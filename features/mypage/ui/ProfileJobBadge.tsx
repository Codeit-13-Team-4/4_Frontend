import { cva } from "class-variance-authority";
import { JobLabelType } from "@/shared/types/user";
import { JOB_LABEL_MAP } from "@/features/mypage/model/mypage.constants";

const jobBadgeVariants = cva(
  "inline-flex items-center rounded-3xl px-3 py-1 text-[14px] font-medium border",
  {
    variants: {
      variant: {
        fe: "bg-violet-subtle/60 border-violet-strong text-violet-strong",
        be: "bg-orange-subtle/60 border-orange-strong text-orange-strong",
        designer: "bg-cyan-subtle/60 border-cyan-strong text-cyan-strong",
        marketer: "bg-pink-subtle/60 border-pink-strong text-pink-strong",
        android:
          "bg-emerald-subtle/60 border-emerald-strong text-emerald-strong",
        ios: "bg-indigo-subtle/60 border-indigo-strong text-indigo-strong",
        devops: "bg-slate-subtle border-slate-strong text-slate-strong",
        pm: "bg-amber-subtle/60 border-amber-strong text-amber-strong",
      },
    },
  },
);

export function ProfileJobBadge({ jobLabel }: { jobLabel: JobLabelType }) {
  return (
    <div className={jobBadgeVariants({ variant: jobLabel })}>
      {JOB_LABEL_MAP[jobLabel]}
    </div>
  );
}
