'use server'

import { Subjects, SmallProfile, Panel } from "@/components";
import { IDetailedSchool } from "@/interfaces";
import { Grid2, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

interface SchoolPositionsProps {
  school: IDetailedSchool
}

export async function SchoolPositions({school}: SchoolPositionsProps) {
  const t = await getTranslations('positions');
  
  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    </Panel>
    <Stack gap={4}>
      {school.staff.map((position, i) => <Grid2 key={i} container spacing={4} columns={12}>
        <Grid2 size={{xs: 12, md: 4}}>
          <Panel sx={{height: '100%', justifyContent: 'center', alignItems: {xs: 'center', md: 'flex-start'}}}>
            <SmallProfile user={position.teacher.user} />
          </Panel>
        </Grid2>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: {xs: 'none', md: 'block'}}}>
          <Panel sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant='h6'>{t(position.type)}</Typography>
          </Panel>
        </Grid2>
        <Grid2 size={{xs: 12, md: 5}}>
          <Subjects subjects={position.subjects} small showText={false} />
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}