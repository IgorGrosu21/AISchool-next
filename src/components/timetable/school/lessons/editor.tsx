'use client'

import { IKlassNameWithGroups, ILessonTime, ISchoolWithTimetable } from "@/interfaces";
import { Dispatch, SetStateAction, useCallback } from "react";
import { WithKlass } from "../withKlass";
import { LessonsEditor } from "../../lessons";

interface SchoolLessonsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function SchoolLessonsEditor({school, setSchool}: SchoolLessonsEditorProps) {
  const getLessonName = useCallback((klass: IKlassNameWithGroups) => {
    return (lessonTime: ILessonTime) => lessonTime.lessons.find(l => l.klass === klass.id)
  }, [])
  
  return <WithKlass school={school} render={klass => <LessonsEditor
    subjects={school.subjects}
    groups={klass.groups}
    staff={school.staff}
    timetable={school.timetable.filter(lt => lt.starting != '')}
    getLesson={getLessonName(klass)}
    createLesson={(lessonTime, subject) => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: [...lt.lessons, {
        id: '',
        subject: subject,
        teacher: undefined,
        klass: klass.id,
        lessonTime: lt.id,
        manualSlug: '',
        klassSlug: ''
      }]} : lt)})
    )}
    updateLesson={(lesson, subject) => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lesson.lessonTime ? {...lt, lessons: lt.lessons.map(
        l => l.klass === lesson.klass ? {...l, teacher: undefined, subject: subject} : l
      )} : lt)})
    )}
    deleteLesson={lesson => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lesson.lessonTime ? {...lt, lessons: lt.lessons.filter(
        l => l.klass !== lesson.klass
      )} : lt)})
    )}
    updateTeacher={(lesson, teacher) =>setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lesson.lessonTime ? {...lt, lessons: lt.lessons.map(
        l => l.klass === lesson.klass ? {...l, teacher: teacher} : l
      )} : lt)})
    )}
  />} />
}