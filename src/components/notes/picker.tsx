'use client'

import { Backdrop, Stack, Button, Typography, TextField, Link } from "@mui/material"
import { useTranslations } from "next-intl"
import { INoteName } from "@/utils/interfaces"
import { useCallback, useEffect, useState } from "react"

interface NotePickerProps<T> {
  notesOpened: boolean
  openNotes: (open: boolean) => void
  activeNote: T | undefined
  updateNote: (note: T | undefined) => void
  hasNotes?: boolean
  link?: string
}

const abscences = ['ma', 'ua', 'da']
const notes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const descriptors = ['VG', 'G', 'S', 'N']

type Note = Omit<INoteName, 'specificLesson' | 'student'>

export function NotePicker<T extends Note>({notesOpened, openNotes, activeNote, updateNote, hasNotes, link}: NotePickerProps<T>) {
  const [newNote, setNewNote] = useState<T | undefined>(activeNote)
  const t = useTranslations('timetable.specific_lessons.notes')
  
  useEffect(() => {
    setNewNote(activeNote)
  }, [activeNote])

  const discard = useCallback(() => {
    setNewNote(activeNote)
  }, [activeNote])

  const save = useCallback(() => {
    updateNote(newNote)
    openNotes(false)
  }, [newNote, updateNote, openNotes])

  const updateNoteValue = useCallback((value: string) => {
    setNewNote(n => n ? {...n, value} : undefined)
  }, [])

  const updateNoteComment = useCallback((comment: string) => {
    setNewNote(n => n ? {...n, comment} : undefined)
  }, [])

  return <Backdrop sx={{ zIndex: 1300 }} open={notesOpened}>
    <Stack gap={2} sx={{bgcolor: 'background.default', p: 4, mx: 4}}>
      <Stack direction='row' sx={{flexWrap: 'wrap', justifyContent: 'center'}} gap={2}>
        {hasNotes ? notes.map(note => <Button
          key={note}
          variant={newNote?.value === note ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(note)}
          sx={{width: 67.5, aspectRatio: 1}}>
          <Typography variant='h6'>{note}</Typography>
        </Button>) : descriptors.map(descriptor => <Button
          key={descriptor}
          variant={newNote?.value === descriptor ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(descriptor)}
          sx={{flex: 1, height: 67.5}}>
          <Typography variant='h6'>{t(descriptor)}</Typography>
        </Button>)}
      </Stack>
      <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
        {abscences.map(abscence => <Button
          key={abscence}
          variant={newNote?.value === abscence ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(abscence)}
          sx={{flex: 1, height: 67.5}}>
          <Typography>{t(abscence)}</Typography>
        </Button>)}
      </Stack>
      <TextField
        label={t('comment')}
        value={newNote?.comment ?? ''}
        onChange={e => updateNoteComment(e.target.value)}
        sx={{height: 67.5}}
      />
      <Stack direction={{xs: 'column', md: 'row'}} gap={2}>
        <Button variant='outlined' onClick={() => openNotes(false)}>{t('close')}</Button>
        {link && <Link href={link}>
          <Button variant='outlined'>{t('open_lesson')}</Button>
        </Link>}
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Stack>
    </Stack>
  </Backdrop>
}