'use client'

import { Box } from '@mui/material'
import { motion } from 'framer-motion'

export function AnimationGroup3() {
  return <>
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
    <Box
      sx={{
        position: 'absolute',
        bottom: '25%',
        right: '20%',
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'linear-gradient(225deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{
          rotate: [360, 180, 0],
          scale: [1, 0.7, 1.2],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(225deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        }}
      />
    </Box>
  </>
}
