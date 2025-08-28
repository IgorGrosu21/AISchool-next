import { EditButton, NavigationContainer, TimetableStepper } from "@/components"
import { fetchSchoolWithTimetable } from "@/utils/api"
import { Stack, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const school = await fetchSchoolWithTimetable(schoolSlug)
  const t = await getTranslations('schools');
  
  return <NavigationContainer segments={[
      {label: t('list'), href: 'schools'},
      {label: school.name, href: schoolSlug}
    ]} last={t('timetable')}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant='h4'>{t('timetable')}</Typography>
      <EditButton link={`/core/schools/${schoolSlug}/timetable`} editable={school} />
    </Stack>
    <TimetableStepper school={school} />
  </NavigationContainer>
}