import type { IMedia } from '../media'
import type { ICityName } from './country'
import type { ILessonTimeName } from './lesson'
import type { IStudentName, ITeacherName } from './person'
import type { ISubjectName } from './subject'

export type IPositionName = {
  teacher: ITeacherName
  subjects: ISubjectName[]
}

export type ISchoolName = {
  id: string,
  name: string,
  city: ICityName,
  preview?: IMedia
  slug: string
}

export type ISchoolNameWithTimetable = ISchoolName & {
  subjects: ISubjectName[]
  staff: IPositionName[]
  timetable: ILessonTimeName[]
  holidays: Array<{start: string, end: string}>
}

export type IKlassName = {
  id: string
  grade: number
  letter: string
  profile: 'R' | 'U'
  school: string
  slug: string
}

export type IKlassNameWithGroups = IKlassName & {
  groups: IGroupName[]
  students: IStudentName[]
}

export type IGroupName = {
  id: string
  order: number
  klass: string
  subject: ISubjectName
  teacher?: ITeacherName
  students: IStudentName[]
}