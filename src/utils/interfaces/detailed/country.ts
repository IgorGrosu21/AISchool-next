import type { ICity, IRegion } from '../listed'
import type { ICountryName } from '../name'

export type IDetailedCity = ICity & {
  region: IDetailedRegion
}

export type IDetailedRegion = IRegion & {
  country: IDetailedCountry
}

export type IDetailedCountry = ICountryName & {
  langs: string
  startGrade: number
  finalGrade: number
  schoolTypes: string
  schoolProfiles: string
}