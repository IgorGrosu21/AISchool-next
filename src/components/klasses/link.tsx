'use client'

import { IKlass } from "@/utils/interfaces"
import { Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import Link from "next/link"

interface KlassCircleProps {
  klass: IKlass
}

export function KlassLink({klass}: KlassCircleProps) {
  const t = useTranslations('klasses')

  return <Link href={`/core/schools/${klass.school?.id}/klasses/${klass.id}`}>
    <Stack gap={2}>
      <Typography variant='h4'>
        {klass.grade}{klass.letter}
      </Typography>
      <Typography variant='h5'>
        {t(`profiles.title`)}: {t(`profiles.${klass.profile}`)}
      </Typography>
    </Stack>
  </Link>
}