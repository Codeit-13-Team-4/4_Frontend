import { Skeleton } from "@/shared/ui";

export default function MyPageLoading() {
  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      {/* 프로필 섹션 */}
      <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6 md:p-10">
        <div className="flex flex-col items-center gap-4 md:hidden">
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="hidden gap-6 md:flex md:items-start">
          <div className="flex w-32 shrink-0 flex-col items-center gap-4">
            <Skeleton className="size-30 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <Skeleton className="h-6 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 리스트 섹션 */}
      <div className="flex flex-col gap-7 md:gap-10">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
