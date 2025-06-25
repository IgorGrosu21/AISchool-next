'use client'

import { useSchoolWithTimetableEditorContext } from '@/providers'
import { LessonTimeEditor } from '../lessonTime'
import { SchoolLessonsEditor } from '../lessons'
import { TimetableStepperContainer } from './stepperContainer'

export function TimetableStepperEditor() {
  const { instance: school, setInstance: setSchool } = useSchoolWithTimetableEditorContext()

  return <TimetableStepperContainer
    lessonTimeComponent={<LessonTimeEditor key={0} timetable={school.timetable} setTimetable={timetable => setSchool(s => ({...s, timetable}))} />}
    lessonsComponent={<SchoolLessonsEditor key={1} school={school} setSchool={setSchool} />}
  />
}