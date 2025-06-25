'use client'

import { KlassesButton, PickKlass } from "@/components";
import { IKlassName, ILessonName, ILessonTime, ISchoolWithTimetable } from "@/utils/interfaces";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

interface WithKlassProps {
  school: ISchoolWithTimetable
  render: (klass: IKlassName, getLessonName: (lessonTime: ILessonTime) => ILessonName | undefined) => React.ReactNode
}

export function WithKlass({school, render}: WithKlassProps) {
  const [klass, setKlass] = useState<IKlassName>(school.klasses[0])
  const t = useTranslations('timetable')

  const pickedKlass = useMemo(() => school.klasses.find(k => klass.grade === k.grade && klass.letter === k.letter), [klass, school.klasses])
  const getLessonName = useCallback((lessonTime: ILessonTime) => lessonTime.lessons.find(l => l.klass.id === pickedKlass!.id), [pickedKlass])

  return <Stack gap={8}>
    <PickKlass klass={klass} setKlass={setKlass} />
    {pickedKlass ? render(pickedKlass, getLessonName) : <Stack gap={2} sx={{alignItems: 'center'}}>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('lessons.klass_not_exist')}</Typography>
      <KlassesButton schoolId={school.id} />
    </Stack>}
  </Stack>
}