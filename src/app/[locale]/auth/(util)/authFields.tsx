'use client'

import { FormState } from '@/app/actions/auth';
import { Input } from './input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

export function AuthFields({state}: {state: FormState}) {
  const [masked, setMasked] = useState(true)
  const t = useTranslations('auth.errors')

  return <>
    <Input
      error={state.email.error !== ''}
      helperText={state.email.error !== '' ? t(state.email.error) : undefined}
      type='email'
      name='email'
      defaultValue={state.email.value}
      sx={{
        '& .MuiInputBase-root': {
          minHeight: {xs: '56px', md: 'auto'},
          fontSize: {xs: '1rem', md: 'inherit'}
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
          minHeight: {xs: '56px', md: 'auto'},
          fontSize: {xs: '1rem', md: 'inherit'}
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
                minWidth: {xs: '48px', md: 'auto'},
                minHeight: {xs: '48px', md: 'auto'},
                '& .MuiSvgIcon-root': {
                  fontSize: {xs: '1.5rem', md: 'inherit'}
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