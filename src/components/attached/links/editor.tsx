'use client'

import { Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Add, Close } from "@mui/icons-material";
import { useAttachedLinksContext } from "@/providers";
import { Panel } from "@/ui";

interface AttachedLinksEditorProps {
  links?: string
  small?: boolean
}

export function AttachedLinksEditor({links, small = true}: AttachedLinksEditorProps) {
  const { openLinks, editLink, deleteLink } = useAttachedLinksContext()
  const t = useTranslations('timetable.specific_lessons')
  
  return <Panel gap={2} sx={{height: '100%'}}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant={small ? 'h6' : 'h5'}>{t('links.plural')}:</Typography>
      <Add onClick={openLinks} color='primary' />
    </Stack>
    {links && links.split('|').map((link, i) => <Stack key={i} direction='row' sx={{alignItems: 'center'}} gap={2}>
      <TextField sx={{flex: 1}} label={t('links.singular')} value={link} onChange={e => editLink(e.target.value, i)} />
      <Close onClick={() => deleteLink(i)} color='primary' />
    </Stack>)}
  </Panel>
}