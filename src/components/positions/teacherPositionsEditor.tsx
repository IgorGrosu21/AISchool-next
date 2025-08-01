'use client'

import { PickSchools, SchoolLink, SubjectsEditor } from "@/components"
import { IDetailedTeacher, IPosition, ISchoolName } from "@/utils/interfaces"
import { Button, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"
import { TypePicker } from "./typePicker"

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
      preview: ''
    },
    subjectNames: [...teacher.subjectNames],
    type: 'T',
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

  return <Stack gap={8}>
    <PickSchools value={schools} setValue={setSchools} options={schoolNames} />
    <Stack gap={8}>
      {positions.map((position, i) => <Stack key={i} gap={2} direction='row'>
        <Stack gap={2} sx={{width: '100%'}}>
          <SchoolLink school={position.school} />
          <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
            <Typography variant='h6'>{t('singular')}:</Typography>
            <TypePicker type={position.type} setType={type => setPositions(ps => ps.map((p, j) => i === j ? {...p, type: type} : p))} />
          </Stack>
          <SubjectsEditor<IPosition>
            instance={position}
            setInstance={instance => setPositions(ps => ps.map((p, j) => j === i ? instance : p))}
            subjectNames={teacher.subjectNames}
            small
          />
          <Stack direction='row' sx={{justifyContent: 'flex-end'}}>
            <Button variant='contained' onClick={() => deletePosition(i)}>{t('delete')}</Button>
          </Stack>
        </Stack>
      </Stack>)}
    </Stack>
  </Stack>
}