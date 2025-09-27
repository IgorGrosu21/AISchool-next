'use client'

import { motion } from 'framer-motion'
import { Stack, Button } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { Link } from '@/i18n'

interface LandingButtonsProps {
  buttons: Array<{
    variant: 'contained' | 'outlined'
    text: string
  }>
}

export function LandingButtons({buttons}: LandingButtonsProps) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
  >
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
      {buttons.map((button, index) => <Button
        key={index}
        component={Link}
        href={button.variant === 'contained' ? "/core" : "/auth"}
        variant={button.variant}
        size="large"
        endIcon={<ArrowForward />}
        sx={{
          px: 4,
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 3,
          color: 'background.default',
          '&:hover': {
            transform: 'translateY(-2px)',
            ...(button.variant === 'contained' ? {
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            } : {
              borderColor: 'background.default',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            })
          },
          transition: 'all 0.3s ease',
          ...(button.variant === 'contained' ? {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          } : {
            borderColor: 'background.default',
          })
        }}
      >
        {button.text}
      </Button>)}
    </Stack>
  </motion.div>
}