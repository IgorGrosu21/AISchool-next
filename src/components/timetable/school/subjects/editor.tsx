'use client'

import React, { Dispatch, SetStateAction } from "react"
import { SubjectsEditor as SubjectListEditor } from "@/components/subjects"
import { ISchoolWithTimetable, ISubjectName } from "@/utils/interfaces"
import { Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"

interface SubjectsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
  subjects: ISubjectName[]
}

export function SubjectsEditor({school, setSchool, subjects}: SubjectsEditorProps) {
  const t = useTranslations('timetable.subjects')
  
  return <Stack gap={4}>
    <Stack gap={2}>
      <Typography variant='h5'>{t('pick')}</Typography>
      <Typography>{t('helper')}</Typography>
    </Stack>
    <SubjectListEditor instance={school} setInstance={setSchool} subjects={subjects} />
  </Stack>
}