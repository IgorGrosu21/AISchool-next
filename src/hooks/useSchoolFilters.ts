'use client'

import { IDetailedCountry, ISchool } from "@/utils/interfaces"
import { useCallback, useEffect, useMemo, useState } from "react"

const rowsPerPage = 15

export function useSchoolFilters(schools: ISchool[], country: IDetailedCountry) {
  const [params, setParams] = useState<IDetailedCountry>({
    id: country.id,
    name: country.name,
    flag: country.flag,
    slug: country.slug,
    langs: '',
    startGrade: 1,
    finalGrade: 12,
    schoolTypes: '',
    schoolProfiles: '',
  })

  const [page, setPage] = useState(0)

  const filteredSchools = useMemo(() => {
    return schools
      .filter(s => params.langs.split(',').includes(s.lang) || params.langs.length === 0)
      .filter(s => params.schoolTypes.split(',').includes(s.type) || params.schoolTypes.length === 0)
      .filter(s => s.profiles.split(',').every(p => params.schoolProfiles.split(',').includes(p)) || params.schoolProfiles.length === 0)
      .filter(s => s.startGrade <= params.startGrade)
      .filter(s => s.finalGrade >= params.finalGrade)
  }, [schools, params])

  const structuredParams = useMemo(() => [
    { size: 4, name: 'langs', list: params.langs, schoolList: country.langs.split(',') },
    { size: 8, name: 'profiles', list: params.schoolProfiles, schoolList: country.schoolProfiles.split(',') },
    { size: 8, name: 'types', list: params.schoolTypes, schoolList: country.schoolTypes.split(',') },
  ], [params, country])

  const paginatedSchools = useMemo(() => {
    if (filteredSchools.length <= page + rowsPerPage) {
      return filteredSchools.slice(page)
    }
    return filteredSchools.slice(page, page + rowsPerPage + 1)
  }, [filteredSchools, page])


  const currentRows = useMemo(() => {
    return `${page + 1} - ${page + rowsPerPage > filteredSchools.length ? filteredSchools.length : page + rowsPerPage}`
  }, [filteredSchools.length, page])

  useEffect(() => {
    setPage(0)
  }, [filteredSchools.length, setPage])
  
  const toggleValue = useCallback((arr: string[], value: string) => {
    if (arr.length === 1 && arr[0] === '') {
      return [value]
    }
    return arr.includes(value) ? arr.filter(v => v != value) : [...arr, value]
  }, [])

  const handleChange = useCallback((group: string, value: string) => {
    switch (group) {
      case 'langs': return setParams(p => ({...p, langs: toggleValue(p.langs.split(','), value).join(',')}));
      case 'types': return setParams(p => ({...p, schoolTypes: toggleValue(p.schoolTypes.split(','), value).join(',')}));
      case 'profiles': return setParams(p => ({...p, schoolProfiles: toggleValue(p.schoolProfiles.split(','), value).join(',')}));
    }
  }, [setParams, toggleValue])

  const prevPage = useCallback(() => {
    if (page >= rowsPerPage) {
      setPage(page - rowsPerPage)
    } else {
      setPage(0)
    }
  }, [page, setPage])

  const nextPage = useCallback(() => {
    if (page + rowsPerPage <= filteredSchools.length) {
      setPage(page + rowsPerPage)
    }
  }, [filteredSchools.length, page, setPage])

  return {
    params, setParams, structuredParams, handleChange,
    filteredSchools, paginatedSchools,
    currentRows, prevPage, nextPage
  }
}