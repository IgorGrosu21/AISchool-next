'use client'

import { IDetailedTeacher, ISchoolName, ISubjectName } from "@/utils/interfaces";
import { Divider, Stack, Typography } from "@mui/material";
import { ProfileContainer as TeacherContainer, SubjectsEditor, TeacherPositionsEditor, ExperienceEditor } from "@/components";
import { useTeacherEditorContext } from "@/providers";
import { useTranslations } from "next-intl";

interface ContainerProps {
  schoolNames: ISchoolName[]
  subjects: ISubjectName[]
}

export default function Container({schoolNames, subjects}: ContainerProps) {
  const { instance: teacher, setInstance: setTeacher } = useTeacherEditorContext()
  const t = useTranslations('positions')

  return <TeacherContainer user={teacher.user} setUser={user => setTeacher(t => ({...t, user}))}>
    <ExperienceEditor teacher={teacher} setTeacher={setTeacher} />
    <Stack>
      <Typography variant='h5'>{t('pick')}</Typography>
      <Typography>{t('helper')}</Typography>
    </Stack>
    <SubjectsEditor<IDetailedTeacher> instance={teacher} setInstance={setTeacher} subjects={subjects} />
    <Divider />
    <TeacherPositionsEditor teacher={teacher} setTeacher={setTeacher} schoolNames={schoolNames} />
  </TeacherContainer>
}
