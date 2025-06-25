'use client'

import { ILessonTime } from "@/utils/interfaces"
import { Typography } from "@mui/material"
import { LessonTimeContainer } from "./lessonTimeContainer"

interface LessonTimeProps {
  timetable: ILessonTime[]
}

export function LessonTime({timetable}: LessonTimeProps) {
  return <LessonTimeContainer timetable={timetable} render={lessonTime => <Typography key={lessonTime.order} variant='h6' sx={{textAlign: 'center'}}>
    {lessonTime.order + 1}. {lessonTime.starting} - {lessonTime.ending}
  </Typography>} />
}