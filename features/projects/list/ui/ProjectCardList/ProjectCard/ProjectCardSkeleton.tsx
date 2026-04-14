import { Skeleton } from "@/shared/ui";

export function ProjectCardSkeleton() {
  return (
    <article className="flex w-full flex-col gap-8 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-4 pt-6 pb-5">
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-10.5 w-16 rounded-full" />
          <Skeleton className="h-10.5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </header>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col">
          <Skeleton className="mb-2 h-6 w-2/3" />

          <Skeleton className="mb-2 h-4 w-full" />
        </section>

        <section>
          <Skeleton className="mb-2 h-4 w-20" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-14" />
          </div>
        </section>

        <section>
          <Skeleton className="mb-2 h-4 w-24" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </section>
      </div>

      <footer className="mt-auto flex items-center justify-between">
        <div className="flex gap-6">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-8 w-20" />
      </footer>
    </article>
  );
}
