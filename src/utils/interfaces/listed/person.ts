import type { IBalance } from './subject'
import type { IUser } from './user'

export type ISubscription = {
  id: string
  plan: 'A' | 'Y' | 'K' | 'L'
  price: number
  ending: Date
}

type IPerson = {
  id: string
  user: IUser
}

export type IStudent = IPerson & {
  subscription?: ISubscription
  balance: IBalance
  rank: number
  isManager: boolean
}

export type ITeacher = IPerson