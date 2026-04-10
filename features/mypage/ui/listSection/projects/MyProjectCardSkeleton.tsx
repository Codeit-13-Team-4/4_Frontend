import { Skeleton } from "@/shared/ui";

export default function MyProjectCardSkeleton() {
  return (
    <article className="flex w-full flex-col rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-6 pb-5">
      <header className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </header>

      <Skeleton className="mb-4 h-6 w-3/4" />

      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 shrink-0" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 shrink-0" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 shrink-0" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <footer className="mt-auto pt-4">
        <Skeleton className="h-10 w-full rounded-[10px] md:h-11 md:rounded-xl" />
      </footer>
    </article>
  );
}
