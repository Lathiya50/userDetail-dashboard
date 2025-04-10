import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

const DateRangePicker = memo(function DateRangePicker({
  startDate,
  endDate,
  onSelect,
}) {
  const dateValue = useMemo(() => {
    return { from: startDate, to: endDate };
  }, [startDate, endDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          Date Range
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] md:w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={dateValue}
          onSelect={onSelect}
          numberOfMonths={1}
          className="max-w-full"
        />
      </PopoverContent>
    </Popover>
  );
});

export default DateRangePicker;
