import type { IDetailedMedia } from '../media'
import type { IGroupName, IKlassName, IKlassNameWithGroups, ILessonName, ISchoolName, ISchoolNameWithTimetable, ISubjectName } from '../name'
import type { IKlass, IStudent, ISchool, IPosition, ITeacher, ILessonTime } from '../listed'
import type { ICanEdit } from './canEdit'

export type IDetailedKlass = Omit<IKlass, 'school'> & ICanEdit & {
  students: IStudent[]
  teacher?: ITeacher
  lessons: ILessonName[]
  school: ISchoolNameWithTimetable
  groups: IGroupName[]
}

export type IDetailedSchool = ISchool & ICanEdit & {
  desc: string
  phones: string
  emails: string
  workHours: string
  staff: IPosition[]
  files: IDetailedMedia[]
}

export type ISchoolWithKlasses = Omit<ISchoolName, 'city' | 'preview'> & ICanEdit & {
  klasses: IKlassName[]
}

export type ISchoolWithTimetable = Omit<ISchoolWithKlasses, 'klasses'> & Omit<ISchoolNameWithTimetable, 'timetable'> & {
  timetable: ILessonTime[]
  subjects: ISubjectName[]
  klasses: IKlassNameWithGroups[]
}