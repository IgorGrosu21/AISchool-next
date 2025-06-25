'use client'

import { ISchoolWithTimetable } from "@/utils/interfaces";
import { Dispatch, SetStateAction } from "react";
import { WithKlass } from "./withKlass";
import { LessonsEditor } from "../../lessonsEditor";

interface SchoolLessonsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function SchoolLessonsEditor({school, setSchool}: SchoolLessonsEditorProps) {
  return <WithKlass school={school} render={(klass, getLessonName) => <LessonsEditor
    staff={school.staff}
    timetable={school.timetable.filter(lt => lt.starting != '')}
    getLesson={getLessonName}
    createLesson={(teacherSubjectNames, lessonTime, teacher) => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: [...lt.lessons, {
        id: '',
        subjectName: teacherSubjectNames[0],
        teacher: teacher,
        klass: klass,
        subjectSlug: ''
      }]} : lt)})
    )}
    updateLesson={(lesson, teacherSubjectNames, lessonTime, teacher) => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.map(
        l => l.klass.id === lesson.klass.id ? {...l, teacher: teacher, subjectName: teacherSubjectNames[0]} : l
      )} : lt)})
    )}
    deleteLesson={lessonTime => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.filter(
        l => l.klass.id !== getLessonName(lessonTime)!.klass.id
      )} : lt)})
    )}
    updateSubjectName={(lessonTime, subjectName) =>setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.map(
        l => l.klass.id === getLessonName(lessonTime)!.klass.id ? {...l, subjectName: subjectName} : l
      )} : lt)})
    )}
  />} />
}