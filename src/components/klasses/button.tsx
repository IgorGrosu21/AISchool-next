'use client'

import { Button, Link, Typography } from "@mui/material"
import { useTranslations } from "next-intl"

interface KlassesButtonProps {
  schoolSlug: string
}

export function KlassesButton({schoolSlug}: KlassesButtonProps) {
  const t = useTranslations('klasses')

  return <Link href={`/core/schools/${schoolSlug}/klasses`}>
    <Button variant='contained'>
      <Typography>{t('list')}</Typography>
    </Button>
  </Link>
}