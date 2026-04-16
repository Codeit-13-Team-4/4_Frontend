import { Skeleton } from "@/shared/ui";

export function VerificationsSkeletonCard() {
  return (
    <div className="flex h-150 w-full flex-col gap-10 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-13 w-13 shrink-0 rounded-full" />

        <div className="flex w-full items-center">
          <div className="flex w-20 flex-col gap-1">
            <Skeleton className="h-5 bg-gray-400" />
            <Skeleton className="h-5 bg-gray-600" />
          </div>
        </div>
      </div>
      <Skeleton className="flex-1 rounded-[40px] bg-gray-700" />

      <Skeleton className="relative h-6 bg-gray-300" />
    </div>
  );
}
