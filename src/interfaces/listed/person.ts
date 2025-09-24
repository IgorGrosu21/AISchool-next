import type { IBalance } from './manual'
import type { IUser } from './user'
import type { IKlassName, ISchoolName } from '../name/school'

export type ISubscription = {
  plan: 'A' | 'Y' | 'K' | 'L'
  price: number
  ending: string
}

type IPerson = {
  id: string
  user: IUser
}

export type IParent = IPerson

export type IStudent = IPerson & {
  subscription?: ISubscription
  balance: IBalance
  rank: number
  isManager: boolean
}

export type IStudentWithKlass = IStudent & {
  klass?: IKlassName
  school?: ISchoolName
}

export type ITeacher = IPerson