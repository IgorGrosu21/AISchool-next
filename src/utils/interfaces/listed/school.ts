import type { IKlassName, IPositionName, ISchoolName } from '../name'
import type { ITeacher } from './person'

export type IPosition = IPositionName & {
  id: string
  teacher: ITeacher
  school: ISchoolName
  type: 'HM' | 'HT' | 'T' | 'ET'
  isManager: boolean
}

export type ISchool = ISchoolName & {
  address: string
  phones: string
  website: string
  lang: string
  type: string
  profiles: string
  startGrade: number
  finalGrade: number
}

export type IKlass = Omit<IKlassName, 'school'> & {
  school: ISchoolName
  networth: number
}