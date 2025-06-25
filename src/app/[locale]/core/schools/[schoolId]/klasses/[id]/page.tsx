import { fetchKlass } from "@/utils/api"
import { Stack, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import { EditButton, KlassLink, NavigationContainer, SmallProfile, Students, KlassLessons } from "@/components"

export default async function Page({ params }: { params: Promise<{schoolId: string, id: string}> }) {
  const { schoolId, id } = await params
  const klass = await fetchKlass(schoolId, id)
  const t = await getTranslations('klasses');

  return <NavigationContainer segments={[
      {label: t('school_list'), href: 'schools'},
      {label: klass.school.name, href: schoolId},
      {label: t('list'), href: 'klasses'}
    ]} last={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <KlassLink klass={klass} />
      <EditButton link={`/core/schools/${schoolId}/klasses/${id}`} editable={klass} />
    </Stack>
      {klass.teacher && <SmallProfile user={klass.teacher.user} />}
    <Typography variant='h5'>{t('timetable')}:</Typography>
    <KlassLessons timetable={klass.school.timetable} lessons={klass.timetable} />
    <Students students={klass.students} />
  </NavigationContainer>
}