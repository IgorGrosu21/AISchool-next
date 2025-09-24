'use client'

import { ISchoolName } from "@/interfaces"
import { Stack, Typography, Autocomplete, TextField } from "@mui/material"
import { useTranslations } from "next-intl"

interface PickSchoolProps {
  value: ISchoolName | null
  setValue: (value: ISchoolName) => void,
  options: ISchoolName[]
}

export function PickSchool({value, setValue, options}: PickSchoolProps) {
  const t = useTranslations('schools')

  return <Stack gap={2}>
    <Typography variant='h5'>{t('pick_one')}</Typography>
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      value={value}
      onChange={(_, v: ISchoolName | null) => (v ? setValue(v) : undefined)}
      getOptionLabel={(option) => `${option.name} (${option.city.name})`}
      renderInput={(params) => <TextField {...params} label={t('singular')} />}
    />
  </Stack>
}