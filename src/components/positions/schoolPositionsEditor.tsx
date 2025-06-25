'use client'

import { IDetailedSchool } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import { Checkbox, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Close } from "@mui/icons-material";
import { SmallProfile, UserVerifier } from "@/components/profile";
import { TypePicker } from "./typePicker";

interface SchoolPositionsEditorProps {
  school: IDetailedSchool
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function SchoolPositionsEditor({school, setSchool}: SchoolPositionsEditorProps) {
  const t = useTranslations('positions');

  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    <Table>
      <TableBody>
        {school.staff.map((position, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <SmallProfile user={position.teacher.user} />
          </TableCell>
          <TableCell align='right'>
            <UserVerifier user={position.teacher.user} setUser={user => setSchool(
              s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, teacher: {...p.teacher, user}} : p)})
            )} />
          </TableCell>
          <TableCell align='right'>
            <TypePicker
              type={position.type}
              setType={type => setSchool(s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, type: type} : p)}))}
            />
          </TableCell>
          <TableCell align='right'>
            <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'flex-end'}}>
              <Typography variant='h6'>{t('is_manager')}</Typography>
              <Checkbox checked={position.isManager} onChange={() => setSchool(
                s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, isManager: !p.isManager} : p)})
              )} />
            </Stack>
          </TableCell>
          <TableCell align='right'>
            <Stack direction='row' gap={1} sx={{alignItems: 'center'}}>
              <Close color='primary' onClick={() => setSchool(s => ({...s, staff: s.staff.filter(p => p.id !== position.id)}))} />
            </Stack>
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </Stack>
}