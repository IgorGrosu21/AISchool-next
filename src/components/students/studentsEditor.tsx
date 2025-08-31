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
        <Grid2 size={{xs: 4, md: 'grow'}} sx={{display: 'flex', justifyContent: 'center'}}>
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
    {/*<Table>
      <TableBody>
        {students.map((student, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component='th' scope='row'>
            <Typography variant='h6'>{i + 1}</Typography>
          </TableCell>
          <TableCell align='right'>
            <SmallProfile user={student.user} />
          </TableCell>
          <TableCell align='right'>
            <UserVerifier user={student.user} setUser={user => setStudents(
              students.map((s, j) => i === j ? ({...s, user}) : s)
            )} />
          </TableCell>
          <TableCell align='right'>
            <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'flex-end'}}>
              <Typography variant='h6'>{t('is_manager')}</Typography>
              <Checkbox checked={student.isManager} onChange={() => setStudents(
                students.map((s, j) => i === j ? ({...s, isManager: !s.isManager}) : s)
              )} />
            </Stack>
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>*/}
  </Stack>
}