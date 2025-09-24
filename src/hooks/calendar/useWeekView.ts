'use client'

import { getSpecificLessons } from '@/app/actions';
import { useCalendarContext, useDiaryContext } from '@/providers';
import { ISpecificLessonName } from '@/interfaces';
import { addDays, compareAsc, compareDesc, format, isSameWeek, subDays } from 'date-fns';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';

export function useWeekView(dates: Date[]) {
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

  const goToPrevWeek = useCallback(() => {
    setActiveDay(subDays(startDay, 7))
  }, [startDay, setActiveDay])
  
  const goToNextWeek = useCallback(() => {
    setActiveDay(addDays(endDay, 7))
  }, [endDay, setActiveDay])

  return {
    specificLessons,
    isPending,
    isCurrent,
    canSubDays,
    canAddDays,
    goToPrevWeek,
    goToNextWeek
  }
}