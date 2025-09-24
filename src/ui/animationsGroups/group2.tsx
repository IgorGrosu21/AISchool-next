'use client'

import { Box } from '@mui/material'
import { motion } from 'framer-motion'

export function AnimationGroup2() {
  return <>
    <Box
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
    <Box
      sx={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: 150,
        height: 150,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 0.8, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
        }}
      />
    </Box>
  </>
}
