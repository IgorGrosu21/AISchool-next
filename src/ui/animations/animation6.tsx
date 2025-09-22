'use client'

import { motion } from 'framer-motion'
import { Box } from '@mui/material'

export function Animation6() {
  return <Box
    sx={{
      position: 'absolute',
      top: '10%',
      right: '10%',
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      zIndex: 1,
    }}
  >
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      }}
    />
  </Box>
}
