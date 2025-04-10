import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) {
  const pageOptions = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }));
  }, [totalPages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2">
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="w-12 h-8 rounded" />
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="w-8 h-8 rounded" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 bg-white"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronFirst className="h-4 w-4" />
        <span className="sr-only">First page</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronLeft className="h-4 w-4 bg-white" />
        <span className="sr-only">Previous page</span>
      </Button>
      <span className="text-sm text-gray-500">Page</span>
      <Select
        value={currentPage.toString()}
        onValueChange={(value) => onPageChange(parseInt(value))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[70px] h-8">
          <SelectValue
            placeholder={
              isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                currentPage
              )
            }
          />
        </SelectTrigger>
        <SelectContent>
          {pageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-500">of {totalPages}</span>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 bg-white"
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 bg-white"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
      >
        <ChevronLast className="h-4 w-4" />
        <span className="sr-only">Last page</span>
      </Button>
    </div>
  );
});

export default Pagination;
