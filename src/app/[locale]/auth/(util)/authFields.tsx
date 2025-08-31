'use client'

import { FormState } from '@/app/actions/auth';
import { Input } from './input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useIsMobile } from '@/hooks';

export function AuthFields({state}: {state: FormState}) {
  const [masked, setMasked] = useState(true)
  const t = useTranslations('auth.errors')
  const isMobile = useIsMobile();

  return <>
    <Input
      error={state.email.error !== ''}
      helperText={state.email.error !== '' ? t(state.email.error) : undefined}
      type='email'
      name='email'
      defaultValue={state.email.value}
      sx={{
        '& .MuiInputBase-root': {
          minHeight: isMobile ? '56px' : 'auto',
          fontSize: isMobile ? '1rem' : 'inherit'
        }
      }}
    />
    <Input
      error={state.password.error !== ''}
      helperText={state.password.error !== '' ? t(state.password.error) : undefined}
      type={masked ? 'password' : 'text'}
      name='password'
      defaultValue={state.password.value}
      sx={{
        '& .MuiInputBase-root': {
          minHeight: isMobile ? '56px' : 'auto',
          fontSize: isMobile ? '1rem' : 'inherit'
        }
      }}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position='end' sx={{mr: 1}}>
            <IconButton 
              aria-label={masked ? 'hide' : 'display'} 
              onClick={() => setMasked(!masked)}  
              edge='end'
              sx={{
                minWidth: isMobile ? '48px' : 'auto',
                minHeight: isMobile ? '48px' : 'auto',
                '& .MuiSvgIcon-root': {
                  fontSize: isMobile ? '1.5rem' : 'inherit'
                }
              }}
            >
              {masked ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      }}
    />
  </>
}