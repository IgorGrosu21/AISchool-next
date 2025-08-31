'use client'

import { ISchoolName } from "@/utils/interfaces";
import { Stack, StackProps, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SchoolLinkProps extends StackProps {
  school: ISchoolName
}

export function SchoolLink({school, ...props}: SchoolLinkProps) {
  const t = useTranslations('schools')
  
  return <Stack {...props} direction={props.direction ?? {xs: 'column', md: 'row'}} gap={props.gap ?? 1}>
    <Typography variant='h6' sx={{textAlign: 'center'}}>{t('singular')}:</Typography>
    <Link href={`/core/schools/${school.slug}`}>
      <Typography variant='h6' color='primary' sx={{textAlign: 'center'}}>{school.name}</Typography>
    </Link>
  </Stack>
}