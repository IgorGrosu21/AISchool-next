import { KlassList, NavigationContainer } from "@/components"
import { fetchSchoolWithKlasses } from "@/utils/api"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolId: string}> }) {
  const { schoolId } = await params

  const school = await fetchSchoolWithKlasses(schoolId)
  const t = await getTranslations('diary')

  return <NavigationContainer segments={[{label: t('singular'), href: 'diary'}]} last={school.name}>
    <KlassList klasses={school.klasses} baseHref={`diary/${school.id}`} />
  </NavigationContainer>
}