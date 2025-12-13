import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { holidayStats } from '@/data/mockData';

export function HolidayStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Total Holidays"
        value={holidayStats.totalHolidays}
        subtitle="Annual allowance"
        icon={Calendar}
        variant="default"
      />
      <StatsCard
        title="Days Used"
        value={holidayStats.daysUsed}
        subtitle="This year"
        icon={CheckCircle}
        variant="success"
      />
      <StatsCard
        title="Pending Requests"
        value={holidayStats.pendingRequests}
        subtitle="Awaiting approval"
        icon={Clock}
        variant="warning"
      />
    </div>
  );
}
