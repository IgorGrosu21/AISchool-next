'use server'

import { ISchoolWithTimetable } from '@/utils/interfaces'
import { LessonTime } from '../lessonsTime'
import { SchoolLessons } from '../lessons'
import { TimetableStepperContainer } from './container'
import { SchoolGroups } from '../groups'
import { Subjects } from '../subjects'

interface TimetableStepperProps {
  school: ISchoolWithTimetable
}

export async function TimetableStepper({school}: TimetableStepperProps) {
  return <TimetableStepperContainer
    subjectsComponent={<Subjects key={0} subjects={school.subjects} />}
    lessonTimeComponent={<LessonTime key={1} timetable={school.timetable} />}
    groupComponent={<SchoolGroups key={2} school={school} />}
    lessonsComponent={<SchoolLessons key={3} school={school} />}
  />
}