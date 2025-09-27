'use client'

import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Download } from "@mui/icons-material";
import { IDetailedMedia } from "@/interfaces";
import { Link } from '@/i18n';
import { Panel } from "@/ui";

interface AttachedFilesProps {
  files?: IDetailedMedia[]
}

export function AttachedFiles({files}: AttachedFilesProps) {
  const t = useTranslations('timetable.specific_lessons')
  
  return <Panel gap={2} sx={{height: '100%'}}>
    <Typography variant='h5'>{t('files.plural')}:</Typography>
    {files && <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
      {files.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
        <Typography>{file.file.split('/').at(-1)}</Typography>
        <Link style={{display: 'flex', alignItems: 'center'}} href={file.file} target='_blank'>
          <Download />
        </Link>
      </Button>)}
    </Stack>}
  </Panel>
}