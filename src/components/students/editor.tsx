'use client'

import { IStudent } from '@/utils/interfaces';
import { Stack, Typography, Checkbox, Grid2 } from '@mui/material';
import { useTranslations } from 'next-intl';
import { SmallProfile, UserVerifier } from '../profile';

interface StudentsEditorProps {
  students: IStudent[]
  setStudents: (students: IStudent[]) => void
}

export function StudentsEditor({students, setStudents}: StudentsEditorProps) {
  const t = useTranslations('students');

  return <Stack gap={2}>
    <Typography variant='h5'>{t('list')}:</Typography>
    <Stack gap={4}>
      {students.map((student, i) => <Grid2 key={i} container spacing={4} columns={4}>
        <Grid2 size={{xs: 4, md: 'grow'}} sx={{display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'}}}>
          <SmallProfile user={student.user} />
        </Grid2>
        <Grid2 size={{xs: 2, md: 'grow'}}>
          <UserVerifier user={student.user} setUser={user => setStudents(
            students.map((s, j) => i === j ? ({...s, user}) : s)
          )} />
        </Grid2>
        <Grid2 size={{xs: 2, md: 'grow'}}>
          <Stack direction={{xs: 'column', md: 'row'}} sx={{height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={student.isManager} onChange={() => setStudents(
              students.map((s, j) => i === j ? ({...s, isManager: !s.isManager}) : s)
            )} />
          </Stack>
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}