import { fetchSchoolNames, fetchStudent } from "@/utils/api";
import Container from "./container";
import { StudentEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { editStudent } from "@/app/actions/person";
import { NavigationContainer } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [student, schoolNames] = await Promise.all([fetchStudent(id), fetchSchoolNames()])
  const segments = [{label: `${student.user.name} ${student.user.surname}`, href: `students/${student.id}`}]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: StudentEditorContext,
      initial: student,
      action: editStudent,
      segments
    }}>
      <Container schoolNames={schoolNames} />
    </EditorProvider>
  </NavigationContainer>
}