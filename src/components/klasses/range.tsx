'use client'

import { Typography, Slider } from "@mui/material";
import { Panel } from "@/ui";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

interface KlassesRangeProps {
  startGrade: number,
  finalGrade: number
  setGrades: (startGrade: number, finalGrade: number) => void
}

export function KlassesRange({startGrade, finalGrade, setGrades}: KlassesRangeProps) {
  const t = useTranslations('klasses')

  const handleGradeChange = useCallback((_: Event, values: number | number[]) => {
    const vs = values as number[]
    setGrades(vs[0], vs[1])
  }, [setGrades])

  return <Panel gap={2} sx={{height: '100%', justifyContent: 'space-between'}}>
    <Typography variant='h6'>{t('plural')}:</Typography>
    <Slider
      aria-label='klasses'
      min={1}
      step={1}
      max={12}
      value={[startGrade, finalGrade]}
      onChange={handleGradeChange}
      valueLabelDisplay="auto"
    />
  </Panel>
}