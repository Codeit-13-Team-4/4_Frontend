import { Skeleton } from "@/shared/ui";

export default function CommentInputSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <Skeleton className="hidden size-14 shrink-0 rounded-full md:block" />
        <Skeleton className="min-h-25 flex-1 rounded-2xl" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24 rounded-[10px]" />
      </div>
    </div>
  );
}
