'use client'

import { Stack, Typography } from "@mui/material"
import { Section, SectionHeader } from "@/ui"
import { useMemo } from "react"
import { IPersonHome } from "@/interfaces"
import { useTranslations } from "next-intl"
import { LatestNotes, LatestSpecificLessons, Analytics as StudentAnalytics } from "./student"
import { LatestHomeworks, TomorrowTimetable, Analytics as TeacherAnalytics } from "./teacher"

interface SectionsProps {
  personHome: IPersonHome
}

export function Sections({personHome}: SectionsProps) {
  const t = useTranslations('components.home')
  
  const sections = useMemo(() => {
    switch (personHome.profileType) {
      case 'student':
        return [
          <LatestNotes key='latestNotes' latestNotes={personHome.latestNotes} />,
          <LatestSpecificLessons key='latestSpecificLessons' latestSpecificLessons={personHome.latestSpecificLessons} />,
          <StudentAnalytics key='analytics' id={personHome.id} analytics={personHome.analytics} />,
        ]
      case 'teacher':
        return [
          <LatestHomeworks key='latestHomeworks' latestHomeworks={personHome.latestHomeworks} />,
          (personHome.tomorrowTimetable.length > 0 ? <TomorrowTimetable
            key='tomorrowTimetable'
            id={personHome.id}
            tomorrowTimetable={personHome.tomorrowTimetable}
          /> : <Typography variant='h5' color='primary'>
            {t('no_lessons_tomorrow')}
          </Typography>),
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