'use client'

import { motion } from 'framer-motion'

export function Animation3() {
  return <motion.div
    animate={{
      rotate: 360,
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      position: 'absolute',
      top: '-50%',
      right: '-20%',
      width: '60%',
      height: '200%',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
    }}
  />
}