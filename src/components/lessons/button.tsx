'use server'

import { Button, Link, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

interface TimetableButtonProps {
  schoolId: string
}

export async function TimetableButton({schoolId}: TimetableButtonProps) {
  const t = await getTranslations('timetable')

  return <Link href={`/core/schools/${schoolId}/timetable`}>
    <Button variant='contained'>
      <Typography>{t('singular')}</Typography>
    </Button>
  </Link>
}