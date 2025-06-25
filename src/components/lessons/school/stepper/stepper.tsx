'use server'

import { ISchoolWithTimetable } from '@/utils/interfaces'
import { LessonTime } from '../lessonTime'
import { SchoolLessons } from '../lessons'
import { TimetableStepperContainer } from './stepperContainer'

interface TimetableStepperProps {
  school: ISchoolWithTimetable
}

export async function TimetableStepper({school}: TimetableStepperProps) {
  return <TimetableStepperContainer
    lessonTimeComponent={<LessonTime key={0} timetable={school.timetable} />}
    lessonsComponent={<SchoolLessons key={1} school={school} />}
  />
}