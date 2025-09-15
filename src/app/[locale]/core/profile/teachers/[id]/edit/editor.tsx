'use client'

import { IDetailedTeacher, ISchoolName, ISubjectName } from "@/utils/interfaces";
import { Stack, Typography } from "@mui/material";
import { ProfileContainer as TeacherContainer, SubjectsEditor, TeacherPositionsEditor, ExperienceEditor, ClientPanel } from "@/components";
import { useTeacherEditorContext } from "@/providers";
import { useTranslations } from "next-intl";

interface ContainerProps {
  schoolNames: ISchoolName[]
  subjects: ISubjectName[]
}

export function Editor({schoolNames, subjects}: ContainerProps) {
  const { instance: teacher, setInstance: setTeacher } = useTeacherEditorContext()
  const t = useTranslations('positions')

  return <TeacherContainer user={teacher.user} setUser={user => setTeacher(t => ({...t, user}))}>
    <ClientPanel>
      <ExperienceEditor teacher={teacher} setTeacher={setTeacher} />
    </ClientPanel>
    <ClientPanel gap={2}>
      <Stack>
        <Typography variant='h5'>{t('pick_subjects')}</Typography>
        <Typography>{t('helper_subjects')}</Typography>
      </Stack>
      <SubjectsEditor<IDetailedTeacher> instance={teacher} setInstance={setTeacher} subjects={subjects} />
    </ClientPanel>
    <TeacherPositionsEditor teacher={teacher} setTeacher={setTeacher} schoolNames={schoolNames} />
  </TeacherContainer>
}
