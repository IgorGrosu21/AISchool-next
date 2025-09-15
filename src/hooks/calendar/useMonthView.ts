'use client'

import { addDays, getDay, getDaysInMonth, setDate, startOfWeek } from 'date-fns';
import { useMemo } from 'react';
import { useCalendarContext } from '@/providers';

export function useMonthView(month: Date) {
  const { activeMonth, setActiveMonth, currentMonth, setActiveDay, activeDay } = useCalendarContext()

  const isActive = useMemo(() => activeMonth?.getMonth() === month.getMonth(), [activeMonth, month])
  const daysInMonth = useMemo(() => getDaysInMonth(month), [month])
  const firstDayIndex = useMemo(() => (getDay(month) + 6) % 7, [month]) //as 0 represents sunday, we add 6 and modulo by 7 so mon -> 0, sun -> 6

  const calendarDays = useMemo(() => {
    const days = []
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null); //we want the days be calendaric, so fill the voids with null
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(setDate(month, day));
    }
    return days
  }, [daysInMonth, firstDayIndex, month]);

  //we want to highlight current week, so we need to split days into weeks
  const weeks = useMemo(() => {
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks
  }, [calendarDays])

  const activeWeek = useMemo(() => {
    if (activeDay) {
      const start = startOfWeek(activeDay, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
  }, [activeDay])

  return {
    isActive,
    weeks,
    activeWeek,
    setActiveMonth,
    setActiveDay,
    currentMonth
  }
}