'use client'

import { motion } from 'framer-motion'
import { Stack, Typography } from '@mui/material'
import { ArrowForward, School, TrendingUp } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, LandingButtons, SectionHeader } from './utils'
import { Animation4, Animation5 } from './animations'
import { useTranslations } from 'next-intl'

const features = [School, TrendingUp, ArrowForward].map(Icon => ({ icon: Icon }))

export function CTA() {
  const t = useTranslations('components.landing.cta');

  return <Section animations={[
    <Animation4 key="animation4" />,
    <Animation5 key="animation5" />,
  ]}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Stack gap={6} sx={{alignItems: 'center', textAlign: 'center'}}>
        <SectionHeader onGradient maxWidth={700} text1={t('title')} text2={t('desc')} />
        <LandingButtons buttons={[
          {variant: 'contained', text: t('buttons.1')},
          {variant: 'outlined', text: t('buttons.2')}
        ]} />
        <StatsPanelsContainer>
          {features.map((feature, index) => <StatsPanel key={index}>
            <feature.icon sx={{ fontSize: 40, color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
              {t(`features.${index + 1}`)}
            </Typography>
          </StatsPanel>)}
        </StatsPanelsContainer>
      </Stack>
    </motion.div>
  </Section>
}
