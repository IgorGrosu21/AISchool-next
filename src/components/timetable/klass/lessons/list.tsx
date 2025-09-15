'use client'

import { IGroupName, ILessonName, ILessonTimeName } from "@/utils/interfaces";
import { Lessons } from "../../lessons";

interface KlassLessonsProps {
  groups: IGroupName[]
  timetable: ILessonTimeName[]
  lessons: ILessonName[]
}

export function KlassLessons({groups, timetable, lessons}: KlassLessonsProps) {
  return <Lessons groups={groups} timetable={timetable} getLessonName={lessonTime => lessons.find(l => l.lessonTime === lessonTime.id)} />
}