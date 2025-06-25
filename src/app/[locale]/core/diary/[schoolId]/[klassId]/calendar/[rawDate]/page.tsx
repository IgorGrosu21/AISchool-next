import { NavigationContainer, Calendar } from "@/components"
import { fetchKlassDiary } from "@/utils/api"
import { getTranslations } from "next-intl/server"
import { CalendarProvider } from "@/providers"

export default async function Page({ params }: { params: Promise<{schoolId: string, klassId: string, rawDate: string}> }) {
  const { schoolId, klassId, rawDate } = await params

  const date = new Date(rawDate)
  const klass = await fetchKlassDiary(schoolId, klassId)
  const t = await getTranslations('diary')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'diary'},
    {label: klass.school.name, href: schoolId},
  ]} last={`${klass.grade}${klass.letter}`} applyStyles={false}>
    <CalendarProvider value={{currentDay: date}}>
      <Calendar klass={klass} />
    </CalendarProvider>
  </NavigationContainer>
}