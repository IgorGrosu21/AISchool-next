'use client'

import { AttachedFilesProvider, AttachedLinksProvider, useSpecificLessonEditorContext } from '@/providers'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { INoteName, IStudent } from '@/utils/interfaces'
import { useTranslations } from 'next-intl'
import { SmallProfile, AttachedFilesEditor, AttachedLinksEditor, Note, AttachedFiles, AttachedLinks, SpecificLessonHeader, NotePicker } from '@/components'

interface ContainerProps {
  date: string
}

export function Container({date}: ContainerProps) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()
  const students: IStudent[] = useMemo(() =>  specificLesson.students, [specificLesson])
  
  const [activeStudent, setActiveStudent] = useState<IStudent>(students[0])
  const newNote: INoteName = useMemo(() => ({
    id: '',
    value: '',
    specificLesson: specificLesson.id,
    student: activeStudent.id,
    comment: '',
    lastModified: ''
  }), [activeStudent.id, specificLesson.id])
  const [activeNote, setActiveNote] = useState<INoteName>()
  const [notesOpened, openNotes] = useState(false)
  const activeHomework = useMemo(() => specificLesson.homeworks.find(h => h.student === activeStudent.id), [specificLesson.homeworks, activeStudent])
    
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
      setSpecificLesson(s => ({...s, notes: [...s.notes.filter(n => n.student != activeNote.student), activeNote]}))
    }
  }, [activeNote, setSpecificLesson])

  const updateNote = useCallback((note?: INoteName) => {
    setActiveNote(n => note ?? n)
  }, [])

  const updateNoteComment = useCallback((comment: string) => {
    setActiveNote(n => n ? {...n, comment} : {...newNote, comment})
  }, [newNote])

  return <Stack gap={8}>
    <AttachedLinksProvider value={{ setInstance: setSpecificLesson }}>
      <AttachedFilesProvider value={{ setInstance: setSpecificLesson }}>
        <SpecificLessonHeader specificLesson={specificLesson} date={date}>
          <Stack gap={2}>
            <Typography variant='h5'>{t('title')}</Typography>
            <TextField value={specificLesson.title} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
            <Typography variant='h5'>{t('desc')}</Typography>
            <TextField multiline maxRows={10} value={specificLesson.desc} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
          </Stack>
          <AttachedLinksEditor links={specificLesson.links} small={false} />
          <AttachedFilesEditor files={specificLesson.files} filesData={specificLesson.filesData} small={false} />
        </SpecificLessonHeader>
      </AttachedFilesProvider>
    </AttachedLinksProvider>
    <Divider />
    <Stack direction='row' sx={{flex: 1}}>
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
          <Note value={activeNote?.value} onClick={() => openNotes(true)} />
        </Stack>
        {activeHomework?.comment && <Stack gap={2}>
          <Typography variant='h5'>{t('comment')}:</Typography>
          <Typography variant='h6'>{activeHomework.comment}</Typography>
        </Stack>}
        <AttachedLinks links={activeHomework?.links} />
        <AttachedFiles files={activeHomework?.files} />
        <Box sx={{flex: 1}} />
        <TextField label={t('comment')} value={activeNote?.comment ?? ''} onChange={e => updateNoteComment(e.target.value)} />
      </Stack>
      <NotePicker
        notesOpened={notesOpened}
        openNotes={openNotes}
        activeNote={activeNote ?? newNote}
        updateNote={updateNote}
        hasNotes={specificLesson.lesson.subject.hasNotes}
      />
    </Stack>
  </Stack>
}