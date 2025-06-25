import type { ISubjectName } from '../name'

export type IProgress = {
  subject?: number
  module?: number
  topic?: number
  [key: string]: number | undefined
}

type IPriceable = {
  currency: keyof IBalance
  cost: number
  name: string
  slug: string
}

export type ITheory = IPriceable

export type ITask = IPriceable

export type IBalance = {
  [key: string]: number
  sapphires: number
  rubies: number
  emeralds: number
  diamonds: number
}

export type IModuleWithSubject = {
  name: string
  subject: ISubject
  slug: string
}

export type IModule = Omit<IModuleWithSubject, 'subject'> & {
  topics: ITopic[]
  balance: IBalance
}

export type ITopic = {
  name: string
  balance: IBalance
  slug: string
}

export type ISubject = {
  id: string
  name: ISubjectName
  grade: number
  slug: string
}