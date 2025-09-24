'use client'

import { Typography, Stack } from "@mui/material"
import { EditButton } from "./editButton"
import { ReturnButton } from "./returnButton"
import { ICanEdit } from "@/interfaces"

interface TitleProps {
  label: string
  link: string
  type?: 'edit' | 'back'
  editable?: ICanEdit
}

export function Title({label, link, type = 'edit', editable}: TitleProps) {
  return <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
    <Typography 
      variant='h4'
      sx={{ 
        textAlign: { xs: 'center', md: 'left' },
        fontSize: { xs: '1.5rem', md: '2.125rem' }
      }}
    >
      {label}
    </Typography>
    {type == 'edit' && editable ? <EditButton link={link} editable={editable} /> : <ReturnButton link={link} />}
  </Stack>
}