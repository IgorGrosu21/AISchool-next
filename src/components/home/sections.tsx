'use client'

import { Stack, Typography } from "@mui/material"
import { Section, SectionHeader } from "@/ui"
import { useMemo } from "react"
import { IPersonHome } from "@/interfaces"
import { useTranslations } from "next-intl"
import { TomorrowTimetable as StudentTomorrowTimetable, LatestNotes, Analytics as StudentAnalytics } from "./student"
import { TomorrowTimetable as TeacherTomorrowTimetable, LatestHomeworks, Analytics as TeacherAnalytics } from "./teacher"

interface SectionsProps {
  personHome: IPersonHome
}

export function Sections({personHome}: SectionsProps) {
  const t = useTranslations('components.home')
  
  const sections = useMemo(() => {
    switch (personHome.profileType) {
      case 'student':
        return [
          (personHome.tomorrowTimetable.length > 0 ? <StudentTomorrowTimetable
            key='tomorrowTimetable'
            id={personHome.id}
            tomorrowTimetable={personHome.tomorrowTimetable}
          /> : <Typography variant='h5' color='primary'>
            {t('no_lessons_tomorrow')}
          </Typography>),
          <LatestNotes key='latestNotes' latestNotes={personHome.latestNotes} />,
          <StudentAnalytics key='analytics' id={personHome.id} analytics={personHome.analytics} />,
        ]
      case 'teacher':
        return [
          (personHome.tomorrowTimetable.length > 0 ? <TeacherTomorrowTimetable
            key='tomorrowTimetable'
            id={personHome.id}
            tomorrowTimetable={personHome.tomorrowTimetable}
          /> : <Typography variant='h5' color='primary'>
            {t('no_lessons_tomorrow')}
          </Typography>),
          <LatestHomeworks key='latestHomeworks' latestHomeworks={personHome.latestHomeworks} />,
          <TeacherAnalytics key='analytics' id={personHome.id} analytics={personHome.analytics} />,
        ]
      case 'parent':
        return []
      default:
        return []
    }
  }, [personHome, t])

  return <Stack>
    {sections.map((section, i) => <Section key={i} id={`section${i}`}>
      <SectionHeader text1={t(`sections.${personHome.profileType}.${i + 1}.title`)} />
      {section}
    </Section>)}
  </Stack>
}