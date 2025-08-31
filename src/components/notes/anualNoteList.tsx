'use client'

import { Stack, Grid2, Typography } from "@mui/material"
import { Group } from "@/providers/journal/context"
import { useTranslations } from "next-intl"
import { useIsMobile } from "@/hooks"

interface AnnualNoteListProps {
  groups: Array<Omit<Group, 'notes' | 'extraNotes'> & {notes: string[]}>
}

export function AnnualNoteList({groups}: AnnualNoteListProps) {
  const t = useTranslations('journal')
  const isMobile = useIsMobile()

  return <Stack gap={4}>
    {groups.map((group, i) => <Stack key={i} direction='row' gap={2} sx={{
      bgcolor: 'background.default',
      p: 2,
      borderRadius: 2
    }}>
      <Grid2 container spacing={2} sx={{flex: 1}}>
        <Grid2 size={isMobile ? 12 : 2}>
          <Typography variant='h5' color='primary'>{group.name}</Typography>
        </Grid2>
        <Grid2 size={isMobile ? 12 : 8}>
          <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', flexWrap: 'wrap'}}>
            {group.notes.map((note, i) => <Typography key={i} variant='h5' color='primary' sx={{flex: 1, textAlign: 'center'}}>
              {note}
            </Typography>)}
            <Typography variant='h5' color='primary' sx={{flex: 1, textAlign: 'center'}}>
              {group.performance}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={isMobile ? 12 : 2}>
          <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography color='secondary' variant='h6'>{t('absences.plural')}: {group.absences.total}</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>)}
  </Stack>
}