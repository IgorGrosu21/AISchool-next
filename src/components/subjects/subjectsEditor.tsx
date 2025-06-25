'use client'

import { ISubjectName } from "@/utils/interfaces";
import { Stack, Typography, Autocomplete, TextField, Checkbox, Box } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Subjects } from "@/components";

interface SubjectsEditorProps<T> {
  instance: T,
  setInstance: (instance: T) => void
  subjectNames: ISubjectName[],
  small?: boolean
}

export function SubjectsEditor<T extends {subjectNames: ISubjectName[]}>({instance, setInstance, subjectNames, small = false}: SubjectsEditorProps<T>) {
  const pickedSubjectsEditor = useMemo(() => instance.subjectNames, [instance.subjectNames])
  const t = useTranslations('subjects')
  
  return <Stack gap={4}>
    <Stack>
      <Typography variant='h5'>{t('pick')}</Typography>
      <Typography>{t('helper')}</Typography>
    </Stack>
    <Autocomplete
      multiple
      options={subjectNames}
      value={pickedSubjectsEditor}
      onChange={(_, newValue: ISubjectName[] | null) => setInstance({...instance, subjectNames: newValue ?? []})}
      disableCloseOnSelect
      getOptionLabel={(option) => option.verboseName}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <Box component='li' key={key} {...optionProps}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize='small' />}
              checkedIcon={<CheckBox fontSize='small' />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.verboseName}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={t('list')} placeholder={t('picked')} />
      )}
    />
    <Subjects subjectNames={pickedSubjectsEditor} small={small} />
  </Stack>
}