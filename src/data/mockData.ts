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

export const mockHolidays: Holiday[] = [
  {
    id: '1',
    type: 'paid',
    fromDate: '2024-01-15',
    toDate: '2024-01-19',
    daysCount: 5,
    status: 'approved',
    reason: 'Family vacation',
    halfDay: false,
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    type: 'sick',
    fromDate: '2024-02-05',
    toDate: '2024-02-06',
    daysCount: 2,
    status: 'approved',
    reason: 'Medical appointment',
    halfDay: false,
    createdAt: '2024-02-04',
  },
  {
    id: '3',
    type: 'paid',
    fromDate: '2024-03-20',
    toDate: '2024-03-20',
    daysCount: 1,
    status: 'pending',
    reason: 'Personal errands',
    halfDay: true,
    createdAt: '2024-03-15',
  },
  {
    id: '4',
    type: 'unpaid',
    fromDate: '2024-04-01',
    toDate: '2024-04-03',
    daysCount: 3,
    status: 'rejected',
    reason: 'Extended travel',
    halfDay: false,
    createdAt: '2024-03-25',
  },
  {
    id: '5',
    type: 'other',
    fromDate: '2024-05-10',
    toDate: '2024-05-12',
    daysCount: 3,
    status: 'approved',
    reason: 'Wedding ceremony',
    halfDay: false,
    createdAt: '2024-05-01',
  },
  {
    id: '6',
    type: 'paid',
    fromDate: '2024-06-15',
    toDate: '2024-06-20',
    daysCount: 6,
    status: 'approved',
    reason: 'Summer vacation',
    halfDay: false,
    createdAt: '2024-06-01',
  },
  {
    id: '7',
    type: 'sick',
    fromDate: '2024-07-08',
    toDate: '2024-07-08',
    daysCount: 1,
    status: 'approved',
    reason: 'Feeling unwell',
    halfDay: false,
    createdAt: '2024-07-08',
  },
  {
    id: '8',
    type: 'paid',
    fromDate: '2024-08-25',
    toDate: '2024-08-30',
    daysCount: 6,
    status: 'pending',
    reason: 'International travel',
    halfDay: false,
    createdAt: '2024-08-10',
  },
];

// JSON Server ready API endpoints structure
export const API_ENDPOINTS = {
  holidays: '/api/holidays',
  stats: '/api/stats',
};
