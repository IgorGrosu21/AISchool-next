'use client'

import { INote, ISubjectName } from "@/utils/interfaces"
import { Grid2, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useTransition } from "react"
import Link from "next/link";
import { fetchStudentNotes } from "@/utils/api";
import { NotesContainer } from "./container";
import { useJournalContext } from "@/providers";

interface StudentNoteListProps {
  subjects: ISubjectName[]
}

export function StudentNoteList({subjects}: StudentNoteListProps) {
  const {personId, period, groups, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('journal')

  useEffect(() => {
    startTransition(async () => {
      const notes = await fetchStudentNotes(personId, period)
      const groups = subjects.map(subject => {
        return {
          id: subject.id,
          name: subject.verboseName,
          notes: notes.filter(note => note.specificLesson.lesson.subject.id === subject.id)
        }
      })
      updateGroups(groups)
    })
  }, [period, subjects, updateGroups, personId])

  const getHref = useCallback((note: INote) => {
    const studentId = note.student.id
    const specificLesson = note.specificLesson
    const lesson = specificLesson.lesson
    const klassSlug = lesson.klassSlug
    const schoolSlug = lesson.klass.school.slug

    return `/core/homeworks/${schoolSlug}/${klassSlug}/${studentId}/${lesson.id}/${specificLesson.id}`
  }, [])

  return <NotesContainer loading={isPending}>
    <Stack gap={4}>
      {groups.map((group, i) => <Stack key={i} direction='row' gap={2} sx={{
        bgcolor: 'background.default',
        p: 2,
        borderRadius: 2
      }}>
        <Grid2 container spacing={2} sx={{flex: 1}}>
          <Grid2 size={2}>
            <Typography variant='h5' color='primary'>{group.name}</Typography>
          </Grid2>
          <Grid2 size={10}>
            <Stack direction='row' gap={2} sx={{height: '100%', alignItems: 'center'}}>
              {group.notes.map((note, i) => <Link key={i} href={getHref(note)}>
                <Typography variant='h6'>{note.value}</Typography>
              </Link>)}
            </Stack>
          </Grid2>
          <Grid2 size={2}>
            <Typography color='secondary'>{t('absences.plural')}: {group.absences.total}</Typography>
          </Grid2>
          <Grid2 size={10}>
            {group.extraNotes > 0 && <Typography color='secondary'>
              {t('extra_notes')}:&nbsp;
              <Typography component='span'>{'10 '.repeat(group.extraNotes)}</Typography>
            </Typography>}
          </Grid2>
        </Grid2>
        <Stack direction='row' sx={{alignItems: 'center'}}>
          <Typography variant='h5' color='primary' sx={{textAlign: 'end'}}>
            {group.performance ? group.performance : '-'}
          </Typography>
        </Stack>
      </Stack>)}
    </Stack>
  </NotesContainer>
}