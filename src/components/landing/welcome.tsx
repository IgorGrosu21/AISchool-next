'use client'

import { School, TrendingUp, People, ArrowForward } from '@mui/icons-material'
import { Section, StatsPanel, StatsPanelsContainer, SectionHeader, AnimationGroup1, AnimationGroup4 } from '@/ui'
import { LandingButtons } from './buttons'
import { useTranslations } from 'next-intl'

const heroFeatures = [School, TrendingUp, People].map(Icon => ({ icon: Icon }))
const ctaFeatures = [School, TrendingUp, ArrowForward].map(Icon => ({ icon: Icon }))

export function Welcome({type}: {type: 'hero' | 'cta'}) {
  const t = useTranslations(`components.landing.${type}`);

  return <Section
    color='primary'
    sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}
    animationGroup={type === 'hero' ? <AnimationGroup1 /> : <AnimationGroup4 />}
  >
    <SectionHeader isTitle={type === 'hero'} onGradient text1={t('title')} text2={t('desc')} />
    <LandingButtons buttons={[
      {variant: 'contained', text: t('buttons.1')},
      {variant: 'outlined', text: t('buttons.2')}
    ]} />
    <StatsPanelsContainer>
      {(type === 'hero' ? heroFeatures : ctaFeatures).map((feature, index) => <StatsPanel
        key={index}
        text={t(`features.${index + 1}`)}
        Icon={feature.icon}
      />)}
    </StatsPanelsContainer>
  </Section>
}
