import { NavigationContainer, TeacherNoteList } from "@/components"
import { JournalProvider } from "@/providers"
import { fetchKlass } from "@/utils/api"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{id: string, schoolSlug: string, klassSlug: string, subjectSlug: string, period: string}> }) {
  const { id, schoolSlug, klassSlug, subjectSlug, period } = await params

  const klass = await fetchKlass(schoolSlug, klassSlug)
  const school = klass.school
  const t = await getTranslations('journal')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'},
    {label: school.name, href: `teachers/${id}/${schoolSlug}`},
    {label: `${klass.grade}${klass.letter}`, href: klassSlug},
  ]} last={period} applyStyles={false}>
    <JournalProvider value={{
      personId: id,
      period,
      groups: klass.students.map(student => ({
        id: student.id,
        name: `${student.user.surname} ${student.user.name}`,
        notes: []
      }))
    }}>
      <TeacherNoteList
        klass={klass}
        subjectSlug={subjectSlug}
      /> 
    </JournalProvider>
  </NavigationContainer>
}