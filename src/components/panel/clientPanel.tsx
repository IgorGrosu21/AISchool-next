'use client'

import { Stack, StackProps } from "@mui/material"

export function ClientPanel({children, ...props}: StackProps) {
  return <Stack {...props} sx={{
    flex: 1,
    bgcolor: 'background.default',
    p: props.p ?? 2,
    borderRadius: 2,
    ...props.sx
  }}>
    {children}
  </Stack>
}