"use client";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Ban, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER_STATUS, STATUS_CONFIG } from "@/constants";

const UserRow = memo(function UserRow({
  id,
  name,
  email,
  date,
  invitedBy,
  status,
  updateStatus,
}) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2 md:p-4 text-sm md:text-base">
        <div className="max-w-[120px] sm:max-w-none truncate font-medium">
          {name}
        </div>
      </td>
      <td className="p-2 md:p-4 text-sm md:text-base">
        <div className="max-w-[150px] sm:max-w-[200px] md:max-w-none truncate">
          {email}
        </div>
      </td>
      <td className="p-2 md:p-4 text-sm md:text-base whitespace-nowrap">
        {date}
      </td>
      <td className="p-2 md:p-4 text-sm md:text-base">
        <div className="max-w-[100px] md:max-w-none truncate">{invitedBy}</div>
      </td>
      <td className="p-2 md:p-4">
        <div
          className={cn(
            "inline-flex items-center justify-center px-2 py-0.5 md:px-4 md:py-1 rounded-md text-xs md:text-sm",
            STATUS_CONFIG[status]?.bgColor,
            STATUS_CONFIG[status]?.textColor
          )}
        >
          {STATUS_CONFIG[status]?.label || status}
        </div>
      </td>
      <td className="p-2 md:p-4">
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "w-7 h-7 md:w-8 md:h-8 rounded-md",
              STATUS_CONFIG[USER_STATUS.BLOCKED].borderColor,
              STATUS_CONFIG[USER_STATUS.BLOCKED].textColor,
              status === USER_STATUS.BLOCKED && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => updateStatus(id, USER_STATUS.BLOCKED)}
            disabled={status === USER_STATUS.BLOCKED}
          >
            <Ban className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Block user</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "w-7 h-7 md:w-8 md:h-8 rounded-md",
              STATUS_CONFIG[USER_STATUS.ACTIVE].borderColor,
              STATUS_CONFIG[USER_STATUS.ACTIVE].textColor,
              status === USER_STATUS.ACTIVE && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => updateStatus(id, USER_STATUS.ACTIVE)}
            disabled={status === USER_STATUS.ACTIVE}
          >
            <Check className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Activate user</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-7 h-7 md:w-8 md:h-8 rounded-md"
          >
            <Info className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">User info</span>
          </Button>
        </div>
      </td>
    </tr>
  );
});

export default UserRow;
