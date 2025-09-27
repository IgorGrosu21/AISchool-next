'use client'

import { AttachedItemsProvider, useHomeworkEditorContext } from '@/providers'
import { Box, Grid2, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { SmallProfile, Note, AttachedLinksEditor, AttachedFilesEditor, AttachedLinks, AttachedFiles, SpecificLessonHeader } from '@/components'
import { Panel } from '@/ui'

interface ContainerProps {
  date: string
}

export function Editor({date}: ContainerProps) {
  const { instance: homework, setInstance: setHomework } = useHomeworkEditorContext()
  const specificLesson = useMemo(() => homework.specificLesson, [homework.specificLesson])
  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const note = useMemo(() => homework.note, [homework.note])
    
  const t = useTranslations('timetable.specific_lessons')

  const updateComment = useCallback((comment: string) => {
    setHomework(h => ({...h, comment}))
  }, [setHomework])

  return <Stack gap={8}>
    <SpecificLessonHeader specificLesson={specificLesson} date={date} editable={homework.student.isManager}>
      <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
        <Grid2 size={1}>
          <Panel gap={2}>
            <Typography variant='h5'>{t('title')}</Typography>
            <Typography variant='h6'>{specificLesson.title}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedLinks links={specificLesson.links} />
        </Grid2>
        <Grid2 size={1}>
          <Panel gap={2}>
            <Typography variant='h5'>{t('desc')}</Typography>
            <Typography variant='h6'>{specificLesson.desc}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={1}>
          <AttachedFiles files={specificLesson.files} />
        </Grid2>
      </Grid2>
    </SpecificLessonHeader>
    <AttachedItemsProvider value={{ setInstance: setHomework }}>
      <Stack gap={4}>
        <Panel>
          {lesson.teacher && <SmallProfile user={lesson.teacher.user} disableLink extraSmall />}
          <Box sx={{flex: 1}} />
          <Note value={note?.value} big />
        </Panel>
        <Grid2 container spacing={2} columns={{xs: 1, md: 2}}>
          <Grid2 size={1}>
            <Panel gap={2} sx={{height: '100%'}}>
              <Typography variant='h5'>{t('student_comment')}:</Typography>
              <TextField value={homework?.comment ?? ''} onChange={e => updateComment(e.target.value)} />
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedLinksEditor links={homework?.links} />
          </Grid2>
          <Grid2 size={1}>
            <Panel sx={{justifyContent: 'center'}}>
              <Typography variant='h5'>{t('teacher_comment')}:</Typography>
              <Typography variant='h6'>{note?.comment}</Typography>
            </Panel>
          </Grid2>
          <Grid2 size={1}>
            <AttachedFilesEditor files={homework.files} filesData={homework.filesData} />
          </Grid2>
        </Grid2>
      </Stack>
    </AttachedItemsProvider>
  </Stack>
}