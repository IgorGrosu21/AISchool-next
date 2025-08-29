'use client'

import { Button, Stack } from "@mui/material"
import { useTranslations } from "next-intl"
import { useSubscriptionsContext } from "@/providers"
import { useCallback } from "react"

export function ShowTeacherPrices() {
  const { setType } = useSubscriptionsContext()
  const t = useTranslations('subscriptions.pluses.group_details')

  const showPricesForTeacher = useCallback(() => {
    document.getElementById('main')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setType('group')
  }, [setType])

  return <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'flex-end'}}>
    <Button variant='contained' onClick={showPricesForTeacher}>{t('view_price')}</Button>
  </Stack>
}
