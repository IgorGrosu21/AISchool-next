'use client'

import { PickKlass, KlassesButton } from "@/components"
import { IKlassName, IKlassNameWithGroups, ISchoolWithTimetable } from "@/interfaces"
import { Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"

interface WithKlassProps {
  school: ISchoolWithTimetable
  render: (klass: IKlassNameWithGroups) => React.ReactNode
}

export function WithKlass({school, render}: WithKlassProps) {
  const [klass, setKlass] = useState<IKlassName>(school.klasses[0])
  const t = useTranslations('timetable')

  const pickedKlass = useMemo(() => school.klasses.find(k => klass.grade === k.grade && klass.letter === k.letter), [klass, school.klasses])

  return <Stack gap={8}>
    <PickKlass klass={klass} setKlass={setKlass} />
    {pickedKlass ? render(pickedKlass) : <Stack gap={2} sx={{alignItems: 'center'}}>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('lessons.klass_not_exist')}</Typography>
      <KlassesButton schoolSlug={school.slug} />
    </Stack>}
  </Stack>
}