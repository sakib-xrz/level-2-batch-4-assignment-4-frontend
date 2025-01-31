export default function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2 shadow-md sm:p-4">
      <div className="relative mb-2 h-60 rounded-lg bg-gray-200"></div>
      <div className="mb-1 h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-1 h-4 w-1/2 rounded bg-gray-200"></div>
      <div className="mb-2 h-6 w-1/4 rounded bg-gray-200"></div>
      <div className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gray-200 py-1 font-semibold transition sm:py-2"></div>
    </div>
  );
}
