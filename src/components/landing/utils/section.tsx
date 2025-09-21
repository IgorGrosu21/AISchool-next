'use client'

import { Box, BoxProps } from "@mui/material"

interface SectionProps extends BoxProps {
  gradient?: boolean
  animations?: React.ReactNode[]
}

export function Section({children, gradient = true, animations = [], ...props}: SectionProps) {
  return <Box {...props} sx={{
    py: 12,
    position: 'relative',
    overflow: 'hidden',
    background: gradient ? 'linear-gradient(135deg, #8845d1 0%, #4c00b3 100%)' : 'transparent',
    ...props.sx,
  }}>
    {animations.map(animation => animation)}
    <Box sx={{width: '100%', maxWidth: 1200, mx: 'auto', px: 4, position: 'relative', zIndex: 2}}>
      {children}
    </Box>
  </Box>
}