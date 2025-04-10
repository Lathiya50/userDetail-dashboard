import { memo } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  isLoading,
  showLink = true,
}) {
  if (isLoading) {
    return (
      <Card className="p-3 md:p-4">
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-md mr-3 md:mr-4" />
          <div className="flex-1">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-12" />
          </div>
          {showLink && <Skeleton className="h-4 w-4 ml-auto hidden sm:block" />}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3 md:p-4">
      <div className="flex items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-md flex items-center justify-center mr-3 md:mr-4">
          {icon}
        </div>
        <div className="flex justify-around w-full">
          <div className="flex-1">
            <p className="text-xs md:text-sm text-gray-500">{title}</p>
            <p className="text-xl md:text-3xl font-bold">{value}</p>
          </div>
          {showLink && (
            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto hidden sm:block" />
          )}
        </div>
      </div>
    </Card>
  );
});

export default StatCard;
