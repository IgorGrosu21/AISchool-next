'use client'

import { ISchoolWithTimetable } from "@/utils/interfaces";
import { WithKlass } from "./withKlass";
import { Lessons } from "../../lessons";

interface SchoolLessonsProps {
  school: ISchoolWithTimetable
}

export function SchoolLessons({school}: SchoolLessonsProps) {
  return <WithKlass school={school} render={(klass, getLessonName) => <Lessons
    groups={klass.groups}
    timetable={school.timetable}
    getLessonName={getLessonName}
  />} />
}