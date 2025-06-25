import type { ICityName, IRegionName, ICountryName } from '../name'

export type ICity = ICityName & {
  region: IRegion
}

export type IRegion = IRegionName & {
  country: ICountryName
}