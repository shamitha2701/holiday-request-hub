import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { HolidayStats } from '@/components/holidays/HolidayStats';
import { HolidayFilters } from '@/components/holidays/HolidayFilters';
import { HolidayTable } from '@/components/holidays/HolidayTable';
import { NewHolidayDialog } from '@/components/holidays/NewHolidayDialog';
import { useHolidays, useHolidayFilters } from '@/hooks/useHolidays';
import { Holiday } from '@/types/holiday';

export default function HolidayRequests() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const { holidays, createHoliday, updateHoliday, deleteHoliday } = useHolidays();
  
  const {
    filteredHolidays,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useHolidayFilters(holidays);

  const handleEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingHoliday) {
      await updateHoliday(editingHoliday.id, data);
      setEditingHoliday(null);
      return editingHoliday;
    }
    return createHoliday(data);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingHoliday(null);
    }
  };

  const handleSort = (column: 'fromDate' | 'createdAt') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <Layout title="Holiday Requests">
      {/* Stats */}
      <div className="mb-6">
        <HolidayStats />
      </div>

      {/* New Request Button */}
      <div className="flex justify-end mb-6">
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Holiday Request
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <HolidayFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onReset={handleResetFilters}
        />
      </div>

      {/* Table */}
      <HolidayTable
        holidays={filteredHolidays}
        onEdit={handleEdit}
        onDelete={deleteHoliday}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {/* Dialog */}
      <NewHolidayDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleSubmit}
        editingHoliday={editingHoliday}
      />
    </Layout>
  );
}
