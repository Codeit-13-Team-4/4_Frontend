import { Skeleton } from "@/shared/ui";

export default function MemberItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-4 w-24 rounded" />
      </div>
    </div>
  );
}
