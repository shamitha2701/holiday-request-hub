import { useState } from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WorkHoursChart } from '@/components/dashboard/WorkHoursChart';
import { QuickStatistics } from '@/components/dashboard/QuickStatistics';
import { RecentRequests } from '@/components/dashboard/RecentRequests';
import { NewHolidayDialog } from '@/components/holidays/NewHolidayDialog';
import { useHolidays } from '@/hooks/useHolidays';
import { dashboardStats } from '@/data/mockData';

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { holidays, createHoliday } = useHolidays();

  return (
    <Layout greeting="Hello Nada!">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Reserve Balance"
          value={`${dashboardStats.reserveBalance} days`}
          subtitle="Available"
          icon={Calendar}
          variant="success"
        />
        <StatsCard
          title="Absences"
          value={`${dashboardStats.absences} days`}
          subtitle="This month"
          icon={CheckCircle}
          variant="destructive"
        />
        <StatsCard
          title="Delays"
          value={dashboardStats.delays}
          subtitle="This month"
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WorkHoursChart />
        <QuickStatistics />
      </div>

      {/* Recent Requests */}
      <RecentRequests
        holidays={holidays}
        onNewRequest={() => setDialogOpen(true)}
      />

      {/* New Request Dialog */}
      <NewHolidayDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={createHoliday}
      />
    </Layout>
  );
}
