'use client'

import { Typography } from "@mui/material"
import { useTranslations } from "next-intl"

export function GroupsDiscount() {
  const t = useTranslations('subscriptions.pluses.group_details')

  return <Typography variant='h6' color='primary'>
    {t('discount')}
  </Typography>
}