'use client'

import { IDetailedSchool } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import { Box, Checkbox, Grid2, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Close } from "@mui/icons-material";
import { UserVerifier, ClientPanel } from "@/components";
import { TypePicker } from "../typePicker";

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
        <Grid2 size={{xs: 12, md: 5}}>
          <ClientPanel sx={{height: '100%', justifyContent: 'center'}}>
            <UserVerifier user={position.teacher.user} setUser={user => setSchool(
              s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, teacher: {...p.teacher, user}} : p)})
            )} />
          </ClientPanel>
        </Grid2>
        <Grid2 size={{xs: 12, md: 4}}>
          <ClientPanel sx={{height: '100%', justifyContent: 'center'}}>
            <TypePicker
              type={position.type}
              setType={type => setSchool(s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, type: type} : p)}))}
            />
          </ClientPanel>
        </Grid2>
        <Grid2 size={{xs: 12, md: 3}}>
          <ClientPanel direction='row' sx={{height: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Box />
            <Typography variant='h6'>{t('is_manager')}</Typography>
            <Checkbox checked={position.isManager} onChange={() => setSchool(
              s => ({...s, staff: s.staff.map((p, j) => i === j ? {...p, isManager: !p.isManager} : p)})
            )} />
            <Close color='primary' onClick={() => setSchool(s => ({...s, staff: s.staff.filter(p => p.id !== position.id)}))} />
          </ClientPanel>
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}