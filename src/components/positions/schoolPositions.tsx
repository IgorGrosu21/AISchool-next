'use server'

import { Subjects, SmallProfile } from "@/components";
import { IDetailedSchool } from "@/utils/interfaces";
import { Grid2, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

interface SchoolPositionsProps {
  school: IDetailedSchool
}

export async function SchoolPositions({school}: SchoolPositionsProps) {
  const t = await getTranslations('positions');
  
  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('staff')}</Typography>
    <Stack gap={4}>
      {school.staff.map((position, i) => <Grid2 key={i} container spacing={4} columns={12}>
        <Grid2 size={{xs: 12, md: 3}} sx={{display: 'flex', justifyContent: 'center'}}>
          <SmallProfile user={position.teacher.user} />
        </Grid2>
        <Grid2 size={{xs: 12, md: 4}} sx={{display: {xs: 'none', md: 'flex'}, justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant='h6'>{t(position.type)}</Typography>
        </Grid2>
        <Grid2 size={{xs: 12, md: 5}}>
          <Subjects subjects={position.subjects} small showText={false} />
        </Grid2>
      </Grid2>)}
    </Stack>
  </Stack>
}