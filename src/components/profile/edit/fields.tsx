'use client'

import { Stack, Typography, TextField } from "@mui/material";
import { IDetailedUser } from "@/utils/interfaces";
import { useTranslations } from "next-intl";

interface FieldsProps {
  user: IDetailedUser,
  setUser: (user: IDetailedUser) => void
}

export function Fields({user, setUser}: FieldsProps) {
  const t = useTranslations('profile')

  return <Stack gap={4} sx={{justifyContent: 'center', flex: 1}}>
    <Stack gap={2} sx={{alignItems: 'flex-start'}}>
      <Typography>{t('name')}:</Typography>
      <TextField placeholder='Имя' value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
    </Stack>
    <Stack gap={2} sx={{alignItems: 'flex-start'}}>
      <Typography>{t('surname')}:</Typography>
      <TextField placeholder='Фамилия' value={user.surname} onChange={e => setUser({...user, surname: e.target.value})} />
    </Stack>
  </Stack>
}