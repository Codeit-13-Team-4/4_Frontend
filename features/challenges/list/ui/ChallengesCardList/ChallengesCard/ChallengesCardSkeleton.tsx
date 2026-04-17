import { Skeleton } from "@/shared/ui";

export function ChallengesCardSkeleton() {
  return (
    <article className="flex h-90.5 w-full flex-col rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-8 pb-5">
      <header className="mb-7 flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </header>

      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <div className="mb-5 flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-3 flex-1 rounded" />
        <Skeleton className="h-5 w-12" />
      </div>

      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-8 w-20 rounded" />
      </footer>
    </article>
  );
}
