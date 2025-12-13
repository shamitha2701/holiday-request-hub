export type HolidayStatus = 'pending' | 'approved' | 'rejected';
export type HolidayType = 'paid' | 'unpaid' | 'sick' | 'other';

export interface Holiday {
  id: string;
  type: HolidayType;
  fromDate: string;
  toDate: string;
  daysCount: number;
  status: HolidayStatus;
  reason: string;
  halfDay: boolean;
  createdAt: string;
}

export interface HolidayFormData {
  type: HolidayType;
  fromDate: Date;
  toDate: Date;
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
