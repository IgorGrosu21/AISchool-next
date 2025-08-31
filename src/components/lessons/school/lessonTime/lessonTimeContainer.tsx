'use client'

import { ILessonTime } from "@/utils/interfaces"
import { Grid2, Stack, Typography, Divider } from "@mui/material"
import { useTranslations } from "next-intl"
import React, { useMemo } from "react"
import { getLessonGroups } from "../../utils"

interface LessonTimeProps {
  timetable: ILessonTime[]
  render: (lessonTime: ILessonTime) => React.ReactNode
}

export function LessonTimeContainer({timetable, render}: LessonTimeProps) {
  const lessonTimeGroups = useMemo(() => getLessonGroups(timetable), [timetable])
  const t = useTranslations('timetable');

  return <Grid2 container spacing={4} columns={{xs: 1, md: 3}}>
    {lessonTimeGroups.map((lessonTimeGroup, i) => <Grid2 key={i} size={1}>
      <Stack gap={4} sx={{p: 2, border: '1px solid primary.main'}}>
        <Typography variant='h6' sx={{textAlign: 'center'}}>{t(`weekdays.${lessonTimeGroup.weekday}`)}</Typography>
        <Divider />
        <Stack gap={2}>
          {lessonTimeGroup.timetable.map(lessonTime => render(lessonTime))}
        </Stack>
      </Stack>
    </Grid2>)}
  </Grid2>
}