'use server'

import { Stack, StackProps } from "@mui/material"

export async function Panel({children, ...props}: StackProps) {
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