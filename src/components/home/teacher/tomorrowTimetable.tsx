'use client'

import { Lesson } from "@/components"
import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Link } from "@/i18n"
import { Stack, Typography } from "@mui/material"

interface TomorrowTimetableProps {
  id: string
  tomorrowTimetable: (IPersonHome & { profileType: 'teacher' })['tomorrowTimetable']
}

export function TomorrowTimetable({id, tomorrowTimetable}: TomorrowTimetableProps) {
  return <Stack sx={{width: {xs: '100%', md: '50%'}}}>
    <Link href={`/core/diary/teachers/${id}/${tomorrowTimetable[0].school}/`}>
      <Card index={0}>
        <Stack gap={2} sx={{flex: 1}}>
          {tomorrowTimetable.map((lessonTime, i) => <Lesson
            key={i}
            lessonTime={lessonTime}
            lesson={lessonTime.lesson}
            disableLink
          >
            <Stack gap={1} sx={{flex: 1, alignItems: 'flex-start'}}>
              {lessonTime.lesson?.klassSlug && <Typography color='secondary'>
                {lessonTime.lesson.klassSlug}
              </Typography>}
              {lessonTime.specificLesson && <Typography>{lessonTime.specificLesson?.title}</Typography>}
            </Stack>
          </Lesson>)}
        </Stack>
      </Card>
    </Link>
  </Stack>
}