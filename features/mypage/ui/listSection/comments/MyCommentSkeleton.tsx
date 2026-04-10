import { Skeleton } from "@/shared/ui";

export default function MyCommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-700 py-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
