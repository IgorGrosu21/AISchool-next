'use client'

import { motion } from "framer-motion"
import { Stack, Typography, type StackProps } from "@mui/material"
import SvgIcon from '@mui/material/SvgIcon';

interface StatsPanelProps extends StackProps {
  text: string
  Icon: typeof SvgIcon
}

export function StatsPanel({text, Icon, ...props}: StatsPanelProps) {
  return <motion.div
    style={{flex: 1}}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Stack gap={props.gap ?? 2} {...props} sx={{
      ...props.sx,
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
      <Icon sx={{ fontSize: 40, color: 'white' }} />
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
        {text}
      </Typography>
    </Stack>
  </motion.div>
}