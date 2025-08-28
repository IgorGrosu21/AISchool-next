import type { IDetailedCity, ICityName, ICountryName, IRegionName } from "../interfaces"
import { request } from "./client"

export async function fetchCountryNames() {
  return request<ICountryName[]>({url: `api/country-names/`})
}

export async function fetchRegionNames(countrySlug: string) {
  return request<IRegionName[]>({url: `api/region-names/${countrySlug}/`})
}

export async function fetchCityNames(countrySlug: string, regionSlug: string) {
  return request<ICityName[]>({url: `api/city-names/${countrySlug}/${regionSlug}/`})
}

export async function fetchCity() {
  return request<IDetailedCity>({url: `api/city/`})
}