'use client'

import { IGroupName, ILessonName, ILessonTimeName, IPositionName, ISubjectName, ITeacherName } from "@/utils/interfaces";
import { Autocomplete, TextField } from "@mui/material";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { TimetableContainer } from "../container";
import { Lesson } from "./item";

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

  return <TimetableContainer timetable={timetable} render={lessonTime => {
    const lesson = getLesson(lessonTime)
    const teachers = lesson ? getTeachers(lesson?.subject) : []
    const groups = lesson ? getGroups(lesson.subject) : []

    return <Lesson
      key={lessonTime.order}
      lessonTime={lessonTime}
      lesson={lesson}
      showSubject={false}
      direction={{xs: 'column', md: 'row'}}
      sx={{flex: 1}}
    >
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{transition: '0.5s', ...(teachers.length === 0 || groups.length > 0  ? {flex: 1} : {})}}
        value={lesson?.subject ?? null}
        onChange={(_, s: ISubjectName | null) => updateSubject(lessonTime, s)}
        options={subjects}
        renderInput={(params) => <TextField {...params} label={t('lessons.subject')} />}
        getOptionLabel={(option) => option.verboseName}
      />
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disabled={teachers.length === 0}
        sx={{transition: '0.5s', ...(groups.length === 0 ? (teachers.length === 0 ? {} : {flex: 1}) : {display: 'none'})}}
        value={lesson?.teacher ?? null}
        onChange={(_, t: ITeacherName | null) => t ? updateTeacher(lessonTime, t) : {}}
        options={teachers}
        renderInput={(params) => <TextField {...params} label={t('lessons.teacher')} />}
        getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
      />
    </Lesson>
  }} />
}