import { fetchKlass } from "@/utils/api"
import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import { NavigationContainer, Students, KlassLessons, KlassGroups, Title } from "@/components"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, slug: string}> }) {
  const { schoolSlug, slug } = await params
  const klass = await fetchKlass(schoolSlug, slug)
  const t = await getTranslations('klasses');

  return <NavigationContainer segments={[
      {label: t('school_list'), href: 'schools'},
      {label: klass.school.name, href: schoolSlug},
      {label: t('list'), href: 'klasses'}
    ]} last={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}>
    <Title
      label={`${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`}
      link={`/core/schools/${schoolSlug}/klasses/${slug}`}
      editable={klass}
    />
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('timetable')}:</Typography>
    <KlassLessons groups={klass.groups} timetable={klass.school.timetable} lessons={klass.lessons} />
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('groups')}:</Typography>
    <KlassGroups klass={klass} />
    <Students students={klass.students} />
  </NavigationContainer>
}