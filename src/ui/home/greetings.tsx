'use client'

import { Section, SectionHeader, StatsPanelsContainer, StatsPanel } from "../utils"
import { Animation1, Animation2 } from "../animations"
import { useTranslations } from "next-intl"
import { IPersonHome } from "@/utils/interfaces"
import { Assignment, Home, TrendingUp } from "@mui/icons-material"
import { useCallback } from "react"

interface GreetingsProps {
  profileType: IPersonHome['profileType']
  user: IPersonHome['user']
}

const features = [Assignment, Home, TrendingUp].map(Icon => ({ icon: Icon }))

export function Greetings({profileType, user}: GreetingsProps) {
  const t = useTranslations('pages.home')

  const scrollToSection = useCallback((index: number) => {
    const sectionElement = document.getElementById(`section${index}`)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return <Section color='primary' sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}} animations={[
    <Animation1 key="animation1" />,
    <Animation2 key="animation2" />,
  ]}>
    <SectionHeader
      isTitle
      onGradient
      maxWidth={800}
      text1={`${t(`greetings.title`)}, ${user.name} ${user.surname}`}
      text2={t('greetings.desc')}
    />
    <StatsPanelsContainer>
      {features.map((feature, index) => <StatsPanel
        key={index}
        onClick={() => scrollToSection(index)}
        sx={{cursor: 'pointer'}}
        text={t(`sections.${profileType}.${index + 1}.title`)}
        Icon={feature.icon}
      />)}
    </StatsPanelsContainer>
  </Section>
}