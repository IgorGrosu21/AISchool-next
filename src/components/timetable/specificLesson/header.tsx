'use client'

import { Fab, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { Link } from '@/i18n'
import { ISpecificLesson } from '@/interfaces';
import { useMemo } from 'react';
import { KlassLink } from '@/components';
import { Panel } from '@/ui';
import { Edit } from '@mui/icons-material';

interface SpecificLessonHeaderProps extends React.PropsWithChildren {
  specificLesson: ISpecificLesson
  date: string
  editable?: boolean
}

export function SpecificLessonHeader({specificLesson, date, editable = false, children}: SpecificLessonHeaderProps) {
  const lesson = useMemo(() => specificLesson.lesson, [specificLesson.lesson])
  const klass = useMemo(() => lesson.klass, [lesson.klass])
  
  return <Stack gap={2} sx={{flex: 1}}>
    <Panel direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Link href={`/core/diary/${klass.school.slug}/${klass.slug}/calendar/${specificLesson.date}`}>
        <Typography variant='h5' color='primary'>{lesson.subject.verboseName}</Typography>
        <Typography color='textDisabled' variant='h6' sx={{textAlign: 'end'}}>{date}, {lesson.lessonTime.starting}</Typography>
      </Link>
      <Stack direction='row' gap={2} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <KlassLink baseHref={`/core/schools/${klass.school.slug}/klasses`} klass={klass} />
        <Image
          src={lesson.subject.image}
          alt={lesson.subject.verboseName}
          width={67.5}
          height={67.5}
          loading='lazy'
        />
        {editable && <Link href={`/core/lessons/${klass.school.slug}/${klass.slug}/${lesson.id}/${specificLesson.date}`}>
          <Fab 
            color='primary'
            size='medium'
            sx={{
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}
          >
            <Edit />
          </Fab>
        </Link>}
      </Stack>
    </Panel>
    {children}
  </Stack>
}