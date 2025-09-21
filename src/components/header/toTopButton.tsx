'use client'

import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab } from "@mui/material";

export function ToTopButton() {
  return <Fab
    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    color='primary'
    size='medium'
    sx={{
      display: {xs: 'none', md: 'inline-flex'},
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1300,
      width: { xs: 48, md: 56 },
      height: { xs: 48, md: 56 },
    }}
  >
    <KeyboardArrowUp fontSize='large' />
  </Fab>
}