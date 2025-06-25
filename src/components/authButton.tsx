'use client'

import { Button, Typography, TypographyProps } from "@mui/material"
import { useTranslations } from "next-intl";

interface AuthButtonProps {
  type: string
  variant: TypographyProps['variant']
}

export function AuthButton({type, variant}: AuthButtonProps) {
  const t = useTranslations('auth');
  
  return <Button type="submit" sx={{borderRadius: 90, p: 1}} variant='contained'>
    <Typography variant={variant}>{t(`${type}.submit`)}</Typography>
  </Button>
}