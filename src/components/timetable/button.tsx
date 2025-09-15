'use server'

import { Button, Link, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

interface TimetableButtonProps {
  schoolSlug: string
}

export async function TimetableButton({schoolSlug}: TimetableButtonProps) {
  const t = await getTranslations('timetable')

  return <Link href={`/core/schools/${schoolSlug}/timetable`}>
    <Button variant='contained'>
      <Typography>{t('singular')}</Typography>
    </Button>
  </Link>
}