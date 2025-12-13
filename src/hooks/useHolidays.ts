import { useState, useCallback, useEffect } from 'react';
import { Holiday, HolidayFormData, HolidayStatus, HolidayType } from '@/types/holiday';
import { mockHolidays, API_BASE_URL } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function useHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalData, setUseLocalData] = useState(false);
  const { toast } = useToast();

  const fetchHolidays = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/holidays`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setHolidays(data);
      setUseLocalData(false);
    } catch (error) {
      console.log('JSON Server not available, using mock data');
      setHolidays(mockHolidays);
      setUseLocalData(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const createHoliday = useCallback(async (data: HolidayFormData) => {
    setIsLoading(true);
    try {
      const startDate = data.startDate.toISOString().split('T')[0];
      const endDate = data.endDate.toISOString().split('T')[0];
      
      const newHoliday: Omit<Holiday, 'id'> = {
        employeeName: "Nada Ahmed", // Current user
        startDate,
        endDate,
        halfDay: data.halfDay,
        type: data.type,
        status: 'Pending',
        reason: data.reason,
      };

      if (!useLocalData) {
        const response = await fetch(`${API_BASE_URL}/holidays`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newHoliday),
        });
        if (!response.ok) throw new Error('Failed to create');
        const created = await response.json();
        setHolidays(prev => [created, ...prev]);
        toast({
          title: 'Success',
          description: 'Holiday request submitted successfully',
        });
        return created;
      } else {
        const created: Holiday = {
          ...newHoliday,
          id: Date.now(),
        };
        setHolidays(prev => [created, ...prev]);
        toast({
          title: 'Success',
          description: 'Holiday request submitted (local mode)',
        });
        return created;
      }
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
  }, [toast, useLocalData]);

  const updateHoliday = useCallback(async (id: number, data: Partial<HolidayFormData>) => {
    setIsLoading(true);
    try {
      const updateData: Partial<Holiday> = {};
      if (data.startDate) updateData.startDate = data.startDate.toISOString().split('T')[0];
      if (data.endDate) updateData.endDate = data.endDate.toISOString().split('T')[0];
      if (data.type) updateData.type = data.type;
      if (data.reason) updateData.reason = data.reason;
      if (data.halfDay !== undefined) updateData.halfDay = data.halfDay;

      if (!useLocalData) {
        const response = await fetch(`${API_BASE_URL}/holidays/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) throw new Error('Failed to update');
        const updated = await response.json();
        setHolidays(prev => prev.map(h => h.id === id ? updated : h));
      } else {
        setHolidays(prev => prev.map(h => h.id === id ? { ...h, ...updateData } : h));
      }
      
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
  }, [toast, useLocalData]);

  const deleteHoliday = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      if (!useLocalData) {
        const response = await fetch(`${API_BASE_URL}/holidays/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete');
      }
      
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
  }, [toast, useLocalData]);

  return {
    holidays,
    isLoading,
    useLocalData,
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
  const [sortBy, setSortBy] = useState<'startDate' | 'id'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredHolidays = holidays
    .filter(h => statusFilter === 'all' || h.status === statusFilter)
    .filter(h => typeFilter === 'all' || h.type === typeFilter)
    .filter(h => {
      if (!dateRange.from && !dateRange.to) return true;
      const startDate = new Date(h.startDate);
      if (dateRange.from && startDate < dateRange.from) return false;
      if (dateRange.to && startDate > dateRange.to) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'startDate') {
        const aVal = new Date(a.startDate).getTime();
        const bVal = new Date(b.startDate).getTime();
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
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
