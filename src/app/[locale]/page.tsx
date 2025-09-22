'use server'

import { Hero, Pluses, CTA } from '@/ui'
import { Stack } from '@mui/material'

export default async function Page() {
  return <Stack>
    <Hero />
    <Pluses />
    <CTA />
  </Stack>
}