'use server'

import { Balance, SmallProfile } from "@/components";
import { IStudent } from "@/utils/interfaces";
import { Stack, Typography, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@mui/material";
import { getTranslations } from "next-intl/server";

interface StudentsProps {
  students: IStudent[]
}

export async function Students({students}: StudentsProps) {
  const t = await getTranslations('students');

  return <Stack gap={2}>
    <Typography variant='h5'>{t('list')}:</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell>{t('singular')}</TableCell>
          <TableCell>{t('balance')}</TableCell>
          <TableCell align="right">{t('rank')}</TableCell>
          <TableCell align="right">{t('subscription')}</TableCell>
          <TableCell align="right">{t('is_manager')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <Typography variant='h6'>{i + 1}</Typography>
          </TableCell>
          <TableCell>
            <SmallProfile user={student.user} />
          </TableCell>
          <TableCell>
            <Balance balance={student.balance} showText={false} />
          </TableCell>
          <TableCell align="right">
            <Typography variant='h6'>#{student.rank}</Typography>
          </TableCell>
          <TableCell align="right">
            <Checkbox checked={student.subscription != undefined} />
          </TableCell>
          <TableCell align="right">
            <Checkbox checked={student.isManager} />
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </Stack>
}