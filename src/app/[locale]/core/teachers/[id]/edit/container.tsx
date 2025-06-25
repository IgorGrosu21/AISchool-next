'use client'

import { IDetailedTeacher, ISchoolName, ISubjectName } from "@/utils/interfaces";
import { Divider } from "@mui/material";
import { ProfileContainerContainer as TeacherContainer, SubjectsEditor, TeacherPositionsEditor, ExperienceEditor } from "@/components";
import { useTeacherEditorContext } from "@/providers";

interface ContainerProps {
  schoolNames: ISchoolName[]
  subjectNames: ISubjectName[]
}

export default function Container({schoolNames, subjectNames}: ContainerProps) {
  const { instance: teacher, setInstance: setTeacher } = useTeacherEditorContext()

  return <TeacherContainer user={teacher.user} setUser={user => setTeacher(t => ({...t, user}))}>
    <ExperienceEditor teacher={teacher} setTeacher={setTeacher} />
    <SubjectsEditor<IDetailedTeacher> instance={teacher} setInstance={setTeacher} subjectNames={subjectNames} />
    <Divider />
    <TeacherPositionsEditor teacher={teacher} setTeacher={setTeacher} schoolNames={schoolNames} />
  </TeacherContainer>
}
