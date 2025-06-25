'use client'

import { fetchCountryNames, fetchRegionNames, fetchCityNames } from '@/utils/api'
import { ICityName, ICountryName, IRegionName } from '@/utils/interfaces'
import { Stack, Box } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from './input'
import { Select } from './select'

export function CityPicker() {
  const [countries, setCountries] = useState<ICountryName[]>([])
  const [regions, setRegions] = useState<IRegionName[]>([])
  const [cities, setCities] = useState<ICityName[]>([])
  
  const [country, setCountry] = useState<ICountryName | null>(null)
  const [region, setRegion] = useState<IRegionName | null>(null)
  const [city, setCity] = useState<ICityName | null>(null)

  useEffect(() => {
    fetchCountryNames().then(setCountries)
  }, [])

  useEffect(() => {
    if (country) {
      fetchRegionNames(country.id).then(setRegions)
    }
  }, [country])

  useEffect(() => {
    if (region) {
      fetchCityNames(region.id).then(setCities)
    }
  }, [region])

  return <Stack gap={2} sx={{flex: 1}}>
    <Select<ICountryName>
      name='country'
      options={countries}
      value={country}
      setValue={setCountry}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <Image loading="lazy" width={40} height={20} src={option.flag} alt="" />
            {option.name}
          </Box>
        );
      }}
    />
    <Select<IRegionName>
      disabled={country === undefined}
      name='region'
      options={regions}
      value={region}
      setValue={setRegion}
    />
    <Stack sx={{flex: 1, justifyContent: 'center'}}>
      <Select<ICityName>
        disabled={region === undefined}
        name='city'
        options={cities}
        value={city}
        setValue={setCity}
      />
    </Stack>
    <Input hidden value={city?.id ?? ''} name='city_id' />
  </Stack>
}