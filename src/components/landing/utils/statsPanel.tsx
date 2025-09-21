'use client'

import { motion } from "framer-motion"
import { Stack } from "@mui/material"

export function StatsPanel({children}: React.PropsWithChildren) {
  return <motion.div
    style={{flex: 1}}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Stack gap={2} sx={{
      height: '100%',
      p: 3,
      borderRadius: 3,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {children}
    </Stack>
  </motion.div>
}