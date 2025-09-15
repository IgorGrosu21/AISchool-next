'use client'

import { Stack, Button, Typography, type ButtonProps, type TypographyProps } from "@mui/material";

interface NoteProps extends ButtonProps {
  value?: string
  big?: boolean
  onClick?: () => void
  typographyVariant?: TypographyProps['variant']
}

export function Note({value, big = false, onClick, typographyVariant, ...props}: NoteProps) {
  return <Stack sx={{justifyContent: 'center'}} onClick={onClick}>
    <Button variant={props.variant ?? 'outlined'} sx={{
      ...props.sx,
      p: 1,
      minWidth: 'unset',
      height: big ? 67.5 : 50,
      aspectRatio: 1
    }} {...props}>
      <Typography variant={typographyVariant ?? 'h6'}>{value}</Typography>
    </Button>
  </Stack>
}