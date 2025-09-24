'use client'

import { ISchoolName } from "@/interfaces"
import { Typography, Autocomplete, TextField } from "@mui/material"
import { useTranslations } from "next-intl"
import { ClientPanel } from "@/components"

interface PickSchoolsProps {
  value: ISchoolName[]
  setValue: (value: ISchoolName[]) => void,
  options: ISchoolName[]
}

export function PickSchools({value, setValue, options}: PickSchoolsProps) {
  const t = useTranslations('schools')

  return <ClientPanel gap={2}>
    <Typography variant='h5'>{t('pick_many')}</Typography>
    <Autocomplete
      multiple
      options={options}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, v: ISchoolName[]) => setValue(v)}
      getOptionLabel={(option) => `${option.name}`}
      renderInput={(params) => <TextField {...params} label={t('singular')} />}
    />
  </ClientPanel>
}