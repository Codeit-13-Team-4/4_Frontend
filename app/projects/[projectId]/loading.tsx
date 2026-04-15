import { Skeleton } from "@/shared/ui";

export default function ProjectDetailLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] lg:gap-10">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-16" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="mb-10 h-8 w-3/4 md:mb-15 md:h-10" />
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full md:h-11 md:w-11" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-px" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>

      <div className="my-5 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:my-0">
        <div className="flex flex-col gap-4 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>
      </div>

      <Skeleton className="mt-7 mb-4 h-px w-full md:mt-8 md:mb-6 lg:mb-0" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}
