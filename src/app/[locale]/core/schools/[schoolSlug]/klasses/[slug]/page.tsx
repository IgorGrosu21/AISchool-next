import { fetchKlass } from "@/utils/api"
import { Stack, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import { EditButton, KlassLink, NavigationContainer, SmallProfile, Students, KlassLessons, KlassGroups } from "@/components"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, slug: string}> }) {
  const { schoolSlug, slug } = await params
  const klass = await fetchKlass(schoolSlug, slug)
  const t = await getTranslations('klasses');

  return <NavigationContainer segments={[
      {label: t('school_list'), href: 'schools'},
      {label: klass.school.name, href: schoolSlug},
      {label: t('list'), href: 'klasses'}
    ]} last={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <KlassLink klass={klass} />
      <EditButton link={`/core/schools/${schoolSlug}/klasses/${slug}`} editable={klass} />
    </Stack>
    {klass.teacher && <SmallProfile user={klass.teacher.user} />}
    <Typography variant='h5'>{t('timetable')}:</Typography>
    <KlassLessons groups={klass.groups} timetable={klass.school.timetable} lessons={klass.lessons} />
    <Typography variant='h5'>{t('groups')}:</Typography>
    <KlassGroups klass={klass} />
    <Students students={klass.students} />
  </NavigationContainer>
}