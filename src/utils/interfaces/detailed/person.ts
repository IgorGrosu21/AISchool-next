import type { IStudent, IKlass, ITeacher, IPosition, IParent, IStudentWithKlass } from '../listed'
import type { ISubjectName } from '../name'
import type { IDetailedUser } from './user'
import type { ICanEdit } from './canEdit'

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