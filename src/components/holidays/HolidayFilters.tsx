import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HolidayStatus, HolidayType } from '@/types/holiday';

interface HolidayFiltersProps {
  statusFilter: HolidayStatus | 'all';
  setStatusFilter: (value: HolidayStatus | 'all') => void;
  typeFilter: HolidayType | 'all';
  setTypeFilter: (value: HolidayType | 'all') => void;
  onReset: () => void;
}

export function HolidayFilters({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  onReset,
}: HolidayFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as HolidayStatus | 'all')}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as HolidayType | 'all')}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Paid">Paid Leave</SelectItem>
          <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
        </SelectContent>
      </Select>

      {(statusFilter !== 'all' || typeFilter !== 'all') && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
