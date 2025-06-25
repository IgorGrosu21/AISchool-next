'use client'

import { IDetailedSchool } from '@/utils/interfaces';
import { Grid2, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

interface ContactsProps {
  school: IDetailedSchool,
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function Contacts({school, setSchool}: ContactsProps) {
  const t = useTranslations('schools.details');

  const phones = useMemo(() => school.phones.split(' / '), [school.phones])
  const emails = useMemo(() => school.emails.split(' / '), [school.emails])

  const editStringList = useCallback((original: string, i: number, value: string) => {
    const splitted = original.split(' / ')
    if (value === '') {
      splitted.splice(i, 1)
    } else if (splitted.length > i) {
      splitted[i] = value
    } else {
      splitted.push(value)
    }
    return splitted.join(' / ')
  }, [])

  const editPhone = useCallback((i: number, phone: string) => {
    setSchool(s => ({...s, phones: editStringList(s.phones, i, phone)}))
  }, [editStringList, setSchool])

  const editEmail = useCallback((i: number, email: string) => {
    setSchool(s => ({...s, emails: editStringList(s.emails, i, email)}))
  }, [editStringList, setSchool])

  return <Grid2 container columns={12} spacing={2}>
    <Grid2 size={12}>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('contacts')}</Typography>
    </Grid2>
    {[0, 1, 2].map((i) => <Grid2 key={i} size={4}>
      <TextField sx={{width: '100%'}} label={t('phone') + (i + 1)} value={phones[i] ?? ''} onChange={e => editPhone(i, e.target.value)} />
    </Grid2>)}
    {[0, 1, 2].map((i) => <Grid2 key={i} size={4}>
      <TextField sx={{width: '100%'}} label={t('email') + (i + 1)} value={emails[i] ?? ''} onChange={e => editEmail(i, e.target.value)} />
    </Grid2>)}
    <Grid2 size={6}>
      <TextField sx={{width: '100%'}} label={t('address')} value={school.address} onChange={e => setSchool({...school, address: e.target.value})} />
    </Grid2>
    <Grid2 size={3}>
      <TextField sx={{width: '100%'}} label={t('website')} value={school.website} onChange={e => setSchool({...school, website: e.target.value})} />
    </Grid2>
    <Grid2 size={3}>
      <TextField sx={{width: '100%'}} label={t('work_hours')} value={school.workHours} onChange={e => setSchool({...school, workHours: e.target.value})} />
    </Grid2>
  </Grid2>
}