'use client'

import { Stack, StackProps } from "@mui/material"

export function ClientPanel({children, ...props}: StackProps) {
  return <Stack {...props} sx={{
    flex: 1,
    bgcolor: 'rgba(255, 255, 255, 0.75)',
    p: props.p ?? 2,
    borderRadius: 2,
    ...props.sx
  }}>
    {children}
  </Stack>
}