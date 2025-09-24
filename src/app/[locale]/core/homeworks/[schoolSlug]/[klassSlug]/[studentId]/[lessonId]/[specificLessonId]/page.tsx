import { editHomework } from "@/app/actions"
import { NavigationContainer } from "@/components"
import { EditorProvider, HomeworkEditorContext } from "@/providers"
import { format } from "date-fns"
import { ru } from "date-fns/locale/ru";
import { getTranslations } from "next-intl/server"
import { Editor } from "./editor"
import { errorHandler, fetchHomework } from "@/requests"

interface Params {
  schoolSlug: string
  klassSlug: string
  studentId: string
  lessonId: string
  specificLessonId: string
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { schoolSlug, klassSlug, lessonId, specificLessonId, studentId } = await params
  
  const [homeworkRaw, status] = await fetchHomework(schoolSlug, klassSlug, lessonId, specificLessonId, studentId)
  const homework = await errorHandler(homeworkRaw, status)
  const specificLesson = homework.specificLesson
  const date = new Date(specificLesson.date)
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
      Context: HomeworkEditorContext,
      initial: homework,
      action: editHomework,
      segments: [{
        label: '',
        href: `diary/students/${studentId}/${schoolSlug}/${format(date, 'y.M.d')}`
      }]
    }}>
      <Editor date={dateLabel} />
    </EditorProvider>
  </NavigationContainer>
}