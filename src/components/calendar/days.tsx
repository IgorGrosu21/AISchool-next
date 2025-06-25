'use client'

import { useCalendarContext } from '@/providers';
import { Typography, Grid2, Button } from '@mui/material';
import { isSameWeek } from 'date-fns';
import { useMemo } from 'react';

interface DaysProps {
  week: Array<Date | null>
}

export function Days({week}: DaysProps) {
  const { setActiveDay, currentDay } = useCalendarContext()

  //as the week MAY contain nulls, just find first non-null value (the week is guaranteed to have at least one Date)
  const isCurrent = useMemo(() => isSameWeek(week.find(d => d !== null)!, currentDay, { weekStartsOn: 1 }), [currentDay, week])

  return week.map((day, j) => <Grid2 key={j} size={1} sx={{display: 'flex', justifyContent: 'center'}}>
    {day && <Button
      color={isCurrent ? 'secondary' : 'primary'}
      sx={{p: 1, minWidth: 'auto', width: '100%'}}
      onClick={() => setActiveDay(day)}
      data-day
    >
      <Typography variant='h6' data-day>{day.getDate()}</Typography>
    </Button>}
  </Grid2>)
}