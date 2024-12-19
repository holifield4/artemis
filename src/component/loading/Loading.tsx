import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      <Skeleton className="w-full h-32 rounded-md" />
      <Skeleton className="w-full h-12 rounded-md " />
      <Skeleton className="w-full h-4 rounded-md" />
      <Skeleton className="w-1/2 h-4 rounded-md" />
      <Skeleton className="w-2/3 h-4 rounded-md" />
      <Skeleton className="w-1/3 h-4 rounded-md" />
      <Skeleton className="w-full h-8 rounded-md" />
    </div>
  );
};

export default Loading;
