'use client'

import { motion } from 'framer-motion'
import { Box, Grid2, Typography, Stack } from '@mui/material'
import { 
  AutoAwesome, School, Analytics, 
  Assessment, Security, Speed, TrendingUp,
  People, Schedule, Psychology, CheckCircle
} from '@mui/icons-material'
import { useTranslations } from 'next-intl'
import { usePluses } from '@/hooks'
import { LandingCard } from './card'
import { SectionHeader } from './header'
import { Section } from './section'

interface PlusesSectionProps {
  userType: 'student' | 'teacher' | 'parent'
  gradient?: boolean
  animations?: React.ReactNode[]
}

export function PlusesSection({ userType, gradient = false, animations = [] }: PlusesSectionProps) {
  const pluses = usePluses(userType, gradient)
  const t = useTranslations('components.landing.pluses')
  
  const getIconAndColor = (index: number) => {
    const iconSets = {
      student: [
        { icon: AutoAwesome, color: '#FF6B6B' },
        { icon: School, color: '#4ECDC4' },
        { icon: Analytics, color: '#45B7D1' },
        { icon: TrendingUp, color: '#96CEB4' }
      ],
      teacher: [
        { icon: Assessment, color: '#FFEAA7' },
        { icon: Security, color: '#DDA0DD' },
        { icon: Speed, color: '#98D8C8' },
        { icon: Psychology, color: '#F7DC6F' }
      ],
      parent: [
        { icon: People, color: '#FF6B6B' },
        { icon: Schedule, color: '#4ECDC4' },
        { icon: CheckCircle, color: '#45B7D1' },
        { icon: Analytics, color: '#96CEB4' }
      ]
    }
    return iconSets[userType][index] || { icon: CheckCircle, color: '#45B7D1' }
  }

  return <Section gradient={gradient} animations={animations}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Stack gap={6} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <SectionHeader 
          onGradient={gradient} 
          maxWidth={700} 
          text1={t('title', { userType, paid: gradient ? 1 : 0 })} 
          text2={t(`desc.${userType}_${gradient ? 'paid' : 'free'}`)} 
        />
        
        <Grid2 container spacing={4} sx={{ maxWidth: 800 }}>
          {pluses.map((plus, index) => {
            const { icon: Icon, color } = getIconAndColor(index)
            return <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
              <LandingCard index={index}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: `0 8px 32px ${color}40`
                  }}>
                    <Icon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </motion.div>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  mb: 2, 
                  color: gradient ? 'white' : 'text.primary',
                  textAlign: 'center'
                }}>
                  {plus}
                </Typography>
              </LandingCard>
            </Grid2>}
          )}
        </Grid2>
      </Stack>
    </motion.div>
  </Section>
}
