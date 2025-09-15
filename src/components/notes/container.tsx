'use client'

import { Stack, Typography, Box, Button, CircularProgress } from "@mui/material"
import { useTranslations } from "next-intl"
import { useJournalContext } from "@/providers"
import { AnnualNoteList } from "./list"
import { useGroupedNotes } from "@/hooks"
import { ClientPanel } from "../panel"

interface NotesContainerProps {
  children: React.ReactNode | React.ReactNode[]
  loading: boolean
}

const semesters: Array<'frst' | 'scnd' | 'annual'> = ['frst', 'scnd', 'annual']

export function NotesContainer({children, loading}: NotesContainerProps) {
  const t = useTranslations('journal')
  const {semester, setSemester} = useJournalContext()
  const {performance, absences, annualGroups, isFirstSemester} = useGroupedNotes()

  return <Stack gap={2}>
    <Stack direction={{xs: 'column-reverse', md: 'row'}} gap={2}>
      <Typography variant='h4' color='primary'>{t('performance')}: {performance}</Typography>
      <Box sx={{flex: 1}} />
      <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
        {semesters.map((s, i) => <Button
          key={i}
          variant={semester === s ? 'contained' : 'outlined'}
          color='primary'
          onClick={() => setSemester(s)}
          disabled={s === 'scnd' && isFirstSemester}
        >
          {t(`periods.${s}`)}
        </Button>)}
      </Stack>
    </Stack>
    <Box sx={{position: 'relative'}}>
      <Stack gap={8} sx={{opacity: loading ? 0.2 : 1, transition: '0.35s'}}>
        {semester === 'annual' ? <AnnualNoteList groups={annualGroups!} /> : children}
        <Stack direction={{xs: 'column', md: 'row'}} gap={4}>
          {absences.map((absence, i) => <ClientPanel key={i} direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
            <Typography variant='h6' color='primary'>{t(`absences.${absence.name}`)}:</Typography>
            <Typography variant='h6' color='secondary'>{absence.value}</Typography>
          </ClientPanel>)}
        </Stack>
      </Stack>
      <Stack direction='row' sx={{
        zIndex: loading ? 1000 : -1,
        position: 'absolute',
        top: 0,
        width: '100%',
        pt: 8,
        justifyContent: 'center',
        opacity: loading ? 1 : 0,
        transition: '0.35s'
      }}>
        {loading && <CircularProgress size='30vh' />}
      </Stack>
    </Box>
  </Stack>
}