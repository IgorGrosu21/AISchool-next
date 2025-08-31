'use client'

import { KlassesRange } from "@/components";
import { IDetailedCountry } from "@/utils/interfaces";
import { Grid2, Stack, Typography, Checkbox } from "@mui/material";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useIsMobile } from "@/hooks";

interface FiltersProps {
  country: IDetailedCountry,
  params: IDetailedCountry,
  setParams: Dispatch<SetStateAction<IDetailedCountry>>
}

export function Filters({country, params, setParams}: FiltersProps) {
  const t = useTranslations('schools.filters');
  const isMobile = useIsMobile();
  
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

  const structuredParams = useMemo(() => [
    { size: 4, name: 'langs', list: params.langs, schoolList: country.langs.split(',') },
    { size: 8, name: 'profiles', list: params.schoolProfiles, schoolList: country.schoolProfiles.split(',') },
    { size: 8, name: 'types', list: params.schoolTypes, schoolList: country.schoolTypes.split(',') },
  ], [params, country])

  return <Stack gap={4}>
    <Grid2 container spacing={2}>
      {structuredParams.map((param, i) => <Grid2 key={i} size={isMobile ? 12 : param.size}>
        <Stack gap={2}>
          <Typography variant='h6'>{t(`${param.name}.title`)}:</Typography>
          <Stack direction='row' gap={4} sx={{flexWrap: 'wrap'}}>
            {param.schoolList.map((val, k) => <Stack key={k} direction='row' sx={{alignItems: 'center'}} gap={2}>
              <Checkbox checked={param.list.includes(val)} onChange={() => handleChange(param.name, val)} sx={{p: 0}} />
              <Typography>{param.name === 'langs' ? val : t(`${param.name}.${val}`)}</Typography>
            </Stack>)}
          </Stack>
        </Stack>
      </Grid2>)}
      <Grid2 size={isMobile ? 12 : 4}>
        <KlassesRange
          startGrade={params.startGrade}
          finalGrade={params.finalGrade}
          setGrades={(g1, g2) => setParams(p => ({...p, startGrade: g1, finalGrade: g2}))}
        />
      </Grid2>
    </Grid2>
  </Stack>
}