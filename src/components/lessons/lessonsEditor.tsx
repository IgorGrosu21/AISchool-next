'use client'

import { ILessonName, ILessonTimeName, IPositionName, ISubjectName, ITeacherName } from "@/utils/interfaces";
import { Stack, Typography, Grid2, Divider, Autocomplete, TextField } from "@mui/material";
import { getLessonGroups } from "./utils";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

interface LessonsEditorProps<T, R> {
  staff: IPositionName[]
  timetable: T[]
  getLesson: (lessonTime: T) => R | undefined
  createLesson: (teacherSubjectNames: ISubjectName[], lessonTime: T, teacher: ITeacherName) => void
  updateLesson: (lesson: R, teacherSubjectNames: ISubjectName[], lessonTime: T, teacher: ITeacherName) => void
  deleteLesson: (lessonTime: T) => void
  updateSubjectName: (lessonTime: T, subjectName: ISubjectName) => void
}

export function LessonsEditor<T extends ILessonTimeName, R extends ILessonName>({
  staff,
  timetable,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  updateSubjectName
}: LessonsEditorProps<T, R>) {
  const lessonTimeGroups = useMemo(() => getLessonGroups(timetable), [timetable])
  const allTeachers = useMemo(() => staff.filter(s => s.subjectNames.length > 0).map(s => s.teacher), [staff])
  const getTeacherSubjectNames = useCallback((teacher?: ITeacherName) => staff.find(s => s.teacher.id === teacher?.id)?.subjectNames ?? [], [staff])
  const t = useTranslations('timetable')

  const updateTeacher = useCallback((lessonTime: T, teacher: ITeacherName | null) => {
    if (teacher) {
      const teacherSubjectNames = getTeacherSubjectNames(teacher)
      const lesson = getLesson(lessonTime)
      if (lesson) {
        updateLesson(lesson, teacherSubjectNames, lessonTime, teacher)
      } else {
        createLesson(teacherSubjectNames, lessonTime, teacher)
      }
    } else {
      deleteLesson(lessonTime)
    }
  }, [createLesson, deleteLesson, getLesson, getTeacherSubjectNames, updateLesson])

  return <Grid2 container spacing={4} columns={3}>
    {lessonTimeGroups.map((lessonGroup, i) => <Grid2 key={i} size={1}>
      <Stack gap={4} sx={{p: 2, border: '1px solid primary.main'}}>
        <Typography variant='h6' sx={{textAlign: 'center'}}>{t(`weekdays.${lessonGroup.weekday}`)}</Typography>
        <Divider />
        <Stack gap={2}>
          {lessonGroup.timetable.map((lessonTime, j) => {
            const lesson = getLesson(lessonTime)
            const teacherSubjectNames = getTeacherSubjectNames(lesson?.teacher)
            return <Stack key={j} direction='row' gap={2} sx={{alignItems: 'center'}}>
              <Typography variant='h6'>{j + 1}.</Typography>
              <Autocomplete
                sx={{transition: '0.5s', ...(teacherSubjectNames.length === 0 ? {flex: 1} : {})}}
                value={lesson?.teacher ?? null}
                onChange={(_, t: ITeacherName | null) => updateTeacher(lessonTime, t)}
                options={allTeachers}
                renderInput={(params) => <TextField {...params} label={t('lessons.teacher')} />}
                getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
              />
              <Autocomplete
                sx={{transition: '0.5s', ...(teacherSubjectNames.length === 0 ? {} : {flex: 1})}}
                disabled={teacherSubjectNames.length === 0}
                value={lesson?.subjectName ?? null}
                onChange={(_, s: ISubjectName | null) => s ? updateSubjectName(lessonTime, s) : {}}
                options={teacherSubjectNames}
                renderInput={(params) => <TextField {...params} label={t('lessons.subject_name')} />}
                getOptionLabel={(option) => option.verboseName}
              />
            </Stack>
          })}
        </Stack>
      </Stack>
    </Grid2>)}
  </Grid2>
}