import { useState, useEffect, useMemo } from 'react';
import { SORT_DIRECTION } from '@/constants';

export function usePagination({ 
  filteredUsers, 
  initialRowsToShow = 10, 
  maxRowsPerPage = 10, 
  isLoading = false,
  sortConfig = { key: null, direction: null }
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleRows, setVisibleRows] = useState(initialRowsToShow);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredUsers.length / maxRowsPerPage));
  }, [filteredUsers, maxRowsPerPage]);
  
  // Reset visible rows when filtered data changes
  useEffect(() => {
    setVisibleRows(initialRowsToShow);
  }, [filteredUsers, initialRowsToShow]);
  
  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);
  
  // Apply sorting and calculate displayed users for the current page
  const displayedUsers = useMemo(() => {
    if (isLoading) return Array(maxRowsPerPage).fill(null); // Placeholder for skeleton
    
    let sortedUsers = [...filteredUsers];
    
    // Apply sorting if a sort key exists
    if (sortConfig.key && sortConfig.direction) {
      sortedUsers.sort((a, b) => {
        // Handle nested properties like "about.name"
        const keyParts = sortConfig.key.split('.');
        let aValue = a;
        let bValue = b;
        
        // Access nested properties
        for (const part of keyParts) {
          aValue = aValue?.[part];
          bValue = bValue?.[part];
        }
        
        // Handle undefined values
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;
        
        // Case insensitive string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
          return sortConfig.direction === SORT_DIRECTION.ASCENDING ? comparison : -comparison;
        }
        
        // Number comparison
        const comparison = aValue - bValue;
        return sortConfig.direction === SORT_DIRECTION.ASCENDING ? comparison : -comparison;
      });
    }
    
    const startIndex = (currentPage - 1) * maxRowsPerPage;
    return sortedUsers.slice(startIndex, startIndex + maxRowsPerPage);
  }, [filteredUsers, currentPage, maxRowsPerPage, isLoading, sortConfig]);
  
  return {
    currentPage,
    setCurrentPage,
    visibleRows,
    setVisibleRows,
    displayedUsers,
    totalPages,
    rowsPerPage: maxRowsPerPage,
    isLoading
  };
}
