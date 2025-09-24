import type { ISubjectName } from '../name'

type WithSlug = {
  name: string
  slug: string
}

export type ITheory = WithSlug

export type ITask = WithSlug & {
  currency: keyof IBalance
  cost: number
}


export type IBalance = {
  [key: string]: number
  sapphires: number
  rubies: number
  emeralds: number
  diamonds: number
}

export type IModuleWithManual = WithSlug & {
  manual: IManual
}

export type IModule = Omit<IModuleWithManual, 'manual'> & {
  topics: ITopic[]
  balance: IBalance
}

export type ITopic = WithSlug & {
  balance: IBalance
}

export type IManual = {
  id: string
  subject: ISubjectName
  grade: number
  slug: string
}