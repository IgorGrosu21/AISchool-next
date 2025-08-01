'use server'

import { Stack, Typography } from '@mui/material'
import { SchoolLink, Subjects } from '@/components';
import Link from 'next/link'
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { IPosition } from '@/utils/interfaces';

interface TeacherPositionsProps {
  positions: IPosition[]
}

export async function TeacherPositions({positions}: TeacherPositionsProps) {
  const t = await getTranslations('positions')

  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('work_places')}:</Typography>
    <Stack gap={8}>
      {positions.map((position, i) => <Stack key={i} gap={2} direction='row'>
        <Stack gap={2} sx={{flex: 1}}>
          <SchoolLink school={position.school} />
          <Typography variant='h6'>{t('singular')}: {t(position.type)}</Typography>
          <Subjects subjectNames={position.subjectNames} small sx={{flex: 1, alignItems: 'center'}} />
        </Stack>
        <Link href={`/core/schools/${position.school.id}/`} style={{flex: 1}}>
          <Image
            width={1792}
            height={1024}
            src={position.school.preview ?? '/images/default-school.png'}
            alt='school-image'
            style={{width: '100%', height: 'auto'}}
            loading='lazy'
          />
        </Link>
      </Stack>)}
    </Stack>
  </Stack>
}