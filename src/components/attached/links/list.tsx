'use client'

import { ClientPanel } from "@/components";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';

interface AttachedLinksProps {
  links?: string
}

export function AttachedLinks({links}: AttachedLinksProps) {
  const t = useTranslations('timetable.specific_lessons')
  
  return <ClientPanel gap={2}>
    <Typography variant='h5'>{t('links.plural')}:</Typography>
    {links && <Stack>
      {links.split('|').map((link, i) => <Stack key={i} direction='row' gap={4} sx={{alignItems: 'center'}}>
        <Link href={link} style={{flex: 1}}>
          <Typography color='primary' variant='h6' sx={{wordBreak: 'break-word'}}>{link}</Typography>
        </Link>
      </Stack>)}
    </Stack>}
  </ClientPanel>
}