'use client'

import { ILessonName, ISpecificLessonName } from "@/interfaces";
import { Stack, Typography, Snackbar, Slide, SlideProps, Alert } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useRouter } from "@/i18n";
import { format } from "date-fns";
import { Note } from "../../notes/item";
import { useDiaryContext } from "@/providers";
import { TimetableContainer } from "../container";
import { Lesson } from "../lessons";
import { useHolidayChecker } from "@/hooks";

interface SpecificLessonsProps {
  specificLessons: ISpecificLessonName[]
  dates: Date[]
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export function SpecificLessons({specificLessons, dates}: SpecificLessonsProps) {
  const { lessonTimes, lessons, accountType, personId, schoolSlug, holidays } = useDiaryContext()
  const t = useTranslations('timetable')
  const [message, setMessage] = useState<string>('no_lesson')
  const [alertShowed, showAlert] = useState<boolean>(false)
  const isHoliday = useHolidayChecker(holidays)
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
    router.push(`/core/homeworks/${schoolSlug}/${lesson.klassSlug}/${personId}/${lesson.id}/${specificLesson.id}`)
  }, [accountType, personId, router, schoolSlug])

  return <Stack>
    <TimetableContainer timetable={lessonTimes} render={(lessonTime, groupIndex) => {
      if (isHoliday(dates[lessonTime.order])) {
        return <Typography key={lessonTime.order} variant='h5' color='primary' sx={{textAlign: 'center'}}>
          {t('holiday')}
        </Typography>
      }
      const lesson = lessons.find(l => l.lessonTime === lessonTime.id)
      const specificLesson = lesson ? specificLessons.find(sl => sl.lesson === lesson.id) : undefined

      return <Lesson
        key={lessonTime.order}
        lessonTime={lessonTime}
        lesson={lesson}
        onClick={() => pickSpecificLesson(lesson, specificLesson, dates[groupIndex])}
      >
        <Stack direction='row' gap={2}>
          <Stack gap={1} sx={{flex: 1}}>
            {accountType == 'student' ? <Typography color='secondary'>
              {lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}
            </Typography> : <Typography color='secondary'>
              {lesson?.klassSlug}
            </Typography>}
            {specificLesson && <Typography>{specificLesson?.title}</Typography>}
          </Stack>
          {specificLesson?.note && <Note value={specificLesson.note} big />}
        </Stack>
      </Lesson>
    }} emptyGroupNode={<Link
      href={`/core/schools/${schoolSlug}/timetable`}
      style={{pointerEvents: accountType === 'teacher' ? 'unset' : 'none'}}
    >
      <Typography variant='h5' color='primary' sx={{textAlign: 'center'}}>{t('no_timetable')}</Typography>
    </Link>}/>
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