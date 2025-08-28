import { NavigationContainer, StudentNoteList } from "@/components"
import { JournalProvider } from "@/providers"
import { fetchStudiedSubjects } from "@/utils/api"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{id: string, period: string}> }) {
  const { id, period } = await params

  const subjects = await fetchStudiedSubjects(id)
  const t = await getTranslations('journal')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'}
  ]} last={period} applyStyles={false}>
    <JournalProvider value={{
      personId: id,
      period,
      groups: subjects.map(subject => ({
        id: subject.id,
        name: subject.verboseName,
        notes: []
      }))
    }}>
      <StudentNoteList
        subjects={subjects}
      /> 
    </JournalProvider>
  </NavigationContainer>
}