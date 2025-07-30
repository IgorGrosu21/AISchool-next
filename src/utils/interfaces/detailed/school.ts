import type { IDetailedMedia } from '../media'
import type { IKlassName, ISchoolName, ISchoolNameWithTimetable } from '../name'
import type { IKlass, IStudent, ILesson, ISchool, IPosition, ITeacher, ILessonTime } from '../listed'
import type { ICanEdit } from './canEdit'

export type IDetailedKlass = IKlassWithDiary & {
  students: IStudent[]
  teacher?: ITeacher
}

export type IKlassWithDiary = IKlass & ICanEdit & {
  school: ISchoolNameWithTimetable
  timetable: ILesson[]
}

export type IDetailedSchool = ISchool & ICanEdit & {
  staff: IPosition[],
  desc: string
  workHours: string
  photos: IDetailedMedia[]
  emails: string
}

export type ISchoolWithKlasses = Omit<ISchoolName, 'city' | 'preview'> & ICanEdit & {
  klasses: IKlassName[]
}

export type ISchoolWithTimetable = ISchoolWithKlasses & Omit<ISchoolNameWithTimetable, 'timetable'> & {
  timetable: ILessonTime[]
}