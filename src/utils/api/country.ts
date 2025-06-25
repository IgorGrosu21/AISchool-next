import type { IDetailedCity, ICityName, ICountryName, IRegionName } from "../interfaces"
import { request } from "./client"

export async function fetchCountryNames() {
  return request<ICountryName[]>({url: `api/country-names/`})
}

export async function fetchRegionNames(countryId: string) {
  return request<IRegionName[]>({url: `api/region-names/${countryId}/`})
}

export async function fetchCityNames(regionId: string) {
  return request<ICityName[]>({url: `api/city-names/${regionId}/`})
}

export async function fetchCity() {
  return request<IDetailedCity>({url: `api/city/`})
}