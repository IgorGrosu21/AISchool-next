'use client'

import { PickSchools, SchoolLink, SubjectsEditor } from "@/components"
import { Panel } from "@/ui"
import { IDetailedTeacher, IPosition, ISchoolName } from "@/interfaces"
import { Button, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"
import { TypePicker } from "../typePicker"

interface TeacherPositionsEditorProps {
  teacher: IDetailedTeacher
  setTeacher: Dispatch<SetStateAction<IDetailedTeacher>>
  schoolNames: ISchoolName[]
}

export function TeacherPositionsEditor({teacher, setTeacher, schoolNames}: TeacherPositionsEditorProps) {
  const dummyPosition: IPosition = useMemo(() => ({
    id: '',
    teacher: {
      id: teacher.id,
      user: teacher.user
    },
    school: {
      id: '',
      name: '',
      city: {
        id: '',
        name: ''
      },
      preview: '',
      slug: ''
    },
    subjects: [...teacher.subjects],
    type: 'T' as const,
    isManager: false
  }), [teacher])
  const [positions, setPositions] = useState<IPosition[]>(teacher.workPlaces.length === 0 ? [dummyPosition] : teacher.workPlaces)
  const t = useTranslations('positions')

  const schools = useMemo(() => positions.map(p => p.school), [positions])

  useEffect(() => {
    setTeacher(t => ({...t, workPlaces: positions}))
  }, [positions, setTeacher])

  const setSchools = useCallback((schools: ISchoolName[]) => {
    setPositions(ps => schools.map(s => ps.find(p => p.school.id === s.id) ?? {...dummyPosition, school: s}))
  }, [dummyPosition])

  const deletePosition = useCallback((i: number) => {
    setPositions(ps => ps.filter((_, j) => i !== j))
  }, [])

  return <Stack gap={4}>
    <PickSchools value={schools} setValue={setSchools} options={schoolNames} />
    <Stack gap={2}>
      {positions.map((position, i) => <Stack key={i} gap={2} direction='row'>
        <Panel gap={4} sx={{width: '100%'}}>
          <SchoolLink school={position.school} />
          <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{alignItems: 'center'}}>
            <Typography variant='h6'>{t('singular')}:</Typography>
            <TypePicker type={position.type} setType={type => setPositions(ps => ps.map((p, j) => i === j ? {...p, type: type} : p))} />
          </Stack>
          <Stack>
            <Typography variant='h5'>{t('pick_subjects')}</Typography>
            <Typography>{t('helper_subjects')}</Typography>
          </Stack>
          <SubjectsEditor<IPosition>
            instance={position}
            setInstance={instance => setPositions(ps => ps.map((p, j) => j === i ? instance : p))}
            subjects={teacher.subjects}
            small
            sx={{
              background: 'unset',
              boxShadow: 'unset',
              backdropFilter: 'unset',
              border: 'unset',
            }}
          />
          <Stack direction='row' sx={{justifyContent: 'flex-end'}}>
            <Button variant='contained' onClick={() => deletePosition(i)}>{t('delete')}</Button>
          </Stack>
        </Panel>
      </Stack>)}
    </Stack>
  </Stack>
}