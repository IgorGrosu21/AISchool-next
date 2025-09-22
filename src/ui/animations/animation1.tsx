'use client'

import { motion } from 'framer-motion'

export function Animation1() {
  return <motion.div
    animate={{
      rotate: 360,
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      position: 'absolute',
      top: '10%',
      right: '10%',
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    }}
  />
}