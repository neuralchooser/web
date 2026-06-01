import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPlatforms() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
