'use client'

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useColorScheme, useTheme } from "@mui/material/styles";
import { useCallback } from "react";

export function NightNodeToggler() {
  const { setMode } = useColorScheme();
  const theme = useTheme()

  const toggleMode = useCallback(() => {
    setMode(theme.palette.mode === 'dark' ? 'light' : 'dark');
  }, [theme.palette.mode, setMode])

  return <IconButton onClick={toggleMode} color='primary'>
    <DarkModeOutlined sx={{display: theme.palette.mode === 'dark' ? 'block' : 'none'}} />
    <LightModeOutlined sx={{display: theme.palette.mode === 'light' ? 'block' : 'none'}} />
  </IconButton>
}