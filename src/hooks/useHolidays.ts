import { useState, useCallback } from 'react';
import { Holiday, HolidayFormData, HolidayStatus, HolidayType } from '@/types/holiday';
import { mockHolidays } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

// This hook is designed to work with JSON Server
// Replace the mock implementation with actual API calls when ready

export function useHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchHolidays = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/holidays');
      // const data = await response.json();
      // setHolidays(data);
      await new Promise(resolve => setTimeout(resolve, 500));
      setHolidays(mockHolidays);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch holidays',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createHoliday = useCallback(async (data: HolidayFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/holidays', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const newHoliday = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const fromDate = data.fromDate.toISOString().split('T')[0];
      const toDate = data.toDate.toISOString().split('T')[0];
      const daysCount = data.halfDay ? 0.5 : Math.ceil((data.toDate.getTime() - data.fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const newHoliday: Holiday = {
        id: Date.now().toString(),
        type: data.type,
        fromDate,
        toDate,
        daysCount,
        status: 'pending',
        reason: data.reason,
        halfDay: data.halfDay,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setHolidays(prev => [newHoliday, ...prev]);
      toast({
        title: 'Success',
        description: 'Holiday request submitted successfully',
      });
      return newHoliday;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create holiday request',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateHoliday = useCallback(async (id: string, data: Partial<HolidayFormData>) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/holidays/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setHolidays(prev => prev.map(h => {
        if (h.id === id) {
          return {
            ...h,
            ...data,
            fromDate: data.fromDate ? data.fromDate.toISOString().split('T')[0] : h.fromDate,
            toDate: data.toDate ? data.toDate.toISOString().split('T')[0] : h.toDate,
          };
        }
        return h;
      }));
      
      toast({
        title: 'Success',
        description: 'Holiday request updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update holiday request',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const deleteHoliday = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/holidays/${id}`, { method: 'DELETE' });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setHolidays(prev => prev.filter(h => h.id !== id));
      toast({
        title: 'Success',
        description: 'Holiday request deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete holiday request',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    holidays,
    isLoading,
    fetchHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
  };
}

export function useHolidayFilters(holidays: Holiday[]) {
  const [statusFilter, setStatusFilter] = useState<HolidayStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<HolidayType | 'all'>('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [sortBy, setSortBy] = useState<'fromDate' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredHolidays = holidays
    .filter(h => statusFilter === 'all' || h.status === statusFilter)
    .filter(h => typeFilter === 'all' || h.type === typeFilter)
    .filter(h => {
      if (!dateRange.from && !dateRange.to) return true;
      const fromDate = new Date(h.fromDate);
      if (dateRange.from && fromDate < dateRange.from) return false;
      if (dateRange.to && fromDate > dateRange.to) return false;
      return true;
    })
    .sort((a, b) => {
      const aVal = new Date(a[sortBy]).getTime();
      const bVal = new Date(b[sortBy]).getTime();
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  return {
    filteredHolidays,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
}
