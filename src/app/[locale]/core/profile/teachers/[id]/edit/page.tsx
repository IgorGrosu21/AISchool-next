import { errorHandler, fetchSchoolNames, fetchSubjectsNames, fetchTeacher } from "@/utils/api";
import { Editor } from "./editor";
import { editTeacher } from "@/app/actions/person";
import { TeacherEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { NavigationContainer } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [[teacherRaw, teacherStatus], [schoolNamesRaw, schoolNamesStatus], [subjectsRaw, subjectsStatus]] = await Promise.all([
    fetchTeacher(id),
    fetchSchoolNames(),
    fetchSubjectsNames()
  ])
  const teacher = await errorHandler(teacherRaw, teacherStatus)
  const schoolNames = await errorHandler(schoolNamesRaw, schoolNamesStatus)
  const subjects = await errorHandler(subjectsRaw, subjectsStatus)
  const segments = [{label: `${teacher.user.name} ${teacher.user.surname}`, href: `profile/teachers/${teacher.id}`}]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: TeacherEditorContext,
      initial: teacher,
      action: editTeacher,
      segments
    }}>
      <Editor schoolNames={schoolNames} subjects={subjects} />
    </EditorProvider>
  </NavigationContainer>
}