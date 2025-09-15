'use client'

import { Backdrop, Stack, Button, TextField, Link, Box } from "@mui/material"
import { useTranslations } from "next-intl"
import { INoteName } from "@/utils/interfaces"
import { useNotePicker } from "@/hooks"
import { Note } from "./item"
import { ClientPanel } from "@/components/panel"

interface NotePickerProps<T> {
  notesOpened: boolean
  closeNotes: () => void
  activeNote: T | undefined
  updateNote: (note: T | undefined) => void
  hasNotes?: boolean
  link?: string
}

const abscences = ['ma', 'ua', 'da']
const notes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const descriptors = ['VG', 'G', 'S', 'N']

type Note = Omit<INoteName, 'specificLesson' | 'student'>

export function NotePicker<T extends Note>({notesOpened, closeNotes, activeNote, updateNote, hasNotes, link}: NotePickerProps<T>) {
  const {newNote, discard, save, updateNoteValue, updateNoteComment} = useNotePicker(activeNote, updateNote, closeNotes)
  const t = useTranslations('timetable.specific_lessons.notes')

  return <Backdrop sx={{ zIndex: 1300 }} open={notesOpened}>
    <Stack gap={2}>
      <ClientPanel direction='row' sx={{flexWrap: 'wrap', justifyContent: 'space-between'}} gap={2}>
        {hasNotes ? notes.map(note => <Note
          key={note}
          value={note}
          variant={newNote?.value === note ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(note)}
        />) : descriptors.map(descriptor => <Note
          key={descriptor}
          value={t(descriptor)}
          variant={newNote?.value === descriptor ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(descriptor)}
          sx={{p: 2, flex: 1, aspectRatio: 'unset'}}
          typographyVariant='body1'
        />)}
      </ClientPanel>
      <ClientPanel direction={{xs: 'column', md: 'row'}} gap={2}>
        {abscences.map(abscence => <Note
          key={abscence}
          value={t(abscence)}
          variant={newNote?.value === abscence ? 'contained' : 'outlined'}
          onClick={() => updateNoteValue(abscence)}
          sx={{p: 2, flex: 1, aspectRatio: 'unset'}}
          typographyVariant='body1'
        />)}
      </ClientPanel>
      <ClientPanel>
        <TextField
          label={t('comment')}
          value={newNote?.comment ?? ''}
          onChange={e => updateNoteComment(e.target.value)}
        />
      </ClientPanel>
      <ClientPanel direction={{xs: 'column', md: 'row'}} gap={2}>
        <Button variant='outlined' onClick={closeNotes}>{t('close')}</Button>
        {link && <Link href={link}>
          <Button variant='outlined'>{t('open_lesson')}</Button>
        </Link>}
        <Box sx={{flex: 1}} />
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </ClientPanel>
    </Stack>
  </Backdrop>
}