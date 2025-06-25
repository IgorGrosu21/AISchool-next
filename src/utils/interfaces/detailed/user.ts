import type { IUser, ISocial, ICity } from '../listed'
import type { ICanEdit } from './canEdit'

export type IDetailedUser = IUser & ICanEdit & {
  socials: ISocial[]
  city: ICity
  lang: string
}

export type IUserRoutes = IUser & {
  isAccountVerified: boolean
  klassLink?: string
  schoolLink?: string
  diaryLink?: string
  journalLink?: string
}