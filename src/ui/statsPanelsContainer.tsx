'use client'

import { motion } from 'framer-motion'
import { Stack } from '@mui/material'

export function StatsPanelsContainer({children}: React.PropsWithChildren) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.8 }}
  >
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 4 }}>
      {children}
    </Stack>
  </motion.div>
}