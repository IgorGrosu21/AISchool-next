'use client'

import { ILesson, ILessonTimeName } from "@/utils/interfaces";
import { Lessons } from "../lessons";

interface KlassLessonsProps {
  timetable: ILessonTimeName[]
  lessons: ILesson[]
}

export function KlassLessons({timetable, lessons}: KlassLessonsProps) {
  return <Lessons timetable={timetable} getLessonName={lessonTime => lessons.find(l => l.lessonTime.id === lessonTime.id)} />
}