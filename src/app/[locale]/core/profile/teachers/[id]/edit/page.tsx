import { fetchSchoolNames, fetchSubjectsNames, fetchTeacher } from "@/utils/api";
import { Editor } from "./editor";
import { editTeacher } from "@/app/actions/person";
import { TeacherEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { NavigationContainer } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [teacher, schoolNames, subjects] = await Promise.all([fetchTeacher(id), fetchSchoolNames(), fetchSubjectsNames()])
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