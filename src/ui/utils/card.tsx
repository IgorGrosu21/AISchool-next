'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@mui/material'

interface LandingCardProps extends React.PropsWithChildren {
  index: number
}

export function LandingCard({index, children}: LandingCardProps) {
  return <motion.div
    style={{height: '100%'}}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
  >
    <Card
      sx={{
        bgcolor: 'transparent',
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
        }
      }}
    >
      <CardContent sx={{ height: '100%', p: 4 }}>
        {children}
      </CardContent>
    </Card>
  </motion.div>
}