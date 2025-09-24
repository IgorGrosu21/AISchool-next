'use client'

import { motion } from 'framer-motion'

export function AnimationGroup4() {
  return <>
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: 'absolute',
        top: '-30%',
        left: '-10%',
        width: '40%',
        height: '160%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
      }}
    />
    <motion.div
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
  </>
}
