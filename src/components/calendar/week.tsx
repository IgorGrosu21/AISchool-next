'use client'

import { getSpecificLessons } from '@/app/actions/lesson';
import { SpecificLessons } from '@/components';
import { useCalendarContext, useDiaryContext } from '@/providers';
import { ISpecificLessonName } from '@/utils/interfaces';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { addDays, compareAsc, compareDesc, format, isSameWeek, subDays } from 'date-fns';
import { useEffect, useMemo, useState, useTransition } from 'react';

interface WeekProps {
  dates: Date[]
}

export function Week({dates}: WeekProps) {
  const { year, setActiveDay, currentDay } = useCalendarContext()
  const { accountType, personId, schoolSlug } = useDiaryContext()
  
  const [specificLessons, setSpecificLessons] = useState<ISpecificLessonName[]>([])
  const [isPending, startTransition] = useTransition()

  const startDay = useMemo(() => dates[0], [dates])
  const endDay = useMemo(() => dates[dates.length - 1], [dates])
  const isCurrent = useMemo(() => isSameWeek(startDay, currentDay, { weekStartsOn: 1 }), [currentDay, startDay])

  //debouncing values to not fetch the server until the user stops jumping between weeks
  const [debouncedStart, setDebouncedStart] = useState(startDay);
  const [debouncedEnd, setDebouncedEnd] = useState(endDay);
  
  //we store the dates in memo, to not recreate constant dates every time active day changes
  const firstDay = useMemo(() => new Date(year - 1, 8, 1), [year]) //the year comes as the end of the academic year so we subtract one
  const lastDay = useMemo(() => new Date(year, 4, 31), [year]) //31 of may is the end of the academic year so we keep the year as it is
  const canSubDays = useMemo(() => compareAsc(subDays(endDay, 7), firstDay) > -1, [endDay, firstDay]) //we need the subbed end day to be greater than first day
  const canAddDays = useMemo(() => compareDesc(addDays(startDay, 7), lastDay) > -1, [lastDay, startDay]) //we need the added start day to be less than last day

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedStart(startDay);
      setDebouncedEnd(endDay);
    }, 500);

    /*as I understand, when the dependencies update, useEffect calls clearTimeout,
      so the state doesn't change if the dependencies don't change long enough (500ms)*/
    return () => clearTimeout(timeout);
  }, [startDay, endDay])

  useEffect(() => {
    startTransition(async () => {
      //though this is client component, we still want to fetch on the server to cache the data
      getSpecificLessons(accountType, personId, format(debouncedStart, 'y.M.d'), format(debouncedEnd, 'y.M.d'), schoolSlug).then(setSpecificLessons)
    })
  }, [debouncedStart, debouncedEnd, accountType, personId, schoolSlug])

  return <Stack gap={2} sx={{alignItems: 'center'}}>
    <Stack direction='row' sx={{alignItems: 'center'}}>
      <Button color='primary' onClick={() => setActiveDay(subDays(startDay, 7))} disabled={!canSubDays}>
        <ChevronLeft />
      </Button>
      <Stack direction='row' gap={2} sx={{
        color: isCurrent ? 'secondary.main' : 'primary.main',
        alignItems: 'center',
        transition: '1s'
      }}>
        <Typography variant='h6'>{format(startDay, 'd.M')}</Typography>
        <Typography variant='h6'>-</Typography>
        <Typography variant='h6'>{format(endDay, 'd.M')}</Typography>
      </Stack>
      <Button color='primary' onClick={() => setActiveDay(addDays(endDay, 7))} disabled={!canAddDays}>
        <ChevronRight />
      </Button>
    </Stack>
    <Box sx={{position: 'relative'}}>
      <Box sx={{opacity: isPending ? 0.2 : 1, transition: '0.35s'}}>
        <SpecificLessons specificLessons={specificLessons} dates={dates} />
      </Box>
      <Stack direction='row' sx={{
        position: 'absolute',
        top: 0,
        width: '100%',
        pt: 8,
        justifyContent: 'center',
        opacity: isPending ? 1 : 0,
        transition: '0.35s'
      }}>
        {isPending && <CircularProgress size='30vh' />}
      </Stack>
    </Box>
  </Stack>
}