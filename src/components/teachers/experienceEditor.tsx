'use client'

import { IDetailedTeacher } from "@/interfaces";
import { Stack, Typography, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface ExperienceEditorProps {
  teacher: IDetailedTeacher,
  setTeacher: Dispatch<SetStateAction<IDetailedTeacher>>
}

export function ExperienceEditor({teacher, setTeacher}: ExperienceEditorProps) {
  const t = useTranslations('teachers')

  return <Stack gap={2}>
    <Typography variant='h5'>{t('edit_experience')}</Typography>
    <TextField
      label={t('experience', {years: teacher.experience})}
      type='number'
      value={teacher.experience}
      onChange={(e) => setTeacher(t => ({...t, experience: Number(e.target.value)}))}
    />
  </Stack>
}