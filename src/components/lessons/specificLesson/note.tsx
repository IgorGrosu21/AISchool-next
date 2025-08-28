'use client'

import { Stack, Button, Typography } from "@mui/material";

interface NoteProps {
  value?: string
  onClick?: () => void
}

export function Note({value, onClick}: NoteProps) {
  return  <Stack sx={{justifyContent: 'center'}} onClick={onClick}>
    <Button variant='outlined' sx={{
      p: 1,
      minWidth: 'unset',
      height: 67.5,
      aspectRatio: 1
    }}>
      <Typography variant='h5'>{value?.at(-1) === 'a' ? 'a' : value}</Typography>
    </Button>
  </Stack>
}