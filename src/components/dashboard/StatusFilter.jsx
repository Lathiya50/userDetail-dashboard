import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_STATUS, FILTER_STATUS, STATUS_CONFIG } from "@/constants";
import { Loader2 } from "lucide-react";

const StatusFilter = memo(function StatusFilter({ value, onChange, disabled }) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[120px]">
        <SelectValue
          placeholder={
            disabled ? (
              <Loader2 className="h-4 w-4 animate-spin mx-auto" />
            ) : (
              "Status"
            )
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={FILTER_STATUS.ALL}>All</SelectItem>
        <SelectItem value={USER_STATUS.ACTIVE}>
          {STATUS_CONFIG[USER_STATUS.ACTIVE].label}
        </SelectItem>
        <SelectItem value={USER_STATUS.INVITED}>
          {STATUS_CONFIG[USER_STATUS.INVITED].label}
        </SelectItem>
        <SelectItem value={USER_STATUS.BLOCKED}>
          {STATUS_CONFIG[USER_STATUS.BLOCKED].label}
        </SelectItem>
      </SelectContent>
    </Select>
  );
});

export default StatusFilter;
