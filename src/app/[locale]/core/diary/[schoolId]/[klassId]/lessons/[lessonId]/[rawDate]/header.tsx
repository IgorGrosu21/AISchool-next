'use client'

import { SpecificLessonFilesProvider, SpecificLessonLinksProvider, useSpecificLessonEditorContext } from '@/providers'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { SpecificLessonFiles, SpecificLessonLinks } from '@/components'
import { Download, Visibility } from '@mui/icons-material'

interface HeaderProps {
  date: string
}

export function Header({date}: HeaderProps) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()

  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const klass = useMemo(() => lesson.klass, [lesson.klass])

  const [title, setTitle] = useState(specificLesson.title)
  const [desc, setDesc] = useState(specificLesson.desc)
  const deferredTitle = useDeferredValue(title)
  const deferredDesc = useDeferredValue(desc)

  const t = useTranslations('timetable.specific_lessons')
  
  useEffect(() => {
    setSpecificLesson(l => ({...l, title: deferredTitle}))
  }, [deferredTitle, setSpecificLesson])
  
  useEffect(() => {
    setSpecificLesson(l => ({...l, desc: deferredDesc}))
  }, [deferredDesc, setSpecificLesson])

  return <SpecificLessonLinksProvider value={{ setInstance: setSpecificLesson }}>
    <SpecificLessonFilesProvider value={{ setInstance: setSpecificLesson }}>
      <Stack direction='row' gap={4}>
        <Stack gap={4} sx={{flex: 1}}>
          <Link href={`/core/diary/${klass.school.id}/${klass.id}/calendar/${specificLesson.date}`}>
            <Typography variant='h5' color='primary'>{lesson.subjectName.verboseName}</Typography>
          </Link>
          <Stack>
            <Typography variant='h5'>{t('title')}</Typography>
            {specificLesson.canEdit ? <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
            /> : <Typography variant='h6'>{title}</Typography>}
          </Stack>
          <Stack>
            <Typography variant='h5'>{t('desc')}</Typography>
            {specificLesson.canEdit ? <TextField
              multiline
              maxRows={10}
              value={desc}
              onChange={e => setDesc(e.target.value)}
            /> : <Typography variant='h6'>{desc}</Typography>}
          </Stack>
          {specificLesson.canEdit ? <SpecificLessonLinks links={specificLesson.links} small={false} /> : <Stack>
            <Typography variant='h5'>{t('links.plural')}</Typography>
            <Stack>
              {specificLesson.links.split('|').map((link, i) => <Link key={i} href={link}>
                <Typography color='primary' variant='h6'>{link}</Typography>
              </Link>)}
            </Stack>
          </Stack>}
          {specificLesson.canEdit ? <SpecificLessonFiles files={specificLesson.files} filesData={specificLesson.filesData} small={false} /> : <Stack>
            <Typography variant='h5'>{t('files.plural')}</Typography>
            <Stack direction='row' gap={2}>
              {specificLesson.files.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
                <Typography>{file.file.split('/').at(-1)}</Typography>
                <Link href={file.file} target='_blank' style={{display: 'flex', alignItems: 'center'}}>
                  <Visibility />
                </Link>
                {/* not downloading */}
                <Link href={file.file} download={file.file.split('/').at(-1)} style={{display: 'flex', alignItems: 'center'}}>
                  <Download />
                </Link>
              </Button>)}
            </Stack>
          </Stack>}
        </Stack>
        <Stack gap={4}>
          <Typography color='textDisabled' variant='h5' sx={{textAlign: 'end'}}>{date}</Typography>
          <Stack direction='row' gap={2} sx={{justifyContent: 'flex-end'}}>
            <Stack sx={{
              bgcolor: 'primary.main',
              borderRadius: '15%',
              height: 67.5,
              aspectRatio: 1,
              justifyContent: 'center',
            }}>
              <Typography variant='h6' sx={{color: 'primary.contrastText', textAlign: 'center'}}>{klass.grade}{klass.letter}</Typography>
            </Stack>
            <Image
              src={lesson.subjectName.image}
              alt={lesson.subjectName.verboseName}
              width={67.5}
              height={67.5}
              loading='lazy'
            />
          </Stack>
        </Stack>
      </Stack>
    </SpecificLessonFilesProvider>
  </SpecificLessonLinksProvider>
}