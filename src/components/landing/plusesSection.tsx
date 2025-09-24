'use client'

import { motion } from 'framer-motion'
import { Box, Grid2, Typography } from '@mui/material'
import { 
  AutoAwesome, School, Assignment, Group,
  AutoStories, TrendingUp, Speed, Psychology,
  People, Schedule, Analytics, CheckCircle
} from '@mui/icons-material'
import { useTranslations } from 'next-intl'
import { usePluses } from '@/hooks'
import { Section, SectionHeader, Card } from '@/ui'
import { useMemo } from 'react'

interface PlusesSectionProps {
  userType: 'student' | 'teacher' | 'parent'
  animationGroup?: React.ReactNode
}

export function PlusesSection({ userType, animationGroup }: PlusesSectionProps) {
  const gradient = useMemo(() => animationGroup !== undefined, [animationGroup])
  const pluses = usePluses(userType, gradient)
  const t = useTranslations('pages.landing.pluses')
  
  const getIconAndColor = (index: number) => {
    const iconSets = {
      student: [
        { icon: AutoAwesome, color: '#FF6B6B' },
        { icon: School, color: '#4ECDC4' },
        { icon: Assignment, color: '#45B7D1' },
        { icon: Group, color: '#96CEB4' }
      ],
      teacher: [
        { icon: AutoStories, color: '#FFEAA7' },
        { icon: TrendingUp, color: '#DDA0DD' },
        { icon: Speed, color: '#98D8C8' },
        { icon: Psychology, color: '#F7DC6F' }
      ],
      parent: [
        { icon: People, color: '#FF6B6B' },
        { icon: Schedule, color: '#4ECDC4' },
        { icon: Analytics, color: '#45B7D1' },
        { icon: CheckCircle, color: '#96CEB4' }
      ]
    }
    return iconSets[userType][index]
  }

  return <Section
    animationGroup={animationGroup}
    color={gradient ? (userType === 'teacher' ? 'tertiary' : 'secondary') : undefined}
  >
    <SectionHeader 
      onGradient={gradient}
      text1={t('title', { userType, paid: gradient ? 1 : 0 })} 
      text2={t(`desc.${userType}_${gradient ? 'paid' : 'free'}`)} 
    />
    <Grid2 container spacing={4} sx={{ maxWidth: 800 }}>
      {pluses.map((plus, index) => {
        const { icon: Icon, color } = getIconAndColor(index)
        return <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
          <Card index={index}>
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
          </Card>
        </Grid2>}
      )}
    </Grid2>
  </Section>
}
