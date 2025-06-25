'use client'

import { IKlassName } from "@/utils/interfaces";
import { Stack, Typography, Divider, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTranslations } from "next-intl";

interface PickKlassProps<T> {
  klass: T
  setKlass: (klass: T) => void
}

export function PickKlass<T extends Omit<IKlassName, 'school'>>({klass, setKlass}: PickKlassProps<T>) {
  const t = useTranslations('klasses')
  
  return <Stack gap={4} direction='row' sx={{justifyContent: 'space-between'}}>
    <Stack gap={2} sx={{flex: 1}}>
      <Typography id='grade-label' variant='h5'>{t('pick_grade')}</Typography>
      <RadioGroup
        row
        aria-labelledby='grade-label'
        name='grade'
        value={klass.grade}
        onChange={(e) => setKlass({...klass, grade: Number(e.target.value)})}
      >
        {Array.from({length: 12}, (_, i) => i + 1).map(i => <FormControlLabel key={i} value={i} control={<Radio />} label={i} />)}
      </RadioGroup>
    </Stack>
    <Divider orientation='vertical' flexItem />
    <Stack gap={2} sx={{flex: 1}}>
      <Typography variant='h5'>{t('pick_letter')}</Typography>
      <RadioGroup
        row
        name='letter'
        value={klass.letter}
        onChange={(e) => setKlass({...klass, letter: e.target.value})}
      >
        {['A', 'B', 'C', 'D', 'E'].map((letter, i) => <FormControlLabel key={i} value={letter} control={<Radio />} label={letter} />)}
      </RadioGroup>
    </Stack>
  </Stack>
}