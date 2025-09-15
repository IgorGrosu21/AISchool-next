'use client'

import { AttachedItemsProvider, useSpecificLessonEditorContext } from '@/providers'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { SmallProfile, AttachedFilesEditor, AttachedLinksEditor, Note, AttachedFiles, AttachedLinks, SpecificLessonHeader, NotePicker, ClientPanel } from '@/components'
import { useStudentWithNotes } from '@/hooks'
import { useState } from 'react'

interface ContainerProps {
  date: string
}

export function Editor({date}: ContainerProps) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()
  const {
    students, activeStudent, setActiveStudent,
    activeHomework, activeNote, updateNote, updateNoteComment
  } = useStudentWithNotes()
  const [notesOpened, openNotes] = useState(activeNote !== undefined)
  const t = useTranslations('timetable.specific_lessons')

  return <Stack gap={8}>
    <AttachedItemsProvider value={{ setInstance: setSpecificLesson }}>
      <SpecificLessonHeader specificLesson={specificLesson} date={date}>
        <Stack gap={2}>
          <ClientPanel gap={2}>
            <Typography variant='h5'>{t('title')}</Typography>
            <TextField value={specificLesson.title} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
          </ClientPanel>
          <ClientPanel gap={2}>
            <Typography variant='h5'>{t('desc')}</Typography>
            <TextField multiline maxRows={10} value={specificLesson.desc} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
          </ClientPanel>
        </Stack>
        <AttachedLinksEditor links={specificLesson.links} small={false} />
        <AttachedFilesEditor files={specificLesson.files} filesData={specificLesson.filesData} small={false} />
      </SpecificLessonHeader>
    </AttachedItemsProvider>
    <Stack direction={{xs: 'column', md: 'row'}} sx={{flex: 1}}>
      {students.length > 0 && <ClientPanel sx={{flex: 'unset', overflowY: 'scroll', height: {xs: 'auto', md: '60vh'}, maxHeight: '60vh', width: {xs: '100%', md: '15vw'}}}>
        {students.map((student, i) => <Button
          key={i}
          onClick={() => setActiveStudent(student)}
          sx={{justifyContent: 'flex-start', bgcolor: activeStudent.id === student.id ? 'action.hover' : 'unset'}}
        >
          <SmallProfile user={student.user} disableLink extraSmall />
        </Button>)}
      </ClientPanel>}
      <Stack gap={4} sx={{flex: 1, height: '100%', pt: {xs: 4, md: 1}, pl: {xs: 0, md: 4}, }}>
        <ClientPanel direction='row' gap={4} sx={{flexGrow: 0, justifyContent: 'space-between', alignItems: 'center'}}>
          <SmallProfile user={activeStudent.user} disableLink extraSmall />
          <Note value={activeNote?.value} onClick={() => openNotes(true)} big />
        </ClientPanel>
        {activeHomework?.comment && <ClientPanel sx={{flexGrow: 0}} gap={2}>
          <Typography variant='h5'>{t('comment')}:</Typography>
          <Typography variant='h6'>{activeHomework.comment}</Typography>
        </ClientPanel>}
        <AttachedLinks links={activeHomework?.links} />
        <AttachedFiles files={activeHomework?.files} />
        <Box sx={{flex: 1}} />
        <ClientPanel sx={{flexGrow: 0}}>
          <TextField label={t('comment')} value={activeNote?.comment ?? ''} onChange={e => updateNoteComment(e.target.value)} />
        </ClientPanel>
      </Stack>
      <NotePicker
        notesOpened={notesOpened}
        closeNotes={() => openNotes(false)}
        activeNote={activeNote}
        updateNote={updateNote}
        hasNotes={specificLesson.lesson.subject.hasNotes}
      />
    </Stack>
  </Stack>
}