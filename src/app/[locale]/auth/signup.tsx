'use client'

import { Typography, Stack, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AuthFields, CityPicker, Credentials } from "./(util)";
import { useTranslations } from "next-intl";
import { FormState } from "@/app/actions/auth";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks";

export function Signup({state}: {state: FormState}) {
  const t = useTranslations('auth');
  const userTypes = useMemo(() => ['student', 'teacher', 'parent'], [])
  const isMobile = useIsMobile();
  
  return <Stack gap={4} sx={{flex: 1, width: '100%'}}>
    <Stack direction={isMobile ? 'column' : 'row'} gap={2} sx={{flex: 1}}>
      <Stack gap={2} sx={{flex: 1}}>
        <AuthFields state={state} />
        <Stack direction='column' sx={{flex: 1}}>
          <Typography>
            {t(`user_type.singular`)}:
          </Typography>
          <RadioGroup row={!isMobile} aria-labelledby='user-type-label' id='userType' name='userType'>
            {userTypes.map((type, i) => (
              <FormControlLabel 
                key={i} 
                value={type} 
                control={<Radio />} 
                label={t(`user_type.${type}`)}
                sx={{margin: isMobile ? '4px 0' : '0 8px 0 0'}}
              />
            ))}
          </RadioGroup>
        </Stack>
      </Stack>
      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
      <Credentials />
    </Stack>
    <Divider />
    <CityPicker />
  </Stack>
}