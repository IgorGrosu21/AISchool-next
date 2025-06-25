'use client'

import { IStudent } from '@/utils/interfaces';
import { Stack, Typography, Table, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
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
    <Table>
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
    </Table>
  </Stack>
}