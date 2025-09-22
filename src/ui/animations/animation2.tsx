'use client'

import { motion } from 'framer-motion'

export function Animation2() {
  return <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: 'absolute',
      bottom: '20%',
      left: '5%',
      width: 150,
      height: 150,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(5px)',
    }}
  />
}