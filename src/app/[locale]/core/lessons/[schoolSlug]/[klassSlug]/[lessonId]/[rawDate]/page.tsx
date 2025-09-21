import { editSpecificLesson } from "@/app/actions/lesson"
import { NavigationContainer } from "@/components"
import { EditorProvider, SpecificLessonEditorContext } from "@/providers"
import { errorHandler, fetchSpecificLesson } from "@/utils/api"
import { format } from "date-fns"
import { ru } from "date-fns/locale/ru";
import { getTranslations } from "next-intl/server"
import { Editor } from "./editor"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string, lessonId: string, rawDate: string}> }) {
  const { schoolSlug, klassSlug, lessonId, rawDate } = await params
  const date = new Date(rawDate)

  const [specificLessonRaw, status] = await fetchSpecificLesson(schoolSlug, klassSlug, lessonId, rawDate)
  const specificLesson = await errorHandler(specificLessonRaw, status)
  const lesson = specificLesson.lesson
  const klass = lesson.klass
  const school = klass.school
  const t = await getTranslations('timetable.lessons')
  const dateLabel = `${format(date, ' EEEE, d MMMM', { locale: ru })}`

  const segments = [
    {label: t('plural'), href: 'lessons'},
    {label: school.name, href: schoolSlug},
    {label: `${klass.grade}${klass.letter}`, href: klassSlug},
    {label: `${lesson.subject.verboseName}`, href: lessonId}
  ]
  
  return <NavigationContainer segments={segments} last={`${dateLabel}, ${lesson.lessonTime.starting}`}>
    <EditorProvider value={{
      Context: SpecificLessonEditorContext,
      initial: specificLesson,
      action: editSpecificLesson,
      segments: [{
        label: '',
        href: `diary/${schoolSlug}/${klassSlug}/calendar/${rawDate}`
      }]
    }}>
      <Editor date={dateLabel} />
    </EditorProvider>
  </NavigationContainer>
}