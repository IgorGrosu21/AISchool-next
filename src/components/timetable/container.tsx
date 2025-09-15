'use client'

import { ILessonTimeName } from "@/utils/interfaces"
import { Grid2, Stack, Typography, Divider } from "@mui/material"
import { useTranslations } from "next-intl"
import React, { useMemo } from "react"

export const weekdays: ILessonTimeName['weekday'][] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA']

interface TimetableContainerProps<T> {
  timetable: T[]
  render: (lessonTime: T, groupIndex: number) => React.ReactNode
  emptyGroupNode?: React.ReactNode
}

export function TimetableContainer<T extends ILessonTimeName>({timetable, render, emptyGroupNode}: TimetableContainerProps<T>) {
  const lessonTimeGroups = useMemo(() => weekdays.map(w => ({
    weekday: w,
    timetable: timetable.filter(l => l.weekday === w)
  })), [timetable])
  const t = useTranslations('timetable');

  return <Grid2 container spacing={4} columns={{xs: 1, md: 3}}>
    {lessonTimeGroups.map((lessonTimeGroup, i) => <Grid2 key={i} size={1}>
      <Stack gap={4} sx={{p: 2, border: '1px solid primary.main'}}>
        <Typography variant='h6' color='primary' sx={{textAlign: 'center'}}>{t(`weekdays.${lessonTimeGroup.weekday}`)}</Typography>
        <Divider />
        <Stack gap={2}>
          {lessonTimeGroup.timetable.length > 0 ? lessonTimeGroup.timetable.map(
            lessonTime => render(lessonTime, i)
          ) : emptyGroupNode}
        </Stack>
      </Stack>
    </Grid2>)}
  </Grid2>
}