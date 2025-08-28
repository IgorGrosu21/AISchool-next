import type { IUserName } from './user'

type IPerson = {
  id: string
  user: IUserName
}

export type IParentName = IPerson

export type IStudentName = IPerson

export type ITeacherName = IPerson