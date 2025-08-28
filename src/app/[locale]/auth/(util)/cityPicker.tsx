'use client'

import { fetchCountryNames, fetchRegionNames, fetchCityNames } from '@/utils/api'
import { ICityName, ICountryName, IRegionName } from '@/utils/interfaces'
import { Stack, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from './input'
import { Select } from './select'

export function CityPicker() {
  const t = useTranslations('auth.city_picker')
  
  const [countries, setCountries] = useState<ICountryName[]>([])
  
  const [country, setCountry] = useState<ICountryName | null>(null)
  const [region, setRegion] = useState<IRegionName | null>(null)
  const [city, setCity] = useState<ICityName | null>(null)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempCountry, setTempCountry] = useState<ICountryName | null>(null)
  const [tempRegion, setTempRegion] = useState<IRegionName | null>(null)
  const [tempCity, setTempCity] = useState<ICityName | null>(null)
  const [tempRegions, setTempRegions] = useState<IRegionName[]>([])
  const [tempCities, setTempCities] = useState<ICityName[]>([])

  useEffect(() => {
    fetchCountryNames().then(countries => {
      setCountries(countries)
      if (countries.length === 1) {
        setCountry(countries[0])
      }
    })
  }, [])

  useEffect(() => {
    if (country) {
      fetchRegionNames(country.slug).then(regions => {
        if (regions.length === 1) {
          setRegion(regions[0])
        }
      })
    }
  }, [country])

  useEffect(() => {
    if (country && region) {
      fetchCityNames(country.slug, region.slug).then(cities => {
        if (cities.length === 1) {
          setCity(cities[0])
        }
      })
    }
  }, [country, region])

  // Modal-specific effects
  useEffect(() => {
    if (tempCountry) {
      fetchRegionNames(tempCountry.slug).then(regions => {
        setTempRegions(regions)
        if (regions.length === 1) {
          setTempRegion(regions[0])
        } else {
          setTempRegion(null)
        }
      })
    } else {
      setTempRegions([])
      setTempRegion(null)
    }
  }, [tempCountry])

  useEffect(() => {
    if (tempCountry && tempRegion) {
      fetchCityNames(tempCountry.slug, tempRegion.slug).then(cities => {
        setTempCities(cities)
        if (cities.length === 1) {
          setTempCity(cities[0])
        } else {
          setTempCity(null)
        }
      })
    } else {
      setTempCities([])
      setTempCity(null)
    }
  }, [tempCountry, tempRegion])

  const handleOpenModal = () => {
    setTempCountry(country)
    setTempRegion(region)
    setTempCity(city)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveModal = () => {
    setCountry(tempCountry)
    setRegion(tempRegion)
    setCity(tempCity)
    setIsModalOpen(false)
  }

  const handleCancelModal = () => {
    setTempCountry(country)
    setTempRegion(region)
    setTempCity(city)
    setIsModalOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Typography variant="body1" sx={{ flex: 1 }}>
          {t('label')}: {city?.name || t('not_selected')}
        </Typography>
        <Button 
          variant="contained" 
          size="small"
          onClick={handleOpenModal}
        >
          {t('change')}
        </Button>
      </Box>
      
      <Input hidden value={city?.id ?? ''} name='city_id' />
      
      <Dialog 
        open={isModalOpen} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('dialog_title')}</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <Select<ICountryName>
              name='temp_country'
              options={countries}
              value={tempCountry}
              setValue={setTempCountry}
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
              disabled={!tempCountry}
              name='temp_region'
              options={tempRegions}
              value={tempRegion}
              setValue={setTempRegion}
            />
            <Select<ICityName>
              disabled={!tempRegion}
              name='temp_city'
              options={tempCities}
              value={tempCity}
              setValue={setTempCity}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelModal}>{t('cancel')}</Button>
          <Button onClick={handleSaveModal} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}