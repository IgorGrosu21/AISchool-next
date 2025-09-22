'use client'

import { ArrowForward, School, TrendingUp } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, LandingButtons, SectionHeader } from '../utils'
import { Animation4, Animation5 } from '../animations'
import { useTranslations } from 'next-intl'

const features = [School, TrendingUp, ArrowForward].map(Icon => ({ icon: Icon }))

export function CTA() {
  const t = useTranslations('pages.landing.cta');

  return <Section color='primary' sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}} animations={[
    <Animation4 key="animation4" />,
    <Animation5 key="animation5" />,
  ]}>
    <SectionHeader onGradient maxWidth={700} text1={t('title')} text2={t('desc')} />
    <LandingButtons buttons={[
      {variant: 'contained', text: t('buttons.1')},
      {variant: 'outlined', text: t('buttons.2')}
    ]} />
    <StatsPanelsContainer>
      {features.map((feature, index) => <StatsPanel key={index} text={t(`features.${index + 1}`)} Icon={feature.icon} />)}
    </StatsPanelsContainer>
  </Section>
}
