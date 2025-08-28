import type { ISubjectName } from './subject'
import type { ITeacherName } from './person'

export type ILessonTimeName = {
  id: string
  starting: string
  ending: string
  weekday: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU'
  order: number
}

export type ILessonName = {
  id: string
  subject: ISubjectName
  teacher?: ITeacherName
  klass: string
  lessonTime: string
  klassSlug: string
  manualSlug: string
}

export type INoteName = {
  id: string
  value: string
  specificLesson: string
  student: string
  comment: string
  lastModified: string
}

export type ISpecificLessonName = {
  id: string
  lesson: string
  date: string
  title: string
  desc: string
  note?: string
  homework?: string
}