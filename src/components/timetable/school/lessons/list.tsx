'use client'

import { ILessonTime, IKlassNameWithGroups, ISchoolWithTimetable } from "@/utils/interfaces";
import { WithKlass } from "../withKlass";
import { Lessons } from "../../lessons";
import { useCallback } from "react";

interface SchoolLessonsProps {
  school: ISchoolWithTimetable
}

export function SchoolLessons({school}: SchoolLessonsProps) {
  const getLessonName = useCallback((klass: IKlassNameWithGroups) => {
    return (lessonTime: ILessonTime) => lessonTime.lessons.find(l => l.klass === klass.id)
  }, [])

  return <WithKlass school={school} render={klass => <Lessons
    groups={klass.groups}
    timetable={school.timetable}
    getLessonName={getLessonName(klass)}
  />} />
}