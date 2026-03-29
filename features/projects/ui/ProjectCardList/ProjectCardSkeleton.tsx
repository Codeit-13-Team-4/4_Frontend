import { Skeleton } from "@/shared/ui";

export function ProjectCardSkeleton() {
  return (
    <article className="flex h-133 w-104.5 flex-col gap-4 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-8 pb-5">
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </header>

      <div className="flex flex-col gap-6">
        <section className="flex min-h-27.5 flex-col">
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </section>

        <section className="min-h-26">
          <Skeleton className="mb-2 h-4 w-20" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-14" />
          </div>
        </section>

        <section className="min-h-25.5">
          <Skeleton className="mb-2 h-4 w-24" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </section>
      </div>

      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-8 w-20" />
      </footer>
    </article>
  );
}
