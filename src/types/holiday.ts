export type HolidayStatus = 'Pending' | 'Approved' | 'Rejected';
export type HolidayType = 'Paid' | 'Unpaid';

export interface Holiday {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  halfDay: boolean;
  type: HolidayType;
  status: HolidayStatus;
  reason: string;
}

export interface HolidayFormData {
  type: HolidayType;
  startDate: Date;
  endDate: Date;
  halfDay: boolean;
  reason: string;
}

export interface HolidayStats {
  totalHolidays: number;
  daysUsed: number;
  pendingRequests: number;
}

export interface DashboardStats {
  reserveBalance: number;
  absences: number;
  delays: number;
}

export interface WorkHoursData {
  month: string;
  hours: number;
}

export interface QuickStatsData {
  label: string;
  value: number;
  color: string;
}
