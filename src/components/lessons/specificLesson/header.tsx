'use client'

import { Stack, Typography } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link'
import { ISpecificLesson } from '@/utils/interfaces';
import { useMemo } from 'react';
import { useIsMobile } from '@/hooks';

interface SpecificLessonHeaderProps {
  specificLesson: ISpecificLesson
  date: string
  children: React.ReactNode | React.ReactNode[]
}

export function SpecificLessonHeader({specificLesson, date, children}: SpecificLessonHeaderProps) {
  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const klass = useMemo(() => lesson.klass, [lesson.klass])
  const isMobile = useIsMobile()
  
  return <Stack gap={4}>
    <Stack direction='row' gap={4}>
      <Stack gap={4} sx={{flex: 1}}>
        <Link href={`/core/diary/${klass.school.slug}/${klass.slug}/calendar/${specificLesson.date}`}>
          <Typography variant='h5' color='primary'>{lesson.subject.verboseName}</Typography>
        </Link>
        {!isMobile && children}
      </Stack>
      <Stack gap={4}>
        <Typography color='textDisabled' variant='h5' sx={{textAlign: 'end'}}>{date}</Typography>
        <Stack direction='row' gap={2} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
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
            src={lesson.subject.image}
            alt={lesson.subject.verboseName}
            width={67.5}
            height={67.5}
            loading='lazy'
          />
        </Stack>
      </Stack>
    </Stack>
    {isMobile && children}  
  </Stack>
}