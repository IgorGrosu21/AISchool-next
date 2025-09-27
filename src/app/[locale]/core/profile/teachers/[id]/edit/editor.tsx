'use client'

import { IDetailedTeacher, ISchoolName, ISubjectName } from "@/interfaces";
import { Stack, Typography } from "@mui/material";
import { ProfileContainer as TeacherContainer, SubjectsEditor, TeacherPositionsEditor, ExperienceEditor } from "@/components";
import { Panel } from "@/ui";
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
    <Panel>
      <ExperienceEditor teacher={teacher} setTeacher={setTeacher} />
    </Panel>
    <Panel gap={2}>
      <Stack>
        <Typography variant='h5'>{t('pick_subjects')}</Typography>
        <Typography>{t('helper_subjects')}</Typography>
      </Stack>
      <SubjectsEditor<IDetailedTeacher> instance={teacher} setInstance={setTeacher} subjects={subjects} sx={{
        background: 'unset',
        boxShadow: 'unset',
        backdropFilter: 'unset',
        border: 'unset',
      }} />
    </Panel>
    <TeacherPositionsEditor teacher={teacher} setTeacher={setTeacher} schoolNames={schoolNames} />
  </TeacherContainer>
}
