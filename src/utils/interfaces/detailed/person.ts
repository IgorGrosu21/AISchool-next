import type { IStudent, IKlass, ITeacher, IPosition, IParent, IStudentWithKlass, IUser, INote, ISpecificLesson, ILessonTime } from '../listed'
import type { ISchoolName, ISubjectName } from '../name'
import type { IDetailedUser } from './user'
import type { ICanEdit } from './canEdit'
import type { IDetailedHomework } from './lesson'

type IDetailedPerson = ICanEdit & {
  id: string
  user: IDetailedUser
}

export type IDetailedParent = IParent & IDetailedPerson & {
  students: IStudentWithKlass[]
}

export type IDetailedStudent = IStudent & IDetailedPerson & {
  klass?: IKlass
}

export type IDetailedTeacher = ITeacher & IDetailedPerson & {
  workPlaces: IPosition[]
  subjects: ISubjectName[]
  experience: number
}

export type IPersonHome = {
  id: string
  user: IUser
} & (IStudentHome & {
  profileType: 'student'
} | ITeacherHome & {
  profileType: 'teacher'
} | IParentHome & {
  profileType: 'parent'
} | {
  profileType: 'staff'
})

type IStudentHome = {
  latestNotes: INote[]
  latestSpecificLessons: ISpecificLesson[]
  analytics: Array<{
    subject: ISubjectName
    points: Array<{
      date: string
      value: string
    }>
  }>
}

type ITeacherHome = {
  latestHomeworks: IDetailedHomework[]
  tomorrowTimetable: ILessonTime[]
  analytics: Array<{
    school: ISchoolName
    subjects: Array<{
      subjectName: ISubjectName
      klasses: Array<{
        slug: string
        values: string[]
      }>
    }>
  }>
}

type IParentHome = {
  students: Array<{
    name: string
    data: IStudentHome
  }>
}