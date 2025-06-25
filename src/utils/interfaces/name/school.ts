import type { IMedia } from '../media'
import type { ICityName } from './country'
import type { ILessonTimeName } from './lesson'
import type { ITeacherName } from './person'
import type { ISubjectName } from './subject'

export type IPositionName = {
  teacher: ITeacherName
  subjectNames: ISubjectName[]
}

export type ISchoolName = {
  id: string,
  name: string,
  city: ICityName,
  preview?: IMedia
}

export type ISchoolNameWithTimetable = ISchoolName & {
  staff: IPositionName[]
  timetable: ILessonTimeName[]
}

export type IKlassName = {
  id: string
  grade: number
  letter: string
  profile: 'R' | 'U'
  school: string
}