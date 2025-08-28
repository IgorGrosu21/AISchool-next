'use client'

import { IPositionName, IDetailedKlass, ILessonTimeName } from "@/utils/interfaces"
import { Dispatch, SetStateAction, useCallback } from "react"
import { LessonsEditor } from "../lessonsEditor"

interface KlassLessonsEditorProps {
  timetable: ILessonTimeName[]
  staff: IPositionName[]
  klass: IDetailedKlass
  setKlass: Dispatch<SetStateAction<IDetailedKlass>>
}

export function KlassLessonsEditor({timetable, klass, staff, setKlass}: KlassLessonsEditorProps) {
  const getLesson = useCallback((lessonTime: ILessonTimeName) => klass.lessons.find(l => l.lessonTime === lessonTime.id), [klass])
  
  return <LessonsEditor
    subjects={klass.school.subjects}
    groups={klass.groups}
    staff={staff}
    timetable={timetable}
    getLesson={getLesson}
    createLesson={(lessonTime, subject) => setKlass(
      k => ({...k, timetable: [...k.lessons, {
        id: '',
        subject: subject,
        teacher: undefined,
        klass: {
          id: klass.id,
          grade: klass.grade,
          letter: klass.letter,
          profile: klass.profile,
        },
        lessonTime: lessonTime,
        subjectSlug: ''
      }]})
    )}
    updateLesson={(lesson, lessonTime, subject) => setKlass(
      k => ({...k, timetable: k.lessons.map(
        l => l.klass === lesson.klass ? {...l, teacher: lessonTime, subject: subject} : l
      )})
    )}
    deleteLesson={lessonTime => setKlass(
      k => ({...k, timetable: k.lessons.filter(l => l.lessonTime !== lessonTime.id)})
    )}
    updateTeacher={(lessonTime, teacher) => setKlass(
      k => ({...k, timetable: k.lessons.map(l => l.lessonTime === lessonTime.id ? {...l, teacher: teacher} : l)})
    )}
  />
}