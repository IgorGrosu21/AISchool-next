'use client'

import { SmallProfile } from "@/components"
import { LandingCard } from "../../utils"
import { IPersonHome, ISpecificLesson } from "@/utils/interfaces"
import { Box, Grid2, Stack, Typography } from "@mui/material"
import { Link } from "@/i18n"
import { useCallback } from "react"

interface LatestSpecificLessonsProps {
  latestSpecificLessons: (IPersonHome & { profileType: 'student' })['latestSpecificLessons']
}

export function LatestSpecificLessons({latestSpecificLessons}: LatestSpecificLessonsProps) {
  const getLink = useCallback((specificLesson: ISpecificLesson) => {
    const lesson = specificLesson.lesson
    const klass = lesson.klass
    const school = klass.school

    return `/core/lessons/${school.slug}/${klass.slug}/${lesson.id}/${specificLesson.date}`
  }, [])
  return <Grid2 container spacing={4}>
    {latestSpecificLessons.map((specificLesson, index) => <Grid2 size={{ xs: 12, md: 6 }} key={index}>
      <LandingCard index={index}>
        <Link href={getLink(specificLesson)} style={{display: 'block', height: '100%'}}>
          <Stack gap={2} sx={{height: '100%'}}>
            <Stack direction="row" gap={2} sx={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <Stack gap={1} sx={{alignItems: 'flex-start'}}>
                <Typography variant="h6" color='primary'>
                  {specificLesson.title}
                </Typography>
                <Typography variant="h6" sx={{color: 'text.primary'}}>
                  {specificLesson.desc}
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{color: 'text.secondary'}}>
                {specificLesson.date}
              </Typography>
            </Stack>
            <Box sx={{flex: 1}} />
            <Box>
              {specificLesson.lesson.teacher?.user && <SmallProfile
                user={specificLesson.lesson.teacher.user}
                disableLink
              />}
            </Box>
          </Stack>
        </Link>
      </LandingCard>
    </Grid2>)}
  </Grid2>
}