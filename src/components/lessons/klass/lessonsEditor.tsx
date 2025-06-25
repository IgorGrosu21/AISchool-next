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
  const getLesson = useCallback((lessonTime: ILessonTimeName) => klass.timetable.find(l => l.lessonTime.id === lessonTime.id), [klass])
  
  return <LessonsEditor
    staff={staff}
    timetable={timetable}
    getLesson={getLesson}
    createLesson={(teacherSubjectNames, lessonTime, teacher) => setKlass(
      k => ({...k, timetable: [...k.timetable, {
        id: '',
        subjectName: teacherSubjectNames[0],
        teacher: teacher,
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
    updateLesson={(lesson, teacherSubjectNames, lessonTime, teacher) => setKlass(
      k => ({...k, timetable: k.timetable.map(
        l => l.klass.id === lesson.klass.id ? {...l, teacher: teacher, subjectName: teacherSubjectNames[0]} : l
      )})
    )}
    deleteLesson={lessonTime => setKlass(
      k => ({...k, timetable: k.timetable.filter(l => l.lessonTime.id !== lessonTime.id)})
    )}
    updateSubjectName={(lessonTime, subjectName) => setKlass(
      k => ({...k, timetable: k.timetable.map(l => l.lessonTime.id === lessonTime.id ? {...l, subjectName: subjectName} : l)})
    )}
  />
}