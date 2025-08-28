'use client'

import { ILessonName, ISpecificLessonName } from "@/utils/interfaces";
import { Stack, Typography, Grid2, Divider, Snackbar, Slide, SlideProps, Alert } from "@mui/material";
import { getLessonGroups } from "../utils";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, isWithinInterval } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { Note } from "./note";
import { useDiaryContext } from "@/providers";

interface SpecificLessonsProps {
  specificLessons: ISpecificLessonName[]
  dates: Date[]
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export function SpecificLessons({specificLessons, dates}: SpecificLessonsProps) {
  const { lessonTimes, lessons, accountType, personId, schoolSlug, holidays } = useDiaryContext()
  const lessonTimeGroups = useMemo(() => getLessonGroups(lessonTimes), [lessonTimes])
  const t = useTranslations('timetable')
  const [message, setMessage] = useState<string>('no_lesson')
  const [alertShowed, showAlert] = useState<boolean>(false)
  const router = useRouter()

  const pickSpecificLesson = useCallback((lesson: ILessonName | undefined, specificLesson: ISpecificLessonName | undefined, date: Date) => {
    if (!lesson) {
      showAlert(true)
      return setMessage('no_lesson')
    }
    if (accountType == 'teacher') {
      return router.push(`/core/lessons/${schoolSlug}/${lesson.klassSlug}/${lesson.id}/${format(date, 'y.M.d')}`)
    }
    if (!specificLesson) {
      showAlert(true)
      return setMessage('no_specific_lesson')
    }
    router.push(`/core/homeworks/${schoolSlug}/${lesson.klassSlug}/${lesson.id}/${specificLesson.id}/${personId}`)
  }, [accountType, personId, router, schoolSlug])

  const isHoliday = useCallback((date: Date) => {
    return holidays.some(holiday => isWithinInterval(date, {start: new Date(holiday.start), end: new Date(holiday.end)}))
  }, [holidays])

  return <Stack>
    <Grid2 container spacing={4} columns={3}>
      {lessonTimeGroups.map((lessonGroup, i) => <Grid2 key={i} size={1}>
        <Stack gap={4} sx={{p: 2, height: lessonGroup.timetable.length === 0 || isHoliday(dates[i]) ? '100%' : 'auto'}}>
          <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h6' color='primary'>{t(`weekdays.${lessonGroup.weekday}`)}</Typography>
            <Typography>{format(dates[i], 'd MMMM', { locale: ru })}</Typography>
          </Stack>
          <Divider />
          <Stack gap={2} sx={{flex: 1, justifyContent: 'center'}}>
            {isHoliday(dates[i]) ? <Typography variant='h5' color='primary' sx={{textAlign: 'center'}}>
              {t('holiday')}
            </Typography> : lessonGroup.timetable.length > 0 ? lessonGroup.timetable.map((lessonTime, j) => {
              const lesson = lessons.find(l => l.lessonTime === lessonTime.id)
              const specificLesson = lesson ? specificLessons.find(sl => sl.lesson === lesson.id) : undefined
              return <Stack key={j} gap={2}>
                {j > 0 && <Divider />}
                <Stack direction='row' gap={1} onClick={() => pickSpecificLesson(lesson, specificLesson, dates[i])}>
                  <Typography variant='h6'>{lessonTime.order + 1}.</Typography>
                  <Stack gap={2} sx={{flex: 1}}>
                    <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                      <Link href={`/core/manuals/${lesson?.manualSlug}`}>
                        <Typography variant='h6' color='primary'>{lesson?.subject.verboseName}</Typography>
                      </Link>
                      <Typography>{lessonTime.starting} - {lessonTime.ending}</Typography>
                    </Stack>
                    <Stack direction='row' gap={2}>
                      <Stack gap={1} sx={{flex: 1}}>
                        <Typography color='secondary'>{lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}</Typography>
                        {specificLesson && <Typography>{specificLesson?.title}</Typography>}
                      </Stack>
                      {specificLesson?.note && <Note value={specificLesson.note} />}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            }) : <Link href={`/core/schools/${schoolSlug}/timetable`} style={{pointerEvents: accountType === 'teacher' ? 'unset' : 'none'}}>
              <Typography variant='h5' color='primary' sx={{textAlign: 'center'}}>{t('no_timetable')}</Typography>
            </Link>}
          </Stack>
        </Stack>
      </Grid2>)}
    </Grid2>
    <Snackbar
      open={alertShowed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => showAlert(false)}
      TransitionComponent={SlideTransition}
      autoHideDuration={5000}
    >
      <Alert sx={{bgcolor: 'primary.main'}} variant="filled">{t(message)}</Alert>
    </Snackbar>
  </Stack>
}