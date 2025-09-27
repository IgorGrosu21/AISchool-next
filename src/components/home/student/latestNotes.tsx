'use client'

import { Note, SmallProfile } from "@/components"
import { Card } from "@/ui"
import { INote, IPersonHome } from "@/interfaces"
import { Box, Grid2, Stack, Typography } from "@mui/material"
import { Link } from "@/i18n"
import { useCallback } from "react"

interface LatestNotesProps {
  latestNotes: (IPersonHome & { profileType: 'student' })['latestNotes']
}

export function LatestNotes({latestNotes}: LatestNotesProps) {
  const getLink = useCallback((note: INote) => {
    const specificLesson = note.specificLesson
    const lesson = specificLesson.lesson
    const klass = lesson.klass
    const school = klass.school
    const personId = note.student.id

    return `/core/homeworks/${school.slug}/${klass.slug}/${personId}/${lesson.id}/${specificLesson.id}`
  }, [])

  return <Grid2 container spacing={4}>
    {latestNotes.map((note, index) => <Grid2 size={{ xs: 12, md: 6 }} key={index}>
      <Card index={index}>
        <Link href={getLink(note)} style={{display: 'block', height: '100%'}}>
          <Stack gap={2} sx={{height: '100%'}}>
            <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{
              justifyContent: 'space-between',
              alignItems: {xs: 'center', md: 'flex-start'}
            }}>
              <Stack gap={1} sx={{alignItems: {xs: 'center', md: 'flex-start'}}}>
                <Typography variant="h6" color='primary'>
                  {note.specificLesson.title}
                </Typography>
                <Typography variant="h6" sx={{color: 'text.primary'}}>
                  {note.specificLesson.desc}
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{color: 'text.secondary'}}>
                {note.specificLesson.date}
              </Typography>
            </Stack>
            <Box sx={{flex: 1}} />
            <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
              <Box>
                {note.specificLesson.lesson.teacher?.user && <SmallProfile
                  user={note.specificLesson.lesson.teacher.user}
                  disableLink
                />}
              </Box>
              <Note big={true} value={note.value} />
            </Stack>
          </Stack>
        </Link>
      </Card>
    </Grid2>)}
  </Grid2>
}