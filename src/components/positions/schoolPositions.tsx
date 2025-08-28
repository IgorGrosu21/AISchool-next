'use server'

import { Subjects, SmallProfile } from "@/components";
import { IDetailedSchool } from "@/utils/interfaces";
import { Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

interface SchoolPositionsProps {
  school: IDetailedSchool
}

export async function SchoolPositions({school}: SchoolPositionsProps) {
  const t = await getTranslations('positions');
  
  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    <Table>
      <TableBody>
        {school.staff.map((position, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <Typography variant='h6'>{i + 1}.</Typography>
          </TableCell>
          <TableCell>
            <SmallProfile user={position.teacher.user} />
          </TableCell>
          <TableCell>
            <Typography variant='h6'>{t(position.type)}</Typography>
          </TableCell>
          <TableCell>
            <Subjects subjects={position.subjects} small showText={false} />
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </Stack>
}