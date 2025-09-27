'use client'

import { Box, useTheme } from '@mui/material'
import Image, { ImageProps } from 'next/image'
 
type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: string
  srcDark: string
}
 
export function ThemeImage(props: Props) {
  const theme = useTheme()
  const { srcLight, srcDark, alt, ...rest } = props
 
  return <Box sx={{
    width: rest.style?.width ?? rest.width,
    height: rest.style?.height ?? rest.height,
    ...rest.style,
  }}>
    <Image
      {...rest}
      src={srcLight}
      alt={alt + ' light'}
      style={{display: theme.palette.mode === 'light' ? 'block' : 'none'}}
    />
    <Image
      {...rest}
      src={srcDark}
      alt={alt + ' dark'}
      style={{display: theme.palette.mode === 'dark' ? 'block' : 'none'}}
    />
  </Box>
}