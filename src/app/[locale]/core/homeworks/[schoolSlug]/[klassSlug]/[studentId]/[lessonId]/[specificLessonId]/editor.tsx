'use client'

import { AttachedItemsProvider, useHomeworkEditorContext } from '@/providers'
import { Stack, TextField, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { SmallProfile, Note, AttachedLinksEditor, AttachedFilesEditor, AttachedLinks, AttachedFiles, SpecificLessonHeader, ClientPanel } from '@/components'

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
    <SpecificLessonHeader specificLesson={specificLesson} date={date}>
      <Stack gap={2}>
        <ClientPanel gap={2}>
          <Typography variant='h5'>{t('title')}</Typography>
          <Typography variant='h6'>{specificLesson.title}</Typography>
        </ClientPanel>
        <ClientPanel gap={2}>
          <Typography variant='h5'>{t('desc')}</Typography>
          <Typography variant='h6'>{specificLesson.desc}</Typography>
        </ClientPanel>
      </Stack>
      <AttachedLinks links={specificLesson.links} />
      <AttachedFiles files={specificLesson.files} />
    </SpecificLessonHeader>
    <AttachedItemsProvider value={{ setInstance: setHomework }}>
      <Stack gap={4}>
        <Stack direction='row' gap={4}>
          <ClientPanel sx={{flexGrow: 0}}>
            {lesson.teacher && <SmallProfile user={lesson.teacher.user} disableLink extraSmall />}
          </ClientPanel>
          <ClientPanel sx={{height: '100%', justifyContent: 'center'}}>
            <Typography variant='h5'>{t('comment')}:</Typography>
            <Typography variant='h6'>{note?.comment}</Typography>
          </ClientPanel>
          <ClientPanel sx={{height: '100%', justifyContent: 'center'}}>
            <Typography variant='h5'>{t('last_modified')}:</Typography>
            <Typography variant='h6'>{note?.lastModified}</Typography>
          </ClientPanel>
          <ClientPanel sx={{flexGrow: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Note value={note?.value} big />
          </ClientPanel>
        </Stack>
        <AttachedLinksEditor links={homework?.links} />
        <AttachedFilesEditor files={homework.files} filesData={homework.filesData} />
        <ClientPanel>
          <TextField label={t('comment')} value={homework?.comment ?? ''} onChange={e => updateComment(e.target.value)} />
        </ClientPanel>
      </Stack>
    </AttachedItemsProvider>
  </Stack>
}