import { Holiday, DashboardStats, WorkHoursData, QuickStatsData, HolidayStats } from '@/types/holiday';

export const dashboardStats: DashboardStats = {
  reserveBalance: 18,
  absences: 3,
  delays: 5,
};

export const holidayStats: HolidayStats = {
  totalHolidays: 21,
  daysUsed: 8,
  pendingRequests: 1,
};

export const workHoursData: WorkHoursData[] = [
  { month: 'Jan', hours: 160 },
  { month: 'Feb', hours: 145 },
  { month: 'Mar', hours: 170 },
  { month: 'Apr', hours: 155 },
  { month: 'May', hours: 180 },
  { month: 'Jun', hours: 165 },
  { month: 'Jul', hours: 150 },
  { month: 'Aug', hours: 140 },
  { month: 'Sep', hours: 175 },
  { month: 'Oct', hours: 160 },
  { month: 'Nov', hours: 155 },
  { month: 'Dec', hours: 145 },
];

export const quickStatsData: QuickStatsData[] = [
  { label: 'Days at office', value: 150, color: 'hsl(var(--chart-1))' },
  { label: 'Approved leave', value: 30, color: 'hsl(var(--chart-2))' },
  { label: 'Sick leave', value: 13, color: 'hsl(var(--chart-3))' },
  { label: 'Other leave', value: 17, color: 'hsl(var(--chart-4))' },
];

// Fallback mock data (used when JSON Server is not available)
export const mockHolidays: Holiday[] = [
  {
    id: 1,
    employeeName: "John Doe",
    startDate: "2025-12-10",
    endDate: "2025-12-12",
    halfDay: false,
    type: "Paid",
    status: "Pending",
    reason: "Family trip"
  },
  {
    id: 2,
    employeeName: "Alice Smith",
    startDate: "2025-12-15",
    endDate: "2025-12-15",
    halfDay: true,
    type: "Paid",
    status: "Approved",
    reason: "Doctor appointment"
  },
  {
    id: 3,
    employeeName: "Mohamed Ali",
    startDate: "2025-12-20",
    endDate: "2025-12-22",
    halfDay: false,
    type: "Unpaid",
    status: "Rejected",
    reason: "Personal reasons"
  }
];

// JSON Server API base URL - change this to your JSON Server URL
export const API_BASE_URL = 'http://localhost:3001';
