import { Skeleton } from "@/shared/ui";

export default function CommentItemSkeleton() {
  return (
    <div className="flex gap-3 pt-4 pb-6">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3.5 w-16" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
