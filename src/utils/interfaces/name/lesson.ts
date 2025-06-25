import type { IKlassName } from './school'
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
  subjectName: ISubjectName
  teacher: ITeacherName
  klass: IKlassName
  subjectSlug: string
}

export type ISpecificLessonName = {
  id: string
  lesson: string
  date: Date
  title: string
  note?: string
}