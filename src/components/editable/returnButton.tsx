'use client'

import { Fab } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

interface ReturnButtonProps {
  link: string
}

export function ReturnButton({link}: ReturnButtonProps) {
  return <Link href={link}>
    <Fab 
      color='primary'
      size='medium'
      sx={{
        width: { xs: 48, md: 56 },
        height: { xs: 48, md: 56 },
        '& .MuiSvgIcon-root': {
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }
      }}
    >
      <ArrowBack />
    </Fab>
  </Link>
}