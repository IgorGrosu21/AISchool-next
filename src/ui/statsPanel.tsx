'use client'

import { motion } from "framer-motion"
import { Stack, Typography, useTheme, type StackProps } from "@mui/material"
import SvgIcon from '@mui/material/SvgIcon';

interface StatsPanelProps extends StackProps {
  text: string
  Icon: typeof SvgIcon
}

export function StatsPanel({text, Icon, ...props}: StatsPanelProps) {
  const theme = useTheme()

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
      background: theme.palette.mode === 'light' ? 'rgba(233, 242, 247, 0.2)' : 'rgba(8, 8, 22, 0.2)',
      boxShadow: theme.palette.mode === 'light' ? '0 4px 30px rgba(0, 0, 0, 0.1)' : '0 4px 30px rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.3)',
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon sx={{ fontSize: 40, color: 'background.default' }} />
      <Typography variant="h6" sx={{ color: 'background.default', fontWeight: 500 }}>
        {text}
      </Typography>
    </Stack>
  </motion.div>
}