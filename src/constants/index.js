/**
 * User status constants
 */
export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INVITED: "INVITED",
  BLOCKED: "BLOCKED",
};

/**
 * Filter status constants (including "all" option)
 */
export const FILTER_STATUS = {
  ALL: "all",
  ...USER_STATUS,
};

/**
 * Status display configuration with associated colors for UI display
 */
export const STATUS_CONFIG = {
  [USER_STATUS.ACTIVE]: {
    label: "Active",
    bgColor: "bg-green-100", 
    textColor: "text-green-600",
    borderColor: "border-green-200",
  },
  [USER_STATUS.INVITED]: {
    label: "Invited",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  [USER_STATUS.BLOCKED]: {
    label: "Blocked",
    bgColor: "bg-red-100",
    textColor: "text-red-600",
    borderColor: "border-red-200",
  },
};

/**
 * Sort directions
 */
export const SORT_DIRECTION = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

/**
 * Table column definitions
 */
export const TABLE_COLUMNS = [
  { key: "about.name", label: "Name" },
  { key: "about.email", label: "Email" },
  { key: "details.date", label: "Start Date" },
  { key: "details.invitedBy", label: "Invited by" },
  { key: "about.status", label: "Status" },
];

/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_VISIBLE_ROWS: 5,
};

/**
 * Date format constants
 */
export const DATE_FORMATS = {
  DISPLAY: "dd MMM yyyy",
};
