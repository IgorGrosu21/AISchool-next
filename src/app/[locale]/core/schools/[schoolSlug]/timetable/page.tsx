import { NavigationContainer, TimetableStepper, Title } from "@/components"
import { errorHandler, fetchSchoolWithTimetable } from "@/utils/api"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const [schoolRaw, status] = await fetchSchoolWithTimetable(schoolSlug)
  const school = await errorHandler(schoolRaw, status)
  const t = await getTranslations('schools');
  
  return <NavigationContainer segments={[
      {label: t('list'), href: 'schools'},
      {label: school.name, href: schoolSlug}
    ]} last={t('timetable')}>
    <Title label={t('timetable')} link={`/core/schools/${schoolSlug}/timetable`} editable={school} />
    <TimetableStepper school={school} />
  </NavigationContainer>
}