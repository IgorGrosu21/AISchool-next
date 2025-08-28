'use client'

import { ISubjectName } from '@/utils/interfaces';
import { Stack, StackProps, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface SubjectsProps extends StackProps {
  subjects: ISubjectName[],
  small?: boolean
  showText?: boolean
  baseHref?: string
}

export function Subjects({subjects, small = false, showText = true, baseHref, ...props}: SubjectsProps) {
  const t = useTranslations('subjects')

  return <Stack gap={small ? 2 : 4} {...props}>
    {showText && <Typography variant={small ? 'h6' : 'h5'} sx={{textAlign: 'center'}}>{t('plural')}:</Typography>}
    <Stack gap={4} direction='row' sx={{flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {subjects.map((subject, i) => {
        const subjectContent = (
          <Stack key={i} gap={2} sx={{alignItems: 'center'}}>
            <Stack sx={{p: small ? 0.25 : 0.5, bgcolor: 'primary.main', borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}>
              <Image
                src={subject.image}
                alt={subject.verboseName}
                width={small ? 100 : 150}
                height={small ? 100 : 150}
                style={{backgroundColor: '#fff', padding: 8, borderRadius: '50%'}}
                loading='lazy'
              />
            </Stack>
            <Typography variant={small ? 'h6' : 'h5'}>{subject.verboseName}</Typography>
          </Stack>
        )

        if (baseHref) {
          return (
            <Link key={i} href={`${baseHref}/${subject.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {subjectContent}
            </Link>
          )
        }

        return subjectContent
      })}
    </Stack>
  </Stack>
}