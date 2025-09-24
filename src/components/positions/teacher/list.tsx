'use server'

import { Stack, Typography } from '@mui/material'
import { Panel, SchoolLink, Subjects } from '@/components';
import { Link } from '@/i18n'
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { IPosition } from '@/interfaces';

interface TeacherPositionsProps {
  positions: IPosition[]
  link?: (slug: string) => string
}

export async function TeacherPositions({positions, link}: TeacherPositionsProps) {
  const t = await getTranslations('positions')

  return <Stack gap={4}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('work_places')}:</Typography>
    </Panel>
    {positions.map((position, i) => <Stack key={i} gap={2}>
      <Panel>
        <SchoolLink school={position.school} />
      </Panel>
      <Stack gap={2} direction={{xs: 'column', md: 'row'}}>
        <Stack gap={2} sx={{flex: 1}}>
          <Panel>
            <Typography variant='h6'>{t('singular')}: {t(position.type)}</Typography>
          </Panel>
          <Panel>
            <Subjects subjects={position.subjects} small sx={{flex: 1, alignItems: 'center'}} />
          </Panel>
        </Stack>
        <Panel sx={{justifyContent: 'center'}}>
          <Link href={link ? link(position.school.slug) : `/core/schools/${position.school.slug}/`}>
            <Image
              width={1792}
              height={1024}
              src={position.school.preview ?? '/images/default-school.png'}
              alt='school-image'
              style={{width: '100%', height: 'auto'}}
              loading='lazy'
            />
          </Link>
        </Panel>
      </Stack>
    </Stack>)}
  </Stack>
}