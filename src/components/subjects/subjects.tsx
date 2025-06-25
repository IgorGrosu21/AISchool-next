'use client'

import { ISubjectName } from '@/utils/interfaces';
import { Stack, StackProps, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface SubjectsProps extends StackProps {
  subjectNames: ISubjectName[],
  small?: boolean
  showText?: boolean
}

export function Subjects({subjectNames, small = false, showText = true, ...props}: SubjectsProps) {
  const t = useTranslations('subjects')

  return <Stack gap={small ? 2 : 4} {...props}>
    {showText && <Typography variant={small ? 'h6' : 'h5'} sx={{textAlign: 'center'}}>{t('taught')}:</Typography>}
    <Stack gap={4} direction='row' sx={{flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {subjectNames.map((subjectName, i) => <Stack key={i} gap={2} sx={{alignItems: 'center'}}>
        <Stack sx={{p: small ? 0.25 : 0.5, bgcolor: 'primary.main', borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            src={subjectName.image}
            alt={subjectName.verboseName}
            width={small ? 100 : 150}
            height={small ? 100 : 150}
            style={{backgroundColor: '#fff', padding: 8, borderRadius: '50%'}}
            loading='lazy'
          />
        </Stack>
        <Typography variant={small ? 'h6' : 'h5'}>{subjectName.verboseName}</Typography>
      </Stack>)}
    </Stack>
  </Stack>
}