'use client'

import { AutocompleteRenderInputParams, TextField, TextFieldProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks";

export function Input({hidden = false, ...props}: (TextFieldProps | AutocompleteRenderInputParams) & { name?: string, hidden?: boolean }) {
  const t = useTranslations('auth');
  const isMobile = useIsMobile();
  
  return <TextField {...props} sx={{
    ...(hidden ? {display: 'none'}: {}),
    '& .MuiInputBase-root': {
      borderRadius: 90,
      minHeight: isMobile ? '56px' : 'auto',
      fontSize: isMobile ? '1rem' : 'inherit'
    },
    '& .MuiInputLabel-root': {
      fontSize: isMobile ? '1rem' : 'inherit'
    },
    '& .MuiFormHelperText-root': {
      fontSize: isMobile ? '0.875rem' : 'inherit'
    }
  }} placeholder={hidden ? '' : t(props.name ?? '')} id={props.name} required={!hidden} />
}