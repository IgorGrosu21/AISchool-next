'use client'

import { SmallProfile, SpecificLessonNote } from "@/components"
import { IDetailedSpecificLesson, INote, IStudent } from "@/utils/interfaces"
import { Close, Download, Visibility } from "@mui/icons-material"
import { Stack, Button, Typography, Box, TextField, Backdrop } from "@mui/material"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"

interface TeacherViewProps {
  specificLesson: IDetailedSpecificLesson & {canEdit: true}
  setSpecificLesson: Dispatch<SetStateAction<IDetailedSpecificLesson>>
}

const abscences = ['ma', 'ua', 'da']
const notes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export function TeacherView({specificLesson, setSpecificLesson}: TeacherViewProps) {
  const students: IStudent[] = useMemo(() =>  specificLesson.lesson.klass.students, [specificLesson])

  const [activeStudent, setActiveStudent] = useState<IStudent>(students[0])
  const newNote: INote = useMemo(() => ({
    id: '',
    value: '',
    specificLesson: specificLesson.id,
    student: activeStudent.id,
    comment: '',
    lastModified: ''
  }), [activeStudent.id, specificLesson.id])
  const [activeNote, setActiveNote] = useState<INote>()
  const [notesOpened, openNotes] = useState(false)
  const activeHomework = useMemo(() => specificLesson.homeworks.find(h => h.student === activeStudent.id), [specificLesson.homeworks, activeStudent])
  const [activeHomeworkLink, setActiveHomeworkLink] = useState<string>()
  
  const t = useTranslations('timetable.specific_lessons')

  useEffect(() => {
    if (activeNote === undefined || activeNote?.student !== activeStudent.id) {
      const note = specificLesson.notes.find(n => n.student === activeStudent.id)
      if (note) {
        setActiveNote(note)
      }
    }
  }, [activeNote, activeStudent, specificLesson.notes])

  useEffect(() => {
    if (activeNote) {
      setSpecificLesson(s => s.canEdit ? {...s, notes: [...s.notes.filter(n => n.student != activeNote.student), activeNote]} : s)
    }
  }, [activeNote, setSpecificLesson])

  const updateNoteComment = useCallback((comment: string) => {
    setActiveNote(n => n ? {...n, comment} : {...newNote, comment})
  }, [newNote])

  const updateNoteValue = useCallback((value: string) => {
    setActiveNote(n => n ? {...n, value} : {...newNote, value})
  }, [newNote])

  return <Stack direction='row' sx={{flex: 1}}>
    {students.length > 0 && <Stack sx={{overflowY: 'scroll', height: '60vh', width: '15vw'}}>
      {students.map((student, i) => <Button
        key={i}
        onClick={() => setActiveStudent(student)}
        sx={{justifyContent: 'flex-start', bgcolor: activeStudent.id === student.id ? 'action.hover' : 'unset'}}
      >
        <SmallProfile user={student.user} disableLink extraSmall />
      </Button>)}
    </Stack>}
    <Stack gap={4} sx={{flex: 1, height: '100%', pt: 1, pl: 4}}>
      <Stack direction='row' gap={4} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <SmallProfile user={activeStudent.user} disableLink extraSmall />
        <SpecificLessonNote value={activeNote?.value} onClick={() => openNotes(true)} />
      </Stack>
      {activeHomework?.comment && <Stack gap={2}>
        <Typography variant='h5'>{t('comment')}:</Typography>
        <Typography variant='h6'>{activeHomework.comment}</Typography>
      </Stack>}
      {activeHomework?.links && <Stack gap={2}>
        <Typography variant='h5'>{t('links.plural')}:</Typography>
        <Stack>
          {activeHomework.links.split('|').map((link, i) => <Stack key={i} direction='row' gap={4} sx={{alignItems: 'center'}}>
            <Link href={link} style={{flex: 1}}>
              <Typography color='primary' variant='h6'>{link}</Typography>
            </Link>
            <Close color='primary' onClick={() => setActiveHomeworkLink(link)} />
          </Stack>)}
        </Stack>
      </Stack>}
      {activeHomework?.files && activeHomework.files.length > 0 && <Stack gap={2}>
        <Typography variant='h5'>{t('files.plural')}:</Typography>
        <Stack>
          {specificLesson.files.map((file, i) => <Stack key={i} direction='row' sx={{alignItems: 'center'}} gap={2}>
            <Button variant='outlined' sx={{borderRadius: '10%'}}>
              <Typography>{file.file.split('/').at(-1)}</Typography>
              <Link href={file.file} target='_blank'>
                <Visibility />
              </Link>
              <Link href={file.file} download>
                <Download />
              </Link>
            </Button>
          </Stack>)}
        </Stack>
      </Stack>}
      <Box sx={{flex: 1}} />
      <TextField label={t('comment')} value={activeNote?.comment ?? ''} onChange={e => updateNoteComment(e.target.value)} />
    </Stack>
    <Backdrop sx={{ zIndex: 1300 }} open={notesOpened} onClick={() => openNotes(false)}>
      <Stack gap={2} sx={{bgcolor: 'background.default', p: 4}}>
        <Stack direction='row' gap={2}>
          {notes.map(note => <Button
            key={note}
            variant={activeNote?.value === note ? 'contained' : 'outlined'}
            onClick={() => updateNoteValue(note)}
            sx={{width: 67.5, aspectRatio: 1}}>
            <Typography variant='h6'>{note}</Typography>
          </Button>)}
        </Stack>
        <Stack direction='row' gap={2}>
          {abscences.map(abscence => <Button
            key={abscence}
            variant={activeNote?.value === abscence ? 'contained' : 'outlined'}
            onClick={() => updateNoteValue(abscence)}
            sx={{flex: 1, height: 67.5}}>
            <Typography>{t(`notes.${abscence}`)}</Typography>
          </Button>)}
        </Stack>
      </Stack>
    </Backdrop>
    <Backdrop sx={{ zIndex: 1300 }} open={activeHomeworkLink !== undefined}>
      {activeHomeworkLink && <Stack gap={4} sx={{bgcolor: 'background.default', p: 4}}>
        <Typography variant='h5'>{t('links.confirmation')}</Typography>
        <Link href={activeHomeworkLink} style={{flex: 1}}>
          <Typography color='primary' variant='h6'>{activeHomeworkLink}</Typography>
        </Link>
        <Stack direction='row' sx={{justifyContent: 'space-between'}}>
          <Button variant='outlined' onClick={() => setActiveHomeworkLink(undefined)}>
            {t('links.cancel')}
          </Button>
          <Button variant='contained' onClick={() => {setSpecificLesson(
            s => s.canEdit ? {...s, homeworks: s.homeworks.map(
              h => h.student === activeHomework?.student ? {...h, links: h.links.split('|').filter(l => l !== activeHomeworkLink).join('|')} : h
            )} : s
          );setActiveHomeworkLink(undefined)}}>
            {t('links.proceed')}
          </Button>
        </Stack>
      </Stack>}
    </Backdrop>
  </Stack>
}