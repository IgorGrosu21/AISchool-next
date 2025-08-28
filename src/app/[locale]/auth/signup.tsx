'use client'

import { Typography, Stack, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AuthFields, CityPicker, Credentials } from "./(util)";
import { useTranslations } from "next-intl";
import { FormState } from "@/app/actions/auth";
import { useMemo } from "react";

export function Signup({state}: {state: FormState}) {
  const t = useTranslations('auth');
  const userTypes = useMemo(() => ['student', 'teacher', 'parent'], [])
  
  return <Stack gap={3} sx={{flex: 1}}>
    <Stack direction='row' gap={2} sx={{flex: 1}}>
      <Stack gap={2} sx={{flex: 1}}>
        <AuthFields state={state} />
        <Stack direction='row' sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Typography sx={{textWrap: 'nowrap', mr: 2}}>{t(`user_type.singular`)}:</Typography>
            <RadioGroup row aria-labelledby='user-type-label' id='userType' name='userType' sx={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: 'nowrap'
          }}>
            {userTypes.map((type, i) => <FormControlLabel key={i} value={type} control={<Radio />} label={t(`user_type.${type}`)} />)}
          </RadioGroup>
        </Stack>
      </Stack>
      <Divider orientation='vertical' flexItem />
      <Credentials />
    </Stack>
    <Divider />
    <CityPicker />
  </Stack>
}