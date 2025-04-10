import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";
import DateRangePicker from "./DateRangePicker";

function FilterSection({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  clearFilters,
  isLoading,
}) {
  return (
    <section className="flex flex-col md:flex-row justify-between mb-4 md:mb-6 gap-3 md:gap-4">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        disabled={isLoading}
      />

      <div className="flex gap-2 md:gap-3 flex-wrap">
        <StatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          disabled={isLoading}
        />

        <DateRangePicker
          startDate={dateRange.from}
          endDate={dateRange.to}
          onSelect={(range) =>
            setDateRange({
              from: range?.from || null,
              to: range?.to || null,
            })
          }
          disabled={isLoading}
        />

        <Button
          variant="outline"
          className="flex items-center gap-2 ml-auto md:ml-0"
          onClick={clearFilters}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
          Clear
        </Button>
      </div>
    </section>
  );
}

export default FilterSection;
