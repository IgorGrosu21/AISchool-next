import { fetchSchoolNames, fetchSubjectsNames, fetchTeacher } from "@/utils/api";
import Container from "./container";
import { editTeacher } from "@/app/actions/person";
import { TeacherEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { NavigationContainer } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [teacher, schoolNames, subjectNames] = await Promise.all([fetchTeacher(id), fetchSchoolNames(), fetchSubjectsNames()])
  const segments = [{label: `${teacher.user.name} ${teacher.user.surname}`, href: `teachers/${teacher.id}`}]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: TeacherEditorContext,
      initial: teacher,
      action: editTeacher,
      segments
    }}>
      <Container schoolNames={schoolNames} subjectNames={subjectNames} />
    </EditorProvider>
  </NavigationContainer>
}