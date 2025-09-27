'use client'

import { Section, SectionHeader, StatsPanelsContainer, StatsPanel, AnimationGroup1 } from "@/ui"
import { useTranslations } from "next-intl"
import { IPersonHome } from "@/interfaces"
import { Assignment, Home, TrendingUp } from "@mui/icons-material"
import { useCallback } from "react"

interface GreetingsProps {
  profileType: IPersonHome['profileType']
  user: IPersonHome['user']
}

const sections = [Assignment, Home, TrendingUp].map(Icon => ({ icon: Icon }))

export function Greetings({profileType, user}: GreetingsProps) {
  const t = useTranslations('components.home')

  const scrollToSection = useCallback((index: number) => {
    const sectionElement = document.getElementById(`section${index}`)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return <Section
    color='primary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={<AnimationGroup1 />}
  >
    <SectionHeader
      isTitle
      onGradient
      text1={`${t(`greetings.title`)}, ${user.name} ${user.surname}`}
      text2={t('greetings.desc')}
    />
    <StatsPanelsContainer>
      {sections.map((feature, index) => <StatsPanel
        key={index}
        onClick={() => scrollToSection(index)}
        sx={{cursor: 'pointer'}}
        text={t(`sections.${profileType}.${index + 1}.title`)}
        Icon={feature.icon}
      />)}
    </StatsPanelsContainer>
  </Section>
}