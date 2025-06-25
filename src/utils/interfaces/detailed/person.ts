import type { IStudent, IKlass, IModuleProgress, ITeacher, IPosition } from '../listed'
import type { ISubjectName } from '../name'
import type { IDetailedUser } from './user'

type IDetailedPerson = {
  id: string
  user: IDetailedUser
}

export type IDetailedStudent = IStudent & IDetailedPerson & {
  klass?: IKlass
  modulesProgress: IModuleProgress[]
}

export type IDetailedTeacher = ITeacher & IDetailedPerson & {
  workPlaces: IPosition[]
  subjectNames: ISubjectName[]
  experience: number
}