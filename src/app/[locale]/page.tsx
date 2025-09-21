'use server'

import { Hero, Pluses, CTA } from '@/components'
import { Stack } from '@mui/material'

export default async function Page() {
  return <Stack>
    <Hero />
    <Pluses />
    <CTA />
  </Stack>
}