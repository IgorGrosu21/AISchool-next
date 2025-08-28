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
    subjects={school.subjects}
    groups={klass.groups}
    staff={school.staff}
    timetable={school.timetable.filter(lt => lt.starting != '')}
    getLesson={getLessonName}
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
    updateLesson={(lesson, lessonTime, subject) => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.map(
        l => l.klass === lesson.klass ? {...l, teacher: undefined, subject: subject} : l
      )} : lt)})
    )}
    deleteLesson={lessonTime => setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.filter(
        l => l.klass !== getLessonName(lessonTime)!.klass
      )} : lt)})
    )}
    updateTeacher={(lessonTime, teacher) =>setSchool(
      s => ({...s, timetable: s.timetable.map(lt => lt.id === lessonTime.id ? {...lt, lessons: lt.lessons.map(
        l => l.klass === getLessonName(lessonTime)!.klass ? {...l, teacher: teacher} : l
      )} : lt)})
    )}
  />} />
}