'use client'

import { AttachedFilesProvider, AttachedLinksProvider, useHomeworkEditorContext } from '@/providers'
import { Divider, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { SmallProfile, Note, AttachedLinksEditor, AttachedFilesEditor, AttachedLinks, AttachedFiles, SpecificLessonHeader } from '@/components'

interface ContainerProps {
  date: string
}

export function Container({date}: ContainerProps) {
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
        <Typography variant='h5'>{t('title')}</Typography>
        <Typography variant='h6'>{specificLesson.title}</Typography>
        <Typography variant='h5'>{t('desc')}</Typography>
        <Typography variant='h6'>{specificLesson.desc}</Typography>
      </Stack>
      <AttachedLinks links={specificLesson.links} />
      <AttachedFiles files={specificLesson.files} />
    </SpecificLessonHeader>
    <Divider />
    <AttachedLinksProvider value={{ setInstance: setHomework }}>
      <AttachedFilesProvider value={{ setInstance: setHomework }}>
        <Stack gap={8}>
          <Stack direction='row' gap={4}>
            {lesson.teacher && <SmallProfile user={lesson.teacher.user} disableLink extraSmall />}
            <Divider orientation='vertical' flexItem />
            <Stack sx={{flex: 1, height: '100%', justifyContent: 'center'}}>
              <Typography variant='h5'>{t('comment')}:</Typography>
              <Typography variant='h6'>{note?.comment}</Typography>
            </Stack>
            <Divider orientation='vertical' flexItem />
            <Stack sx={{flex: 1, height: '100%', justifyContent: 'center'}}>
              <Typography variant='h5'>{t('last_modified')}:</Typography>
              <Typography variant='h6'>{note?.lastModified}</Typography>
            </Stack>
            <Divider orientation='vertical' flexItem />
          <Note value={note?.value} />
          </Stack>
          <AttachedLinksEditor links={homework?.links} />
          <AttachedFilesEditor files={homework.files} filesData={homework.filesData} />
          <Stack direction='row'></Stack>
          <TextField label={t('comment')} value={homework?.comment ?? ''} onChange={e => updateComment(e.target.value)} />
        </Stack>
      </AttachedFilesProvider>
    </AttachedLinksProvider>
  </Stack>
}