import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { parseDate } from '@/lib/utils';
import { USER_STATUS, FILTER_STATUS, DATE_FORMATS } from '@/constants';

// Generate 100 records with random data
const generateUsers = () => {
  const names = [
    "Aarav Sharma", "Neha Verma", "Rohan Kapoor", "Sneha Iyer", "Vikram Rao",
    "Pooja Malhotra", "Ankit Mehta", "Deepika Patel", "Arjun Singh", "Priya Reddy",
    "Rahul Kumar", "Kavita Joshi", "Vivek Gupta", "Anjali Desai", "Kiran Menon",
    "Manisha Choudhary", "Prakash Nair", "Sunita Sood", "Suresh Pillai", "Divya Shah",
  ];

  const domains = ["tech.com", "company.org", "enterprise.in", "systems.co", "digital.io"];
  const statuses = [USER_STATUS.ACTIVE, USER_STATUS.INVITED, USER_STATUS.BLOCKED];
  const inviters = ["Ankit Mehta", "Rahul Kumar", "Vikram Rao", "Deepika Patel", "Suresh Pillai"];

  return Array.from({ length: 100 }, (_, index) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const firstName = randomName.split(" ")[0].toLowerCase();
    const lastName = randomName.split(" ")[1].toLowerCase();
    const email = `${firstName}.${lastName}@${domains[Math.floor(Math.random() * domains.length)]}`;

    // Generate random date within last year
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const formattedDate = format(date, DATE_FORMATS.DISPLAY);

    return {
      id: (index + 1).toString(),
      about: {
        name: randomName,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        email: email,
      },
      details: {
        date: formattedDate,
        invitedBy: inviters[Math.floor(Math.random() * inviters.length)],
      },
    };
  });
};

export function useUserData({ searchTerm, statusFilter, dateRange, sortConfig }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    invited: 0,
    blocked: 0,
    activePercent: 0,
    invitedPercent: 0,
    blockedPercent: 0,
  });

  // Initialize user data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const initialUsers = generateUsers();
      setUsers(initialUsers);
      setFilteredUsers(initialUsers);
      
      const initialStats = calculateStats(initialUsers);
      setStats(initialStats);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Calculate statistics from user data
  const calculateStats = useCallback((userArray) => {
    const total = userArray.length;
    if (total === 0) return {
      total: 0,
      active: 0,
      invited: 0,
      blocked: 0,
      activePercent: 0,
      invitedPercent: 0,
      blockedPercent: 0,
    };

    const active = userArray.filter(user => user.about.status === USER_STATUS.ACTIVE).length;
    const invited = userArray.filter(user => user.about.status === USER_STATUS.INVITED).length;
    const blocked = userArray.filter(user => user.about.status === USER_STATUS.BLOCKED).length;

    return {
      total,
      active,
      invited,
      blocked,
      activePercent: Math.round((active / total) * 100),
      invitedPercent: Math.round((invited / total) * 100),
      blockedPercent: Math.round((blocked / total) * 100),
    };
  }, []);

  // Apply sorting to filtered data
  const applySorting = useCallback((data, { key, direction }) => {
    if (!key) return data;

    return [...data].sort((a, b) => {
      let aValue, bValue;

      // Handle nested properties
      if (key.includes(".")) {
        const [parent, child] = key.split(".");
        aValue = a[parent][child];
        bValue = b[parent][child];
        
        // Special handling for date fields
        if (child === 'date') {
          const dateA = parseDate(aValue);
          const dateB = parseDate(bValue);
          return direction === "ascending" 
            ? dateA - dateB
            : dateB - dateA;
        }
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      // Handle string comparison
      if (typeof aValue === "string") {
        return direction === "ascending" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }

      // Handle numeric comparison
      return direction === "ascending" 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }, []);

  // Apply filters and sort
  const applyFilters = useCallback(() => {
    setIsLoading(true);
    
    // Simulate processing delay
   
      let filtered = [...users];

      // Apply status filter
      if (statusFilter !== FILTER_STATUS.ALL) {
        filtered = filtered.filter(user => user.about.status === statusFilter);
      }

      // Apply search filter on name
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(user =>user.about.name.toLowerCase().includes(searchLower)
        );
      }

      // Apply date range filter - optimize date comparison
      if (dateRange.from && dateRange.to) {
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999); // Include the entire end day
        
        filtered = filtered.filter(user => {
          const userDate = parseDate(user.details.date);
          return userDate >= fromDate && userDate <= toDate;
        });
      }

      // Apply sorting
      if (sortConfig.key) {
        filtered = applySorting(filtered, sortConfig);
      }

      setFilteredUsers(filtered);
      setIsLoading(false);
  }, [users, searchTerm, statusFilter, dateRange, sortConfig, applySorting]);

  // Update user status
  const updateUserStatus = useCallback((userId, newStatus) => {
    setIsLoading(true);
         
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            about: {
              ...user.about,
              status: newStatus,
            },
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      applyFilters(); // Re-apply filters to update filtered users
      
      // Update statistics
      const updatedStats = calculateStats(updatedUsers);
      setStats(updatedStats);
      
      setIsLoading(false);
  }, [users, applyFilters, calculateStats]);

  // Memoize the return values to prevent unnecessary rerenders
  return useMemo(() => ({
    users,
    filteredUsers,
    stats,
    updateUserStatus,
    applyFilters,
    calculateStats,
    isLoading
  }), [users, filteredUsers, stats, updateUserStatus, applyFilters, calculateStats, isLoading]);
}
