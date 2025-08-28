'use client'

import { ILessonTime, ISchoolWithTimetable } from "@/utils/interfaces";
import { Stack, Typography, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { weekdays } from "../../utils";
import { LessonTimeContainer } from "./lessonTimeContainer";

interface LessonTimeEditorProps {
  school: ISchoolWithTimetable
  setTimetable: (val: ILessonTime[]) => void
}

export function LessonTimeEditor({school, setTimetable}: LessonTimeEditorProps) {
  const [duration, setDuration] = useState(45)
  const t = useTranslations('timetable')

  useEffect(() => {
    if (school.timetable.length < 48) {
      const newTimetable: ILessonTime[] = []
      for (const weekday of weekdays) {
        const lessonTimeList = school.timetable.filter(l => l.weekday === weekday)
        const fullLessonTimeList: ILessonTime[] = []
        if (lessonTimeList.length < 8) {
          for (let i = 0; i < 8; i++) {
            fullLessonTimeList.push(lessonTimeList.find(l => l.order === i) ?? {
              id: '',
              starting: '',
              ending: '',
              weekday: weekday,
              order: i,
              lessons: [],
              school: school.id
            })
          }
        }
        newTimetable.push(...fullLessonTimeList)
      }
      setTimetable(newTimetable)
    }
  }, [setTimetable, school.timetable, school.id])

  const updateTime = useCallback((weekday: ILessonTime['weekday'], order: number, type: 'starting' | 'ending', value: string) => {
    if (value === '') {
      return setTimetable(
        school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, starting: '', ending: ''} : l)
      )
    }
    if (type === 'ending') {
      return setTimetable(
        school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, ending: value} : l)
      )
    }
    if (value.length === 5 && value.includes(':')) {
      const copy = [...school.timetable]
      copy.forEach((l, i) => {
        if (l.order === order) {
          let [hours, minutes] = value.split(':').map(Number)
          minutes += duration
          if (minutes >= 60) {
            hours += Math.floor(minutes / 60)
            minutes %= 60
          }
          copy[i] = {...l, starting: value, ending: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`}
        }
      })
      return setTimetable(copy)
    }
    setTimetable(
      school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, starting: value} : l)
    )
    
  }, [duration, setTimetable, school.timetable])

  return <Stack gap={8}>
    <Stack gap={2} direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Stack>
        <Typography variant='h5'>{t('lesson_time.desc')}</Typography>
        <Typography>({t('lesson_time.helper')})</Typography>
      </Stack>
      <TextField value={duration} onChange={e => setDuration(Number(e.target.value))} label={t('lesson_time.duration')} />
    </Stack>
    <LessonTimeContainer timetable={school.timetable} render={lessonTime => <Stack key={lessonTime.order} direction='row' gap={2} sx={{alignItems: 'center'}}>
      <Typography variant='h6'>{lessonTime.order + 1}.</Typography>
      <TextField value={lessonTime.starting} label={t('lesson_time.starting')} onChange={e => updateTime(
        lessonTime.weekday, lessonTime.order, 'starting', e.target.value
      )} />
      <Typography variant='h6'>-</Typography>
      <TextField value={lessonTime.ending} label={t('lesson_time.ending')} onChange={e => updateTime(
        lessonTime.weekday, lessonTime.order, 'ending', e.target.value
      )} />
    </Stack>} />
  </Stack>
}