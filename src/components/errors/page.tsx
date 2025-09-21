'use server'

import { Stack, Typography } from "@mui/material"
import { ErrorButtons } from "./buttons"
import { getTranslations } from "next-intl/server"


interface ErrorPageProps {
  code: number
}

export async function ErrorPage({code}: ErrorPageProps) {
  const t = await getTranslations(`errors`)

  return <Stack gap={4} sx={{
    minHeight: '90vh',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    py: 8,
    px: 2,
  }}>
    <Typography variant="h1" sx={{
      fontSize: { xs: '8rem', md: '12rem' },
      fontWeight: 700,
      color: 'primary.main',
      lineHeight: 1,
      background: `
        linear-gradient(135deg, 
          rgba(20, 111, 194, 0.8) 0%, 
          rgba(0, 135, 126, 0.6) 50%, 
          rgba(104, 20, 194, 0.4) 100%
        )
      `,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}>
      {code}
    </Typography>
    <Typography variant="h4" sx={{fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' }}}>
      {t(`${code}.title`)}
    </Typography>
    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: '500px', fontSize: { xs: '1rem', md: '1.125rem' }}}>
      {t(`${code}.desc`)}
    </Typography>
    <ErrorButtons />
  </Stack>
}