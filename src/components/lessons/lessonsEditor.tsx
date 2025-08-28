'use client'

import { IGroupName, ILessonName, ILessonTimeName, IPositionName, ISubjectName, ITeacherName } from "@/utils/interfaces";
import { Stack, Typography, Grid2, Divider, Autocomplete, TextField } from "@mui/material";
import { getLessonGroups } from "./utils";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

interface LessonsEditorProps<T, R> {
  subjects: ISubjectName[]
  groups: IGroupName[]
  staff: IPositionName[]
  timetable: T[]
  getLesson: (lessonTime: T) => R | undefined
  createLesson: (lessonTime: T, subject: ISubjectName) => void
  updateLesson: (lesson: R, lessonTime: T, subject: ISubjectName) => void
  deleteLesson: (lessonTime: T) => void
  updateTeacher: (lessonTime: T, teacher: ITeacherName) => void
}

export function LessonsEditor<T extends ILessonTimeName, R extends ILessonName>({
  subjects,
  groups,
  staff,
  timetable,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  updateTeacher
}: LessonsEditorProps<T, R>) {
  const lessonTimeGroups = useMemo(() => getLessonGroups(timetable), [timetable])
  const getTeachers = useCallback((subject: ISubjectName) => staff.filter(s => s.subjects.map(s => s.id).includes(subject.id)).map(s => s.teacher), [staff])
  const getGroups = useCallback((subject: ISubjectName) => groups.filter(g => g.subject.id === subject.id), [groups])
  const t = useTranslations('timetable')

  const updateSubject = useCallback((lessonTime: T, subject: ISubjectName | null) => {
    if (subject) {
      const lesson = getLesson(lessonTime)
      if (lesson) {
        updateLesson(lesson, lessonTime, subject)
      } else {
        createLesson(lessonTime, subject)
      }
    } else {
      deleteLesson(lessonTime)
    }
  }, [createLesson, deleteLesson, getLesson, updateLesson])

  return <Grid2 container spacing={4} columns={3}>
    {lessonTimeGroups.map((lessonGroup, i) => <Grid2 key={i} size={1}>
      <Stack gap={4} sx={{p: 2, border: '1px solid primary.main'}}>
        <Typography variant='h6' sx={{textAlign: 'center'}}>{t(`weekdays.${lessonGroup.weekday}`)}</Typography>
        <Divider />
        <Stack gap={2}>
          {lessonGroup.timetable.map((lessonTime, j) => {
            const lesson = getLesson(lessonTime)
            const teachers = lesson ? getTeachers(lesson?.subject) : []
            const groups = lesson ? getGroups(lesson.subject) : []
            return <Stack key={j} direction='row' gap={2} sx={{alignItems: 'center'}}>
              <Typography variant='h6'>{j + 1}.</Typography>
              <Autocomplete
                sx={{transition: '0.5s', ...(teachers.length === 0 || groups.length > 0  ? {flex: 1} : {})}}
                value={lesson?.subject ?? null}
                onChange={(_, s: ISubjectName | null) => updateSubject(lessonTime, s)}
                options={subjects}
                renderInput={(params) => <TextField {...params} label={t('lessons.subject')} />}
                getOptionLabel={(option) => option.verboseName}
              />
              <Autocomplete
                disabled={teachers.length === 0}
                sx={{transition: '0.5s', ...(groups.length === 0 ? (teachers.length === 0 ? {} : {flex: 1}) : {display: 'none'})}}
                value={lesson?.teacher ?? null}
                onChange={(_, t: ITeacherName | null) => t ? updateTeacher(lessonTime, t) : {}}
                options={teachers}
                renderInput={(params) => <TextField {...params} label={t('lessons.teacher')} />}
                getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
              />
            </Stack>
          })}
        </Stack>
      </Stack>
    </Grid2>)}
  </Grid2>
}