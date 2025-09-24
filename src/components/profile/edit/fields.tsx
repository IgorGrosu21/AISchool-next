'use client'

import { Stack, Typography, TextField } from "@mui/material";
import { IDetailedUser } from "@/interfaces";
import { useTranslations } from "next-intl";
import { ClientPanel } from "@/components";

interface FieldsProps {
  user: IDetailedUser,
  setUser: (user: IDetailedUser) => void
}

export function Fields({user, setUser}: FieldsProps) {
  const t = useTranslations('profile')

  return <ClientPanel gap={4} sx={{justifyContent: 'center'}}>
    <Stack gap={2} sx={{alignItems: 'flex-start'}}>
      <Typography>{t('name')}:</Typography>
      <TextField
        placeholder={t('name')}
        value={user.name}
        onChange={e => setUser({...user, name: e.target.value})}
        sx={{width: {xs: '100%', md: 'auto'}}}
      />
    </Stack>
    <Stack gap={2} sx={{alignItems: 'flex-start'}}>
      <Typography>{t('surname')}:</Typography>
      <TextField
        placeholder={t('surname')}
        value={user.surname}
        onChange={e => setUser({...user, surname: e.target.value})}
        sx={{width: {xs: '100%', md: 'auto'}}}
      />
    </Stack>
  </ClientPanel>
}