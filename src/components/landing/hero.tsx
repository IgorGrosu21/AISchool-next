'use client'

import { Stack, Typography } from '@mui/material'
import { School, TrendingUp, People } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, LandingButtons, SectionHeader } from './utils'
import { Animation1, Animation2 } from './animations'
import { useTranslations } from 'next-intl'

const features = [
  { icon: School, text: 'Умное расписание' },
  { icon: TrendingUp, text: 'Аналитика прогресса' },
  { icon: People, text: 'Социальное обучение' }
]

export function Hero() {
  const t = useTranslations('components.landing.hero');

  return <Section sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}} animations={[
    <Animation1 key="animation1" />,
    <Animation2 key="animation2" />,
  ]}>
    <Stack gap={6} sx={{alignItems: 'center', textAlign: 'center'}}>
      <SectionHeader isTitle onGradient maxWidth={800} text1={t('title')} text2={t('desc')} />
      <LandingButtons buttons={[
        {variant: 'contained', text: t('buttons.1')},
        {variant: 'outlined', text: t('buttons.2')}
      ]} />
      <StatsPanelsContainer>
        {features.map((feature, index) => <StatsPanel key={index}>
          <feature.icon sx={{ fontSize: 40, color: 'white' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
            {feature.text}
          </Typography>
        </StatsPanel>)}
      </StatsPanelsContainer>
    </Stack>
  </Section>
}
