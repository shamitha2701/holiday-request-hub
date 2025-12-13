import { useState } from 'react';
import { Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Holiday } from '@/types/holiday';
import { cn } from '@/lib/utils';

interface HolidayTableProps {
  holidays: Holiday[];
  onEdit: (holiday: Holiday) => void;
  onDelete: (id: number) => void;
  sortBy: 'startDate' | 'id';
  sortOrder: 'asc' | 'desc';
  onSort: (column: 'startDate' | 'id') => void;
}

const ITEMS_PER_PAGE = 10;

export function HolidayTable({ holidays, onEdit, onDelete, sortBy, sortOrder, onSort }: HolidayTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const totalPages = Math.ceil(holidays.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHolidays = holidays.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const statusStyles = {
    Approved: 'bg-success/10 text-success border-success/20',
    Pending: 'bg-warning/10 text-warning border-warning/20',
    Rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
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

  const handleSort = (column: 'startDate' | 'id') => {
    onSort(column);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 -ml-3"
                onClick={() => handleSort('startDate')}
              >
                Start Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-center">Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedHolidays.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No holiday requests found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedHolidays.map((holiday) => (
              <TableRow key={holiday.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-sm text-muted-foreground">
                  #{holiday.id}
                </TableCell>
                <TableCell className="font-medium">{holiday.employeeName}</TableCell>
                <TableCell>{holiday.type}</TableCell>
                <TableCell>{formatDate(holiday.startDate)}</TableCell>
                <TableCell>{formatDate(holiday.endDate)}</TableCell>
                <TableCell className="text-center">
                  {calculateDays(holiday.startDate, holiday.endDate, holiday.halfDay)}
                  {holiday.halfDay && <span className="text-xs text-muted-foreground ml-1">(half)</span>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(statusStyles[holiday.status])}>
                    {holiday.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{holiday.reason}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(holiday)}
                      disabled={holiday.status !== 'Pending'}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(holiday.id)}
                      disabled={holiday.status !== 'Pending'}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, holidays.length)} of {holidays.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Holiday Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this holiday request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
