import { editHomework, editSpecificLesson } from "@/app/actions/lesson"
import { NavigationContainer } from "@/components"
import { EditorProvider, SpecificLessonEditorContext } from "@/providers"
import { fetchSpecificLesson } from "@/utils/api"
import { format } from "date-fns"
import { ru } from "date-fns/locale/ru";
import { getTranslations } from "next-intl/server"
import { Container } from "./container"

export default async function Page({ params }: { params: Promise<{schoolId: string, klassId: string, lessonId: string, rawDate: string}> }) {
  const { schoolId, klassId, lessonId, rawDate } = await params
  const date = new Date(rawDate)

  const specificLesson = await fetchSpecificLesson(schoolId, klassId, lessonId, rawDate)
  const lesson = specificLesson.lesson
  const klass = lesson.klass
  const school = klass.school
  const t = await getTranslations('diary')
  const dateLabel = `${format(date, ' EEEE, d MMMM', { locale: ru })}`

  const segments = [
    {label: t('singular'), href: 'diary'},
    {label: school.name, href: schoolId},
    {label: `${klass.grade}${klass.letter}`, href: klassId},
    {
      label: `${lesson.subjectName.verboseName}`,
      href: lessonId
    }
  ]
  
  return <NavigationContainer segments={segments} last={`${dateLabel}, ${lesson.lessonTime.starting}`}>
    <EditorProvider value={{
      Context: SpecificLessonEditorContext,
      initial: specificLesson,
      action: specificLesson.canEdit ? editSpecificLesson : editHomework,
      segments: [{
        label: '',
        href: `diary/${schoolId}/${klassId}/calendar/${rawDate}`
      }]
    }}>
      <Container date={dateLabel} />
    </EditorProvider>
  </NavigationContainer>
}