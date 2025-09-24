'use client'

import { ILessonTime, ISchoolWithTimetable } from "@/interfaces";
import { Stack, Typography, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { TimetableContainer } from "../../container";
import { useLessonTimeEditor } from "@/hooks";

interface LessonTimeEditorProps {
  school: ISchoolWithTimetable
  setTimetable: (val: ILessonTime[]) => void
}

export function LessonTimeEditor({school, setTimetable}: LessonTimeEditorProps) {
  const t = useTranslations('timetable')
  const { duration, setDuration, updateTime } = useLessonTimeEditor(school, setTimetable)

  return <Stack gap={8}>
    <Stack gap={2} direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Stack>
        <Typography variant='h5'>{t('lesson_time.desc')}</Typography>
        <Typography>({t('lesson_time.helper')})</Typography>
      </Stack>
      <TextField value={duration} onChange={e => setDuration(Number(e.target.value))} label={t('lesson_time.duration')} />
    </Stack>
    <TimetableContainer timetable={school.timetable} render={lessonTime => <Stack key={lessonTime.order} direction='row' gap={2} sx={{alignItems: 'center'}}>
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