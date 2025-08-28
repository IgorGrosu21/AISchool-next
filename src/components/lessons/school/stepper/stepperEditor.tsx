'use client'

import { useSchoolWithTimetableEditorContext } from '@/providers'
import { LessonTimeEditor } from '../lessonTime'
import { SchoolLessonsEditor } from '../lessons'
import { TimetableStepperContainer } from './stepperContainer'
import { GroupsContainer } from '../groups'
import { SubjectsEditor } from '../subjects'
import { ISubjectName } from '@/utils/interfaces'

export function TimetableStepperEditor({subjects}: {subjects: ISubjectName[]}) {
  const { instance: school, setInstance: setSchool } = useSchoolWithTimetableEditorContext()

  return <TimetableStepperContainer
    subjectsComponent={<SubjectsEditor key={2} school={school} setSchool={setSchool} subjects={subjects} />}
    lessonTimeComponent={<LessonTimeEditor key={1} school={school} setTimetable={timetable => setSchool(s => ({...s, timetable}))} />}
    groupComponent={<GroupsContainer key={2} school={school} setSchool={setSchool} />}
    lessonsComponent={<SchoolLessonsEditor key={3} school={school} setSchool={setSchool} />}
  />
}