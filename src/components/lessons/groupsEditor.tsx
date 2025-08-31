'use client'

import { IGroupName, IPositionName, IStudentName, ISubjectName, ITeacherName, IKlassNameWithGroups } from "@/utils/interfaces"
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubjectsEditor } from "@/components/subjects";
import { ArrowForwardIosSharp, ArrowBack, ArrowForward } from "@mui/icons-material";
import { Stack, Accordion, AccordionSummary, Typography, AccordionDetails, Autocomplete, TextField, Button } from "@mui/material";
import { useTranslations } from "next-intl";

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
  const [active, setActive] = useState(-1)
  const t = useTranslations('timetable')

  useEffect(() => {
    setSubjectsContainer(c => ({...c, subjects: groups.filter(g => g.order === 1).map(g => g.subject)}))
  }, [groups])

  const isSameGroup = useCallback((g1: IGroupName, g2: IGroupName) => {
    return g1.order === g2.order && g1.subject.id === g2.subject.id
  }, [])

  const updateContainer = useCallback((instance: {subjects: ISubjectName[]}) => {
    const groupsToDelete: IGroupName[] = []
    const groupsToAdd: IGroupName[] = []
    for (const subject of instance.subjects) {
      const group = groups.find(g => g.subject.id === subject.id)
      if (group === undefined) {
        groupsToAdd.push({
          id: '',
          order: 1,
          klass: klass.id,
          subject: subject,
          students: klass.students
        })
      }
    }
    for (const group of groups) {
      const subject = instance.subjects.find(s => s.id === group.subject.id)
      if (subject === undefined) {
        groupsToDelete.push(group)
      }
    }

    const newGroups: IGroupName[] = []
    for (const group of groups) {
      const toDelete = groupsToDelete.findIndex(g => g.subject.id === group.subject.id) > -1
      if (!toDelete) {
        newGroups.push(group)
      }
    }
    for (const group of groupsToAdd) {
      newGroups.push(group)
      newGroups.push({...group, order: 2, students: []})
    }
    updateGroups(newGroups)
  }, [groups, klass, updateGroups])

  const updateTeacher = useCallback((group: IGroupName, teacher: ITeacherName | null) => {
    updateGroups(groups.map(
      g => g.order === group.order && g.subject.id === group.subject.id ? {...g, teacher: teacher ?? undefined} : g
    ))
  }, [groups, updateGroups])

  const transferStudent = useCallback((student: IStudentName, oldGroup: IGroupName, newGroup?: IGroupName) => {
    if (newGroup === undefined) {
      return
    }
    updateGroups(groups.map(g => {
      if (isSameGroup(g, oldGroup)) {
        return {...g, students: g.students.filter(s => s.id !== student.id)}
      } else if (isSameGroup(g, newGroup)) {
        return {...g, students: [...g.students, student]}
      }
      return g
    }))
  }, [groups, isSameGroup, updateGroups])

  return <Stack gap={8}>
    <SubjectsEditor instance={subjectsContainer} setInstance={updateContainer} subjects={allSubjects} small />
    <Stack>
    {subjects.map((subject, i) => {
      const subjectGroups = groups.filter(g => g.subject.id === subject.id)
      const teachers = staff.filter(s => s.subjects.map(s => s.id).includes(subject.id)).map(s => s.teacher)
      return <Accordion key={i} expanded={active === i} onChange={() => setActive(active === i ? -1 : i)}>
        <AccordionSummary expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}>
          <Typography component="span">{subject.verboseName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={{xs: 'column', md: 'row'}} gap={4}>
            {subjectGroups.map((group, j) => {
              const pairedGroup = groups.find(g => group.subject.id === g.subject.id && group.order !== g.order)
              return <Stack key={j} sx={{flex: 1}} gap={4}>
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
              </Stack>
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    })}
    </Stack>
  </Stack>
}