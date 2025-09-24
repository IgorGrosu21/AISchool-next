'use client'

import { IDetailedHomework, IPersonHome } from "@/interfaces"
import { Grid2 } from "@mui/material"
import { Card } from "@/ui"
import { Link } from "@/i18n"
import { Stack, Typography, Box } from "@mui/material"
import { Note, SmallProfile } from "@/components"
import { useCallback } from "react"

interface LatestHomeworksProps {
  latestHomeworks: (IPersonHome & { profileType: 'teacher' })['latestHomeworks']
}

export function LatestHomeworks({latestHomeworks}: LatestHomeworksProps) {
  const getLink = useCallback((homework: IDetailedHomework) => {
    const specificLesson = homework.specificLesson
    const lesson = specificLesson.lesson
    const klass = lesson.klass
    const school = klass.school
    const personId = homework.student.id

    return `/core/homeworks/${school.slug}/${klass.slug}/${personId}/${lesson.id}/${specificLesson.id}`
  }, [])

  return <Grid2 container spacing={4} sx={{width: '100%'}}>
    {latestHomeworks.map((homework, index) => <Grid2 size={{ xs: 12, md: 6 }} key={index}>
      <Card index={index}>
        <Link href={getLink(homework)} style={{display: 'block', height: '100%'}}>
          <Stack gap={2} sx={{height: '100%'}}>
            <Stack direction="row" gap={2} sx={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <Stack gap={1} sx={{alignItems: 'flex-start'}}>
                <Typography variant="h6" color='primary'>
                  {homework.specificLesson.title}
                </Typography>
                <Typography variant="h6" sx={{color: 'text.primary'}}>
                  {homework.specificLesson.desc}
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{color: 'text.secondary'}}>
                {homework.specificLesson.date}
              </Typography>
            </Stack>
            <Box sx={{flex: 1}} />
            <Stack direction="row" gap={2} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
              <SmallProfile user={homework.student.user} disableLink />
              <Note big={true} value={homework.note?.value} />
            </Stack>
          </Stack>
        </Link>
      </Card>
    </Grid2>)}
  </Grid2>
}