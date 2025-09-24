import type { ICity, IRegion } from '../listed'
import type { ICountryName } from '../name'

export type IDetailedCity = Omit<ICity, 'region'> & {
  region: IDetailedRegion
}

export type IDetailedRegion = Omit<IRegion, 'country'> & {
  country: IDetailedCountry
}

export type IDetailedCountry = ICountryName & {
  langs: string
  startGrade: number
  finalGrade: number
  schoolTypes: string
  schoolProfiles: string
}