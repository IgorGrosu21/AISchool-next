'use client'

import { Divider, Stack } from '@mui/material';
import { getDay, getDaysInMonth, setDate } from 'date-fns';
import { useMemo } from 'react';
import { motion } from 'framer-motion'
import { Weeks } from './weeks';
import { MonthButton } from './monthButton';
import { useCalendarContext } from '@/providers';

interface MonthProps {
  month: Date
}

export function Month({month}: MonthProps) {
  const { activeMonth, setActiveMonth, currentMonth, setActiveDay } = useCalendarContext()

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

  return <motion.div
    layout
    layoutId={`month-${month}`}
    transition={{ layout: { type: 'spring', stiffness: 120, damping: 18 } }}
    style={{
      width: isActive ? '100%' : '100%',
      margin: isActive ? '0 auto' : undefined,
      zIndex: isActive ? 10 : 1
    }}
    onClick={e => {
      if ((e.target as HTMLElement).dataset.day) {
        return; //if we click on the day, the month will automatically be set, so prevent useless state mutations
      }
      if (!isActive) setActiveMonth(month) //if the month is active no need to make it active
    }}
  >
    <Stack gap={2}>
      <MonthButton month={month} activeMonth={currentMonth} onClick={() => setActiveDay(undefined)} />
      <Divider />
      <Weeks calendarDays={calendarDays} />
    </Stack>
  </motion.div>
}