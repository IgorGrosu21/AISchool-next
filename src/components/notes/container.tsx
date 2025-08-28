'use client'

import { Stack, Typography, Box, Button, CircularProgress } from "@mui/material"
import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { useJournalContext } from "@/providers"
import { AnnualNoteList } from "./anualNoteList"

interface NotesContainerProps {
  children: React.ReactNode | React.ReactNode[]
  loading: boolean
}

type Semester = 'frst' | 'scnd' | 'annual'
type Absences = {
  ma: number
  ua: number
  da: number
  total: number
}

const semesters: Array<Semester> = ['frst', 'scnd', 'annual']
const allAbsences: Array<keyof Absences> = ['ma', 'ua', 'da']

export function NotesContainer({children, loading}: NotesContainerProps) {
  const t = useTranslations('journal')
  const {semester, period, setSemester, groups} = useJournalContext()

  // Determine if today is in the first semester (September 1st to December 31st)
  const isFirstSemester = useMemo(() => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1 // getMonth() returns 0-11, so add 1
    return currentMonth >= 9 && currentMonth <= 12
  }, [])

  const annualGroups = useMemo(() => {
    if (semester !== 'annual') {
      return undefined
    }
    return groups.map(group => {
      let [frstSum, frstCount, scndSum, scndCount] = [0, 0, 0, 0]
      const firstSemesterEnd = new Date(`${period.split('-')[0].split('.')[0]}.12.31`)
      let isInFirstSemester = true
      group.notes.forEach(note => {
        const date = new Date(note.specificLesson.date)
        if (date > firstSemesterEnd) {
          isInFirstSemester = false
        }
        if (isInFirstSemester) {
          if (note.value !== '' && !note.value.includes('a')) {
            frstSum += parseInt(note.value)
            frstCount++
          }
        } else { 
          if (note.value !== '' && !note.value.includes('a')) {
            scndSum += parseInt(note.value)
            scndCount++
          }
        }
      })
      const frstPerformance = frstCount > 0 ? Math.round(frstSum / frstCount) : 0
      const scndPerformance = scndCount > 0 ? Math.round(scndSum / scndCount) : 0
      const annualPerformance = Math.round((frstPerformance + scndPerformance) / 2).toFixed(2)
      return {
        id: group.id,
        name: group.name,
        notes: [frstPerformance === 0 ? '-' : frstPerformance.toFixed(2), scndPerformance === 0 ? '-' : scndPerformance.toFixed(2)],
        performance: annualPerformance,
        absences: group.absences,
      }
    })
  }, [groups, period, semester])

  const absences = useMemo(() => {
    const groups1 = annualGroups ?? groups
    return allAbsences.map(absence => ({
      name: absence,
      value: groups1.reduce((acc, group) => acc + group.absences[absence], 0)
    }))
  }, [annualGroups, groups])

  const performance = useMemo(() => {
    let [sum, count] = [0, 0]
    const groups1 = annualGroups ?? groups
    groups1.forEach(group => {
      if (group.performance !== '-') {
        sum += parseFloat(group.performance)
        count++
      }
    })
    return count > 0 ? (Math.round((sum / count) * 100) / 100).toFixed(2) : '-'
  }, [annualGroups, groups])

  return <Stack gap={2}>
    <Stack direction='row' gap={2}>
      <Typography variant='h4' color='primary'>{t('performance')}: {performance}</Typography>
      <Box sx={{flex: 1}} />
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
    <Box sx={{position: 'relative'}}>
      <Stack gap={8} sx={{opacity: loading ? 0.2 : 1, transition: '0.35s'}}>
        {semester === 'annual' ? <AnnualNoteList groups={annualGroups!} /> : children}
        <Stack direction='row' gap={4}>
          {absences.map((absence, i) => <Stack key={i} direction='row' gap={2} sx={{
            flex: 1,
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 2,
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' color='primary'>{t(`absences.${absence.name}`)}:</Typography>
            <Typography variant='h6' color='secondary'>{absence.value}</Typography>
          </Stack>)}
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