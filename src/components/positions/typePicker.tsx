'use client'

import { IPosition } from "@/interfaces";
import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface TypePickerProps {
  type: IPosition['type'],
  setType: (type: IPosition['type']) => void
}

export function TypePicker({type, setType}: TypePickerProps) {
  const types = useMemo(() => ['HM', 'HT', 'T', 'ET'], [])
  const t = useTranslations('positions')
  
  return <FormControl>
    <RadioGroup row value={type} onChange={e => setType(e.target.value as IPosition['type'])}>
      {types.map((type, j) => 
        <FormControlLabel key={j} value={type} control={<Radio />} label={t(type)} />
      )}
    </RadioGroup>
  </FormControl>
}