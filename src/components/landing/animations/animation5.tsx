'use client'

import { motion } from 'framer-motion'

export function Animation5() {
  return <motion.div
    animate={{
      y: [0, -30, 0],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: 'absolute',
      bottom: '-20%',
      right: '-5%',
      width: '30%',
      height: '140%',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(15px)',
    }}
  />
}