'use client'

import { ISchoolName } from "@/interfaces";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';

interface SchoolLinkProps {
  school: ISchoolName
}

export function SchoolLink({school}: SchoolLinkProps) {
  const t = useTranslations('schools')
  
  return <Stack direction={{xs: 'column', md: 'row'}} gap={1}>
    <Typography variant='h6' sx={{textAlign: 'center'}}>{t('singular')}:</Typography>
    <Link href={`/core/schools/${school.slug}`}>
      <Typography variant='h6' color='primary' sx={{textAlign: 'center'}}>{school.name}</Typography>
    </Link>
  </Stack>
}