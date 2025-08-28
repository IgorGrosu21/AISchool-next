'use client'

import { Input } from './input';
import { useMemo } from 'react';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export function Credentials() {
  const t = useTranslations('auth')
  const langs = useMemo(() => ['RO', 'RU'], [])

  return <Stack gap={2} sx={{flex: 1}}>
    <Input name='surname' />
    <Input name='name' />
    <Stack direction='row' sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Typography sx={{textWrap: 'nowrap', mr: 2}}>{t(`lang`)}:</Typography>
        <RadioGroup row aria-labelledby='lang-label' id='lang' name='lang' sx={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'nowrap'
      }}>
        {langs.map((lang, i) => <FormControlLabel key={i} value={lang} control={<Radio />} label={lang} />)}
      </RadioGroup>
    </Stack>
  </Stack>
}