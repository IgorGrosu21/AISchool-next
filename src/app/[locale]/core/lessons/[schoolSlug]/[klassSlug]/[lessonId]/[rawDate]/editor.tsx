'use client'

import { AttachedItemsProvider, useSpecificLessonEditorContext } from '@/providers'
import { Box, Grid2, Stack, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { AttachedFilesEditor, AttachedLinksEditor, Note, AttachedFiles, AttachedLinks, SpecificLessonHeader, NotePicker, StudentsPicker } from '@/components'
import { Panel } from '@/ui'
import { useStudentWithNotes } from '@/hooks'
import { useRef, useState } from 'react'

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
  const studentsPickerRef = useRef<HTMLDivElement | null>(null)

  return <Stack gap={8}>
    <AttachedItemsProvider value={{ setInstance: setSpecificLesson }}>
      <SpecificLessonHeader specificLesson={specificLesson} date={date}>
        <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
          <Grid2 size={1}>
            <Panel gap={2}>
              <Typography variant='h5'>{t('title')}</Typography>
              <TextField value={specificLesson.title} onChange={e => setSpecificLesson(l => ({...l, title: e.target.value}))} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedLinksEditor links={specificLesson.links} small={false} />
          </Grid2>
          <Grid2 size={1}>
            <Panel gap={2}>
              <Typography variant='h5'>{t('desc')}</Typography>
              <TextField multiline maxRows={10} value={specificLesson.desc} onChange={e => setSpecificLesson(l => ({...l, desc: e.target.value}))} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedFilesEditor files={specificLesson.files} filesData={specificLesson.filesData} small={false} />
          </Grid2>
        </Grid2>
      </SpecificLessonHeader>
    </AttachedItemsProvider>
    {!specificLesson.isStudent && <Stack gap={4} ref={studentsPickerRef}>
      <Panel direction='row' gap={4} sx={{flexGrow: 0, justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
        <StudentsPicker anchorEl={studentsPickerRef.current} students={students} activeStudent={activeStudent} setActiveStudent={setActiveStudent} />
        <Box sx={{flex: 1}} />
        <Note value={activeNote?.value} onClick={() => openNotes(true)} big />
      </Panel>
      <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('student_comment')}:</Typography>
            <Typography variant='h6'>{activeHomework?.comment}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedLinks links={activeHomework?.links} />
        </Grid2>
        <Grid2 size={1}>
          <Panel gap={2} sx={{height: '100%'}}>
            <Typography variant='h5'>{t('teacher_comment')}:</Typography>
            <TextField value={activeNote?.comment ?? ''} onChange={e => updateNoteComment(e.target.value)} />
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedFiles files={activeHomework?.files} />
        </Grid2>
      </Grid2>
    </Stack>}
    <NotePicker
      notesOpened={notesOpened}
      closeNotes={() => openNotes(false)}
      activeNote={activeNote}
      updateNote={updateNote}
      hasNotes={specificLesson.lesson.subject.hasNotes}
    />
  </Stack>
}