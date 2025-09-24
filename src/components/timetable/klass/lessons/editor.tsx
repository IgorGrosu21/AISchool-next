'use client'

import { IPositionName, IDetailedKlass, ILessonTimeName } from "@/interfaces"
import { Dispatch, SetStateAction, useCallback } from "react"
import { LessonsEditor } from "../../lessons"

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
      k => ({...k, lessons: [...k.lessons, {
        id: '',
        subject: subject,
        teacher: undefined,
        klass: klass.id,
        lessonTime: lessonTime.id,
        subjectSlug: '',
        klassSlug: klass.slug,
        manualSlug: ''
      }]})
    )}
    updateLesson={(lesson, subject) => setKlass(
      k => ({...k, lessons: k.lessons.map(
        l => l.lessonTime === lesson.lessonTime ? {...l, teacher: undefined, subject: subject} : l
      )})
    )}
    deleteLesson={lesson => setKlass(
      k => ({...k, lessons: k.lessons.filter(l => l.lessonTime !== lesson.lessonTime)})
    )}
    updateTeacher={(lesson, teacher) => setKlass(
      k => ({...k, lessons: k.lessons.map(l => l.lessonTime === lesson.lessonTime ? {...l, teacher: teacher} : l)})
    )}
  />
}