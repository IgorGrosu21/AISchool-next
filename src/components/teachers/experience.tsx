'use server'

import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

interface ExperienceProps {
  experience: number
}

export async function Experience({experience}: ExperienceProps) {
  const t = await getTranslations('teachers')

  return <Typography variant='h6'>{t('experience', {years: experience})}</Typography>
}