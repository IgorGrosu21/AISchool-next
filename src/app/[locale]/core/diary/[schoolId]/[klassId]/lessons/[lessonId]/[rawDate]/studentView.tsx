'use client'

import { SmallProfile, SpecificLessonFiles, SpecificLessonLinks, SpecificLessonNote } from "@/components"
import { IDetailedSpecificLesson, IHomework } from "@/utils/interfaces"
import { Stack, Typography, TextField, Divider } from "@mui/material"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"
import { SpecificLessonFilesProvider, SpecificLessonLinksProvider } from "@/providers"

interface StudentViewProps {
  specificLesson: IDetailedSpecificLesson & {canEdit: false}
  setSpecificLesson: Dispatch<SetStateAction<IDetailedSpecificLesson>>
}

export function StudentView({specificLesson, setSpecificLesson}: StudentViewProps) {
  const student = useMemo(() => specificLesson.student, [specificLesson.student])
  const note = useMemo(() => specificLesson.note, [specificLesson.note])
  const newHomework: IHomework = useMemo(() => ({
    id: '',
    specificLesson: specificLesson.id,
    student: student.id,
    comment: '',
    links: '',
    lastModified: '',
    files: []
  }), [specificLesson.id, student.id])
  const [homework, setHomework] = useState(specificLesson.homework ?? newHomework)
  
  const t = useTranslations('timetable.specific_lessons')

  useEffect(() => {
    if (homework) {
      setSpecificLesson(s => s.canEdit ? s : {...s, homework})
    }
  }, [homework, setSpecificLesson])

  const updateHomeworkComment = useCallback((comment: string) => {
    setHomework(h => ({...(h ? h : newHomework), comment}))
  }, [newHomework])
  {/* updat especific homework after server action */}
  return <SpecificLessonLinksProvider value={{ setInstance: setHomework }}>
    <SpecificLessonFilesProvider value={{ setInstance: setHomework }}>
      <Stack gap={8}>
        <Stack direction='row' gap={4}>
          <SmallProfile user={specificLesson.lesson.teacher.user} disableLink extraSmall />
          <Divider orientation='vertical' flexItem />
          <Stack sx={{flex: 1, height: '100%', justifyContent: 'center'}}>
            <Typography variant='h5'>{t('comment')}:</Typography>
            <Typography variant='h6'>{note?.comment}</Typography>
          </Stack>
          <Divider orientation='vertical' flexItem />
          <Stack sx={{flex: 1, height: '100%', justifyContent: 'center'}}>
            <Typography variant='h5'>{t('last_modified')}:</Typography>
            <Typography variant='h6'>{note?.lastModified}</Typography>
          </Stack>
          <Divider orientation='vertical' flexItem />
        <SpecificLessonNote value={note?.value} />
        </Stack>
        <SpecificLessonLinks links={homework?.links} />
        <SpecificLessonFiles files={homework.files} filesData={homework.filesData} />
        <Stack direction='row'></Stack>
        <TextField label={t('comment')} value={homework?.comment ?? ''} onChange={e => updateHomeworkComment(e.target.value)} />
      </Stack>
    </SpecificLessonFilesProvider>
  </SpecificLessonLinksProvider>
}