'use client'

import { ISchoolWithTimetable } from "@/utils/interfaces";
import { WithKlass } from "./withKlass";
import { Lessons } from "../../lessons";

interface SchoolLessonsProps {
  school: ISchoolWithTimetable
}

export function SchoolLessons({school}: SchoolLessonsProps) {
  return <WithKlass school={school} render={(_, getLessonName) => <Lessons
    timetable={school.timetable}
    getLessonName={getLessonName}
  />} />
}