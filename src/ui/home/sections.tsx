'use client'

import { Stack } from "@mui/material"
import { Section, SectionHeader } from "../utils"
import { useMemo } from "react"
import { PlusesSection } from "../landing/plusesSection"
import { IPersonHome } from "@/utils/interfaces"
import { useTranslations } from "next-intl"
import { LatestNotes, LatestSpecificLessons, Analytics as StudentAnalytics } from "./student"
import { LatestHomeworks, Analytics as TeacherAnalytics, TomorrowTimetable } from "./teacher"

interface SectionsProps {
  personHome: IPersonHome
}

export function Sections({personHome}: SectionsProps) {
  const t = useTranslations('pages.home')
  
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
          <TomorrowTimetable key='tomorrowTimetable' id={personHome.id} tomorrowTimetable={personHome.tomorrowTimetable} />,
          <TeacherAnalytics key='analytics' id={personHome.id} analytics={personHome.analytics} />,
        ]
      case 'parent':
        return [
          <PlusesSection key='pluses' userType='parent' />,
        ]
      default:
        return []
    }
  }, [personHome])

  return <Stack>
    {sections.map((section, i) => <Section key={i} id={`section${i}`}>
      <SectionHeader maxWidth={700} text1={t(`sections.${personHome.profileType}.${i + 1}.title`)} />
      {section}
    </Section>)}
  </Stack>
}