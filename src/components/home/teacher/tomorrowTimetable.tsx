'use client'

import { Lesson } from "@/components"
import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Link } from "@/i18n"
import { Stack } from "@mui/material"

interface TomorrowTimetableProps {
  id: string
  tomorrowTimetable: (IPersonHome & { profileType: 'teacher' })['tomorrowTimetable']
}

export function TomorrowTimetable({id, tomorrowTimetable}: TomorrowTimetableProps) {
  return <Link style={{display: 'block', width: '50%'}} href={`/core/diary/teachers/${id}/${tomorrowTimetable[0].school}/`}>
    <Card index={0}>
      <Stack gap={2} sx={{flex: 1}}>
        {tomorrowTimetable.map((lessonTime, i) => <Lesson
          key={i}
          lessonTime={lessonTime}
          lesson={lessonTime.lessons[0]}
          disableLink
        >
        </Lesson>)}
      </Stack>
    </Card>
  </Link>
}