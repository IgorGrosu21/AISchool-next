'use client'

import { ISubjectName } from "@/interfaces"
import { Grid2, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { Link } from '@/i18n';
import { NotesContainer } from "../container";
import { useJournalContext } from "@/providers";
import { useStudentNotes } from "@/hooks"
import { Panel } from "@/ui";

interface StudentNoteListProps {
  subjects: ISubjectName[]
}

export function StudentNoteList({subjects}: StudentNoteListProps) {
  const t = useTranslations('journal')
  const { groups } = useJournalContext()
  const { isPending, getHref } = useStudentNotes(subjects)

  return <NotesContainer loading={isPending}>
    <Stack gap={4}>
      {groups.map((group, i) => <Panel key={i} direction='row' gap={2}>
        <Grid2 container spacing={2} sx={{flex: 1}}>
          <Grid2 size={{xs: 12, md: 2}}>
            <Typography variant='h5' color='primary'>{group.name}</Typography>
          </Grid2>
          <Grid2 size={{xs: 12, md: 10}}>
            <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center', flexWrap: 'wrap'}}>
              {group.notes.map((note, i) => <Link key={i} href={getHref(note)}>
                <Typography variant='h6'>{note.value}</Typography>
              </Link>)}
            </Stack>
          </Grid2>
          <Grid2 size={{xs: 12, md: 2}}>
            <Typography color='secondary'>{t('absences.plural')}: {group.absences.total}</Typography>
          </Grid2>
          <Grid2 size={{xs: 12, md: 10}}>
            {group.extraNotes > 0 && <Typography color='secondary'>
              {t('extra_notes')}:&nbsp;
              <Typography component='span'>{group.extraNotes}</Typography>
            </Typography>}
          </Grid2>
        </Grid2>
        <Stack direction='row' sx={{alignItems: {xs: 'flex-start', md: 'center'}}}>
          <Typography variant='h5' color='primary' sx={{textAlign: 'end'}}>
            {group.performance ? group.performance : '-'}
          </Typography>
        </Stack>
      </Panel>)}
    </Stack>
  </NotesContainer>
}