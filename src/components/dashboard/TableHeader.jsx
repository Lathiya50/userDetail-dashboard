import { memo } from "react";
import { TABLE_COLUMNS, SORT_DIRECTION } from "@/constants";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"; // Import icons

const TableHeader = memo(function TableHeader({ sortConfig, onSort }) {
  return (
    <thead className="sticky top-0 bg-white">
      <tr className="border-b">
        {TABLE_COLUMNS.map((column) => (
          <th
            key={column.key}
            className="text-left p-4 font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={() => onSort(column.key)}
          >
            <div className="flex items-center gap-1">
              <span>{column.label}</span>
              {sortConfig.key === column.key ? (
                sortConfig.direction === SORT_DIRECTION.ASCENDING ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )
              ) : (
                <ArrowUpDown className="h-3 w-3 text-gray-300" />
              )}
            </div>
          </th>
        ))}
        <th className="text-left p-4 font-medium text-gray-500">Action</th>
      </tr>
    </thead>
  );
});

export default TableHeader;
