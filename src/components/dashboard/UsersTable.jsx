import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import UserRow from "./UserRow";
import TableHeader from "./TableHeader";
import { FileX, Loader2 } from "lucide-react"; // Assuming you're using lucide-react for icons
import { Skeleton } from "@/components/ui/skeleton";
import { TABLE_COLUMNS } from "@/constants";

function UsersTable({
  usersToDisplay,
  visibleRows,
  setVisibleRows,
  displayedUsers,
  updateUserStatus,
  sortConfig,
  handleSort,
  isLoading,
}) {
  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Load more rows when intersection observer detects scroll
  useEffect(() => {
    if (inView && visibleRows < displayedUsers.length) {
      setVisibleRows((prev) => Math.min(prev + 5, displayedUsers.length));
    }
  }, [inView, displayedUsers.length, visibleRows, setVisibleRows]);

  return (
    <Card className="mb-4 md:mb-6">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <TableHeader sortConfig={sortConfig} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              // Skeleton loading UI
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    {TABLE_COLUMNS.map((col) => (
                      <td
                        key={`skeleton-${index}-${col.key}`}
                        className="p-2 md:p-4"
                      >
                        <Skeleton className="h-5 md:h-6 w-full max-w-[200px]" />
                      </td>
                    ))}
                    <td className="p-2 md:p-4">
                      <div className="flex gap-1 md:gap-2">
                        <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md" />
                        <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md" />
                        <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))
            ) : usersToDisplay.length > 0 ? (
              usersToDisplay.map((user) => (
                <UserRow
                  key={user.id}
                  id={user.id}
                  name={user.about.name}
                  email={user.about.email}
                  date={user.details.date}
                  invitedBy={user.details.invitedBy}
                  status={user.about.status}
                  updateStatus={updateUserStatus}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 md:p-8">
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <FileX className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
                    <h3 className="font-semibold text-md md:text-lg text-gray-700">
                      No Users Found
                    </h3>
                    <p className="text-sm md:text-base text-gray-500">
                      There are no users matching your current filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {/* Intersection observer element for infinite scroll */}
            {!isLoading && visibleRows < displayedUsers.length && (
              <tr ref={loadMoreRef}>
                <td colSpan={6} className="p-2 text-center">
                  <div className="h-4"></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default UsersTable;
