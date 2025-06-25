'use client'

import { Typography, Stack, Divider, Checkbox, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { AuthFields, CityPicker, Input } from "./(util)";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormState } from "@/app/actions/auth";

export function Signup({state}: {state: FormState}) {
  const t = useTranslations('auth');
  const langs = useMemo(() => ['RO', 'RU'], [])
  
  return <>
    <Stack gap={2} sx={{flex: 1}}>
      <AuthFields state={state} />
      <Stack direction='row' sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Typography sx={{textWrap: 'nowrap'}}>{t('is_teacher')}</Typography>
        <Checkbox id='isTeacher' name='isTeacher' />
      </Stack>
    </Stack>
    <Divider flexItem orientation='vertical' />
    <CityPicker />
    <Divider flexItem orientation='vertical' />
    <Stack gap={2} sx={{flex: 1}}>
      <Input name='surname' />
      <Input name='name' />
      <RadioGroup row aria-labelledby='lang-label' id='lang' name='lang' sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
      }}>
        {langs.map((lang, i) => <FormControlLabel key={i} value={lang} control={<Radio checked={lang === 'RO'} />} label={lang} />)}
      </RadioGroup>
    </Stack>
  </>
}