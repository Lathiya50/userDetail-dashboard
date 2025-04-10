"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { usePagination } from "@/hooks/usePagination";
import { FILTER_STATUS, SORT_DIRECTION } from "@/constants";
import { Loader2 } from "lucide-react";

// Import Dashboard Components
import StatsSection from "./StatsSection";
import FilterSection from "./FilterSection";
import UsersTable from "./UsersTable";
import Pagination from "./Pagination";

export default function UserDashboard() {
  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(FILTER_STATUS.ALL);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Custom hook for user data management
  const { filteredUsers, stats, updateUserStatus, applyFilters, isLoading } =
    useUserData({
      searchTerm,
      statusFilter,
      dateRange,
      sortConfig,
    });

  // Custom hook for pagination logic
  const {
    currentPage,
    setCurrentPage,
    visibleRows,
    setVisibleRows,
    displayedUsers,
    totalPages,
  } = usePagination({
    filteredUsers,
    initialRowsToShow: 5,
    isLoading,
    sortConfig, // Pass the sortConfig to the pagination hook
  });

  // Apply filters when filter conditions change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
      setCurrentPage(1); // Reset to first page when filters change
    }, 300); // Debounce filter application

    return () => clearTimeout(timeoutId);
  }, [
    searchTerm,
    statusFilter,
    dateRange,
    sortConfig,
    applyFilters,
    setCurrentPage,
  ]);

  // Sort table columns
  const handleSort = useCallback((key) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key &&
        prevConfig.direction === SORT_DIRECTION.ASCENDING
          ? SORT_DIRECTION.DESCENDING
          : SORT_DIRECTION.ASCENDING;
      return { key, direction };
    });
  }, []);

  // Reset all filters
  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter(FILTER_STATUS.ALL);
    setDateRange({ from: null, to: null });
    setCurrentPage(1);
    setSortConfig({ key: null, direction: null });
  }, [setCurrentPage]);

  // Memoize the displayed users to avoid unnecessary rendering
  const usersToDisplay = useMemo(() => {
    return displayedUsers.slice(0, visibleRows);
  }, [displayedUsers, visibleRows]);

  return (
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-4">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">User Details</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Information about a user, including name, email, start date,
            inviter, status, and available actions.
          </p>
        </div>
        <Button
          className="mt-3 md:mt-0 bg-gray-900 hover:bg-gray-800 w-full md:w-auto cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Download Report
        </Button>
      </header>

      {/* Stats cards */}
      <StatsSection stats={stats} isLoading={isLoading} />

      {/* Filters */}
      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilters={clearFilters}
        isLoading={isLoading}
      />

      {/* User table */}
      <UsersTable
        usersToDisplay={usersToDisplay}
        visibleRows={visibleRows}
        setVisibleRows={setVisibleRows}
        displayedUsers={displayedUsers}
        updateUserStatus={updateUserStatus}
        sortConfig={sortConfig}
        handleSort={handleSort}
        isLoading={isLoading}
      />

      {/* Pagination */}
      <div className="overflow-x-auto pb-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
