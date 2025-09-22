'use client'

import { School, TrendingUp, People } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, LandingButtons, SectionHeader } from '../utils'
import { Animation1, Animation2 } from '../animations'
import { useTranslations } from 'next-intl'

const features = [School, TrendingUp, People].map(Icon => ({ icon: Icon }))

export function Hero() {
  const t = useTranslations('pages.landing.hero');

  return <Section color='primary' sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}} animations={[
    <Animation1 key="animation1" />,
    <Animation2 key="animation2" />,
  ]}>
    <SectionHeader isTitle onGradient maxWidth={800} text1={t('title')} text2={t('desc')} />
    <LandingButtons buttons={[
      {variant: 'contained', text: t('buttons.1')},
      {variant: 'outlined', text: t('buttons.2')}
    ]} />
    <StatsPanelsContainer>
      {features.map((feature, index) => <StatsPanel key={index} text={t(`features.${index + 1}`)} Icon={feature.icon} />)}
    </StatsPanelsContainer>
  </Section>
}
