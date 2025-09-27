'use client'

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useColorScheme } from "@mui/material/styles";
import { useCallback } from "react";

export function NightNodeToggler() {
  const { mode, setMode } = useColorScheme();

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode])

  return <IconButton onClick={toggleMode} color='primary'>
    <DarkModeOutlined sx={{display: mode === 'dark' ? 'block' : 'none'}} />
    <LightModeOutlined sx={{display: mode === 'light' ? 'block' : 'none'}} />
  </IconButton>
}