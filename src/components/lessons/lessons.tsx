'use client'

import { ILessonName, ILessonTimeName } from "@/utils/interfaces";
import { Stack, Typography, Grid2, Divider } from "@mui/material";
import { getLessonGroups } from "./utils";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface LessonsProps<T> {
  timetable: T[]
  getLessonName: (lessonTime: T) => ILessonName | undefined
}

export function Lessons<T extends ILessonTimeName>({timetable, getLessonName}: LessonsProps<T>) {
  const lessonTimeGroups = useMemo(() => getLessonGroups(timetable), [timetable])
  const t = useTranslations('timetable')

  return <Grid2 container spacing={4} columns={3}>
    {lessonTimeGroups.map((lessonGroup, i) => <Grid2 key={i} size={1}>
      <Stack gap={4} sx={{p: 2, border: '1px solid primary.main'}}>
        <Typography variant='h6' color='primary' sx={{textAlign: 'center'}}>{t(`weekdays.${lessonGroup.weekday}`)}</Typography>
        <Divider />
        <Stack gap={2}>
          {lessonGroup.timetable.map((lessonTime, j) => {
            const lesson = getLessonName(lessonTime)
            return <Stack key={j} gap={2}>
              {j > 0 && <Divider />}
              <Stack direction='row' gap={1}>
                <Typography variant='h6'>{lessonTime.order + 1}.</Typography>
                <Stack gap={2} sx={{flex: 1}}>
                  <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                    <Link href={`/core/subjects/${lesson?.subjectSlug}`}>
                      <Typography variant='h6' sx={{color: 'primary.main'}}>{lesson?.subjectName.verboseName}</Typography>
                    </Link>
                    <Typography>{lessonTime.starting} - {lessonTime.ending}</Typography>
                  </Stack>
                  <Link href={`/core/teachers/${lesson?.teacher.id}`}>
                    <Typography sx={{color: 'primary.main'}}>{lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}</Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          })}
        </Stack>
      </Stack>
    </Grid2>)}
  </Grid2>
}