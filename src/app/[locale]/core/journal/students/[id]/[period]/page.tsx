import { NavigationContainer, StudentNoteList } from "@/components"
import { JournalProvider } from "@/providers"
import { errorHandler, fetchStudiedSubjects } from "@/utils/api"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{id: string, period: string}> }) {
  const { id, period } = await params

  const [subjectsRaw, status] = await fetchStudiedSubjects(id)
  const subjects = await errorHandler(subjectsRaw, status)
  const t = await getTranslations('journal')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'}
  ]} last={period}>
    <JournalProvider value={{
      personId: id,
      period,
      groups: subjects.map(subject => ({
        id: subject.id,
        name: subject.verboseName,
        notes: []
      }))
    }}>
      <StudentNoteList subjects={subjects} /> 
    </JournalProvider>
  </NavigationContainer>
}