'use client'

import { ISubjectName } from "@/interfaces";
import { Stack, Autocomplete, TextField, Checkbox, Box, type StackProps } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Subjects } from "@/components";

interface SubjectsEditorProps<T> extends StackProps {
  instance: T,
  setInstance: (instance: T) => void
  subjects: ISubjectName[],
  small?: boolean
}

export function SubjectsEditor<T extends {subjects: ISubjectName[]}>({instance, setInstance, subjects, small = false, ...props}: SubjectsEditorProps<T>) {
  const pickedSubjects = useMemo(() => instance.subjects, [instance.subjects])
  const t = useTranslations('subjects')
  
  return <Stack gap={4}>
    <Autocomplete
      multiple
      options={subjects}
      value={pickedSubjects}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue: ISubjectName[] | null) => setInstance({...instance, subjects: newValue ?? []})}
      disableCloseOnSelect
      getOptionLabel={(option) => option.verboseName}
      renderOption={({key, ...props}, option, { selected }) => {
        return <Box component='li' key={key} {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize='small' />}
            checkedIcon={<CheckBox fontSize='small' />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.verboseName}
        </Box>
      }}
      renderInput={(params) => (
        <TextField {...params} label={t('list')} placeholder={t('picked')} />
      )}
    />
    <Subjects subjects={pickedSubjects} small={small} {...props} />
  </Stack>
}