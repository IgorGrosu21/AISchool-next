'use client'

import { Input } from './input';
import { useMemo } from 'react';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@/hooks';

export function Credentials() {
  const t = useTranslations('auth')
  const langs = useMemo(() => ['RO', 'RU'], [])
  const isMobile = useIsMobile();

  return <Stack gap={2} sx={{flex: 1, width: '100%'}}>
    <Input name='surname' />
    <Input name='name' />
    <Stack direction='column' sx={{flex: 1}}>
      <Typography>{t(`lang`)}:</Typography>
      <RadioGroup row={!isMobile} aria-labelledby='lang-label' id='lang' name='lang'>
        {langs.map((lang, i) => (
          <FormControlLabel 
            key={i} 
            value={lang} 
            control={<Radio />} 
            label={lang}
            sx={{margin: {xs: '4px 0', md: '0 8px 0 0'}}}
          />
        ))}
      </RadioGroup>
    </Stack>
  </Stack>
}