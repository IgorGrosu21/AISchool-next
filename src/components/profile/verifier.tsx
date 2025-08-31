'use client'

import { IUser } from "@/utils/interfaces"
import { Stack, Typography, Checkbox } from "@mui/material"
import { useTranslations } from "next-intl"

interface UserVerifierProps {
  user: IUser,
  setUser: (user: IUser) => void
}

export function UserVerifier({user, setUser}: UserVerifierProps) {
  const t = useTranslations('profile')

  return <Stack direction={{xs: 'column', md: 'row'}} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
    <Typography variant='h6'>{t('is_verified')}</Typography>
    <Checkbox checked={user.isVerified} onChange={() => setUser({...user, isVerified: !user.isVerified})} />
  </Stack>
}