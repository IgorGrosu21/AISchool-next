'use server'

import { Welcome, Pluses } from '@/components'
import { Stack } from '@mui/material'

export default async function Page() {
  return <Stack>
    <Welcome type='hero' />
    <Pluses />
    <Welcome type='cta' />
  </Stack>
}