import { NavigationContainer, Calendar } from "@/components"
import { fetchLessonNames, fetchSchoolLessonTimeNames } from "@/utils/api"
import { getTranslations } from "next-intl/server"
import { CalendarProvider, DiaryProvider } from "@/providers"

export default async function Page({ params }: { params: Promise<{id: string, schoolSlug: string, rawDate: string}> }) {
  const { id, schoolSlug, rawDate } = await params

  const date = new Date(rawDate)
  const [school, lessons] = await Promise.all([
    fetchSchoolLessonTimeNames(schoolSlug),
    fetchLessonNames('teacher', id, schoolSlug)
  ])
  const t = await getTranslations('diary')

  return <NavigationContainer segments={[
    {label: t('singular'), href: `diary/teachers/${id}`},
  ]} last={rawDate}>
    <DiaryProvider value={{
      lessonTimes: school.timetable,
      lessons: lessons,
      accountType: 'teacher',
      personId: id,
      schoolSlug: schoolSlug,
      holidays: school.holidays
    }}>
      <CalendarProvider value={{currentDay: date}}>
        <Calendar />
      </CalendarProvider>
    </DiaryProvider>
  </NavigationContainer>
}