'use client'

import { Stack, type StackOwnProps, useTheme } from "@mui/material"
import { motion } from "framer-motion"

export function Panel({children, ...props}: StackOwnProps) {
  const theme = useTheme()

  return <Stack
    {...props}
    component={motion.div}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
    sx={{
      flex: 1,
      background: theme.palette.mode === 'light' ? 'rgba(233, 242, 247, 0.2)' : 'rgba(8, 8, 22, 0.2)',
      boxShadow: theme.palette.mode === 'light' ? '0 4px 30px rgba(0, 0, 0, 0.1)' : '0 4px 30px rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.3)',
      p: props.p ?? 2,
      borderRadius: 2,
      ...props.sx,
    }}
  >
    {children}
  </Stack>
}