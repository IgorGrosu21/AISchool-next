'use client'

import { useSpecificLessonEditorContext } from '@/providers'
import { Divider, Stack } from '@mui/material'
import { Header } from './header'
import { TeacherView } from './teacherView'
import { StudentView } from './studentView'

interface ContainerProps {
  date: string
}

export function Container({date}: ContainerProps) {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()

  return <Stack gap={8}>
    <Header date={date} />
    <Divider />
    {specificLesson.canEdit ? <TeacherView
      specificLesson={specificLesson}
      setSpecificLesson={setSpecificLesson}
    /> : <StudentView
      specificLesson={specificLesson}
      setSpecificLesson={setSpecificLesson}
    />}
  </Stack>
}