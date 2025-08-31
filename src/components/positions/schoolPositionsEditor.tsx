'use client'

import { IDetailedSchool } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import { Box, Checkbox, Grid2, Stack, Typography } from "@mui/material";
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
    <Stack gap={4}>
      {school.staff.map((position, i) => <Grid2 key={i} container spacing={4} columns={12}>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: 'flex', justifyContent: 'center'}}>
          <SmallProfile user={position.teacher.user} />
        </Grid2>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: 'flex', justifyContent: 'center'}}>
          <UserVerifier user={position.teacher.user} setUser={user => setSchool(
            s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, teacher: {...p.teacher, user}} : p)})
          )} />
        </Grid2>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: 'flex', justifyContent: 'center'}}>
          <TypePicker
            type={position.type}
            setType={type => setSchool(s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, type: type} : p)}))}
          />
        </Grid2>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: 'flex', justifyContent: 'center'}}>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={position.isManager} onChange={() => setSchool(
              s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, isManager: !p.isManager} : p)})
            )} />
            <Box sx={{flex: 1}} />
            <Close color='primary' onClick={() => setSchool(s => ({...s, staff: s.staff.filter(p => p.id !== position.id)}))} />
          </Stack>
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}