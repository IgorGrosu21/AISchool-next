'use client'

import { Box, BoxProps, Stack, useTheme } from "@mui/material"
import { motion } from "framer-motion"

interface SectionProps extends BoxProps {
  animationGroup?: React.ReactNode,
  color?: 'primary' | 'secondary' | 'tertiary'
}

export function Section({children, animationGroup, color, ...props}: SectionProps) {
  const theme = useTheme()

  return <Box component='section' {...props} sx={{
    py: 12,
    position: 'relative',
    overflow: 'hidden',
    background: color ? `linear-gradient(135deg, ${theme.palette[color].light} 0%, ${theme.palette[color].dark} 100%)` : 'transparent',
    ...props.sx,
  }}>
    {animationGroup}
    <Box sx={{width: '100%', maxWidth: 'lg', mx: 'auto', px: 4, position: 'relative', zIndex: 2}}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stack gap={6} sx={{alignItems: 'center', textAlign: 'center'}}>
          {children}
        </Stack>
      </motion.div>
    </Box>
  </Box>
}