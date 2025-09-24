'use server'

import { Greetings, Sections } from '@/components'
import { errorHandler, fetchPersonHome } from '@/requests'
import { Stack } from '@mui/material'

export default async function Page() {

  const [personHomeRaw, status] = await fetchPersonHome()
  const personHome = await errorHandler(personHomeRaw, status)

  return <Stack>
    <Greetings profileType={personHome.profileType} user={personHome.user} />
    <Sections personHome={personHome} />
  </Stack>
}