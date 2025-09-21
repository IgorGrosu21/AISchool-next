'use client'

import { motion } from 'framer-motion'
import { Box } from '@mui/material'

export function Animation8() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'linear-gradient(60deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(60deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
        }}
      />
    </Box>
  )
}
