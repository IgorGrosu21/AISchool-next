'use client'

import { fetchCountryNames, fetchRegionNames, fetchCityNames } from '@/utils/api'
import { ICityName, ICountryName, IRegionName } from '@/utils/interfaces'
import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n'

export function useCityPicker() {
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

  const router = useRouter()

  useEffect(() => {
    fetchCountryNames().then(([countries, status]) => {
      if (countries) {
        setCountries(countries)
        if (countries.length === 1) {
          setCountry(countries[0])
        }
        return
      }
      switch (status) {
        case 404:
          router.push('/not-found')
          return
        default:
          router.push('/error')
          return
      }
    })
  }, [router])

  useEffect(() => {
    if (country) {
      fetchRegionNames(country.slug).then(([regions, status]) => {
        if (regions) {
          if (regions.length === 1) {
            setRegion(regions[0])
          }
          return
        }
        switch (status) {
          case 404:
            router.push('/not-found')
            return
          default:
            router.push('/error')
            return
        }
      })
    }
  }, [country, router])

  useEffect(() => {
    if (country && region) {
      fetchCityNames(country.slug, region.slug).then(([cities, status]) => {
        if (cities) {
          if (cities.length === 1) {
            setCity(cities[0])
          }
          return
        }
        switch (status) {
          case 404:
            router.push('/not-found')
            return
          default:
            router.push('/error')
            return
        }
      })
    }
  }, [country, region, router])

  // Modal-specific effects
  useEffect(() => {
    if (tempCountry) {
      fetchRegionNames(tempCountry.slug).then(([regions, status]) => {
        if (regions) {
          setTempRegions(regions)
          if (regions.length === 1) {
            setTempRegion(regions[0])
          } else {
            setTempRegion(null)
          }
        }
        switch (status) {
          case 404:
            router.push('/not-found')
            return
          default:
            router.push('/error')
            return
        }
      })
    } else {
      setTempRegions([])
      setTempRegion(null)
    }
  }, [router, tempCountry])

  useEffect(() => {
    if (tempCountry && tempRegion) {
      fetchCityNames(tempCountry.slug, tempRegion.slug).then(([cities, status]) => {
        if (cities) {
          setTempCities(cities)
          if (cities.length === 1) {
            setTempCity(cities[0])
          } else {
            setTempCity(null)
          }
        }
        switch (status) {
          case 404:
            router.push('/not-found')
            return
          default:
            router.push('/error')
            return
        }
      })
    } else {
      setTempCities([])
      setTempCity(null)
    }
  }, [router, tempCountry, tempRegion])

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

  return {
    countries, city,
    isModalOpen,
    tempCountry, tempRegions, tempRegion, tempCities, tempCity,
    setTempCountry, setTempRegion, setTempCity,
    handleOpenModal, handleCloseModal, handleSaveModal, handleCancelModal
  }
}