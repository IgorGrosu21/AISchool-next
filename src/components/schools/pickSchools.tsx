'use client'

import { ISchoolName } from "@/utils/interfaces"
import { Stack, Typography, Autocomplete, TextField } from "@mui/material"
import { useTranslations } from "next-intl"

interface PickSchoolsProps {
  value: ISchoolName[]
  setValue: (value: ISchoolName[]) => void,
  options: ISchoolName[]
}

export function PickSchools({value, setValue, options}: PickSchoolsProps) {
  const t = useTranslations('schools')

  return <Stack gap={2}>
    <Typography variant='h5'>{t('pick_many')}</Typography>
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={(_, v: ISchoolName[]) => setValue(v)}
      getOptionLabel={(option) => `${option.name} (${option.city.name})`}
      renderInput={(params) => <TextField {...params} label={t('singular')} />}
    />
  </Stack>
}