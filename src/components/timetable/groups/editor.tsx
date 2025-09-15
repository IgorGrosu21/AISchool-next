'use client'

import { IGroupName, IPositionName, ISubjectName, ITeacherName, IKlassNameWithGroups } from "@/utils/interfaces"
import { useEffect, useMemo, useState } from "react";
import { SubjectsEditor } from "@/components/subjects";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Stack, Typography, Autocomplete, TextField, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { GroupsContainer } from "./container";
import { useGroupsEditor } from "@/hooks";

interface GroupsEditorProps {
  allSubjects: ISubjectName[]
  staff: IPositionName[]
  klass: IKlassNameWithGroups
  updateGroups: (groups: IGroupName[]) => void
}

export function GroupsEditor({allSubjects, staff, klass, updateGroups}: GroupsEditorProps) {
  const groups = useMemo(() => klass.groups, [klass])
  const [subjectsContainer, setSubjectsContainer] = useState<{ subjects: ISubjectName[] }>({ subjects: [] })
  const subjects = useMemo(() => subjectsContainer.subjects, [subjectsContainer])
  const { updateContainer, updateTeacher, transferStudent } = useGroupsEditor(klass, updateGroups)
  const t = useTranslations('timetable')

  useEffect(() => {
    setSubjectsContainer(c => ({...c, subjects: groups.filter(g => g.order === 1).map(g => g.subject)}))
  }, [groups])

  return <Stack gap={8}>
    <SubjectsEditor instance={subjectsContainer} setInstance={updateContainer} subjects={allSubjects} small />
    <GroupsContainer klass={klass} subjects={subjects} render={group => {
      const teachers = staff.filter(s => s.subjects.map(s => s.id).includes(group.subject.id)).map(s => s.teacher)
      const pairedGroup = groups.find(g => group.subject.id === g.subject.id && group.order !== g.order)
      return <>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={group.teacher ?? null}
          onChange={(_, t: ITeacherName | null) => updateTeacher(group, t)}
          options={teachers}
          renderInput={(params) => <TextField {...params} label={t('lessons.teacher')} />}
          getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
        />
        <Stack gap={1} sx={{p: 2}}>
          {group.students.map((student, k) => <Button
            key={k}
            sx={{justifyContent: 'space-between', alignItems: 'center'}}
            onClick={() => transferStudent(student, group, pairedGroup)}
          >
            <ArrowBack color='primary' sx={{opacity: group.order === 1 ? 0 : 1}} />
            <Typography variant='h6'>{student.user.surname} {student.user.name}</Typography>
            <ArrowForward color='primary' sx={{opacity: group.order === 2 ? 0 : 1}} />
          </Button>)}
        </Stack>
      </>
    }} />
  </Stack>
}