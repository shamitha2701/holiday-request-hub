import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Holiday } from '@/types/holiday';
import { cn } from '@/lib/utils';

interface RecentRequestsProps {
  holidays: Holiday[];
  onNewRequest: () => void;
}

export function RecentRequests({ holidays, onNewRequest }: RecentRequestsProps) {
  const recentHolidays = holidays.slice(0, 5);

  const statusStyles = {
    Approved: 'bg-success/10 text-success border-success/20',
    Pending: 'bg-warning/10 text-warning border-warning/20',
    Rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateDays = (start: string, end: string, halfDay: boolean) => {
    if (halfDay) return 0.5;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Requests & Operations</h3>
          <p className="text-sm text-muted-foreground">Recent holiday requests</p>
        </div>
        <Button onClick={onNewRequest} className="gap-2">
          <Plus className="h-4 w-4" />
          Submit New Request
        </Button>
      </div>

      <div className="space-y-3">
        {recentHolidays.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No holiday requests yet.</p>
            <p className="text-sm">Click the button above to submit your first request.</p>
          </div>
        ) : (
          recentHolidays.map((holiday) => (
            <div
              key={holiday.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-foreground">{holiday.type} Leave</p>
                  <Badge variant="outline" className={cn(statusStyles[holiday.status])}>
                    {holiday.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(holiday.startDate)} - {formatDate(holiday.endDate)} ({calculateDays(holiday.startDate, holiday.endDate, holiday.halfDay)} days)
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {holidays.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Link to="/holidays" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
            View All Requests
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
