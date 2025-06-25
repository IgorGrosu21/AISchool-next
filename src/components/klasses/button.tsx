'use client'

import { Button, Link, Typography } from "@mui/material"
import { useTranslations } from "next-intl"

interface KlassesButtonProps {
  schoolId: string
}

export function KlassesButton({schoolId}: KlassesButtonProps) {
  const t = useTranslations('klasses')

  return <Link href={`/core/schools/${schoolId}/klasses`}>
    <Button variant='contained'>
      <Typography>{t('list')}</Typography>
    </Button>
  </Link>
}