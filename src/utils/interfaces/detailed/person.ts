import type { IStudent, IKlass, ITeacher, IPosition } from '../listed'
import type { ISubjectName } from '../name'
import type { IDetailedUser } from './user'

type IDetailedPerson = {
  id: string
  user: IDetailedUser
}

export type IDetailedStudent = IStudent & IDetailedPerson & {
  klass?: IKlass
}

export type IDetailedTeacher = ITeacher & IDetailedPerson & {
  workPlaces: IPosition[]
  subjectNames: ISubjectName[]
  experience: number
}