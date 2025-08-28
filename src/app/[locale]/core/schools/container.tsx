'use client'

import { Stack } from "@mui/material"
import { useMemo, useState } from "react";
import { SchoolsTable } from "./table";
import { Filters } from "./filters";
import { ISchool, IDetailedCountry } from "@/utils/interfaces";

interface ContainerProps {
  schools: ISchool[],
  country: IDetailedCountry
}

export function Container({schools, country}: ContainerProps) {
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

  const filteredSchools = useMemo(() => {
    return schools
      .filter(s => params.langs.split(',').includes(s.lang) || params.langs.length === 0)
      .filter(s => params.schoolTypes.split(',').includes(s.type) || params.schoolTypes.length === 0)
      .filter(s => s.profiles.split(',').every(p => params.schoolProfiles.split(',').includes(p)) || params.schoolProfiles.length === 0)
      .filter(s => s.startGrade <= params.startGrade)
      .filter(s => s.finalGrade >= params.finalGrade)
  }, [schools, params])

  return <Stack gap={4}>
    <Filters country={country} params={params} setParams={setParams} />
    <SchoolsTable filteredSchools={filteredSchools} />
  </Stack>
}